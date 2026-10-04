import React, { useState } from 'react';
import { FileText, Copy, Download, Check, Printer } from 'lucide-react';

export default function JsonExporterView({ evaluation }) {
  const [copied, setCopied] = useState(false);

  const jsonString = JSON.stringify(evaluation, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blindspot-evaluation-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Light Header Card */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-slate-50 border border-blue-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" /> STEP 8: SAVE & PRINT SUMMARY
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              Download, Copy, or Print Your Decision Evaluation
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 text-xs font-bold rounded-xl flex items-center gap-2 transition shadow-xs"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              PRINT REPORT
            </button>

            <button
              onClick={handleCopy}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              {copied ? 'COPIED!' : 'COPY SUMMARY'}
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2.5 bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold rounded-xl flex items-center gap-2 transition shadow-xs"
            >
              <Download className="w-4 h-4" />
              DOWNLOAD .JSON
            </button>
          </div>
        </div>
      </div>

      {/* Light Code Viewer Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="bg-slate-950 border-b border-slate-800 px-5 py-3 flex justify-between items-center text-xs font-mono text-slate-400">
          <span className="font-bold text-slate-200">decision_summary_data.json</span>
          <span className="text-emerald-400 font-bold">100% VALID FORMAT</span>
        </div>

        <div className="p-5 max-h-[550px] overflow-y-auto font-mono text-xs text-amber-200 leading-relaxed bg-slate-900">
          <pre className="whitespace-pre-wrap break-all">{jsonString}</pre>
        </div>
      </div>
    </div>
  );
}
