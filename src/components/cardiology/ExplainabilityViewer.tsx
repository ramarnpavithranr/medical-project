'use client';

import React, { useState } from 'react';
import { Layers, Eye, EyeOff, Info, HelpCircle } from 'lucide-react';
import { AnalysisRecord } from '@/lib/cardiology-api';

interface ExplainabilityViewerProps {
  record: AnalysisRecord;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function ExplainabilityViewer({ record }: ExplainabilityViewerProps) {
  const [viewMode, setViewMode] = useState<'both' | 'original' | 'heatmap'>('both');

  const previewUrl = record.preview_url ? `${BACKEND_URL}${record.preview_url}` : null;
  const heatmapUrl = record.heatmap_url ? `${BACKEND_URL}${record.heatmap_url}` : null;
  const isEcg = record.modality === 'ecg';

  return (
    <div className="medical-glass rounded-3xl p-6 sm:p-8 border border-white/90 shadow-xl mb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200/80 gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wider uppercase mb-1">
            Visual Explainability Engine
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#0e2448]">
            {isEcg ? 'ECG Waveform & Feature Extraction' : 'Original vs. Grad-CAM Spatial Attribution'}
          </h3>
        </div>

        {/* View Mode Toggle */}
        {!isEcg && heatmapUrl && (
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold self-start sm:self-auto">
            <button
              onClick={() => setViewMode('both')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'both' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setViewMode('original')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'original' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Original Only
            </button>
            <button
              onClick={() => setViewMode('heatmap')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'heatmap' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Attribution Only
            </button>
          </div>
        )}
      </div>

      {/* Visual Canvas Area */}
      <div className="mb-6">
        {isEcg ? (
          /* ECG Waveform Strip Display */
          <div className="flex flex-col items-center">
            {previewUrl ? (
              <div className="w-full rounded-2xl overflow-hidden border border-slate-300 shadow-md bg-white">
                <img
                  src={previewUrl}
                  alt="Extracted ECG Trace"
                  className="w-full h-auto object-contain max-h-[380px]"
                />
              </div>
            ) : (
              <div className="w-full h-48 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 text-sm">
                Waveform preview rendered in numerical table
              </div>
            )}
            <div className="mt-3 text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Pink background corresponds to standard clinical 1mm / 5mm ECG paper calibration.</span>
            </div>
          </div>
        ) : (
          /* Chest X-Ray Radiograph & Grad-CAM Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Original Radiograph */}
            {(viewMode === 'both' || viewMode === 'original') && (
              <div className={`flex flex-col items-center ${viewMode === 'original' ? 'md:col-span-2' : ''}`}>
                <div className="w-full aspect-square max-w-md rounded-2xl overflow-hidden border border-slate-300 shadow-md bg-black relative flex items-center justify-center">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Original Chest Radiograph"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-slate-400 text-xs">Original image unavailable</div>
                  )}
                  <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                    Original Scan (PA View)
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-600 mt-2">Unmodified Clinical Radiograph</span>
              </div>
            )}

            {/* Right: Grad-CAM Overlay */}
            {(viewMode === 'both' || viewMode === 'heatmap') && (
              <div className={`flex flex-col items-center ${viewMode === 'heatmap' ? 'md:col-span-2' : ''}`}>
                <div className="w-full aspect-square max-w-md rounded-2xl overflow-hidden border border-slate-300 shadow-md bg-black relative flex items-center justify-center">
                  {heatmapUrl ? (
                    <img
                      src={heatmapUrl}
                      alt="Grad-CAM Spatial Attribution"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-slate-400 text-xs">Attribution overlay unavailable</div>
                  )}
                  <span className="absolute top-3 left-3 bg-blue-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                    Grad-CAM Model Attribution
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-600 mt-2">Attribution Overlay (Jet Colormap)</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Attribution Legend & Regulatory Disclaimer Box */}
      {record.explanation?.legend && (
        <div className="flex flex-wrap items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6 text-xs">
          <span className="font-bold text-slate-700">Attribution Legend:</span>
          {record.explanation.legend.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5 font-medium text-slate-600">
              <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Transparent Disclaimer Callout (Section 8 Requirement) */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Model Attribution Notice: </span>
          Highlighted image regions represent neural activation weights (model-attribution), indicating which pixels most influenced the model's prediction. They are mathematical attributions and do not constitute confirmed anatomical pathology.
        </div>
      </div>

    </div>
  );
}
