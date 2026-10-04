import React, { useState } from 'react';
import { RotateCw, Calendar, Target, Clock, AlertCircle } from 'lucide-react';

export default function LearningLoopView({ evaluation }) {
  const learningLoop = evaluation?.learningLoop || {};
  const metrics = learningLoop.metricsToTrack || [];
  const reviewMilestone = learningLoop.reviewMilestone || "90-Day Progress Checkpoint";
  const [completedMetrics, setCompletedMetrics] = useState([]);

  const toggleMetric = (idx) => {
    if (completedMetrics.includes(idx)) {
      setCompletedMetrics(completedMetrics.filter(i => i !== idx));
    } else {
      setCompletedMetrics([...completedMetrics, idx]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Light Header Card */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-slate-50 border border-sky-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center gap-2">
              <RotateCw className="w-4 h-4 text-sky-600" /> STEP 7: TRACK PROGRESS & CHECKPOINTS
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              3 Important Metrics to Track & Scheduled Review Date
            </h3>
          </div>

          <div className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 flex items-center gap-2 shadow-xs">
            <Calendar className="w-4 h-4 text-blue-600" />
            CHECKPOINT: <span className="text-blue-700 font-extrabold">{reviewMilestone}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric Checklist */}
        <div className="md:col-span-2 bg-white border border-slate-300 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600" />
              KEY METRICS TO WATCH OVER TIME
            </h4>
            <span className="text-xs font-bold text-slate-500">
              {completedMetrics.length}/{metrics.length} TRACKING
            </span>
          </div>

          <div className="space-y-3">
            {metrics.map((metric, idx) => {
              const isChecked = completedMetrics.includes(idx);

              return (
                <div
                  key={idx}
                  onClick={() => toggleMetric(idx)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                    isChecked
                      ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="w-5 h-5 accent-blue-600 rounded-lg cursor-pointer"
                    />
                    <span className="text-sm font-semibold">{metric}</span>
                  </div>

                  <span className={`text-xs font-extrabold px-3 py-1 rounded-xl border ${
                    isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-200 border-slate-300 text-slate-700'
                  }`}>
                    {isChecked ? 'TRACKING ACTIVE' : 'CLICK TO TRACK'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Review Countdown */}
        <div className="bg-white border border-slate-300 rounded-3xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-blue-700 border-b border-slate-200 pb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              REVIEW CHECKPOINT
            </h4>

            <div className="bg-slate-50 p-5 border border-slate-200 rounded-2xl space-y-2 text-center">
              <span className="text-xs font-bold text-slate-500 block">SCHEDULED EVALUATION</span>
              <span className="text-xl font-extrabold text-blue-700 block">
                +60 DAYS AFTER START
              </span>
              <span className="text-xs font-medium text-slate-600 block leading-relaxed">
                Compare your actual results against the 3 scenarios to see if you stayed on track.
              </span>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs font-semibold text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <span>
              If metrics fall more than 20% behind schedule, switch to Option B (Low-Risk Pilot) immediately.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
