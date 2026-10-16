'use client';

import React from 'react';
import { 
  UploadCloud, 
  CheckCircle, 
  Cpu, 
  Eye, 
  UserCheck, 
  Heart, 
  Activity, 
  Waves, 
  ShieldCheck, 
  ArrowUpRight,
  Clock,
  BookOpen
} from 'lucide-react';

export default function CardiologyExtraSections() {
  const workflowSteps = [
    {
      step: '01',
      title: 'Upload Supported Data',
      desc: 'Submit standard 12-lead ECG signals, CSV tracings, or PA/AP chest radiographs.',
      icon: <UploadCloud className="w-5 h-5 text-blue-600" />
    },
    {
      step: '02',
      title: 'Validate Input',
      desc: 'Automatic dimensional verification, noise-floor checks, and sampling calibration.',
      icon: <CheckCircle className="w-5 h-5 text-emerald-600" />
    },
    {
      step: '03',
      title: 'Run Configured Model',
      desc: 'Real algorithmic Pan-Tompkins QRS detection or convolutional silhouette segmentation.',
      icon: <Cpu className="w-5 h-5 text-indigo-600" />
    },
    {
      step: '04',
      title: 'Review Explainable Results',
      desc: 'Examine quantitative parameters alongside Grad-CAM spatial activation overlays.',
      icon: <Eye className="w-5 h-5 text-amber-600" />
    },
    {
      step: '05',
      title: 'Consult Professional',
      desc: 'Export structured PDF reports for multidisciplinary cardiologist evaluation.',
      icon: <UserCheck className="w-5 h-5 text-rose-600" />
    }
  ];

  const services = [
    {
      title: 'ECG Screening & Rhythm Diagnostics',
      desc: 'Quantitative PR, QRS, and QTc interval computation with arrhythmia categorization.',
      status: 'Active Pipeline'
    },
    {
      title: 'Cardiopulmonary Radiography',
      desc: 'Automated cardiothoracic ratio (CTR) measurement and cardiomegaly risk stratification.',
      status: 'Active Pipeline'
    },
    {
      title: 'Echocardiography Cine Loop',
      desc: 'Left ventricular ejection fraction (LVEF) tracking and myocardial strain analysis.',
      status: 'Weights Required'
    },
    {
      title: 'CT Angiography & Vascular Lumen',
      desc: '3D Agatston coronary artery calcium scoring and vascular stenosis quantification.',
      status: 'Model Not Configured'
    },
    {
      title: 'Preventive Cardiovascular Education',
      desc: 'Evidence-based lifestyle modification guidelines, dietary risk reduction, and ASCVD risk monitoring.',
      status: 'Available'
    }
  ];

  // Articles exactly from reference Image 5
  const articles = [
    {
      category: 'Neurology & Technology',
      image: '/images/brain-3d.jpg',
      readTime: '5 min read',
      author: 'Dr. Sarah Jenkins, MD',
      title: 'The Future of AI in Neurological & Brain Diagnostics',
      summary: 'Discover how high-resolution synaptic imaging and deep neural networks are transforming early cognitive condition detection.',
      buttonBg: 'bg-emerald-500 text-white'
    },
    {
      category: 'Metabolism & Wellness',
      image: '/images/liver-3d.jpg',
      readTime: '4 min read',
      author: 'Dr. Mei-Ling Chen, MD',
      title: 'Understanding Your Hepatic Profile: Keys to Liver Vitality',
      summary: 'A deep dive into liver enzyme biomarkers, non-alcoholic fatty liver indicators, and evidence-backed nutritional strategies.',
      buttonBg: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
    },
    {
      category: 'Nephrology & Health',
      image: '/images/kidney-3d.jpg',
      readTime: '6 min read',
      author: 'Dr. Alexander Vance, MD',
      title: 'Renal Hemodynamics: Proactive Steps for Kidney Longevity',
      summary: 'Learn how glomerular filtration rate and vascular Doppler tests can protect your kidneys from silent damage.',
      buttonBg: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
    }
  ];

  return (
    <div className="space-y-16 mb-20">
      
      {/* SECTION B: HOW IT WORKS WORKFLOW */}
      <div className="medical-glass rounded-3xl p-6 sm:p-10 border border-white/90 shadow-xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wider uppercase mb-2">
            Automated Clinical Pipeline
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#0e2448]">
            How the Screening Engine Operates
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            From raw diagnostic inputs to interpretative explainable reports, built upon strict medical safety standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {workflowSteps.map((item, idx) => (
            <div key={idx} className="relative p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-blue-600 font-mono">{item.step}</span>
                  <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center shadow-xs">
                    {item.icon}
                  </div>
                </div>
                <h4 className="text-sm font-extrabold text-[#0e2448] mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION A: CARDIOVASCULAR SERVICES */}
      <div className="medical-glass rounded-3xl p-6 sm:p-10 border border-white/90 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wider uppercase mb-2">
              Clinical Specializations
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0e2448]">
              Cardiovascular & Vascular Services
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Nuvica Heart Center</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    svc.status === 'Active Pipeline'
                      ? 'bg-emerald-100 text-emerald-800'
                      : svc.status === 'Weights Required'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {svc.status}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </div>
                <h4 className="text-sm font-extrabold text-[#0e2448] mb-1.5">
                  {svc.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION D: MEDICAL ARTICLES (MATCHING REFERENCE IMAGE 5 EXACTLY) */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wider uppercase mb-2">
              Clinical Insights
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0e2448]">
              Latest Medical Insights & Diagnostic Articles
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art, idx) => (
            <div
              key={idx}
              className="group rounded-[2rem] bg-white overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Image with Floating Category Pill */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-900/10">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Badge Pill on Top Left */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-sm border border-white/60">
                      {art.category}
                    </span>
                  </div>
                </div>

                {/* Article Body */}
                <div className="p-6">
                  {/* Read Time & Author */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readTime}</span>
                    <span>&bull;</span>
                    <span className="text-slate-600">{art.author}</span>
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-black text-[#0e2448] mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                    {art.title}
                  </h4>

                  {/* Summary */}
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {art.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer with Read Full Article & Arrow Button */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0e2448] group-hover:text-blue-600 transition-colors">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Read Full Article</span>
                </span>

                <div className={`w-8 h-8 rounded-full ${art.buttonBg} flex items-center justify-center shadow-xs transition-transform group-hover:scale-110`}>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
