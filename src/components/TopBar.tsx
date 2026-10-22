import React from 'react';
import { Sparkles, Settings, Bot, Zap, RefreshCw, FileText } from 'lucide-react';
import { AgentType } from '../types';

interface TopBarProps {
  activeAgent: AgentType;
  onOpenConfig: () => void;
  onLoadDemo: () => void;
  onReset: () => void;
  isProcessing: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeAgent,
  onOpenConfig,
  onLoadDemo,
  onReset,
  isProcessing,
}) => {
  const getAgentLabel = (agent: AgentType) => {
    switch (agent) {
      case 'intake':
        return { name: 'Document Intake Agent', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
      case 'recon':
        return { name: 'Hiring Recon Agent', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
      case 'tailor':
        return { name: 'Resume Tailor Agent', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' };
      case 'interview_coach':
        return { name: 'Interview Coach Agent', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
      case 'battlecard':
        return { name: 'Battlecard Agent', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' };
      default:
        return { name: 'NextRole Orchestrator', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' };
    }
  };

  const agentInfo = getAgentLabel(activeAgent);

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 flex items-center justify-between sticky top-0 z-40">
      {/* Brand & Title */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 border border-purple-400/30">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-white tracking-tight">NextRole</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
              AI Copilot
            </span>
            <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
              College Edition
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden sm:block">GenAI Career Advancement & Multi-Agent Prep System</p>
        </div>
      </div>

      {/* Center: Live Agent Status */}
      <div className="hidden md:flex items-center space-x-2">
        <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1.5 ${agentInfo.color}`}>
          <Bot className="w-3.5 h-3.5 animate-pulse" />
          <span>{agentInfo.name}</span>
          {isProcessing && (
            <span className="w-2 h-2 rounded-full bg-current animate-ping ml-1" />
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2">
        {/* 1-Click Demo Button */}
        <button
          onClick={onLoadDemo}
          title="Load pre-configured candidate profile & job description"
          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-medium shadow-md shadow-indigo-500/20 flex items-center space-x-1.5 transition-all transform active:scale-95 cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>⚡ Load College Demo</span>
        </button>

        {/* Reset Button */}
        <button
          onClick={onReset}
          title="Reset workspace"
          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Config Modal Button */}
        <button
          onClick={onOpenConfig}
          title="Gemini API & Model Settings"
          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
