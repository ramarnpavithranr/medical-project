'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/common/Navbar';
import AnalysisResults from '@/components/cardiology/AnalysisResults';
import ExplainabilityViewer from '@/components/cardiology/ExplainabilityViewer';
import Footer from '@/components/common/Footer';
import { AnalysisRecord, fetchAnalysisRecord } from '@/lib/cardiology-api';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

function ResultDetailContent() {
  const params = useParams();
  const id = params?.id as string;

  const [record, setRecord] = useState<AnalysisRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        setLoading(true);
        const data = await fetchAnalysisRecord(id);
        setRecord(data);
      } catch (err: any) {
        setError(err.message || 'Record not found');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-500 text-sm">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
        <span>Retrieving clinical record {id}...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="medical-glass rounded-3xl p-10 text-center max-w-lg mx-auto">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-800 mb-2">Record Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">{error}</p>
        <Link
          href="/cardiology"
          className="px-6 py-2.5 rounded-full bg-[#0e2448] text-white text-xs font-bold"
        >
          Return to Studio
        </Link>
      </div>
    );
  }

  return record ? (
    <div className="space-y-8 animate-in fade-in">
      <ExplainabilityViewer record={record} />
      <AnalysisResults record={record} />
    </div>
  ) : null;
}

export default function CardiologyResultDetailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf3fb] via-[#f4f9fd] to-[#f8fbfe] text-[#0e2448]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <div className="mb-6">
          <Link
            href="/cardiology"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cardiology Studio</span>
          </Link>
        </div>

        <Suspense fallback={
          <div className="py-20 flex flex-col items-center justify-center text-slate-500 text-sm">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
            <span>Loading record...</span>
          </div>
        }>
          <ResultDetailContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
