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
  onOptimize100Ats: () => void;
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
  onOptimize100Ats,
  isProcessing,
  selectedMockQuestion,
}) => {
  const tabs = [
    {
      id: 'recon',
      label: 'ATS & Recon',
      icon: Target,
      badge: recon ? `${recon.atsScore}%` : undefined,
    },
    {
      id: 'resume',
      label: 'Tailored Resume',
      icon: FileText,
      badge: resume?.tailoredSummary ? 'Optimized' : undefined,
    },
    {
      id: 'star',
      label: 'STAR Prep',
      icon: Sparkles,
      badge: stories.length > 0 ? `${stories.length} Qs` : undefined,
    },
    {
      id: 'battlecard',
      label: 'Battlecard',
      icon: Zap,
      badge: battlecard ? 'Ready' : undefined,
    },
    {
      id: 'mock',
      label: 'Mock Interview',
      icon: Mic,
    },
  ];

  return (
    <div className="flex-1 min-w-0">
      {/* Tab Navigation: Matching Lovable studio layout */}
      <nav className="mb-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar" role="tablist">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectTab(tab.id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition cursor-pointer ${
                isActive
                  ? 'bg-[#ff6600] text-white shadow-md shadow-[#ff6600]/25 border border-[#ff6600]'
                  : 'bg-[#111218] text-[#94a3b8] hover:text-white hover:bg-[#181924] border border-[#262836]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#64748b]'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[11px] font-bold ${
                    isActive
                      ? 'bg-black/30 text-white'
                      : 'bg-[#1b1d28] text-[#ffa05c] border border-[#ff6600]/30'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Main Tab Content */}
      <div>
        {activeTab === 'recon' && (
          <ReconTab
            recon={recon}
            jd={jd}
            onNavigateTab={onSelectTab}
            onRunTailoring={onRunTailoring}
            onOptimize100Ats={onOptimize100Ats}
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
            onNavigateToMock={() => onSelectTab('mock')}
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
