import React, { useState } from 'react';
import { HelpCircle, Send, CheckCircle2 } from 'lucide-react';

export default function CounterProbesView({ evaluation }) {
  const probes = evaluation?.counterProbes || [];
  const [userAnswers, setUserAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});

  const handleAnswerSubmit = (idx) => {
    if (!userAnswers[idx]?.trim()) return;
    setSubmittedAnswers({
      ...submittedAnswers,
      [idx]: userAnswers[idx]
    });
  };

  return (
    <div className="space-y-6">
      {/* Light Header Card */}
      <div className="bg-gradient-to-r from-indigo-50 via-white to-slate-50 border border-indigo-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600" /> STEP 5: TOUGH QUESTIONS TO ASK YOURSELF
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              3 Direct Stress-Test Questions to Challenge Your Plan
            </h3>
          </div>

          <div className="text-xs font-bold text-indigo-800 bg-white px-3.5 py-2 rounded-xl border border-slate-300">
            TEST YOUR ANSWERS LIVE BELOW
          </div>
        </div>
      </div>

      {/* Probes List (Clean Light Cards) */}
      <div className="space-y-6">
        {probes.map((probe, idx) => {
          const isSubmitted = !!submittedAnswers[idx];

          return (
            <div
              key={idx}
              className="bg-white border border-slate-300 rounded-3xl p-6 space-y-4 shadow-sm"
            >
              <div className="flex items-start gap-4 border-b border-slate-200 pb-4">
                <span className="p-3 rounded-2xl bg-blue-100 border border-blue-300 text-blue-800 font-extrabold text-base shrink-0">
                  0{idx + 1}
                </span>

                <div>
                  <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                    {probe.question}
                  </h4>
                  <p className="text-xs font-medium text-slate-600 mt-1">
                    <span className="font-bold text-blue-700">WHY WE ASK THIS:</span> {probe.rationale}
                  </p>
                </div>
              </div>

              {/* User Answer Input */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-bold text-slate-900">
                  TYPE YOUR BACKUP PLAN OR SOLUTION:
                </label>
                
                <div className="flex gap-2">
                  <textarea
                    rows={2}
                    value={userAnswers[idx] || ''}
                    onChange={(e) => setUserAnswers({ ...userAnswers, [idx]: e.target.value })}
                    placeholder="e.g. If our main partner delays, we can switch to supplier B within 48 hours..."
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-2xl p-3.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
                  />
                  <button
                    onClick={() => handleAnswerSubmit(idx)}
                    disabled={!userAnswers[idx]?.trim()}
                    className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition flex flex-col items-center justify-center gap-1 disabled:opacity-40 shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    SAVE
                  </button>
                </div>

                {isSubmitted && (
                  <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl flex items-start gap-3 text-xs text-emerald-900 mt-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-emerald-900 block mb-0.5">SAVED ANSWER:</span>
                      "{submittedAnswers[idx]}"
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
