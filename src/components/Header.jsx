import React, { useState } from 'react';
import { Eye, Printer, BookOpen, Compass, FileText, CheckCircle2, Type, Database, Save, History, CloudCheck } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  textSize, 
  setTextSize,
  supabaseConnected,
  onSaveToCloud,
  savedCount,
  onShowHistory
}) {
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  const handleSaveClick = async () => {
    await onSaveToCloud();
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      {/* Top Status Strip */}
      <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-blue-800 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              BLIND SPOT AI — DECISION ADVISOR
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold">
              <CloudCheck className="w-3.5 h-3.5 text-emerald-600" />
              SUPABASE CONNECTED
            </span>
          </div>

          {/* Text Size Control & Save Options */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-slate-700">
              <Type className="w-4 h-4 text-slate-500" />
              <span className="font-semibold">Text Size:</span>
            </div>

            <div className="flex gap-1 bg-white p-0.5 rounded-lg border border-slate-300">
              <button
                onClick={() => setTextSize('normal')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                  textSize === 'normal'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setTextSize('large')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                  textSize === 'large'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Large
              </button>
              <button
                onClick={() => setTextSize('xlarge')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                  textSize === 'xlarge'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Extra Large
              </button>
            </div>

            {/* Cloud Save Button */}
            <button
              onClick={handleSaveClick}
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
              title="Save current evaluation to Supabase database"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saveSuccessMsg ? 'SAVED TO CLOUD!' : 'SAVE TO SUPABASE'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-lg text-xs font-bold transition shadow-xs"
              title="Print report"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-sm">
            <Eye className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-extrabold text-2xl text-slate-900 tracking-tight">
              Blind Spot <span className="text-blue-600">AI</span>
            </h1>
            <p className="text-sm font-medium text-slate-600 mt-0.5">
              Clear, step-by-step risk advisor for life, business, and financial choices.
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('hud')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition border ${
              activeTab === 'hud'
                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Compass className="w-4 h-4" />
            Decision Analyzer
          </button>

          <button
            onClick={() => setActiveTab('scenarios')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition border ${
              activeTab === 'scenarios'
                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Sample Examples
          </button>

          <button
            onClick={onShowHistory}
            className="px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition border bg-white border-slate-300 text-slate-800 hover:bg-slate-50"
          >
            <History className="w-4 h-4 text-emerald-600" />
            Saved History ({savedCount})
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition border ${
              activeTab === 'json'
                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            Download Summary
          </button>
        </div>
      </div>
    </header>
  );
}
