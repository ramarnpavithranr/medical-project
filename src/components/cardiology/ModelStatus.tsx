'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle2, AlertTriangle, ExternalLink, ShieldAlert, BookOpen, Layers } from 'lucide-react';
import { ModelMetadata, fetchSupportedModels } from '@/lib/cardiology-api';

export default function ModelStatus() {
  const [models, setModels] = useState<ModelMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchSupportedModels();
        setModels(data);
      } catch (err) {
        console.error('Failed to load models list:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div id="supported-models" className="medical-glass rounded-3xl p-6 sm:p-8 border border-white/90 shadow-xl mb-14">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/80 gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wider uppercase mb-1">
            Model Governance & Transparency
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#0e2448]">
            Supported AI Models & Technical Specifications
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent disclosure of architectures, versioning, deployment status, and clinical limitations.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold self-start sm:self-auto">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>{models.length} Documented Pipelines</span>
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {models.map((model) => (
          <div
            key={model.id}
            className="rounded-2xl p-5 bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Top Title & Status */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h4 className="text-base font-extrabold text-[#0e2448]">
                    {model.name}
                  </h4>
                  <div className="text-xs font-mono text-slate-400">
                    v{model.version} &bull; {model.modality.toUpperCase()}
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shrink-0 ${
                  model.is_configured
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : model.status_badge === 'Weights Required'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-slate-100 text-slate-600 border border-slate-300'
                }`}>
                  {model.status_badge}
                </span>
              </div>

              {/* Architecture & Intended Task */}
              <div className="text-xs space-y-2 mb-4">
                <div>
                  <span className="font-bold text-slate-700">Architecture: </span>
                  <span className="text-slate-600 font-medium">{model.architecture}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">Intended Task: </span>
                  <span className="text-slate-600">{model.intended_task}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">Supported Formats: </span>
                  <span className="font-mono text-blue-600 text-[11px] font-semibold">{model.supported_formats.join(', ')}</span>
                  <span className="text-slate-400 ml-2">(Max {model.max_size_mb} MB)</span>
                </div>
              </div>

              {/* Known Limitations */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-3 text-[11px]">
                <div className="font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                  <span>Documented Limitations:</span>
                </div>
                <ul className="text-slate-500 space-y-0.5 list-disc list-inside">
                  {model.limitations.map((lim, i) => (
                    <li key={i}>{lim}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reference Documentation */}
            {model.reference_documentation && (
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">Ref: {model.reference_documentation}</span>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
