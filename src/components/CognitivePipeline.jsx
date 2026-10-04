import React from 'react';
import { Target, AlertTriangle, GitPullRequest, Grid, HelpCircle, Compass, RotateCw, FileText } from 'lucide-react';

export const PIPELINE_STEPS = [
  { id: 1, key: 'context', name: 'Step 1: Your Goal', icon: Target, color: 'text-blue-600' },
  { id: 2, key: 'blindspots', name: 'Step 2: Hidden Risks', icon: AlertTriangle, color: 'text-rose-600' },
  { id: 3, key: 'twin', name: 'Step 3: Possible Outcomes', icon: GitPullRequest, color: 'text-purple-600' },
  { id: 4, key: 'riskmap', name: 'Step 4: Risk Level', icon: Grid, color: 'text-amber-600' },
  { id: 5, key: 'probes', name: "Step 5: Tough Questions", icon: HelpCircle, color: 'text-indigo-600' },
  { id: 6, key: 'options', name: 'Step 6: The 3 Best Steps', icon: Compass, color: 'text-emerald-600' },
  { id: 7, key: 'loop', name: 'Step 7: Track Progress', icon: RotateCw, color: 'text-sky-600' },
  { id: 8, key: 'json', name: 'Step 8: Save & Print', icon: FileText, color: 'text-slate-600' }
];

export default function CognitivePipeline({ activeStep, setActiveStep, evaluation }) {
  const blindspotCount = evaluation?.summary?.keyBlindspotCount || 0;

  return (
    <div className="bg-white border border-slate-300 rounded-3xl p-3 mb-8 shadow-sm overflow-x-auto">
      <div className="flex items-center gap-2 min-w-max">
        {PIPELINE_STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = activeStep === step.key;
          const isBlindspots = step.key === 'blindspots';

          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.key)}
              className={`px-4 py-3 rounded-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold transition border ${
                isActive
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : step.color}`} />
              <span>{step.name}</span>
              
              {isBlindspots && blindspotCount > 0 && (
                <span className={`px-2.5 py-0.5 text-xs font-extrabold rounded-full ${
                  isActive ? 'bg-white text-rose-700' : 'bg-rose-100 text-rose-800 border border-rose-300'
                }`}>
                  {blindspotCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
