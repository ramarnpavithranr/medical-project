'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Heart, Phone, Mail, MapPin, ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#0e2448] text-white pt-16 pb-12 mt-20 border-t border-blue-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xl">
                +
              </div>
              <span className="text-2xl font-black tracking-tight text-white">Nuvica</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-6 max-w-sm">
              Nuvica Medical Hospital is a premier global healthcare institution combining compassionate clinical care with explainable AI diagnostic intelligence.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-emerald-400">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Emergency & General Inquiries</div>
                <div className="text-sm font-extrabold text-white">+8801616876080</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home Page</Link></li>
              <li><a href="#about-hospital" className="hover:text-white transition-colors">About Hospital</a></li>
              <li><Link href="/cardiology" className="hover:text-white transition-colors">Cardiology AI Studio</Link></li>
              <li><a href="#supported-models" className="hover:text-white transition-colors">AI Models Governance</a></li>
              <li><a href="#analysis-history" className="hover:text-white transition-colors">Audit & Clinical History</a></li>
            </ul>
          </div>

          {/* Clinical Specialties */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
              Specialties
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/cardiology" className="text-white font-semibold">Cardiology & Vascular (Active)</Link></li>
              <li><span className="text-slate-400">Neurology & Brain Mapping</span></li>
              <li><span className="text-slate-400">Hepatology & Liver Ultrasound</span></li>
              <li><span className="text-slate-400">Nephrology & Renal Parenchyma</span></li>
              <li><span className="text-slate-400">Preventive Internal Medicine</span></li>
            </ul>
          </div>

          {/* Accreditations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
              Compliance
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>ISO 13485:2016 Certified</li>
              <li>HIPAA Security Rule Compliant</li>
              <li>GDPR Privacy Standard</li>
              <li>HL7 & FHIR Data Interoperability</li>
              <li>256-Bit In-Transit Encryption</li>
            </ul>
          </div>

        </div>

        {/* Legal & Regulatory Disclaimer Box */}
        <div className="pt-8 border-t border-blue-900/60 pb-8 text-xs text-slate-400 leading-relaxed">
          <div className="flex items-start gap-2.5 mb-2 text-amber-300">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="font-bold uppercase tracking-wide">Institutional Medical Disclaimer:</span>
          </div>
          <p>
            The Nuvica Cardiology & Vascular Health AI Platform provides automated screening, feature attribution, and quantitative parameters solely for educational, investigational, and clinical decision-support purposes. Its outputs do not constitute a confirmed medical diagnosis, clinical prognosis, or prescription of pharmaceutical therapy. Always consult a licensed board-certified cardiologist or healthcare practitioner for medical diagnosis and emergency triage.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-blue-900/40 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div>
            &copy; 2026 Nuvica Medical Healthcare. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>&bull;</span>
            <span className="hover:text-white cursor-pointer">Ethics & Governance</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
