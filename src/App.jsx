import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputWorkbench from './components/InputWorkbench';
import CognitivePipeline from './components/CognitivePipeline';
import ContextMappingView from './components/ContextMappingView';
import BlindSpotEngineView from './components/BlindSpotEngineView';
import DecisionTwinView from './components/DecisionTwinView';
import RiskMatrixView from './components/RiskMatrixView';
import CounterProbesView from './components/CounterProbesView';
import RecommendationMatrixView from './components/RecommendationMatrixView';
import LearningLoopView from './components/LearningLoopView';
import JsonExporterView from './components/JsonExporterView';
import PresetScenariosView from './components/PresetScenariosView';

import { PRESET_SCENARIOS } from './data/presetScenarios';
import { analyzeDecision } from './services/blindSpotEngine';
import { 
  checkSupabaseConnection, 
  saveEvaluationToSupabase, 
  getSavedEvaluations 
} from './services/supabaseClient';
import { Database, Calendar, ShieldAlert, ArrowRight, X, CloudCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('hud');
  const [activePipelineStep, setActivePipelineStep] = useState('blindspots');
  const [currentScenario, setCurrentScenario] = useState(PRESET_SCENARIOS[0]);
  const [evaluation, setEvaluation] = useState(PRESET_SCENARIOS[0].evaluation);
  const [textSize, setTextSize] = useState('normal');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Supabase state
  const [supabaseConnected, setSupabaseConnected] = useState(true);
  const [savedHistory, setSavedHistory] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  useEffect(() => {
    async function initSupabase() {
      const conn = await checkSupabaseConnection();
      setSupabaseConnected(conn.connected);
      const history = await getSavedEvaluations();
      setSavedHistory(history || []);
    }
    initSupabase();
  }, []);

  const handleRunAnalysis = async (inputParams) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeDecision(inputParams);
      setEvaluation(result);
      setActiveTab('hud');
      setActivePipelineStep('blindspots');
      
      // Auto-save evaluation to Supabase
      saveEvaluationToSupabase(result).then(async () => {
        const history = await getSavedEvaluations();
        setSavedHistory(history || []);
      });
    } catch (err) {
      console.error("Error analyzing decision:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveToCloud = async () => {
    if (!evaluation) return;
    await saveEvaluationToSupabase(evaluation);
    const history = await getSavedEvaluations();
    setSavedHistory(history || []);
  };

  const handleSelectPreset = (scenario) => {
    setCurrentScenario(scenario);
    setEvaluation(scenario.evaluation);
    setActiveTab('hud');
    setActivePipelineStep('blindspots');
  };

  const loadHistoryItem = (item) => {
    if (item.evaluation_json) {
      setEvaluation(item.evaluation_json);
      setActiveTab('hud');
      setActivePipelineStep('blindspots');
      setShowHistoryModal(false);
    }
  };

  const textSizeClass = 
    textSize === 'xlarge' ? 'text-xl' :
    textSize === 'large' ? 'text-lg' : 'text-base';

  return (
    <div className={`min-h-screen bg-[#F6F8FA] text-slate-900 font-sans flex flex-col justify-between ${textSizeClass}`}>
      <div>
        {/* Accessible Header with Supabase integration */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          textSize={textSize}
          setTextSize={setTextSize}
          supabaseConnected={supabaseConnected}
          onSaveToCloud={handleSaveToCloud}
          savedCount={savedHistory.length}
          onShowHistory={() => setShowHistoryModal(true)}
        />

        {/* Main Application Container */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {activeTab === 'scenarios' ? (
            <PresetScenariosView onSelectScenario={handleSelectPreset} />
          ) : activeTab === 'json' ? (
            <JsonExporterView evaluation={evaluation} />
          ) : (
            <>
              {/* Decision Input Workbench */}
              <InputWorkbench
                onRunAnalysis={handleRunAnalysis}
                onSelectPreset={handleSelectPreset}
                isAnalyzing={isAnalyzing}
                currentGoal={evaluation?.summary?.coreGoal}
                currentDomain={currentScenario?.domain}
              />

              {/* Step Navigation Bar */}
              <CognitivePipeline
                activeStep={activePipelineStep}
                setActiveStep={setActivePipelineStep}
                evaluation={evaluation}
              />

              {/* Step Content Panels */}
              <div className="mt-6">
                {activePipelineStep === 'context' && (
                  <ContextMappingView evaluation={evaluation} />
                )}
                {activePipelineStep === 'blindspots' && (
                  <BlindSpotEngineView evaluation={evaluation} />
                )}
                {activePipelineStep === 'twin' && (
                  <DecisionTwinView evaluation={evaluation} />
                )}
                {activePipelineStep === 'riskmap' && (
                  <RiskMatrixView evaluation={evaluation} />
                )}
                {activePipelineStep === 'probes' && (
                  <CounterProbesView evaluation={evaluation} />
                )}
                {activePipelineStep === 'options' && (
                  <RecommendationMatrixView evaluation={evaluation} />
                )}
                {activePipelineStep === 'loop' && (
                  <LearningLoopView evaluation={evaluation} />
                )}
                {activePipelineStep === 'json' && (
                  <JsonExporterView evaluation={evaluation} />
                )}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Saved Supabase History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-4 max-h-[85vh] flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-2xl">
                  <CloudCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Saved Supabase Decision History
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Evaluations saved live in your cloud database (https://rewxqwdwqtxiqgjttnrv.supabase.co)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-xl text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* List of Saved Evaluations */}
            <div className="overflow-y-auto space-y-3 flex-1 pr-1">
              {savedHistory.length > 0 ? (
                savedHistory.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => loadHistoryItem(item)}
                    className="p-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl cursor-pointer transition flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-sm text-slate-900">
                        {item.core_goal || item.evaluation_json?.summary?.coreGoal || "Decision Evaluation"}
                      </h4>
                      <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {new Date(item.created_at || Date.now()).toLocaleDateString()}
                        </span>
                        <span>Risk: <strong className="text-rose-600">{item.primary_risk_score || 'Medium'}</strong></span>
                        <span>Blind Spots: <strong>{item.blindspot_count || 5}</strong></span>
                      </div>
                    </div>

                    <button
                      className="px-3.5 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
                    >
                      Load <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-500 text-sm font-medium">
                  No saved decision evaluations found in Supabase yet. Run a decision scan to save automatically!
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 pt-4 flex justify-end">
              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl"
              >
                Close History
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Accessible Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm font-medium text-slate-600 mt-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-3">
          <span className="font-bold text-slate-800">Blind Spot AI — Clear Decision Helper</span>
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            <CloudCheck className="w-4 h-4 text-emerald-600" /> Connected to Supabase Cloud Database
          </span>
        </div>
      </footer>
    </div>
  );
}
