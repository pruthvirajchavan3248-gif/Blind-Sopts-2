import React from 'react';
import { Target, Database, ShieldAlert, CheckCircle2, FileCode } from 'lucide-react';

export default function ContextMappingView({ evaluation }) {
  const context = evaluation?.contextMapping || {};
  const summary = evaluation?.summary || {};

  return (
    <div className="space-y-6">
      {/* Light Header Card */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-slate-50 border border-blue-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600" /> STEP 1: GOAL & SETUP BREAKDOWN
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              {summary.coreGoal || context.goal || "Goal Summary"}
            </h3>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 shadow-xs">
              OVERALL RISK RATING: {' '}
              <span className={`font-extrabold ${
                summary.primaryRiskScore === 'High' ? 'text-rose-600' :
                summary.primaryRiskScore === 'Medium' ? 'text-amber-600' : 'text-emerald-600'
              }`}>
                {summary.primaryRiskScore || 'Medium'}
              </span>
            </div>
            
            <div className="px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 shadow-xs">
              BLIND SPOTS FOUND: {' '}
              <span className="text-rose-600 font-extrabold">{summary.keyBlindspotCount || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Light Grid Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Goal */}
        <div className="bg-white border border-slate-300 rounded-3xl p-6 space-y-3 shadow-sm">
          <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <Target className="w-5 h-5 text-blue-600" />
            PRIMARY GOAL & SCOPE
          </h4>
          <p className="text-sm font-medium text-slate-800 leading-relaxed bg-slate-50 p-4 border border-slate-200 rounded-2xl">
            {context.goal || "No main goal description provided."}
          </p>
        </div>

        {/* Known Facts */}
        <div className="bg-white border border-slate-300 rounded-3xl p-6 space-y-3 shadow-sm">
          <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <Database className="w-5 h-5 text-emerald-600" />
            FACTS & SIGNALS YOU KNOW
          </h4>
          <ul className="space-y-2.5">
            {context.availableInfo && context.availableInfo.length > 0 ? (
              context.availableInfo.map((info, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-800 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{info}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-500 italic">No specific facts provided yet.</li>
            )}
          </ul>
        </div>

        {/* Known Constraints */}
        <div className="bg-white border border-slate-300 rounded-3xl p-6 space-y-3 shadow-sm">
          <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            LIMITS & HARD CONSTRAINTS
          </h4>
          <ul className="space-y-2.5">
            {context.constraints && context.constraints.length > 0 ? (
              context.constraints.map((c, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-800 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0 mt-2"></span>
                  <span>{c}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-500 italic">No hard limits provided.</li>
            )}
          </ul>
        </div>

        {/* Implicit Expectations */}
        <div className="bg-white border border-slate-300 rounded-3xl p-6 space-y-3 shadow-sm">
          <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <FileCode className="w-5 h-5 text-amber-600" />
            UNSTATED REQUIREMENTS
          </h4>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-3 text-sm font-medium text-slate-800 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0 mt-2"></span>
              <span>Must keep daily operations working smoothly without crashes or downtime.</span>
            </li>
            <li className="flex items-start gap-3 text-sm font-medium text-slate-800 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0 mt-2"></span>
              <span>Requires agreement across your team, leadership, and external partners.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
