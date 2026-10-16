'use client';

import React, { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import AnalysisHistory from '@/components/cardiology/AnalysisHistory';
import AnalysisResults from '@/components/cardiology/AnalysisResults';
import ExplainabilityViewer from '@/components/cardiology/ExplainabilityViewer';
import Footer from '@/components/common/Footer';
import { AnalysisRecord } from '@/lib/cardiology-api';

export default function CardiologyHistoryPage() {
  const [selectedRecord, setSelectedRecord] = useState<AnalysisRecord | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf3fb] via-[#f4f9fd] to-[#f8fbfe] text-[#0e2448]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#0e2448]">
            Cardiology Records & Audit Trail
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Access previous cardiovascular screening records, diagnostic parameters, and downloadable clinical PDF reports.
          </p>
        </div>

        <AnalysisHistory onSelectRecord={(rec) => setSelectedRecord(rec)} />

        {selectedRecord && (
          <div className="mt-10 space-y-8 animate-in fade-in slide-in-from-bottom-6">
            <ExplainabilityViewer record={selectedRecord} />
            <AnalysisResults record={selectedRecord} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
