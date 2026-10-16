'use client';

import React, { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import CardiologyHero from '@/components/cardiology/CardiologyHero';
import AnalysisDashboard from '@/components/cardiology/AnalysisDashboard';
import MedicalUpload from '@/components/cardiology/MedicalUpload';
import ExplainabilityViewer from '@/components/cardiology/ExplainabilityViewer';
import AnalysisResults from '@/components/cardiology/AnalysisResults';
import AnalysisHistory from '@/components/cardiology/AnalysisHistory';
import ModelStatus from '@/components/cardiology/ModelStatus';
import Footer from '@/components/common/Footer';
import { ModalityType, AnalysisRecord } from '@/lib/cardiology-api';

export default function CardiologyPage() {
  const [selectedModality, setSelectedModality] = useState<ModalityType>('ecg');
  const [currentResult, setCurrentResult] = useState<AnalysisRecord | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf3fb] via-[#f4f9fd] to-[#f8fbfe] text-[#0e2448]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        <CardiologyHero />

        <div className="mt-8">
          <AnalysisDashboard
            selectedModality={selectedModality}
            onSelectModality={(mod) => setSelectedModality(mod)}
          />

          <MedicalUpload
            currentModality={selectedModality}
            onModalityChange={(mod) => setSelectedModality(mod)}
            onAnalysisSuccess={(rec) => setCurrentResult(rec)}
          />

          {currentResult && (
            <div id="results-view" className="space-y-8 animate-in fade-in slide-in-from-bottom-6">
              <ExplainabilityViewer record={currentResult} />
              <AnalysisResults record={currentResult} />
            </div>
          )}

          <AnalysisHistory onSelectRecord={(rec) => setCurrentResult(rec)} />
          <ModelStatus />
        </div>
      </main>

      <Footer />
    </div>
  );
}
