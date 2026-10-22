import React from 'react';
import { Target, FileText, Sparkles, Zap, Mic } from 'lucide-react';
import { ResumeData, JobDescriptionData, ReconAnalysis, StarStory, BattlecardData } from '../types';
import { ReconTab } from './workspace/ReconTab';
import { ResumeTab } from './workspace/ResumeTab';
import { StarPrepTab } from './workspace/StarPrepTab';
import { BattlecardTab } from './workspace/BattlecardTab';
import { MockInterviewTab } from './workspace/MockInterviewTab';

interface ArtifactWorkspaceProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  resume: ResumeData | null;
  jd: JobDescriptionData | null;
  recon: ReconAnalysis | null;
  stories: StarStory[];
  battlecard: BattlecardData | null;
  onUpdateResume: (updated: ResumeData) => void;
  onTogglePracticed: (storyId: string) => void;
  onRunTailoring: () => void;
  isProcessing: boolean;
  selectedMockQuestion?: string;
}

export const ArtifactWorkspace: React.FC<ArtifactWorkspaceProps> = ({
  activeTab,
  onSelectTab,
  resume,
  jd,
  recon,
  stories,
  battlecard,
  onUpdateResume,
  onTogglePracticed,
  onRunTailoring,
  isProcessing,
  selectedMockQuestion,
}) => {
  const tabs = [
    {
      id: 'recon',
      label: 'ATS & Recon',
      icon: Target,
      badge: recon ? `${recon.atsScore}%` : undefined,
      color: 'text-blue-400',
    },
    {
      id: 'resume',
      label: 'Tailored Resume',
      icon: FileText,
      badge: resume?.tailoredSummary ? 'Optimized' : undefined,
      color: 'text-purple-400',
    },
    {
      id: 'star',
      label: 'STAR Prep Guide',
      icon: Sparkles,
      badge: stories.length > 0 ? `${stories.length} Qs` : undefined,
      color: 'text-amber-400',
    },
    {
      id: 'battlecard',
      label: 'Day-of Battlecard',
      icon: Zap,
      badge: battlecard ? 'Ready' : undefined,
      color: 'text-rose-400',
    },
    {
      id: 'mock',
      label: 'Mock Simulator',
      icon: Mic,
      color: 'text-emerald-400',
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950">
      {/* Workspace Tabs Header */}
      <div className="h-13 border-b border-slate-800 bg-slate-900/60 px-4 flex items-center justify-between overflow-x-auto no-scrollbar shrink-0">
        <div className="flex items-center space-x-1 sm:space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? tab.color : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950 text-slate-300 border border-slate-800 font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {activeTab === 'recon' && (
          <ReconTab
            recon={recon}
            jd={jd}
            onNavigateTab={onSelectTab}
            onRunTailoring={onRunTailoring}
            isProcessing={isProcessing}
          />
        )}

        {activeTab === 'resume' && (
          <ResumeTab
            resume={resume}
            onUpdateResume={onUpdateResume}
          />
        )}

        {activeTab === 'star' && (
          <StarPrepTab
            stories={stories}
            onTogglePracticed={onTogglePracticed}
            onNavigateToMock={(q) => {
              onSelectTab('mock');
            }}
          />
        )}

        {activeTab === 'battlecard' && (
          <BattlecardTab battlecard={battlecard} />
        )}

        {activeTab === 'mock' && (
          <MockInterviewTab
            jd={jd}
            stories={stories}
            initialQuestion={selectedMockQuestion}
          />
        )}
      </div>
    </div>
  );
};
