import React, { useState } from 'react';
import { Eye, Printer, BookOpen, Compass, FileText, CheckCircle2, Type, Save, History, CloudCheck, LogIn, LogOut, UserCheck, Volume2, VolumeX, EyeOff, SunMedium } from 'lucide-react';
import { speakText, stopSpeech, isSpeaking } from '../services/speechSynthesis';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  textSize, 
  setTextSize,
  highContrast,
  setHighContrast,
  supabaseConnected,
  onSaveToCloud,
  savedCount,
  onShowHistory,
  currentUser,
  onOpenAuthModal,
  onSignOut,
  currentEvaluation
}) {
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSaveClick = async () => {
    await onSaveToCloud();
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  const handleReadAloud = () => {
    if (isPlayingAudio || isSpeaking()) {
      stopSpeech();
      setIsPlayingAudio(false);
    } else {
      const textToRead = `
        Blind Spot AI Decision Advisor.
        Core Goal: ${currentEvaluation?.summary?.coreGoal || "Custom Decision Goal"}.
        Primary Risk Score: ${currentEvaluation?.summary?.primaryRiskScore || "Medium"}.
        Found ${currentEvaluation?.summary?.keyBlindspotCount || 5} hidden risks.
        Top recommendation: ${currentEvaluation?.options?.[0]?.name || "Option A"}.
      `;
      const ok = speakText(textToRead);
      if (ok) setIsPlayingAudio(true);
    }
  };

  const userName = currentUser?.user_metadata?.full_name || currentUser?.email || 'Logged In';

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm" role="banner">
      {/* Top Status & Accessibility Control Strip */}
      <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-blue-800 font-bold" role="status">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
              BLIND SPOT AI — DECISION ADVISOR
            </span>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold" role="status">
              <CloudCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              SUPABASE CONNECTED
            </span>
          </div>

          {/* Accessibility Controls: Audio Reader, High Contrast, Text Size, Auth */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Audio Text-to-Speech Reader */}
            <button
              onClick={handleReadAloud}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition shadow-xs ${
                isPlayingAudio
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300'
              }`}
              aria-label={isPlayingAudio ? "Stop reading page out loud" : "Read decision summary out loud"}
              title="Listen to decision evaluation read out loud"
            >
              {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5 text-white" /> : <Volume2 className="w-3.5 h-3.5 text-blue-600" />}
              <span>{isPlayingAudio ? 'Stop Reading' : '🔊 Read Aloud'}</span>
            </button>

            {/* High Contrast Mode Toggle */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition border ${
                highContrast
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
              }`}
              aria-pressed={highContrast}
              aria-label="Toggle High Contrast Mode for low vision"
              title="Toggle High Contrast Mode (WCAG AAA)"
            >
              <SunMedium className="w-3.5 h-3.5 text-amber-500" />
              <span>High Contrast: {highContrast ? 'ON' : 'OFF'}</span>
            </button>

            {/* User Log In / Log Out Section */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200">
                <span className="flex items-center gap-1 font-bold text-blue-900 text-xs">
                  <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                  {userName}
                </span>
                <button
                  onClick={onSignOut}
                  className="px-2 py-0.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[11px] font-bold transition flex items-center gap-1"
                  aria-label="Log out of account"
                  title="Log out of your account"
                >
                  <LogOut className="w-3 h-3" />
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
                aria-label="Open Login or Sign Up Modal"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>LOG IN / SIGN UP</span>
              </button>
            )}

            {/* Text Size Control */}
            <div className="flex items-center gap-1 text-slate-700">
              <Type className="w-4 h-4 text-slate-500" aria-hidden="true" />
              <span className="font-semibold">Text Size:</span>
            </div>

            <div className="flex gap-1 bg-white p-0.5 rounded-lg border border-slate-300" role="group" aria-label="Text Size selector">
              <button
                onClick={() => setTextSize('normal')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                  textSize === 'normal'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
                aria-pressed={textSize === 'normal'}
              >
                Standard
              </button>
              <button
                onClick={() => setTextSize('large')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                  textSize === 'large'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
                aria-pressed={textSize === 'large'}
              >
                Large
              </button>
              <button
                onClick={() => setTextSize('xlarge')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                  textSize === 'xlarge'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
                aria-pressed={textSize === 'xlarge'}
              >
                Extra Large
              </button>
            </div>

            {/* Cloud Save & Print Buttons */}
            <button
              onClick={handleSaveClick}
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
              aria-label="Save evaluation to Supabase cloud"
              title="Save current evaluation to Supabase database"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saveSuccessMsg ? 'SAVED TO CLOUD!' : 'SAVE TO CLOUD'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-lg text-xs font-bold transition shadow-xs"
              aria-label="Print paper report"
              title="Print report"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-sm">
            <Eye className="w-7 h-7" aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-extrabold text-2xl text-slate-900 tracking-tight">
              Blind Spot <span className="text-blue-600">AI</span>
            </h1>
            <p className="text-sm font-medium text-slate-600 mt-0.5">
              Clear, step-by-step risk advisor for life, business, and financial choices.
            </p>
          </div>
        </div>

        {/* Main Tab Navigation */}
        <nav className="flex items-center gap-3" aria-label="Main Navigation">
          <button
            onClick={() => setActiveTab('hud')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition border ${
              activeTab === 'hud'
                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
            }`}
            aria-current={activeTab === 'hud' ? 'page' : undefined}
          >
            <Compass className="w-4 h-4" />
            Decision Analyzer
          </button>

          <button
            onClick={() => setActiveTab('scenarios')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition border ${
              activeTab === 'scenarios'
                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
            }`}
            aria-current={activeTab === 'scenarios' ? 'page' : undefined}
          >
            <BookOpen className="w-4 h-4" />
            Sample Examples
          </button>

          <button
            onClick={onShowHistory}
            className="px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition border bg-white border-slate-300 text-slate-800 hover:bg-slate-50"
            aria-label={`View Saved History (${savedCount} items)`}
          >
            <History className="w-4 h-4 text-emerald-600" />
            Saved History ({savedCount})
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition border ${
              activeTab === 'json'
                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
            }`}
            aria-current={activeTab === 'json' ? 'page' : undefined}
          >
            <FileText className="w-4 h-4" />
            Download Summary
          </button>
        </nav>
      </div>
    </header>
  );
}
