'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  ArrowRight, 
  ArrowLeft, 
  HeartPulse, 
  Brain, 
  Wind, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Activity, 
  FileText, 
  UploadCloud,
  ChevronRight
} from 'lucide-react';
import Footer from '@/components/common/Footer';

export default function GetStartedPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<'cardiology' | 'neurology' | 'pulmonology' | 'preventive'>('cardiology');
  const [selectedGoal, setSelectedGoal] = useState<'upload' | 'risk_score' | 'explore'>('upload');
  const [step, setStep] = useState<number>(1);

  const departments = [
    {
      id: 'cardiology' as const,
      name: 'Cardiology & Vascular Health',
      subtitle: 'Active Screening Engine',
      desc: '12-lead ECG rhythm classification, Chest X-Ray CTR measurement, and Grad-CAM explainability.',
      icon: <HeartPulse className="w-6 h-6 text-emerald-500" />,
      badge: 'Active AI Module'
    },
    {
      id: 'neurology' as const,
      name: 'Neurology & Brain Sciences',
      subtitle: 'Synaptic AI Profiling',
      desc: 'State-of-the-art neuro-diagnostics, cognitive evaluation, and advanced synaptic mapping.',
      icon: <Brain className="w-6 h-6 text-cyan-500" />,
      badge: '18 Specialists'
    },
    {
      id: 'pulmonology' as const,
      name: 'Pulmonology & Respiratory',
      subtitle: 'Airway & Lung Analytics',
      desc: 'Precision airway evaluation, high-resolution lung diagnostics, and respiratory recovery.',
      icon: <Wind className="w-6 h-6 text-blue-500" />,
      badge: '14 Specialists'
    },
    {
      id: 'preventive' as const,
      name: 'Preventive & Executive Health',
      subtitle: 'Longevity & Risk Scoring',
      desc: 'Proactive health audits, genetic risk profiling, and evidence-based longevity consultations.',
      icon: <ShieldCheck className="w-6 h-6 text-indigo-500" />,
      badge: '22 Specialists'
    }
  ];

  const goals = [
    {
      id: 'upload' as const,
      title: 'Analyze Medical Image or ECG',
      desc: 'Upload 12-lead ECG CSV/signal or PA/AP chest radiograph for automated AI feature extraction.',
      icon: <UploadCloud className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'risk_score' as const,
      title: 'Calculate 10-Year ASCVD Risk Score',
      desc: 'Enter age, blood pressure, and cholesterol to estimate 10-year atherosclerotic cardiovascular event risk.',
      icon: <Activity className="w-5 h-5 text-emerald-600" />
    },
    {
      id: 'explore' as const,
      title: 'Explore Hospital Departments & Specialists',
      desc: 'Tour Nuvica clinical units, accredited hospital facilities, and research-grade AI governance.',
      icon: <FileText className="w-5 h-5 text-amber-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf3fb] via-[#f4f9fd] to-[#f8fbfe] text-[#0e2448] flex flex-col justify-between">
      
      {/* Top Navbar with Go to Home Button */}
      <header className="relative z-50 w-full pt-4 pb-2 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-6 py-3.5 rounded-full medical-glass border border-white/70 shadow-sm">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-[#0e2448] flex items-center justify-center text-emerald-400 shadow-md shadow-blue-950/20 group-hover:scale-105 transition-transform">
              <span className="text-xl font-bold leading-none mb-0.5 text-emerald-400">+</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-[#0e2448]">Nuvica</span>
            </div>
          </Link>

          {/* Go to Home Top Button */}
          <Link
            href="/"
            className="group flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <Home className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
            <span>Go to Home</span>
          </Link>

        </div>
      </header>

      {/* Main Get Started Onboarding Flow */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full flex-grow">
        
        {/* Header Titles */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wider uppercase mb-3 border border-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>GET STARTED WITH NUVICA</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0e2448] tracking-tight mb-3">
            Welcome to Nuvica Medical AI
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto font-medium">
            Configure your clinical health preferences in a few clicks, then proceed directly to the home platform.
          </p>
        </div>

        {/* Progress Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 1 ? 'bg-[#0e2448] text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              1
            </div>
            <span className="text-xs font-bold text-slate-700">Clinical Focus</span>
          </div>

          <div className="w-12 h-0.5 bg-slate-200"></div>

          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 2 ? 'bg-[#0e2448] text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              2
            </div>
            <span className="text-xs font-bold text-slate-700">Screening Goal</span>
          </div>
        </div>

        {/* STEP 1: Select Department */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-[#0e2448]">Step 1: Choose Your Primary Medical Interest</h2>
              <p className="text-xs text-slate-500 mt-1">Select the clinical department you want highlighted on your dashboard.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {departments.map((dept) => {
                const isSelected = selectedDepartment === dept.id;
                return (
                  <div
                    key={dept.id}
                    onClick={() => setSelectedDepartment(dept.id)}
                    className={`cursor-pointer p-5 rounded-2xl transition-all duration-200 border flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-2 border-blue-600 shadow-lg shadow-blue-500/10 scale-[1.02]'
                        : 'medical-glass hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                          {dept.icon}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {dept.badge}
                        </span>
                      </div>

                      <h3 className="text-base font-extrabold text-[#0e2448] mb-1">
                        {dept.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        {dept.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-600">{dept.subtitle}</span>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step 1 Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200/80">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Skip to Home</span>
              </Link>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-full bg-[#0e2448] text-white text-xs font-bold shadow-md hover:bg-[#163363] flex items-center gap-2"
              >
                <span>Continue to Step 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Select Intention & GO TO HOME */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-[#0e2448]">Step 2: How would you like to start?</h2>
              <p className="text-xs text-slate-500 mt-1">Select your immediate diagnostic task.</p>
            </div>

            <div className="space-y-3">
              {goals.map((g) => {
                const isSelected = selectedGoal === g.id;
                return (
                  <div
                    key={g.id}
                    onClick={() => setSelectedGoal(g.id)}
                    className={`cursor-pointer p-4 sm:p-5 rounded-2xl transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-white border-2 border-emerald-500 shadow-md shadow-emerald-500/10'
                        : 'medical-glass hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 border border-slate-100">
                        {g.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-[#0e2448]">{g.title}</h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{g.desc}</p>
                      </div>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Configuration Summary Card */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-bold text-emerald-900 mb-0.5">Configuration Complete!</div>
                <div className="text-emerald-700">
                  Selected Focus: <strong>{departments.find(d => d.id === selectedDepartment)?.name}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-800 font-bold hover:bg-emerald-50"
                >
                  Edit Step 1
                </button>
              </div>
            </div>

            {/* Step 2 Actions & GO TO HOME BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/80">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 order-2 sm:order-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
                {/* Secondary Button to direct studio */}
                <Link
                  href="/#cardiology-studio"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm flex items-center justify-center gap-2"
                >
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>Open Cardiology Studio</span>
                </Link>

                {/* Primary GO TO HOME Button */}
                <Link
                  href="/"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0e2448] text-white text-xs font-bold shadow-lg shadow-blue-950/20 hover:bg-[#163363] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4 text-emerald-400" />
                  <span>Go to Home</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </Link>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Global Footer */}
      <Footer />

    </div>
  );
}
