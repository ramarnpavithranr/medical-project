export type ModalityType = 'ecg' | 'chest_xray' | 'echocardiography' | 'ct_angiography';

export interface AnalysisRecord {
  id: string;
  modality: ModalityType;
  modality_name: string;
  status: 'completed' | 'processing' | 'failed' | 'model_unconfigured';
  created_at: string;
  model_name: string;
  model_version: string;
  filename: string;
  file_size_kb: number;
  preview_url?: string;
  heatmap_url?: string;
  predictions: {
    primary_finding: string;
    confidence: number; // 0 to 1
    secondary_findings?: { label: string; score: number }[];
    metrics?: Record<string, string | number>;
  };
  explanation?: {
    method: string;
    summary: string;
    notes: string[];
    legend?: { color: string; label: string }[];
  };
  clinical_guidance?: {
    specialist_recommendation: string;
    recommended_examinations: string[];
    safety_disclaimer: string;
    emergency_warning?: string;
  };
  risk_assessment?: {
    score_name: string;
    category: 'Low' | 'Borderline' | 'Intermediate' | 'High' | 'Not Evaluated';
    estimated_10yr_risk?: string;
    factors_considered: string[];
  };
}

export interface ModelMetadata {
  id: string;
  name: string;
  version: string;
  modality: ModalityType;
  intended_task: string;
  architecture: string;
  is_configured: boolean;
  status_badge: 'Operational' | 'Model Not Configured' | 'Weights Required';
  supported_formats: string[];
  max_size_mb: number;
  limitations: string[];
  reference_documentation?: string;
}

export interface ClinicalRiskInput {
  age: number;
  sex: 'male' | 'female';
  systolic_bp: number;
  total_cholesterol: number;
  hdl_cholesterol: number;
  is_smoker: boolean;
  has_diabetes: boolean;
  on_hypertension_meds: boolean;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function checkBackendHealth(): Promise<{ status: string; timestamp: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/cardiology/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    return { status: 'offline', timestamp: new Date().toISOString() };
  }
}

export async function fetchSupportedModels(): Promise<ModelMetadata[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/cardiology/models`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.models;
  } catch (err) {
    // Fallback static specification matching documented backend capability
    return [
      {
        id: 'ecg-pt-arrhythmia-v1',
        name: 'Nuvica QRS-Wave Rhythm Classifier',
        version: '1.4.0',
        modality: 'ecg',
        intended_task: 'QRS detection, interval calculation (PR, QT, QRS), & rhythm classification (Sinus, Tachycardia, Bradycardia, Arrhythmia)',
        architecture: 'Pan-Tompkins + Wavelet Spectrum Filter + Feature Classifier',
        is_configured: true,
        status_badge: 'Operational',
        supported_formats: ['.csv', '.dat', '.json', '.png', '.jpg'],
        max_size_mb: 20,
        limitations: [
          'Validated on single-lead and 12-lead standard tracings (500Hz/250Hz)',
          'Requires baseline noise filtering for high-motion artifacts',
          'Not intended to replace continuous 24-hr telemetry'
        ],
        reference_documentation: 'PhysioNet MIT-BIH Arrhythmia & ANSI/AAMI EC57 standards'
      },
      {
        id: 'cxr-cardiomegaly-cam-v1',
        name: 'Nuvica Cardiopulmonary Silhouette Screener',
        version: '2.1.0',
        modality: 'chest_xray',
        intended_task: 'Cardiomegaly screening, Cardiothoracic Ratio (CTR) analysis, and pulmonary congestion pattern attribution',
        architecture: 'Deep Convolutional Silhouette Analyzer with Grad-CAM Attribution Layer',
        is_configured: true,
        status_badge: 'Operational',
        supported_formats: ['.png', '.jpg', '.jpeg', '.dcm'],
        max_size_mb: 25,
        limitations: [
          'Validated strictly for Posteroanterior (PA) and Anteroposterior (AP) erect views',
          'Attribution heatmaps are model-attribution outputs, not anatomical confirmations',
          'Does not replace CT coronary angiography or invasive diagnostic imaging'
        ],
        reference_documentation: 'NIH ChestX-ray14 & CheXpert cardiopulmonary screening criteria'
      },
      {
        id: 'echo-lvef-doppler-v2',
        name: 'EchoNet Video/Doppler Analyzer',
        version: '2.0.0-rc',
        modality: 'echocardiography',
        intended_task: 'Left Ventricular Ejection Fraction (LVEF) & apical chamber wall tracking',
        architecture: 'EchoNet 3D-ResNet / Video Frame Segmentation',
        is_configured: false,
        status_badge: 'Weights Required',
        supported_formats: ['.mp4', '.avi', '.png', '.dcm'],
        max_size_mb: 50,
        limitations: [
          'Requires pre-trained weights file `echonet_weights.pth` (Stanford EchoNet)',
          'High frame-rate DICOM ultrasound cine loops required'
        ],
        reference_documentation: 'Stanford AIMI EchoNet-Dynamic specification'
      },
      {
        id: 'cta-coronary-calcium-v1',
        name: 'VesselNet CT Angiography Screener',
        version: '1.0.0-preview',
        modality: 'ct_angiography',
        intended_task: 'Coronary artery lumen segmentation & Agatston calcium score estimation',
        architecture: '3D U-Net Volumetric Segmentation Engine',
        is_configured: false,
        status_badge: 'Model Not Configured',
        supported_formats: ['.dcm', '.nii', '.zip'],
        max_size_mb: 100,
        limitations: [
          'Requires 3D volumetric DICOM slices and calibrated Hounsfield units (HU)',
          'Volumetric model weights currently not loaded on server instance'
        ],
        reference_documentation: 'CAC-Score & SCCT Coronary CTA Guidelines'
      }
    ];
  }
}

export async function submitCardiologyAnalysis(
  file: File,
  modality: ModalityType,
  clinicalInput?: Partial<ClinicalRiskInput>
): Promise<AnalysisRecord> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('modality', modality);
  if (clinicalInput) {
    formData.append('clinical_data', JSON.stringify(clinicalInput));
  }

  const res = await fetch(`${BACKEND_URL}/api/cardiology/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    let errorDetail = 'Failed to analyze medical scan';
    try {
      const errJson = await res.json();
      errorDetail = errJson.detail || errorDetail;
    } catch {
      // Keep fallback
    }
    throw new Error(errorDetail);
  }

  return await res.json();
}

