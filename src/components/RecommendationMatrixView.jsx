import React, { useState } from 'react';
import { Compass, CheckSquare, ArrowRight } from 'lucide-react';

export default function RecommendationMatrixView({ evaluation }) {
  const options = evaluation?.options || [];
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(0);

  return (
    <div className="space-y-6">
      {/* Light Header Card */}
      <div className="bg-gradient-to-r from-emerald-50 via-white to-slate-50 border border-emerald-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-600" /> STEP 6: THE 3 BEST STEPS TO TAKE
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              3 Strategic Options Compared with Risks and Trade-offs
            </h3>
          </div>
          
          <div className="flex gap-2 text-xs font-bold">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelectedOptionIdx(i)}
                className={`px-3.5 py-2 rounded-xl transition border ${
                  selectedOptionIdx === i
                    ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                OPTION {String.fromCharCode(65 + i)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3 Light Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((opt, idx) => {
          const isSelected = selectedOptionIdx === idx;
          const letter = String.fromCharCode(65 + idx);
          const isLowRisk = opt.riskLevel === 'Low';
          const isHighRisk = opt.riskLevel === 'High';

          return (
            <div
              key={idx}
              onClick={() => setSelectedOptionIdx(idx)}
              className={`bg-white border-2 rounded-3xl p-6 space-y-4 shadow-sm cursor-pointer transition flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 ring-4 ring-blue-500/10 shadow-md'
                  : 'border-slate-300 hover:border-slate-400'
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <span className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-xl bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-extrabold">
                      {letter}
                    </span>
                    {opt.name}
                  </span>

                  <span className={`px-2.5 py-1 text-xs font-extrabold rounded-lg border ${
                    isLowRisk ? 'bg-emerald-100 border-emerald-300 text-emerald-800' :
                    isHighRisk ? 'bg-rose-100 border-rose-300 text-rose-800' :
                    'bg-amber-100 border-amber-300 text-amber-800'
                  }`}>
                    {opt.riskLevel.toUpperCase()} RISK
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-1">HOW IT WORKS:</span>
                  <p className="text-xs font-medium text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    {opt.approach}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold text-amber-800 block mb-1">THE TRADE-OFF:</span>
                  <p className="text-xs font-semibold text-amber-900 bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
                    {opt.tradeOffs}
                  </p>
                </div>
              </div>

              {/* Next Immediate Action */}
              <div className="border-t border-slate-200 pt-3 space-y-2">
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-emerald-600" /> FIRST STEP TO TAKE:
                </span>
                <div className="text-xs font-semibold text-slate-800 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Run a 14-day test to validate Option {letter} before making large commitments.</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
