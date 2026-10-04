import React, { useState, useRef, useEffect } from 'react';
import { Eye, Zap, Layers, FileText, Sliders, ArrowRight, HelpCircle, Mic, MicOff, UploadCloud, FileCheck, X, File, Sparkles, CheckCircle2 } from 'lucide-react';
import { PRESET_SCENARIOS } from '../data/presetScenarios';

export default function InputWorkbench({ 
  onRunAnalysis, 
  onSelectPreset, 
  isAnalyzing,
  currentGoal,
  currentDomain
}) {
  const [goalText, setGoalText] = useState(currentGoal || '');
  const [domain, setDomain] = useState(currentDomain || 'Software & Technology');
  const [availableDataText, setAvailableDataText] = useState('');
  const [constraintsText, setConstraintsText] = useState('');
  const [riskProfile, setRiskProfile] = useState('Balanced');

  // Dedicated File Draft Upload State
  const [attachedFile, setAttachedFile] = useState(null);
  const [fileStats, setFileStats] = useState(null); // { name, size, wordCount, previewText }
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Voice Input State
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        if (currentTranscript.trim()) {
          setGoalText((prev) => {
            const trimmedPrev = prev.trim();
            if (!trimmedPrev) return currentTranscript;
            return trimmedPrev.endsWith('.') || trimmedPrev.endsWith('?')
              ? `${trimmedPrev} ${currentTranscript}`
              : `${trimmedPrev}. ${currentTranscript}`;
          });
        }
      };

      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);
      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }
  }, []);

  const toggleRecording = () => {
    if (!speechSupported) {
      alert("Voice input is not supported in this browser. Please type your decision or upload a draft file.");
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
      } catch (err) {
        setIsRecording(false);
      }
    }
  };

  // Helper to process uploaded draft file
  const processFile = (file) => {
    if (!file) return;
    setAttachedFile(file);

    const sizeKb = (file.size / 1024).toFixed(1);
    const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE';

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const text = content.trim();
        const wordCount = text.split(/\s+/).filter(Boolean).length;

        setFileStats({
          name: file.name,
          size: `${sizeKb} KB`,
          type: ext,
          wordCount: wordCount,
          previewText: text.slice(0, 200) + (text.length > 200 ? '...' : '')
        });

        // Automatically populate or append text to main decision field
        setGoalText((prev) => {
          if (!prev.trim()) return text;
          return `${prev}\n\n--- UPLOADED DRAFT (${file.name}) ---\n${text}`;
        });
      } else {
        setFileStats({
          name: file.name,
          size: `${sizeKb} KB`,
          type: ext,
          wordCount: 'Document Loaded',
          previewText: `Binary document "${file.name}" loaded for risk analysis.`
        });
      }
    };

    if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md') || file.name.endsWith('.json') || file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
      setFileStats({
        name: file.name,
        size: `${sizeKb} KB`,
        type: ext,
        wordCount: 'Document Draft Attached',
        previewText: `File "${file.name}" attached successfully.`
      });
      setGoalText((prev) => {
        const msg = `Analyze risk for uploaded draft document "${file.name}" (${sizeKb} KB).`;
        if (!prev.trim()) return msg;
        return `${prev}\n\n[Attached Draft Document: ${file.name}]`;
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const removeFile = () => {
    setAttachedFile(null);
    setFileStats(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!goalText.trim()) return;
    onRunAnalysis({
      goalInput: goalText,
      domain,
      availableData: availableDataText,
      constraints: constraintsText,
      riskProfile
    });
  };

  const handleScenarioClick = (scenario) => {
    setGoalText(scenario.inputContext.goal);
    setDomain(scenario.domain);
    setAvailableDataText(scenario.inputContext.availableInfo.join('\n'));
    setConstraintsText(scenario.inputContext.constraints.join('\n'));
    setAttachedFile(null);
    setFileStats(null);
    onSelectPreset(scenario);
  };

  return (
    <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
      {/* Workbench Header */}
      <div className="flex flex-wrap justify-between items-center pb-5 border-b border-slate-200 mb-6 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <Eye className="w-6 h-6 text-blue-600" />
            Decision Analyzer Workbench
          </h2>
          <p className="text-sm font-medium text-slate-600 mt-1">
            Type your goal, record your voice, or upload a proposal draft document below to find hidden risks.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide hidden lg:inline">Quick Examples:</span>
          <div className="flex gap-2 overflow-x-auto max-w-lg">
            {PRESET_SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleScenarioClick(sc)}
                className="px-3 py-2 text-xs font-bold rounded-xl bg-blue-50 border border-blue-200 text-blue-800 hover:bg-blue-100 transition whitespace-nowrap shadow-xs"
              >
                {sc.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Category Selector */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              1. Decision Category
            </label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
            >
              <option value="Software & Technology">Software & Technology</option>
              <option value="Business & Sales">Business & Sales</option>
              <option value="Financing & Savings">Financing & Savings</option>
              <option value="Career & Retirement">Career & Retirement</option>
              <option value="Personal Strategy">Personal Life Decision</option>
            </select>
          </div>

          {/* Risk Preference */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-rose-600" />
              2. Risk Tolerance Level
            </label>
            <select
              value={riskProfile}
              onChange={(e) => setRiskProfile(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
            >
              <option value="Conservative">Cautious (Avoid major risks & protect savings)</option>
              <option value="Balanced">Balanced (Standard approach)</option>
              <option value="Aggressive">High Growth (Willing to take bigger risks)</option>
            </select>
          </div>
        </div>

        {/* DEDICATED PROMINENT DRAFT FILE UPLOAD ZONE */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-blue-600" />
            3. Upload Document Draft (PDF, Word, Text, Notes)
          </label>

          {!fileStats ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
                isDragging
                  ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-md'
                  : 'border-slate-300 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-400 text-slate-700'
              }`}
            >
              <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                <UploadCloud className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Click to Browse or Drag & Drop your proposal draft here
                </p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Supports Word (.docx), PDF, Text (.txt), Markdown (.md), JSON, CSV
                </p>
              </div>
              <span className="px-4 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs">
                Select File
              </span>
            </div>
          ) : (
            /* Uploaded File Card */
            <div className="bg-blue-50 border-2 border-blue-300 rounded-3xl p-4 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600 text-white rounded-2xl">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm text-slate-900">{fileStats.name}</h4>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-200 text-blue-900 rounded-md">
                      {fileStats.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{fileStats.size}</span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Draft text extracted & added to decision analyzer below.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={removeFile}
                className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-rose-50 hover:border-rose-300 text-rose-700 font-bold text-xs rounded-xl flex items-center gap-1 transition"
                title="Remove attached file"
              >
                <X className="w-4 h-4 text-rose-600" />
                Remove Draft
              </button>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".txt,.md,.json,.csv,.pdf,.doc,.docx"
            className="hidden"
          />
        </div>

        {/* Main Decision Goal Input Box with Voice Button */}
        <div>
          <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
            <label className="block text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              4. Decision Summary & Goal *
            </label>

            {/* Voice Input Button */}
            <button
              type="button"
              onClick={toggleRecording}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border ${
                isRecording
                  ? 'bg-rose-600 text-white border-rose-600 animate-pulse shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
              title="Speak using your microphone"
            >
              {isRecording ? (
                <>
                  <MicOff className="w-4 h-4 text-white" />
                  <span>Listening... (Click to Stop)</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 text-rose-600" />
                  <span>Record Voice (Mic)</span>
                </>
              )}
            </button>
          </div>

          {/* Voice Indicator Banner */}
          {isRecording && (
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-2xl mb-2 flex items-center gap-2 text-xs font-bold text-rose-900">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
              </span>
              <span>Recording microphone... Speak clearly now.</span>
            </div>
          )}

          <textarea
            required
            rows={4}
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            placeholder="Type your goal here, speak using the Voice Record button, or upload a proposal draft above..."
            className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 leading-relaxed"
          />
        </div>

        {/* Facts & Constraints Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">
              Facts you know right now (1 per line):
            </label>
            <textarea
              rows={2}
              value={availableDataText}
              onChange={(e) => setAvailableDataText(e.target.value)}
              placeholder="e.g., Current monthly income: $18,000&#10;We have 3 team members"
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-3.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">
              Limits or boundaries (1 per line):
            </label>
            <textarea
              rows={2}
              value={constraintsText}
              onChange={(e) => setConstraintsText(e.target.value)}
              placeholder="e.g., Must finish in 6 months&#10;Budget limit is $50,000 maximum"
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-3.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* Big Action Button */}
        <div className="flex flex-wrap justify-between items-center gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Click below to generate your 8-step risk analysis.</span>
          </div>

          <button
            type="submit"
            disabled={isAnalyzing || !goalText.trim()}
            className={`px-8 py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-3 transition shadow-md ${
              isAnalyzing || !goalText.trim()
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-98'
            }`}
          >
            {isAnalyzing ? (
              <>
                <span className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></span>
                Finding Risks & Alternatives...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 fill-white" />
                Find Hidden Risks Now
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
