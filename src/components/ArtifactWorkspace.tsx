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
      label: 'STAR Prep Guide',
      icon: Sparkles,
      badge: stories.length > 0 ? `${stories.length} Qs` : undefined,
    },
    {
      id: 'battlecard',
      label: 'Day-of Battlecard',
      icon: Zap,
      badge: battlecard ? 'Ready' : undefined,
    },
    {
      id: 'mock',
      label: 'Mock Simulator',
      icon: Mic,
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f7faee]">
      {/* Workspace Tabs Header */}
      <div className="h-14 border-b border-[#e0ecc8] bg-white px-5 flex items-center justify-between overflow-x-auto no-scrollbar shrink-0 shadow-2xs">
        <div className="flex items-center space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#ecfccb] text-[#365314] border border-[#bef264] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-[#f4fae6]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#4d7c0f]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isActive 
                      ? 'bg-[#d9f99d] text-[#365314]' 
                      : 'bg-[#f4fae6] text-[#4d7c0f] border border-[#d9e6be]'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
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
    </div>
  );
};
