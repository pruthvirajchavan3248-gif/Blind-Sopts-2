import React, { useState } from 'react';
import { AlertTriangle, EyeOff, CheckCircle2, ChevronDown, ChevronUp, ShieldAlert } from 'lucide-react';

export default function BlindSpotEngineView({ evaluation }) {
  const blindSpots = evaluation?.blindSpots || [];
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [expandedIndices, setExpandedIndices] = useState([0, 1, 2, 3, 4]);

  const categories = [
    'ALL',
    'Missing Information',
    'Hidden Assumption',
    'Overlooked Risk',
    'Internal Contradiction',
    'Unconsidered Stakeholders'
  ];

  const filteredSpots = blindSpots.filter(spot => {
    const catMatch = selectedCategory === 'ALL' || spot.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const sevMatch = selectedSeverity === 'ALL' || spot.severity.toLowerCase() === selectedSeverity.toLowerCase();
    return catMatch && sevMatch;
  });

  const toggleExpand = (idx) => {
    if (expandedIndices.includes(idx)) {
      setExpandedIndices(expandedIndices.filter(i => i !== idx));
    } else {
      setExpandedIndices([...expandedIndices, idx]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Light Header Banner */}
      <div className="bg-gradient-to-r from-rose-50 via-white to-slate-50 border border-rose-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-rose-600" /> STEP 2: BLIND SPOTS & MISSED FACTS
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              Found {blindSpots.length} Hidden Risks & Missed Facts
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">FILTER BY RISK:</span>
            {['ALL', 'Critical', 'High', 'Moderate'].map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition ${
                  selectedSeverity === sev
                    ? 'bg-rose-600 border-rose-600 text-white shadow-xs'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition border ${
              selectedCategory === cat
                ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List of Blind Spots (Clean Light Cards) */}
      <div className="space-y-4">
        {filteredSpots.map((spot, idx) => {
          const isExpanded = expandedIndices.includes(idx);
          const isCritical = spot.severity === 'Critical';
          const isHigh = spot.severity === 'High';

          return (
            <div
              key={idx}
              className={`bg-white border-2 rounded-3xl overflow-hidden transition shadow-sm ${
                isCritical ? 'border-rose-300' :
                isHigh ? 'border-amber-300' :
                'border-slate-200'
              }`}
            >
              {/* Card Title Header */}
              <div
                onClick={() => toggleExpand(idx)}
                className="p-5 flex items-center justify-between cursor-pointer bg-slate-50 hover:bg-slate-100 transition border-b border-slate-200"
              >
                <div className="flex items-center gap-3.5">
                  <span className={`p-3 rounded-2xl border ${
                    isCritical ? 'bg-rose-100 border-rose-300 text-rose-700' :
                    isHigh ? 'bg-amber-100 border-amber-300 text-amber-700' :
                    'bg-blue-100 border-blue-300 text-blue-700'
                  }`}>
                    <AlertTriangle className="w-5 h-5" />
                  </span>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-slate-200 text-slate-800">
                        {spot.category}
                      </span>
                      <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-lg border ${
                        isCritical ? 'bg-rose-600 text-white border-rose-600' :
                        isHigh ? 'bg-amber-500 text-white border-amber-500' :
                        'bg-slate-600 text-white border-slate-600'
                      }`}>
                        {spot.severity.toUpperCase()} RISK
                      </span>
                    </div>
                    <h4 className="font-extrabold text-base text-slate-900">
                      {spot.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-600 text-xs font-bold">
                  <span>{isExpanded ? 'HIDE DETAILS' : 'SEE DETAILS'}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Card Body (Light Theme) */}
              {isExpanded && (
                <div className="p-6 space-y-4 bg-white">
                  <div>
                    <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider block mb-1.5">
                      WHY THIS MATTERS:
                    </span>
                    <p className="text-sm font-medium text-slate-800 leading-relaxed bg-slate-50 p-4 border border-slate-200 rounded-2xl">
                      {spot.description}
                    </p>
                  </div>

                  {spot.mitigation && (
                    <div className="border-t border-slate-200 pt-4">
                      <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> HOW TO FIX OR PREVENT THIS:
                      </span>
                      <p className="text-sm font-semibold text-emerald-900 leading-relaxed bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                        {spot.mitigation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filteredSpots.length === 0 && (
          <div className="text-center p-8 bg-white border border-slate-300 rounded-3xl text-slate-600 text-sm font-semibold">
            No blind spots match your current filter selection.
          </div>
        )}
      </div>
    </div>
  );
}
