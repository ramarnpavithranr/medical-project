from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class ModalityMetadata(BaseModel):
    id: str
    name: str
    description: str
    status: str
    supported_formats: List[str]
    icon: str

class ModelMetadata(BaseModel):
    id: str
    name: str
    version: str
    modality: str
    intended_task: str
    architecture: str
    is_configured: bool
    status_badge: str
    supported_formats: List[str]
    max_size_mb: int
    limitations: List[str]
    reference_documentation: Optional[str] = None

class SecondaryFinding(BaseModel):
    label: str = Field(..., alias="label")
    score: float

class Predictions(BaseModel):
    primary_finding: str
    confidence: float
    secondary_findings: Optional[List[Dict[str, Any]]] = None
    metrics: Optional[Dict[str, Any]] = None

class VisualExplanation(BaseModel):
    method: str
    summary: str
    notes: List[str]
    legend: Optional[List[Dict[str, str]]] = None

class ClinicalGuidance(BaseModel):
    specialist_recommendation: str
    recommended_examinations: List[str]
    safety_disclaimer: str
    emergency_warning: Optional[str] = None

class RiskAssessment(BaseModel):
    score_name: str
    category: str
    estimated_10yr_risk: Optional[str] = None
    factors_considered: List[str]

class AnalysisRecord(BaseModel):
    id: str
    modality: str
    modality_name: str
    status: str
    created_at: str
    model_name: str
    model_version: str
    filename: str
    file_size_kb: float
    preview_url: Optional[str] = None
    heatmap_url: Optional[str] = None
    predictions: Predictions
    explanation: Optional[VisualExplanation] = None
    clinical_guidance: Optional[ClinicalGuidance] = None
    risk_assessment: Optional[RiskAssessment] = None

class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    timestamp: str

class HistoryResponse(BaseModel):
    total: int
    history: List[AnalysisRecord]
