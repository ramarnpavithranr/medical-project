'use client';

import React from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';

export default function HospitalAbout() {
  const stats = [
    { value: '$250M', label: 'In Healthcare Funding' },
    { value: '20M+', label: 'Patients Served Globally' },
    { value: '95%', label: 'Patient Satisfaction Rate' },
    { value: '200+', label: 'Medical Professionals' }
  ];

  return (
    <section id="about-hospital" className="relative py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      
      {/* Main Grid: Hospital Photo vs. Content matching Image 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        
        {/* Left: Hospital Building Card with Overlay Badge */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/90 aspect-[4/3] bg-slate-100">
            <img
              src="/images/hospital-building.jpg"
              alt="Nuvica Medical Hospital"
              className="w-full h-full object-cover"
            />

            {/* Floating Overlay Card: + NUVICA FROM 2005 / 2010 */}
            <div className="absolute top-6 right-6 medical-glass p-5 rounded-2xl border border-white/90 shadow-xl max-w-[210px]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[#0e2448] flex items-center justify-center text-emerald-400 text-xs font-bold">
                  +
                </div>
                <span className="text-xs font-black tracking-wider text-[#0e2448]">NUVICA</span>
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">FROM</div>
              <div className="text-sm font-extrabold text-[#0e2448] mb-2">2005 / 2010</div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Committed to your health and well-being.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Hospital Description & Action Buttons matching Image 3 */}
        <div className="lg:col-span-6 flex flex-col items-start">
          
          {/* Badge: ABOUT US */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-bold tracking-wider uppercase mb-5 shadow-sm shadow-emerald-500/20">
            ABOUT US
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0e2448] tracking-tight leading-[1.12] mb-6">
            YOUR NUVICA MEDICAL HOSPITAL
          </h2>

          {/* Paragraph copy from Image 3 */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
            We combine clinical expertise, innovative technology, and a patient-first approach to ensure accurate diagnosis and effective treatment. From proactive neuro-diagnostics to holistic wellness, our specialists empower you with clarity and continuous care.
          </p>

          {/* Buttons Row */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#departments-section"
              className="group flex items-center gap-3 pl-6 pr-2.5 py-3 rounded-full bg-[#0e2448] text-white font-semibold text-sm shadow-lg shadow-blue-950/15 hover:bg-[#163363] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Learn More</span>
              <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white group-hover:bg-emerald-400 transition-colors">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>

            <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-slate-200/80 shadow-sm text-slate-700">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">For Any Questions</div>
                <div className="text-xs font-extrabold text-[#0e2448]">+1 800 168 760 50</div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-200/80">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="text-3xl sm:text-4xl font-black text-[#0e2448] tracking-tight">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
