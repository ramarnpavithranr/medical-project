'use client';

import React from 'react';
import { Activity, Layers, HeartPulse, Cpu, ArrowUpRight, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { ModalityType } from '@/lib/cardiology-api';

interface AnalysisDashboardProps {
  selectedModality: ModalityType;
  onSelectModality: (modality: ModalityType) => void;
}

export default function AnalysisDashboard({ selectedModality, onSelectModality }: AnalysisDashboardProps) {
  const modalities = [
    {
      id: 'ecg' as ModalityType,
      title: 'ECG Analysis',
      modality: '12-Lead & Rhythm Tracing',
      description: 'Automated Pan-Tompkins QRS wave detection, PR/QT/QRS duration quantification, and arrhythmia rhythm classification.',
      formats: '.csv, .dat, .json, .png, .jpg',
      status: 'Operational',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconBg: 'bg-blue-500/10 text-blue-600',
      icon: <Activity className="w-6 h-6" />
    },
    {
      id: 'chest_xray' as ModalityType,
      title: 'Chest X-Ray Analysis',
      modality: 'Cardiopulmonary Radiography',
      description: 'Cardiothoracic Ratio (CTR) measurement, cardiomegaly screening, and spatial Grad-CAM attribution overlays.',
      formats: '.png, .jpg, .jpeg, .dcm',
      status: 'Operational',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconBg: 'bg-cyan-500/10 text-cyan-600',
      icon: <Layers className="w-6 h-6" />
    },
    {
      id: 'echocardiography' as ModalityType,
      title: 'Echocardiography Analysis',
      modality: 'Ultrasound Doppler & Cine Loop',
      description: 'Left Ventricular Ejection Fraction (LVEF) & apical chamber wall tracking. Pipeline configured for EchoNet architecture.',
      formats: '.mp4, .avi, .png, .dcm',
      status: 'Weights Required',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      iconBg: 'bg-rose-500/10 text-rose-600',
      icon: <HeartPulse className="w-6 h-6" />
    },
    {
      id: 'ct_angiography' as ModalityType,
      title: 'CT Angiography Analysis',
      modality: 'Vascular Lumen & Calcium',
      description: 'Coronary artery calcium scoring & 3D vascular lumen segmentation. Pipeline awaiting 3D U-Net weights.',
      formats: '.dcm, .nii, .zip',
      status: 'Model Not Configured',
      badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
      iconBg: 'bg-slate-500/10 text-slate-600',
      icon: <Cpu className="w-6 h-6" />
    }
  ];

  return (
    <div id="modalities-overview" className="mb-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wider uppercase mb-2">
            Cardiovascular Modalities
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0e2448]">
            Cardiology AI Analysis Dashboard
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Select an operational modality to upload medical imaging or waveform data for AI screening.
          </p>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Inference Engine: Online</span>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {modalities.map((card) => {
          const isSelected = selectedModality === card.id;
          return (
            <div
              key={card.id}
              onClick={() => onSelectModality(card.id)}
              className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-2 border-blue-600 shadow-xl shadow-blue-500/15 scale-[1.02]'
                  : 'medical-glass hover:bg-white hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              <div>
                {/* Header: Icon & Status Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.iconBg} shadow-inner`}>
                    {card.icon}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${card.badgeColor}`}>
                    {card.status}
                  </span>
                </div>

                {/* Title & Modality */}
                <h3 className="text-lg font-extrabold text-[#0e2448] mb-1">
                  {card.title}
                </h3>
                <div className="text-xs font-semibold text-blue-600 mb-3">
                  {card.modality}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {card.description}
                </p>
              </div>

              <div>
                {/* Supported Formats */}
                <div className="pt-3 border-t border-slate-100 mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Supported Formats</div>
                  <div className="text-xs font-medium text-slate-700 truncate">{card.formats}</div>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{isSelected ? 'Active Modality' : 'Open Analysis'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
