import React from 'react';
import { Settings, RefreshCw, Award, Zap } from 'lucide-react';
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
  return (
    <header className="sticky top-0 z-30 border-b border-[#262836] bg-[#090a0f]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff6600] font-['Sora'] font-bold text-white shadow-md shadow-[#ff6600]/30 text-lg">
            N
          </div>
          <div className="flex items-center gap-2">
            <span className="font-['Sora'] text-lg font-bold text-white tracking-tight">
              NextRole AI
            </span>
            <span className="hidden sm:inline-block rounded-md bg-[#ff6600]/15 border border-[#ff6600]/30 px-2 py-0.5 text-[11px] font-semibold text-[#ffa05c]">
              Career Copilot
            </span>
          </div>
        </div>

        {/* Center: Live Status Indicator */}
        <div className="hidden md:flex items-center gap-2 text-xs text-[#94a3b8]">
          <span className="relative flex h-2 w-2">
            {isProcessing ? (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6600] opacity-75" />
            ) : null}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isProcessing ? 'bg-[#ff6600]' : 'bg-[#10b981]'}`} />
          </span>
          <span className="font-medium">
            {isProcessing ? 'Analyzing career graph...' : 'Copilot ready'}
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* 100% ATS Benchmark */}
          <button
            onClick={onLoad100Ats}
            title="Load 100% ATS Score Benchmark Profile"
            className="flex items-center gap-1.5 rounded-lg bg-[#ff6600] hover:bg-[#ff771a] px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-[#ff6600]/25 transition active:scale-95 cursor-pointer"
          >
            <Award className="h-3.5 w-3.5" />
            <span>💯 100% ATS</span>
          </button>

          {/* Sample Profile */}
          <button
            onClick={onLoadDemo}
            title="Load sample candidate profile"
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-[#262836] bg-[#111218] hover:bg-[#1a1b24] px-3.5 py-2 text-xs font-semibold text-[#cbd5e1] hover:text-white transition cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 text-[#ff6600]" />
            <span>Sample Profile</span>
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            title="Reset to default"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262836] bg-[#111218] hover:bg-[#1a1b24] text-[#94a3b8] hover:text-white transition cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>

          {/* Settings */}
          <button
            onClick={onOpenConfig}
            title="Model & Gemini Settings"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262836] bg-[#111218] hover:bg-[#1a1b24] text-[#94a3b8] hover:text-white transition cursor-pointer"
          >
            <Settings className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