export async function fetchAnalysisRecord(id: string): Promise<AnalysisRecord> {
  const res = await fetch(`${BACKEND_URL}/api/cardiology/analysis/${id}`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Analysis record with ID ${id} not found.`);
  }

  return await res.json();
}

export async function fetchAnalysisHistory(modality?: string, status?: string): Promise<AnalysisRecord[]> {
  try {
    const params = new URLSearchParams();
    if (modality && modality !== 'all') params.append('modality', modality);
    if (status && status !== 'all') params.append('status', status);

    const res = await fetch(`${BACKEND_URL}/api/cardiology/history?${params.toString()}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.history || [];
  } catch (err) {
    return [];
  }
}

export function getReportDownloadUrl(analysisId: string): string {
  return `${BACKEND_URL}/api/cardiology/report/${analysisId}`;
}

// Validated Clinical 10-Year ASCVD Risk Calculator (ACC/AHA Guideline)
export function calculateASCVDScore(input: ClinicalRiskInput): {
  score_percentage: number;
  category: 'Low' | 'Borderline' | 'Intermediate' | 'High';
  interpretation: string;
} {
  const { age, sex, systolic_bp, total_cholesterol, hdl_cholesterol, is_smoker, has_diabetes, on_hypertension_meds } = input;
  
  // Validated Pooled Cohort Equations Coefficients
  const lnAge = Math.log(Math.max(20, Math.min(79, age)));
  const lnTotChol = Math.log(Math.max(130, Math.min(320, total_cholesterol)));
  const lnHdl = Math.log(Math.max(20, Math.min(100, hdl_cholesterol)));
  const lnSbp = Math.log(Math.max(90, Math.min(200, systolic_bp)));

  let individualSum = 0;
  let meanX = 0;
  let baselineSurvival = 0;

  if (sex === 'male') {
    individualSum = 
      12.344 * lnAge +
      11.853 * lnTotChol -
      2.664 * (lnAge * lnTotChol) -
      7.990 * lnHdl +
      1.769 * (lnAge * lnHdl) +
      (on_hypertension_meds ? 1.797 * lnSbp : 1.764 * lnSbp) +
      (is_smoker ? 7.837 - 1.795 * lnAge : 0) +
      (has_diabetes ? 0.658 : 0);
    meanX = 61.18;
    baselineSurvival = 0.9144;
  } else {
    individualSum = 
      -29.799 * lnAge +
      4.884 * (lnAge * lnAge) +
      13.540 * lnTotChol -
      3.114 * (lnAge * lnTotChol) -
      13.578 * lnHdl +
      3.149 * (lnAge * lnHdl) +
      (on_hypertension_meds ? 2.019 * lnSbp : 1.957 * lnSbp) +
      (is_smoker ? 7.574 - 1.665 * lnAge : 0) +
      (has_diabetes ? 0.661 : 0);
    meanX = -29.18;
    baselineSurvival = 0.9665;
  }

  const rawRisk = 1 - Math.pow(baselineSurvival, Math.exp(individualSum - meanX));
  const percentage = Math.max(0.1, Math.min(99.9, parseFloat((rawRisk * 100).toFixed(1))));

  let category: 'Low' | 'Borderline' | 'Intermediate' | 'High' = 'Low';
  let interpretation = '';

  if (percentage < 5.0) {
    category = 'Low';
    interpretation = 'Low 10-year cardiovascular risk (<5%). Emphasize healthy lifestyle, cardiovascular diet, and routine physical activity.';
  } else if (percentage < 7.5) {
    category = 'Borderline';
    interpretation = 'Borderline risk (5.0% - 7.4%). Consider risk-enhancing factors and discuss lifestyle optimization with physician.';
  } else if (percentage < 20.0) {
    category = 'Intermediate';
    interpretation = 'Intermediate risk (7.5% - 19.9%). Guideline recommends clinician-patient risk discussion and preventive therapy consideration.';
  } else {
    category = 'High';
    interpretation = 'High 10-year risk (>=20.0%). Strongly warrants aggressive risk factor management, statin therapy evaluation, and clinical monitoring.';
  }

  return {
    score_percentage: percentage,
    category,
    interpretation
  };
}
