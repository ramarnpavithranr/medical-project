'use client';

import React from 'react';
import { 
  FileDown, 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  Clock, 
  Cpu, 
  Stethoscope, 
  ShieldAlert, 
  Activity, 
  ExternalLink,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { AnalysisRecord, getReportDownloadUrl } from '@/lib/cardiology-api';

interface AnalysisResultsProps {
  record: AnalysisRecord;
  onReset?: () => void;
}

export default function AnalysisResults({ record, onReset }: AnalysisResultsProps) {
  const isUnconfigured = record.status === 'model_unconfigured';
  const confidencePercent = record.predictions.confidence > 0 ? (record.predictions.confidence * 100).toFixed(1) : null;

  return (
    <div className="medical-glass rounded-3xl p-6 sm:p-8 border border-white/90 shadow-xl mb-14">
      
      {/* 1. Header Bar: ID & Download Report Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/80 gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
              isUnconfigured 
                ? 'bg-amber-100 text-amber-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}>
              {record.status.toUpperCase()}
            </span>
            <span className="text-xs text-slate-400 font-mono">ID: {record.id}</span>
          </div>
          <h3 className="text-2xl font-black text-[#0e2448] mt-1">
            {record.modality_name} Screening Summary
          </h3>
        </div>

        {/* Download PDF Button */}
        {!isUnconfigured && (
          <a
            href={getReportDownloadUrl(record.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#0e2448] text-white text-xs font-bold shadow-md hover:bg-[#163363] hover:scale-105 active:scale-95 transition-all self-start sm:self-auto"
          >
            <FileDown className="w-4 h-4 text-emerald-400 group-hover:animate-bounce" />
            <span>Download Medical PDF Report</span>
          </a>
        )}
      </div>

      {/* 2. Metadata Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100/80 mb-8 text-xs">
        <div>
          <div className="text-[10px] font-bold uppercase text-slate-400">Model Engine</div>
          <div className="font-bold text-slate-800 truncate">{record.model_name}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase text-slate-400">Model Version</div>
          <div className="font-bold text-slate-800">{record.model_version}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase text-slate-400">Timestamp</div>
          <div className="font-bold text-slate-800">{record.created_at}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase text-slate-400">Input File</div>
          <div className="font-bold text-slate-800 truncate">{record.filename} ({record.file_size_kb} KB)</div>
        </div>
      </div>

      {/* 3. Primary Finding Box */}
      <div className={`p-6 rounded-3xl border mb-8 ${
        isUnconfigured
          ? 'bg-amber-50/70 border-amber-200 text-amber-950'
          : 'bg-white border-slate-200/90 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Primary Screened Finding
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-[#0e2448]">
              {record.predictions.primary_finding}
            </h4>
            {confidencePercent && (
              <p className="text-xs text-slate-500 font-medium mt-1">
                Model Certainty Metric: <strong className="text-blue-600">{confidencePercent}%</strong> (Algorithmic classification score; not a confirmed probability of illness)
              </p>
            )}
          </div>

          {confidencePercent && (
            <div className="flex items-center gap-3 bg-blue-50/80 border border-blue-100 p-3 rounded-2xl">
              <div className="text-right">
                <div className="text-2xl font-black text-blue-700">{confidencePercent}%</div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Confidence</div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <Activity className="w-6 h-6" />
              </div>
            </div>
          )}
        </div>

        {/* Secondary findings if available */}
        {record.predictions.secondary_findings && record.predictions.secondary_findings.length > 0 && (
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-500 mr-2">Associated Pattern Scores:</span>
            {record.predictions.secondary_findings.map((f, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                <span>{f.label}:</span>
                <span className="text-blue-600 font-bold">{(f.score * 100).toFixed(0)}%</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 4. Quantitative Metrics Table (Genuine Measurements) */}
      {record.predictions.metrics && Object.keys(record.predictions.metrics).length > 0 && (
        <div className="mb-8">
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>Physiological Measurements & Quantitative Parameters</span>
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {Object.entries(record.predictions.metrics).map(([key, val], idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="text-[11px] font-semibold text-slate-500 truncate">{key}</div>
                <div className="text-sm sm:text-base font-extrabold text-[#0e2448] mt-1">{String(val)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Clinical CVD Risk Assessment (Framingham / ASCVD) */}
      {record.risk_assessment && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50/80 via-white to-blue-50/80 border border-blue-200/80 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Validated Clinical Risk Stratification
              </div>
              <h4 className="text-lg font-black text-[#0e2448]">
                {record.risk_assessment.score_name}
              </h4>
            </div>

            <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
              record.risk_assessment.category === 'High'
                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                : record.risk_assessment.category === 'Intermediate'
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : record.risk_assessment.category === 'Borderline'
                ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            }`}>
              {record.risk_assessment.category} Risk Category
            </div>
          </div>

          {record.risk_assessment.estimated_10yr_risk && (
            <p className="text-xs text-slate-700 font-medium leading-relaxed mb-3">
              {record.risk_assessment.estimated_10yr_risk}
            </p>
          )}

          {record.risk_assessment.factors_considered?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-blue-100">
              <span className="text-[11px] font-bold text-slate-500 mr-1">Evaluated Factors:</span>
              {record.risk_assessment.factors_considered.map((factor, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-blue-200 text-slate-600 text-[11px] font-medium">
                  {factor}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 6. Doctor Guidance & Safety Recommendations */}
      {record.clinical_guidance && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          
          {/* Specialist Referral */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-slate-400">Recommended Specialist</div>
              <div className="text-sm font-extrabold text-[#0e2448] mt-0.5">
                {record.clinical_guidance.specialist_recommendation}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Formal consultation advised for comprehensive clinical correlation and history evaluation.
              </p>
            </div>
          </div>

          {/* Recommended Next Examinations */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center flex-shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-slate-400">Suggested Diagnostic Tests</div>
              <ul className="text-xs text-slate-700 font-medium mt-1 space-y-1">
                {record.clinical_guidance.recommended_examinations.map((exam, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>{exam}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 7. Emergency Safety Advisory Box (Required by Prompt Section 10) */}
      <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-200/80 text-rose-950 mb-6">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <span className="font-extrabold uppercase tracking-wide text-rose-800 block mb-1">
              Immediate Emergency Medical Warning:
            </span>
            {record.clinical_guidance?.emergency_warning ||
              "If the patient experiences acute crushing chest pain, unexplained severe breathlessness, fainting (syncope), or pain radiating to the jaw or left arm, immediately summon emergency medical services (911 / 112 / local emergency hotline) rather than waiting for automated analysis."}
          </div>
        </div>
      </div>

      {/* 8. Mandatory Educational & Legal Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-slate-600 text-xs leading-relaxed text-center">
        <strong>Medical Disclaimer: </strong>
        {record.clinical_guidance?.safety_disclaimer ||
          "This AI-assisted screening tool is intended for educational and decision-support purposes. Its outputs are not a confirmed diagnosis and must not replace professional medical evaluation."}
      </div>

    </div>
  );
}
