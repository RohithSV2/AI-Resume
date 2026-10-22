import React from 'react';
import { Sparkles, Settings, Bot, Zap, RefreshCw, Award } from 'lucide-react';
import { AgentType } from '../types';

interface TopBarProps {
  activeAgent: AgentType;
  onOpenConfig: () => void;
  onLoadDemo: () => void;
  onLoad100Ats: () => void;
  onReset: () => void;
  isProcessing: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeAgent,
  onOpenConfig,
  onLoadDemo,
  onLoad100Ats,
  onReset,
  isProcessing,
}) => {
  const getAgentLabel = (agent: AgentType) => {
    switch (agent) {
      case 'intake':
        return { name: 'Document Intake', color: 'bg-lime-100 text-lime-800 border-lime-300' };
      case 'recon':
        return { name: 'Hiring Recon', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'tailor':
        return { name: 'Resume Tailor', color: 'bg-lime-100 text-lime-900 border-lime-300' };
      case 'interview_coach':
        return { name: 'Interview Coach', color: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'battlecard':
        return { name: 'Battlecard Gen', color: 'bg-teal-100 text-teal-800 border-teal-300' };
      default:
        return { name: 'AI Copilot Ready', color: 'bg-[#ecfccb] text-[#365314] border-[#bef264]' };
    }
  };

  const agentInfo = getAgentLabel(activeAgent);

  return (
    <header className="h-16 border-b border-[#e0ecc8] bg-white/95 backdrop-blur-md px-5 flex items-center justify-between sticky top-0 z-40 shadow-xs">
      {/* Brand */}
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-[#84cc16] flex items-center justify-center text-white shadow-sm shadow-lime-500/30">
          <Sparkles className="w-5 h-5 fill-current" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-lg text-slate-900 tracking-tight">NextRole</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#ecfccb] text-[#3f6212] font-bold border border-[#d9f99d]">
              AI Career Copilot
            </span>
          </div>
          <p className="text-[11px] text-slate-500 hidden sm:block">Smart Resume Tailoring & Interview Prep</p>
        </div>
      </div>

      {/* Center: Clean Status Pill */}
      <div className="hidden lg:flex items-center space-x-2">
        <div className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center space-x-1.5 ${agentInfo.color}`}>
          <Bot className="w-3.5 h-3.5" />
          <span>{agentInfo.name}</span>
          {isProcessing && (
            <span className="w-2 h-2 rounded-full bg-lime-600 animate-ping ml-1" />
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2">
        {/* 100% ATS Benchmark Button */}
        <button
          onClick={onLoad100Ats}
          title="Load 100% ATS Score Resume & Job"
          className="px-3.5 py-2 rounded-xl bg-[#65a30d] hover:bg-[#4d7c0f] text-white text-xs font-bold shadow-sm flex items-center space-x-1.5 transition-all transform active:scale-95 cursor-pointer"
        >
          <Award className="w-3.5 h-3.5" />
          <span>💯 100% ATS Score</span>
        </button>

        {/* Sample Profile Button */}
        <button
          onClick={onLoadDemo}
          title="Load standard tech candidate profile"
          className="px-3 py-2 rounded-xl bg-white hover:bg-[#f7faee] text-slate-700 hover:text-slate-900 border border-[#d9e6be] text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-all cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 text-lime-600 fill-lime-600" />
          <span>Sample Profile</span>
        </button>

        {/* Reset */}
        <button
          onClick={onReset}
          title="Reset chat"
          className="p-2 rounded-xl bg-white hover:bg-[#f7faee] text-slate-500 hover:text-slate-800 border border-[#d9e6be] transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Settings */}
        <button
          onClick={onOpenConfig}
          title="Gemini API & Model Settings"
          className="p-2 rounded-xl bg-white hover:bg-[#f7faee] text-slate-500 hover:text-slate-800 border border-[#d9e6be] transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
