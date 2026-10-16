'use client';

import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  Sliders, 
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ModalityType, submitCardiologyAnalysis, AnalysisRecord, ClinicalRiskInput } from '@/lib/cardiology-api';

interface MedicalUploadProps {
  currentModality: ModalityType;
  onModalityChange: (modality: ModalityType) => void;
  onAnalysisSuccess: (record: AnalysisRecord) => void;
}

export default function MedicalUpload({
  currentModality,
  onModalityChange,
  onAnalysisSuccess
}: MedicalUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showClinicalForm, setShowClinicalForm] = useState(false);

  // Optional Clinical Factors
  const [clinicalData, setClinicalData] = useState<ClinicalRiskInput>({
    age: 54,
    sex: 'male',
    systolic_bp: 138,
    total_cholesterol: 210,
    hdl_cholesterol: 46,
    is_smoker: false,
    has_diabetes: false,
    on_hypertension_meds: true
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Accepted file types per modality
  const acceptedFormats: Record<ModalityType, string[]> = {
    ecg: ['.csv', '.dat', '.json', '.png', '.jpg'],
    chest_xray: ['.png', '.jpg', '.jpeg', '.dcm'],
    echocardiography: ['.mp4', '.avi', '.png', '.dcm'],
    ct_angiography: ['.dcm', '.nii', '.zip']
  };

  const handleFileValidation = (file: File) => {
    setErrorMessage(null);
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    const validExts = acceptedFormats[currentModality];

    if (!validExts.includes(ext)) {
      setErrorMessage(`Invalid format for ${currentModality.toUpperCase()}. Accepted: ${validExts.join(', ')}`);
      return false;
    }

    // 25MB max limit
    if (file.size > 25 * 1024 * 1024) {
      setErrorMessage(`File exceeds 25MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`);
      return false;
    }

    setSelectedFile(file);

    // If image, create local preview
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileValidation(e.dataTransfer.files[0]);
    }
  };

  const handleSelectDemo = async (samplePath: string, filename: string, targetModality: ModalityType) => {
    try {
      setErrorMessage(null);
      onModalityChange(targetModality);
      const res = await fetch(samplePath);
      const blob = await res.blob();
      const file = new File([blob], filename, { type: blob.type || 'text/csv' });
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        setPreviewUrl(samplePath);
      } else {
        setPreviewUrl(null);
      }
    } catch (err) {
      setErrorMessage('Could not load sample data file.');
    }
  };

  const handleRunAnalysis = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select or drop a medical file first.');
      return;
    }

    setIsAnalyzing(true);
    setUploadProgress(15);
    setErrorMessage(null);

    const progressTimer = setInterval(() => {
      setUploadProgress((prev) => (prev < 85 ? prev + 15 : prev));
    }, 250);

    try {
      const record = await submitCardiologyAnalysis(
        selectedFile,
        currentModality,
        showClinicalForm ? clinicalData : undefined
      );

      clearInterval(progressTimer);
      setUploadProgress(100);

      setTimeout(() => {
        setIsAnalyzing(false);
        onAnalysisSuccess(record);
      }, 400);

    } catch (err: any) {
      clearInterval(progressTimer);
      setIsAnalyzing(false);
      setErrorMessage(err.message || 'An error occurred during analysis.');
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div id="cardiology-studio" className="medical-glass rounded-3xl p-6 sm:p-8 border border-white/90 shadow-xl mb-14">
      
      {/* Studio Header & Modality Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200/80 gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Medical AI Analysis Studio</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#0e2448] mt-1">
            Upload Scan & Execute Screening
          </h3>
        </div>

        {/* Modality Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100/90 border border-slate-200/70">
          <button
            type="button"
            onClick={() => onModalityChange('ecg')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentModality === 'ecg'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ECG Tracing
          </button>
          <button
            type="button"
            onClick={() => onModalityChange('chest_xray')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentModality === 'chest_xray'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Chest X-Ray
          </button>
          <button
            type="button"
            onClick={() => onModalityChange('echocardiography')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentModality === 'echocardiography'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Echocardiography
          </button>
          <button
            type="button"
            onClick={() => onModalityChange('ct_angiography')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentModality === 'ct_angiography'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            CT Angiography
          </button>
        </div>
      </div>

      {/* Quick Demo Pre-load Samples Banner */}
      <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-blue-50/70 border border-blue-100 mb-6 text-xs">
        <span className="font-bold text-blue-800 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Test Sample Data:
        </span>
        <button
          type="button"
          onClick={() => handleSelectDemo('/samples/normal_sinus_ecg.csv', 'normal_sinus_ecg.csv', 'ecg')}
          className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white font-medium transition-colors"
        >
          Normal Sinus ECG (CSV)
        </button>
        <button
          type="button"
          onClick={() => handleSelectDemo('/samples/tachycardia_ecg.csv', 'tachycardia_ecg.csv', 'ecg')}
          className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white font-medium transition-colors"
        >
          Tachycardia ECG (CSV)
        </button>
        <button
          type="button"
          onClick={() => handleSelectDemo('/samples/sample_normal_cxr.png', 'sample_normal_cxr.png', 'chest_xray')}
          className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white font-medium transition-colors"
        >
          PA Chest X-Ray Normal (PNG)
        </button>
        <button
          type="button"
          onClick={() => handleSelectDemo('/samples/sample_cardiomegaly_cxr.png', 'sample_cardiomegaly_cxr.png', 'chest_xray')}
          className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white font-medium transition-colors"
        >
          Cardiomegaly CXR (PNG)
        </button>
        <span className="text-[10px] text-slate-400 ml-auto font-medium">Labeled DEMO DATA</span>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !selectedFile && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all ${
          dragOver
            ? 'border-blue-600 bg-blue-50/70 scale-[1.01]'
            : selectedFile
            ? 'border-emerald-400 bg-emerald-50/20'
            : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50/60 cursor-pointer'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedFormats[currentModality].join(',')}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileValidation(e.target.files[0]);
            }
          }}
        />

        {selectedFile ? (
          /* File Selected Card View */
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
              {previewUrl ? (
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 bg-black/5 flex-shrink-0">
                  <img src={previewUrl} alt="Scan preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-8 h-8" />
                </div>
              )}

              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#0e2448] truncate max-w-xs">{selectedFile.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {(selectedFile.size / 1024).toFixed(1)} KB &bull; {currentModality.toUpperCase()}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
              title="Remove File"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          /* Empty Dropzone Callout */
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 shadow-sm border border-blue-100">
              <Upload className="w-8 h-8" />
            </div>

            <h4 className="text-base font-extrabold text-[#0e2448] mb-1">
              Drag and drop your {currentModality.replace('_', ' ')} scan or trace here
            </h4>
            <p className="text-xs text-slate-500 mb-4 max-w-sm">
              Supports {acceptedFormats[currentModality].join(', ')} up to 25MB.
            </p>

            <button
              type="button"
              className="px-5 py-2.5 rounded-full bg-[#0e2448] text-white text-xs font-bold hover:bg-blue-900 transition-colors shadow-sm"
            >
              Browse Local Files
            </button>
          </div>
        )}
      </div>

      {/* Error Message Alert */}
      {errorMessage && (
        <div className="mt-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Optional Clinical Risk Assessment Accordion */}
      <div className="mt-6 border border-slate-200/80 rounded-2xl overflow-hidden bg-white/70">
        <button
          type="button"
          onClick={() => setShowClinicalForm(!showClinicalForm)}
          className="w-full px-5 py-3.5 flex items-center justify-between text-left text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>Optional: Include Clinical Parameters for ACC/AHA 10-Year ASCVD Risk Score</span>
          </div>
          {showClinicalForm ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {showClinicalForm && (
          <div className="p-5 border-t border-slate-200/80 bg-slate-50/50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-600 block mb-1">Patient Age</label>
              <input
                type="number"
                min={20}
                max={79}
                value={clinicalData.age}
                onChange={(e) => setClinicalData({ ...clinicalData, age: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-600 block mb-1">Biological Sex</label>
              <select
                value={clinicalData.sex}
                onChange={(e) => setClinicalData({ ...clinicalData, sex: e.target.value as 'male' | 'female' })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-600 block mb-1">Systolic BP (mmHg)</label>
              <input
                type="number"
                value={clinicalData.systolic_bp}
                onChange={(e) => setClinicalData({ ...clinicalData, systolic_bp: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-600 block mb-1">Total Cholesterol (mg/dL)</label>
              <input
                type="number"
                value={clinicalData.total_cholesterol}
                onChange={(e) => setClinicalData({ ...clinicalData, total_cholesterol: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-600 block mb-1">HDL Cholesterol (mg/dL)</label>
              <input
                type="number"
                value={clinicalData.hdl_cholesterol}
                onChange={(e) => setClinicalData({ ...clinicalData, hdl_cholesterol: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="smoker"
                checked={clinicalData.is_smoker}
                onChange={(e) => setClinicalData({ ...clinicalData, is_smoker: e.target.checked })}
                className="rounded text-blue-600"
              />
              <label htmlFor="smoker" className="font-medium text-slate-700">Current Smoker</label>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="diabetes"
                checked={clinicalData.has_diabetes}
                onChange={(e) => setClinicalData({ ...clinicalData, has_diabetes: e.target.checked })}
                className="rounded text-blue-600"
              />
              <label htmlFor="diabetes" className="font-medium text-slate-700">Diabetes Mellitus</label>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="bpMeds"
                checked={clinicalData.on_hypertension_meds}
                onChange={(e) => setClinicalData({ ...clinicalData, on_hypertension_meds: e.target.checked })}
                className="rounded text-blue-600"
              />
              <label htmlFor="bpMeds" className="font-medium text-slate-700">On BP Medication</label>
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar when analyzing */}
      {isAnalyzing && (
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              Running Neural Inference & Preprocessing...
            </span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/80">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Info className="w-4 h-4 text-slate-400" />
          <span>Uploaded medical files are processed in HIPAA-compliant transient memory.</span>
        </div>

        <button
          type="button"
          disabled={!selectedFile || isAnalyzing}
          onClick={handleRunAnalysis}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
            !selectedFile || isAnalyzing
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing Scan...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Analyze Cardiovascular Scan</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
