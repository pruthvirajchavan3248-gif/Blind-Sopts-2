import React from 'react';
import { Grid } from 'lucide-react';

export default function RiskMatrixView({ evaluation }) {
  const blindSpots = evaluation?.blindSpots || [];

  const getCellItems = (impact, likelihood) => {
    return blindSpots.filter(spot => {
      const isHighImpact = spot.severity === 'Critical';
      const isMedImpact = spot.severity === 'High';
      const isLowImpact = spot.severity === 'Moderate';

      if (impact === 'HIGH' && isHighImpact) return true;
      if (impact === 'MED' && isMedImpact) return true;
      if (impact === 'LOW' && isLowImpact) return true;
      return false;
    });
  };

  return (
    <div className="space-y-6">
      {/* Light Header Card */}
      <div className="bg-gradient-to-r from-amber-50 via-white to-slate-50 border border-amber-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-2">
              <Grid className="w-4 h-4 text-amber-600" /> STEP 4: RISK & CONFIDENCE GRID
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              Visualizing Risk Impact vs How Likely It Is to Happen
            </h3>
          </div>
          
          <div className="px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 shadow-xs">
            SYSTEM CONFIDENCE: <span className="text-amber-700 font-extrabold">78% (MODERATE)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Light 3x3 Grid Matrix View */}
        <div className="lg:col-span-2 bg-white border border-slate-300 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <h4 className="text-sm font-extrabold text-slate-900">
              IMPACT VS LIKELIHOOD GRID
            </h4>
            <span className="text-xs text-slate-500 font-bold">
              UP: IMPACT | RIGHT: LIKELIHOOD
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
            {['HIGH', 'MED', 'LOW'].map((impactRow) => (
              <React.Fragment key={impactRow}>
                {['LOW', 'MED', 'HIGH'].map((likeCol) => {
                  const items = getCellItems(impactRow, likeCol);
                  const isHighRiskCell = impactRow === 'HIGH' && (likeCol === 'HIGH' || likeCol === 'MED');

                  return (
                    <div
                      key={`${impactRow}-${likeCol}`}
                      className={`min-h-[110px] p-3 rounded-2xl border transition ${
                        isHighRiskCell
                          ? 'bg-rose-50 border-rose-300'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] font-extrabold text-slate-500 mb-2 border-b border-slate-200 pb-1">
                        <span>{impactRow} IMPACT</span>
                        <span>{likeCol} CHANCE</span>
                      </div>

                      <div className="space-y-1.5">
                        {items.length > 0 ? (
                          items.map((spot, i) => (
                            <div
                              key={i}
                              className={`p-2 rounded-xl text-xs leading-snug border font-bold ${
                                spot.severity === 'Critical'
                                  ? 'bg-rose-100 border-rose-300 text-rose-900'
                                  : 'bg-amber-100 border-amber-300 text-amber-900'
                              }`}
                            >
                              {spot.title}
                            </div>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400 font-medium italic block mt-4 text-center">Clear</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Confidence & Rationale (Light) */}
        <div className="bg-white border border-slate-300 rounded-3xl p-6 space-y-4 shadow-sm">
          <h4 className="text-sm font-extrabold text-blue-700 border-b border-slate-200 pb-3">
            CONFIDENCE & RATIONALE
          </h4>

          <div className="space-y-3.5 text-xs">
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl space-y-1">
              <span className="font-extrabold text-emerald-800 block">
                WHAT WE ARE CONFIDENT ABOUT:
              </span>
              <p className="text-slate-700 leading-relaxed font-medium">
                Clear limits and known operational constraints provided in your setup details.
              </p>
            </div>

            <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl space-y-1">
              <span className="font-extrabold text-rose-800 block">
                WHAT NEEDS MORE TESTING:
              </span>
              <p className="text-slate-700 leading-relaxed font-medium">
                Missing 30-day user retention metrics and unverified partner response times under heavy load.
              </p>
            </div>

            <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl space-y-1">
              <span className="font-extrabold text-amber-800 block">
                NO FALSE CERTAINTY:
              </span>
              <p className="text-slate-700 leading-relaxed font-medium">
                Probabilities represent realistic estimates rather than exact guaranteed predictions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
