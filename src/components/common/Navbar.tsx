'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Activity, ChevronDown, Phone, Heart, Shield, Stethoscope, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);

  return (
    <header className="relative z-50 w-full pt-4 pb-2 px-4 sm:px-8">
      {/* Designer Tag Pill from reference mockup */}
      <div className="hidden lg:flex items-center justify-end max-w-7xl mx-auto mb-2 pr-6">
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200/80 shadow-sm text-xs font-medium text-slate-700">
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white text-[10px] font-bold">
            HJ
          </div>
          <span className="font-semibold text-slate-800">@hamida_jannat</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-500">Landing Page UI Designer</span>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5 rounded-full medical-glass border border-white/70 shadow-sm">
        {/* Brand Logo matching reference */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-[#0e2448] flex items-center justify-center text-emerald-400 shadow-md shadow-blue-950/20 group-hover:scale-105 transition-transform">
            <span className="text-xl font-bold leading-none mb-0.5 text-emerald-400">+</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-[#0e2448]">Nuvica</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="text-[#0e2448] font-bold border-b-2 border-emerald-500 pb-0.5 transition-colors">
            Home
          </Link>
          <a href="#about-hospital" className="hover:text-blue-600 transition-colors">
            About
          </a>
          
          {/* Departments Dropdown */}
          <div className="relative" onMouseLeave={() => setDeptOpen(false)}>
            <button 
              onClick={() => setDeptOpen(!deptOpen)}
              onMouseEnter={() => setDeptOpen(true)}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              Departments
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {deptOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl medical-glass p-2.5 shadow-xl border border-white/80 animate-in fade-in slide-in-from-top-2">
                <a 
                  href="#departments-section"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors text-slate-700 font-semibold"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Cardiology & Vascular</div>
                    <div className="text-[10px] text-emerald-600 font-medium">Active AI Module</div>
                  </div>
                </a>
                <a 
                  href="#departments-section"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-500"
                >
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-medium">Neurology & Brain Sciences</div>
                </a>
                <a 
                  href="#departments-section"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-500"
                >
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-medium">Pulmonology & Respiratory</div>
                </a>
              </div>
            )}
          </div>

          <a href="#about-hospital" className="hover:text-blue-600 transition-colors">
            Doctors
          </a>
          <a href="#about-hospital" className="hover:text-blue-600 transition-colors">
            Career
          </a>
        </div>

        {/* Contact Us and Get Started Button matching reference screenshot */}
        <div className="hidden sm:flex items-center gap-5">
          <a
            href="#about-hospital"
            className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            Contact Us
          </a>

          <Link
            href="/get-started"
            className="group flex items-center gap-3 pl-5 pr-2 py-1.5 rounded-full bg-[#0e2448] text-white text-sm font-bold shadow-md hover:bg-[#163363] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Get Started</span>
            <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white group-hover:bg-emerald-400 transition-colors">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-7xl mx-auto rounded-3xl medical-glass p-5 border border-white/80 shadow-xl flex flex-col gap-3">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2.5 rounded-xl font-semibold text-slate-800 hover:bg-blue-50"
          >
            Home
          </Link>
          <a 
            href="#departments-section" 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2.5 rounded-xl font-semibold text-blue-600 bg-blue-50/80 flex items-center justify-between"
          >
            <span>Specialized Departments</span>
            <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full">New</span>
          </a>
          <a 
            href="#about-hospital" 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2.5 rounded-xl font-medium text-slate-700 hover:bg-blue-50"
          >
            About Nuvica Hospital
          </a>
          <a 
            href="#supported-models" 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2.5 rounded-xl font-medium text-slate-700 hover:bg-blue-50"
          >
            Supported AI Models
          </a>
          <Link
            href="/get-started"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 py-3 rounded-full bg-[#0e2448] text-white font-semibold text-sm shadow-md"
          >
            <span>Get Started</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
