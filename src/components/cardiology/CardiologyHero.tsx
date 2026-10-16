'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  Activity, 
  Award, 
  ShieldCheck, 
  BriefcaseMedical, 
  Heart, 
  Sparkles, 
  Stethoscope, 
  Info,
  Waves
} from 'lucide-react';

export default function CardiologyHero() {
  return (
    <section className="relative overflow-hidden pt-6 pb-20 md:pb-28">
      {/* Background Giant Soft Watermark */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none select-none nuvica-watermark text-[110px] sm:text-[160px] md:text-[220px] font-black z-0 leading-none">
        NUVICA
      </div>

      {/* Decorative ambient radial gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] bg-cyan-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* ================= LEFT COLUMN ================= */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 shadow-sm text-xs font-bold text-blue-700 mb-6">
              <Activity className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>CARDIOLOGY AI</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-[#0e2448] leading-[1.08] mb-6">
              SMART <br />
              <span className="relative inline-block text-blue-600">
                CARDIOVASCULAR
                <span className="absolute -bottom-1 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-transparent rounded-full opacity-60"></span>
              </span> <br />
              SCREENING
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
              Explore AI-assisted cardiovascular screening with interpretable results, supported medical imaging, and clear guidance for further clinical evaluation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <a
                href="#cardiology-studio"
                className="group flex items-center gap-3 pl-6 pr-2.5 py-3 rounded-full bg-[#0e2448] text-white font-semibold text-sm shadow-xl shadow-blue-950/15 hover:bg-[#163363] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Start Analysis</span>
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white group-hover:bg-emerald-400 transition-colors">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>

              <a
                href="#modalities-overview"
                className="group flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/90 border border-slate-200/90 text-slate-700 font-semibold text-sm shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <span>Explore Cardiology</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Educational Disclaimer */}
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100/70 px-3.5 py-2 rounded-xl border border-slate-200/60">
              <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>Investigational decision-support. Not a substitute for professional clinical diagnosis.</span>
            </div>
          </motion.div>

          {/* ================= CENTER COLUMN (ARCH DOCTOR PORTRAIT) ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-3 flex justify-center relative my-6 lg:my-0"
          >
            {/* Soft circular blue background glow */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-blue-200/50 to-cyan-100/70 -z-10 blur-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            {/* Arched Framed 3D Glowing Heart Medical Visual */}
            <div className="relative w-64 sm:w-72 h-88 sm:h-96 rounded-t-full rounded-b-3xl overflow-hidden border-4 border-white/90 shadow-2xl shadow-blue-500/15 bg-gradient-to-b from-rose-50/60 via-white to-blue-50/80 flex items-center justify-center group">
              <img
                src="/images/heart-3d.jpg"
                alt="3D Glowing Cardiovascular Heart"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle ambient glass gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e2448]/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Card: 490 AWARDS */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -top-3 -right-4 sm:-right-6 floating-pill px-3.5 py-2.5 rounded-2xl flex items-center gap-3 animate-float"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 shadow-sm">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-base font-extrabold text-[#0e2448] leading-tight">490</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Awards</div>
              </div>
            </motion.div>

            {/* Floating Card: 22 Years Medical Excellence */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute -bottom-4 -left-4 sm:-left-6 floating-pill px-4 py-2.5 rounded-2xl flex items-center gap-3 animate-float-delayed"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-600/30 flex items-center justify-center text-blue-600 shadow-sm">
                <BriefcaseMedical className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-[#0e2448] leading-tight">22 Years</div>
                <div className="text-[10px] font-medium text-slate-500">Medical Excellence</div>
              </div>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT COLUMN (3D ANATOMICAL LUNGS & VASCULAR CARDS) ================= */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-4 relative flex flex-col items-center"
          >
            {/* Glowing 3D Lungs Illustration Canvas (Swapped to right side matching reference) */}
            <div className="relative w-full max-w-sm h-80 sm:h-96 rounded-3xl medical-glass-darker p-5 flex flex-col items-center justify-center overflow-hidden border border-blue-200/70 shadow-2xl group">
              
              {/* Internal ambient glowing circles */}
              <div className="absolute w-48 h-48 rounded-full bg-gradient-to-tr from-cyan-400/20 via-blue-500/20 to-emerald-400/20 blur-2xl animate-soft-pulse" />

              {/* Luminous Anatomical Lungs Image */}
              <div className="relative z-10 w-full h-full flex items-center justify-center rounded-2xl overflow-hidden">
                <img
                  src="/images/lungs-3d.png"
                  alt="3D Glowing Lungs with Bronchial Tree"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Badge on Lungs: 6,700 Healed Lungs */}
              <div className="absolute bottom-4 right-4 floating-pill px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800">6,700 Healed Lungs</span>
              </div>
            </div>

            {/* Navigation Floating Glass Cards */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm mt-4">
              <a 
                href="#cardiology-studio"
                className="medical-glass p-3 rounded-2xl flex items-center justify-between hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <Activity className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">ECG Analysis</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a 
                href="#cardiology-studio"
                className="medical-glass p-3 rounded-2xl flex items-center justify-between hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Waves className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">Vascular Scan</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
