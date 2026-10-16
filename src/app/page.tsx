'use client';

import React, { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import CardiologyHero from '@/components/cardiology/CardiologyHero';
import OrganCards from '@/components/home/OrganCards';
import SpecializedDepartments from '@/components/home/SpecializedDepartments';
import HospitalAbout from '@/components/home/HospitalAbout';
import AnalysisDashboard from '@/components/cardiology/AnalysisDashboard';
import MedicalUpload from '@/components/cardiology/MedicalUpload';
import ExplainabilityViewer from '@/components/cardiology/ExplainabilityViewer';
import AnalysisResults from '@/components/cardiology/AnalysisResults';
import AnalysisHistory from '@/components/cardiology/AnalysisHistory';
import ModelStatus from '@/components/cardiology/ModelStatus';
import CardiologyExtraSections from '@/components/cardiology/CardiologyExtraSections';
import Footer from '@/components/common/Footer';
import { ModalityType, AnalysisRecord } from '@/lib/cardiology-api';

export default function Home() {
  const [selectedModality, setSelectedModality] = useState<ModalityType>('ecg');
  const [currentResult, setCurrentResult] = useState<AnalysisRecord | null>(null);

  const handleAnalysisSuccess = (record: AnalysisRecord) => {
    setCurrentResult(record);
    setTimeout(() => {
      document.getElementById('analysis-results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectHistoryRecord = (record: AnalysisRecord) => {
    setCurrentResult(record);
    setSelectedModality(record.modality as ModalityType);
    setTimeout(() => {
      document.getElementById('analysis-results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf3fb] via-[#f4f9fd] to-[#f8fbfe] text-[#0e2448] flex flex-col justify-between">
      {/* Top Header Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <CardiologyHero />

        {/* 3 Organ Quick Scan Cards (Image 2: Brain, Liver, Kidney) */}
        <OrganCards />

        {/* Specialized Medical Departments (Images 1 & 4) */}
        <SpecializedDepartments />

        {/* Hospital About & Statistics Section (Image 3) */}
        <HospitalAbout />

        {/* Dedicated Cardiology AI Studio Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          
          {/* Modalities Selection Cards */}
          <AnalysisDashboard
            selectedModality={selectedModality}
            onSelectModality={(mod) => setSelectedModality(mod)}
          />

          {/* Medical File Upload & Inference Trigger */}
          <MedicalUpload
            currentModality={selectedModality}
            onModalityChange={(mod) => setSelectedModality(mod)}
            onAnalysisSuccess={handleAnalysisSuccess}
          />

          {/* Results & Explainability Viewers (Revealed after analysis) */}
          {currentResult && (
            <div id="analysis-results-section" className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
              {/* Visual Explainability (Grad-CAM or ECG Waveform) */}
              <ExplainabilityViewer record={currentResult} />

              {/* Clinical Results, Parameters & PDF Report */}
              <AnalysisResults record={currentResult} />
            </div>
          )}

          {/* Clinical Audit History & Past Records */}
          <AnalysisHistory onSelectRecord={handleSelectHistoryRecord} />

          {/* Model Status & Technical Documentation Table */}
          <ModelStatus />

          {/* Cardiovascular Services, Workflow, & Educational Articles (Image 5) */}
          <CardiologyExtraSections />

        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
