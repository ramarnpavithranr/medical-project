'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  FileDown, 
  ExternalLink, 
  Clock, 
  Calendar, 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  RefreshCw
} from 'lucide-react';
import { AnalysisRecord, fetchAnalysisHistory, getReportDownloadUrl } from '@/lib/cardiology-api';

interface AnalysisHistoryProps {
  onSelectRecord?: (record: AnalysisRecord) => void;
}

export default function AnalysisHistory({ onSelectRecord }: AnalysisHistoryProps) {
  const [records, setRecords] = useState<AnalysisRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalityFilter, setModalityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await fetchAnalysisHistory(modalityFilter, statusFilter);
      setRecords(data);
    } catch (err) {
      console.error('Failed to load analysis history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [modalityFilter, statusFilter]);

  // Client-side text filter on ID or Finding
  const filteredRecords = records.filter((r) => {
    const matchesSearch = 
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.predictions.primary_finding.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.filename.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div id="analysis-history" className="medical-glass rounded-3xl p-6 sm:p-8 border border-white/90 shadow-xl mb-14">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/80 gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wider uppercase mb-1">
            Clinical Records & Audit Log
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#0e2448]">
            Cardiology Analysis History
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real persisted records stored in local clinical database.
          </p>
        </div>

        <button
          type="button"
          onClick={loadHistory}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Records</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-6">
        {/* Search Input */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Analysis ID or Finding..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Modality Filter */}
        <div className="sm:col-span-3">
          <select
            value={modalityFilter}
            onChange={(e) => setModalityFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Modalities</option>
            <option value="ecg">12-Lead ECG</option>
            <option value="chest_xray">Chest X-Ray</option>
            <option value="echocardiography">Echocardiography</option>
            <option value="ct_angiography">CT Angiography</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="model_unconfigured">Model Unconfigured</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Table of Records */}
      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center text-slate-400 text-xs">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-600 mb-2" />
          <span>Querying medical records repository...</span>
        </div>
      ) : filteredRecords.length === 0 ? (
        /* Empty State */
        <div className="py-14 text-center rounded-2xl border-2 border-dashed border-slate-200 p-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 mb-1">No Analysis Records Found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery || modalityFilter !== 'all' || statusFilter !== 'all'
              ? 'No records match your selected filter criteria. Try resetting the filters.'
              : 'Upload and screen your first ECG trace or Chest X-Ray to establish your clinical history.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-sm">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/90 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Analysis ID</th>
                <th className="py-3 px-4">Modality</th>
                <th className="py-3 px-4">Primary Finding</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white font-medium">
              {filteredRecords.map((item) => {
                const isUnconfigured = item.status === 'model_unconfigured';
                return (
                  <tr key={item.id} className="hover:bg-blue-50/40 transition-colors">
                    
                    {/* ID */}
                    <td className="py-3 px-4 font-mono font-bold text-[#0e2448]">
                      {item.id}
                    </td>

                    {/* Modality */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                        <Activity className="w-3.5 h-3.5 text-blue-600" />
                        <span>{item.modality_name}</span>
                      </span>
                    </td>

                    {/* Finding */}
                    <td className="py-3 px-4 font-semibold text-slate-900 max-w-xs truncate">
                      {item.predictions.primary_finding}
                    </td>

                    {/* Timestamp */}
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                      {item.created_at}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isUnconfigured
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {onSelectRecord && (
                          <button
                            type="button"
                            onClick={() => onSelectRecord(item)}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] transition-colors"
                          >
                            View
                          </button>
                        )}

                        {!isUnconfigured && (
                          <a
                            href={getReportDownloadUrl(item.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition-colors"
                            title="Download PDF Report"
                          >
                            <FileDown className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
