import React from 'react';
import { Database, Zap, ArrowRight } from 'lucide-react';
import { PRESET_SCENARIOS } from '../data/presetScenarios';

export default function PresetScenariosView({ onSelectScenario }) {
  return (
    <div className="space-y-6">
      {/* Light Header Card */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-slate-50 border border-blue-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-600" /> SAMPLE DECISION EXAMPLES
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              Explore 3 Real-World Case Examples
            </h3>
          </div>
          
          <span className="text-xs font-extrabold text-blue-800 bg-white px-4 py-2 rounded-xl border border-slate-300 shadow-xs">
            3 PRESET EXAMPLES READY
          </span>
        </div>
      </div>

      {/* Grid of Light Preset Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRESET_SCENARIOS.map((scenario) => {
          const evalSummary = scenario.evaluation.summary;
          const blindspotCount = evalSummary.keyBlindspotCount || 0;

          return (
            <div
              key={scenario.id}
              className="bg-white border-2 border-slate-200 hover:border-blue-600 rounded-3xl p-6 space-y-4 shadow-sm transition flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold uppercase px-3 py-1 rounded-xl bg-blue-50 text-blue-800 border border-blue-200">
                    {scenario.domain}
                  </span>
                  
                  <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-xl bg-rose-100 border border-rose-300 text-rose-800">
                    {evalSummary.primaryRiskScore} RISK
                  </span>
                </div>

                <h4 className="font-extrabold text-base text-slate-900 group-hover:text-blue-600 transition">
                  {scenario.title}
                </h4>

                <p className="text-xs font-medium text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {scenario.description}
                </p>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                  <span>BLIND SPOTS: <strong className="text-rose-600 font-extrabold">{blindspotCount}</strong></span>
                  <span>BEST CASE: <strong className="text-emerald-600 font-extrabold">{scenario.evaluation.decisionTwin.bestCase.probability}</strong></span>
                </div>

                <button
                  onClick={() => onSelectScenario(scenario)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  LOAD INTO ANALYZER
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
