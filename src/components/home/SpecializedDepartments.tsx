'use client';

import React, { useState } from 'react';
import { Brain, HeartPulse, Wind, Activity, Bone, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function SpecializedDepartments() {
  const departments = [
    {
      id: 'neurology',
      title: 'Neurology & Brain Sciences',
      specialists: '18 Specialists',
      desc: 'State-of-the-art neuro-diagnostics, cognitive evaluation, and advanced synaptic mapping.',
      capabilities: ['Functional MRI', 'Synaptic AI Profiling', 'Neuro-rehabilitation', 'Sleep Medicine'],
      icon: <Brain className="w-6 h-6 text-emerald-400" />,
      link: '#cardiology-studio'
    },
    {
      id: 'cardiology',
      title: 'Cardiology & Vascular Health',
      specialists: '24 Specialists',
      desc: 'Comprehensive cardiac health checks, real-time hemodynamic tracking, and rhythm analysis.',
      capabilities: ['Coronary Angiography', 'Echocardiography', 'Holter AI Monitoring', 'Cardiac Rehab'],
      icon: <HeartPulse className="w-6 h-6 text-emerald-400" />,
      link: '#cardiology-studio',
      isFeatured: true
    },
    {
      id: 'pulmonology',
      title: 'Pulmonology & Respiratory',
      specialists: '14 Specialists',
      desc: 'Precision airway evaluation, high-resolution lung diagnostics, and respiratory recovery.',
      capabilities: ['Dynamic Spirometry', '3D Bronchial Imaging', 'Oxygen Kinetics', 'Allergy Testing'],
      icon: <Wind className="w-6 h-6 text-emerald-400" />,
      link: '#cardiology-studio'
    },
    // The 3 departments from user's latest reference screenshot (Image 3)
    {
      id: 'hepatology-nephrology',
      title: 'Hepatology & Nephrology',
      specialists: '16 Specialists',
      desc: 'Specialized liver and renal functional tests, metabolic screening, and organ vitality care.',
      capabilities: ['Liver Elastography', 'Glomerular Filtration', 'Renal Ultrasound', 'Metabolic Profiling'],
      icon: <Activity className="w-6 h-6 text-emerald-400" />,
      link: '#cardiology-studio'
    },
    {
      id: 'orthopedics',
      title: 'Orthopedics & Joint Care',
      specialists: '20 Specialists',
      desc: 'Musculoskeletal assessment, sports injury recovery, and robotic joint evaluation.',
      capabilities: ['Bone Density Scan', 'Robotic Arthroscopy', 'Joint Regeneration', 'Physical Therapy'],
      icon: <Bone className="w-6 h-6 text-emerald-400" />,
      link: '#cardiology-studio'
    },
    {
      id: 'preventive',
      title: 'Preventive & Executive Health',
      specialists: '22 Specialists',
      desc: 'Proactive health screening, genetic risk profiling, and longevity consultations.',
      capabilities: ['Comprehensive Health Audits', 'Longevity Protocols', 'Metabolic Detox', 'Nutrition Care'],
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      link: '#cardiology-studio'
    }
  ];

  return (
    <section id="departments-section" className="relative py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      
      {/* Header matching Reference Screenshots */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold tracking-wider uppercase mb-4 border border-emerald-100">
          CLINICAL EXCELLENCE
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0e2448] tracking-tight mb-4">
          Specialized Medical Departments
        </h2>
        <p className="text-sm sm:text-base text-slate-500 font-medium max-w-xl mx-auto">
          Advanced medical units powered by precision diagnostic tools and dedicated specialist care teams.
        </p>
      </div>

      {/* 6 Specialized Department Cards Grid (2 rows of 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="rounded-[2.2rem] bg-white p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Icon Box & Specialists Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#0e2448] flex items-center justify-center shadow-md shadow-blue-950/20">
                  {dept.icon}
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-600">
                  {dept.specialists}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-black text-[#0e2448] mb-2.5">
                {dept.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                {dept.desc}
              </p>

              {/* Diagnostic Capabilities */}
              <div className="mb-8">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2.5">
                  KEY DIAGNOSTIC CAPABILITIES:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {dept.capabilities.map((cap, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/60 text-[11px] font-medium text-slate-600"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Explore Department Link */}
            <div className="pt-4 border-t border-slate-100">
              <a
                href={dept.link}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0e2448] hover:text-blue-600 transition-colors group"
              >
                <span>Explore Department</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
