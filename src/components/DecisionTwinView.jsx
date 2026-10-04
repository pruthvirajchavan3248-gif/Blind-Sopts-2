import React, { useState } from 'react';
import { GitPullRequest, Sliders, TrendingUp, AlertOctagon } from 'lucide-react';

export default function DecisionTwinView({ evaluation }) {
  const twin = evaluation?.decisionTwin || {};
  const [stressFactor, setStressFactor] = useState(0);

  const parseProb = (probStr) => parseInt((probStr || '0').replace('%', ''), 10) || 20;

  const baseBest = parseProb(twin.bestCase?.probability);
  const baseReal = parseProb(twin.realisticCase?.probability);
  const baseWorst = parseProb(twin.worstCase?.probability);

  let adjBest = Math.max(5, Math.min(80, baseBest - Math.floor(stressFactor * 0.4)));
  let adjWorst = Math.max(5, Math.min(80, baseWorst + Math.floor(stressFactor * 0.4)));
  let adjReal = Math.max(10, 100 - adjBest - adjWorst);

  return (
    <div className="space-y-6">
      {/* Light Header Card */}
      <div className="bg-gradient-to-r from-purple-50 via-white to-slate-50 border border-purple-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-2">
              <GitPullRequest className="w-4 h-4 text-purple-600" /> STEP 3: POSSIBLE OUTCOMES (3 SCENARIOS)
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              Best Case, Most Likely Outcome, and Worst Case
            </h3>
          </div>
          
          <div className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-300">
            TEST WHAT HAPPENS IF DELAYS OR PROBLEMS ARISE
          </div>
        </div>
      </div>

      {/* Light Stress Simulator Slider */}
      <div className="bg-white border border-slate-300 rounded-3xl p-6 space-y-4 shadow-sm">
        <div className="flex justify-between items-center text-sm font-bold">
          <span className="text-blue-700 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-600" /> SIMULATE EXTERNAL STRESS (DELAYS, VOLATILITY)
          </span>
          <span className={`font-extrabold px-3 py-1 rounded-xl text-xs ${
            stressFactor < 0 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
            stressFactor > 20 ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
          }`}>
            {stressFactor < 0 ? `FAVORABLE CONDITIONS (${stressFactor}%)` : stressFactor > 0 ? `EXTRA PROBLEMS (+${stressFactor}%)` : 'NORMAL CONDITIONS (0%)'}
          </span>
        </div>

        <input
          type="range"
          min="-30"
          max="50"
          value={stressFactor}
          onChange={(e) => setStressFactor(parseInt(e.target.value, 10))}
          className="w-full h-3 bg-slate-200 rounded-xl appearance-none cursor-pointer accent-blue-600"
        />

        <div className="flex justify-between text-xs text-slate-500 font-bold">
          <span>Smooth Sailing (-30%)</span>
          <span>Normal</span>
          <span>Delays & Obstacles (+50%)</span>
        </div>
      </div>

      {/* 3 Light Outcome Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* BEST CASE */}
        <div className="bg-white border-2 border-emerald-200 rounded-3xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <span className="text-sm font-extrabold text-emerald-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" /> BEST CASE
              </span>
              <span className="px-3 py-1 text-xs font-extrabold bg-emerald-100 text-emerald-800 rounded-xl border border-emerald-300">
                CHANCE: {adjBest}%
              </span>
            </div>

            <p className="text-sm font-medium text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200 min-h-[100px]">
              {twin.bestCase?.scenario || 'Best case outcome.'}
            </p>
          </div>

          <div className="border-t border-slate-200 pt-3">
            <span className="text-xs font-bold text-slate-600 block mb-1">WHAT DRIVES THIS:</span>
            <span className="text-xs font-semibold text-emerald-900 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 block">
              High execution speed & zero unexpected delays.
            </span>
          </div>
        </div>

        {/* REALISTIC CASE */}
        <div className="bg-white border-2 border-purple-200 rounded-3xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <span className="text-sm font-extrabold text-purple-800 flex items-center gap-2">
                <GitPullRequest className="w-5 h-5 text-purple-600" /> MOST LIKELY
              </span>
              <span className="px-3 py-1 text-xs font-extrabold bg-purple-100 text-purple-800 rounded-xl border border-purple-300">
                CHANCE: {adjReal}%
              </span>
            </div>

            <p className="text-sm font-medium text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200 min-h-[100px]">
              {twin.realisticCase?.scenario || 'Most likely outcome.'}
            </p>
          </div>

          <div className="border-t border-slate-200 pt-3">
            <span className="text-xs font-bold text-slate-600 block mb-1">MAIN BOTTLENECK:</span>
            <span className="text-xs font-semibold text-purple-900 bg-purple-50 px-3 py-2 rounded-xl border border-purple-200 block">
              Minor delays & partner approval wait times.
            </span>
          </div>
        </div>

        {/* WORST / FAILURE CASE */}
        <div className="bg-white border-2 border-rose-200 rounded-3xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <span className="text-sm font-extrabold text-rose-800 flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-rose-600" /> WORST CASE
              </span>
              <span className="px-3 py-1 text-xs font-extrabold bg-rose-100 text-rose-800 rounded-xl border border-rose-300">
                CHANCE: {adjWorst}%
              </span>
            </div>

            <p className="text-sm font-medium text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200 min-h-[100px]">
              {twin.worstCase?.scenario || 'Worst case outcome.'}
            </p>
          </div>

          <div className="border-t border-slate-200 pt-3">
            <span className="text-xs font-bold text-rose-700 block mb-1">MAIN CAUSE OF FAILURE:</span>
            <span className="text-xs font-semibold text-rose-900 bg-rose-50 px-3 py-2 rounded-xl border border-rose-200 block">
              Ignoring key blind spots until costs pile up.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
