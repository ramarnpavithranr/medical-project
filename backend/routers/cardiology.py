import os
import json
from typing import Optional
from datetime import datetime
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status
from fastapi.responses import FileResponse, JSONResponse

from database import db
from models.schemas import HealthResponse, HistoryResponse
from services.preprocessing import save_uploaded_file, preprocess_ecg_signal
from services.model_service import model_engine
from services.report_service import generate_pdf_report

router = APIRouter(prefix="/api/cardiology", tags=["Cardiology AI"])

@router.get("/health", response_model=HealthResponse)
def get_health():
    return {
        "status": "operational",
        "service": "Nuvica Cardiology & Vascular AI Platform",
        "version": "2.4.0",
        "timestamp": datetime.now().isoformat()
    }

@router.get("/models")
def get_supported_models():
    return {
        "count": len(model_engine.get_models_metadata()),
        "models": model_engine.get_models_metadata()
    }

@router.get("/modalities")
def get_modalities():
    return {
        "modalities": model_engine.get_supported_modalities()
    }

@router.post("/analyze")
async def analyze_scan(
    file: UploadFile = File(...),
    modality: str = Form(...),
    clinical_data: Optional[str] = Form(None)
):
    valid_modalities = ["ecg", "chest_xray", "echocardiography", "ct_angiography"]
    if modality not in valid_modalities:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported modality '{modality}'. Supported modalities are: {', '.join(valid_modalities)}"
        )

    # Read and validate file size (Limit: 30MB)
    MAX_BYTES = 30 * 1024 * 1024
    file_bytes = await file.read()
    if len(file_bytes) > MAX_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File exceeds maximum allowed size of 30MB (received {round(len(file_bytes)/(1024*1024), 2)}MB)"
        )

    file_id, saved_path, size_kb = save_uploaded_file(file_bytes, file.filename or "medical_scan")

    # Modality routing
    if modality == "ecg":
        # Extract signal & execute Pan-Tompkins algorithm
        signal_dict = preprocess_ecg_signal(file_bytes, file.filename or "ecg.csv")
        result = model_engine.analyze_ecg(signal_dict, file.filename or "ecg_trace", size_kb)
    elif modality == "chest_xray":
        # Execute Cardiopulmonary Silhouette analyzer & Grad-CAM
        result = model_engine.analyze_chest_xray(file_bytes, file.filename or "cxr.png", size_kb)
    elif modality in ["echocardiography", "ct_angiography"]:
        # Safe, honest unconfigured state per Section 7 & 11
        result = model_engine.analyze_unconfigured(modality, file.filename or "scan.dcm", size_kb)
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported modality")

    # If clinical risk data was provided, calculate ASCVD score and attach
    if clinical_data:
        try:
            clin_json = json.loads(clinical_data)
            from lib_risk import calculate_risk_assessment
            risk_res = calculate_risk_assessment(clin_json)
            result["risk_assessment"] = risk_res
        except Exception as e:
            print(f"[ANALYZE] Optional clinical risk calculation skipped: {e}")

    # Persist record in database
    db.save_record(result)

    return result

@router.get("/analysis/{analysis_id}")
def get_analysis_by_id(analysis_id: str):
    record = db.get_record(analysis_id)
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Analysis with ID '{analysis_id}' was not found in the medical database."
        )
    return record

@router.get("/history")
def get_analysis_history(modality: Optional[str] = None, status: Optional[str] = None):
    records = db.list_records(modality=modality, status=status, limit=100)
    return {
        "total": len(records),
        "history": records
    }

@router.get("/report/{analysis_id}")
def download_medical_report(analysis_id: str):
    record = db.get_record(analysis_id)
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Cannot generate report: record '{analysis_id}' does not exist."
        )

    # If unconfigured analysis, do not generate a false success report
    if record.get("status") == "model_unconfigured":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Report generation is not available for unconfigured models where inference could not be executed."
        )

    try:
        pdf_path = generate_pdf_report(record)
        if not os.path.exists(pdf_path):
            raise HTTPException(status_code=500, detail="Failed to locate generated PDF report on server.")
        return FileResponse(
            path=pdf_path,
            filename=f"Nuvica_Cardiology_Report_{analysis_id}.pdf",
            media_type="application/pdf"
        )
    except Exception as e:
        print(f"[REPORT ERROR] {e}")
        raise HTTPException(status_code=500, detail=f"PDF generation failed: {str(e)}")
