import React, { useState } from 'react';
import { StarStory } from '../../types';
import { Target, CheckCircle2, ChevronDown, ChevronUp, Award, Sparkles, Lightbulb } from 'lucide-react';

interface StarPrepTabProps {
  stories: StarStory[];
  onTogglePracticed: (storyId: string) => void;
  onNavigateToMock: (question: string) => void;
}

export const StarPrepTab: React.FC<StarPrepTabProps> = ({
  stories,
  onTogglePracticed,
  onNavigateToMock,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(stories[0]?.id || null);

  if (!stories || stories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-slate-500 space-y-4 bg-white rounded-2xl border border-[#e2eccb]">
        <Target className="w-12 h-12 text-lime-400 animate-pulse" />
        <h3 className="text-lg font-bold text-slate-900">No STAR Stories Generated</h3>
        <p className="text-sm max-w-md text-slate-600">
          Click "STAR Prep" in the copilot panel to build tailored interview responses mapped directly to the job requirements.
        </p>
      </div>
    );
  }

  const categories = ['All', 'Technical', 'Behavioral', 'Situational', 'Leadership'];
  const filtered = selectedCategory === 'All' 
    ? stories 
    : stories.filter(s => s.category.toLowerCase() === selectedCategory.toLowerCase());

  const practicedCount = stories.filter(s => s.practiced).length;
  const progressPercent = Math.round((practicedCount / stories.length) * 100);

  return (
    <div className="space-y-5 pb-12 animate-in fade-in duration-200">
      {/* Progress & Category Filter */}
      <div className="p-5 rounded-2xl bg-white border border-[#e2eccb] space-y-3.5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-lime-600" />
              <span>STAR Method Interview Guide</span>
            </h3>
            <p className="text-xs text-slate-600">
              Structured responses demonstrating real technical leadership and quantifiable impact.
            </p>
          </div>

          <div className="flex items-center space-x-2.5 text-xs">
            <span className="text-slate-600 font-medium">Readiness:</span>
            <div className="w-28 h-2.5 rounded-full bg-[#f4fae6] overflow-hidden border border-[#d9e6be]">
              <div 
                className="h-full bg-[#65a30d] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-bold text-[#365314]">{practicedCount}/{stories.length} Done</span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#65a30d] text-white shadow-2xs'
                  : 'bg-[#f7faee] text-slate-700 hover:text-slate-900 border border-[#d9e6be]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3.5">
        {filtered.map((story) => {
          const isExpanded = expandedId === story.id;

          return (
            <div
              key={story.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded 
                  ? 'bg-white border-[#84cc16] shadow-sm' 
                  : 'bg-white border-[#e2eccb] hover:border-[#c3d99e]'
              }`}
            >
              {/* Card Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : story.id)}
                className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-[#ecfccb] text-[#365314] border border-[#d9f99d]">
                      {story.category}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      🎯 {story.targetSkill}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {story.question}
                  </h4>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePracticed(story.id);
                    }}
                    className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                      story.practiced
                        ? 'bg-[#ecfccb] border-[#bef264] text-[#365314]'
                        : 'bg-[#f7faee] border-[#d9e6be] text-slate-400 hover:text-slate-600'
                    }`}
                    title={story.practiced ? 'Marked as Practiced' : 'Mark as Practiced'}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <div className="p-1 rounded-lg text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded STAR Breakdown */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-[#edf5dc] space-y-4 bg-[#fbfdf7]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {/* S: Situation */}
                    <div className="p-3.5 rounded-xl bg-white border border-[#e2eccb] space-y-1 shadow-2xs">
                      <div className="font-bold text-blue-700 flex items-center space-x-1.5">
                        <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">S</span>
                        <span>Situation</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed pl-6">{story.situation}</p>
                    </div>

                    {/* T: Task */}
                    <div className="p-3.5 rounded-xl bg-white border border-[#e2eccb] space-y-1 shadow-2xs">
                      <div className="font-bold text-indigo-700 flex items-center space-x-1.5">
                        <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[10px]">T</span>
                        <span>Task</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed pl-6">{story.task}</p>
                    </div>

                    {/* A: Action */}
                    <div className="p-3.5 rounded-xl bg-white border border-[#e2eccb] space-y-1 shadow-2xs">
                      <div className="font-bold text-[#4d7c0f] flex items-center space-x-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#ecfccb] flex items-center justify-center text-[10px]">A</span>
                        <span>Action</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed pl-6">{story.action}</p>
                    </div>

                    {/* R: Result */}
                    <div className="p-3.5 rounded-xl bg-white border border-[#e2eccb] space-y-1 shadow-2xs">
                      <div className="font-bold text-emerald-700 flex items-center space-x-1.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">R</span>
                        <span>Result</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed pl-6">{story.result}</p>
                    </div>
                  </div>

                  {/* Key Metric & Delivery Tip */}
                  <div className="p-3 rounded-xl bg-[#ecfccb] border border-[#d9f99d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center space-x-2 text-[#365314]">
                      <Award className="w-4 h-4 shrink-0 text-lime-700" />
                      <span><strong>Key Metric to Quote:</strong> {story.keyMetric}</span>
                    </div>

                    <button
                      onClick={() => onNavigateToMock(story.question)}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#f7faee] text-[#365314] border border-[#bef264] text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                    >
                      🎙️ Practice in Simulator
                    </button>
                  </div>

                  <div className="flex items-start space-x-2 text-xs text-slate-600 pl-1">
                    <Lightbulb className="w-3.5 h-3.5 text-lime-600 shrink-0 mt-0.5" />
                    <span><strong>Pro Coach Tip:</strong> {story.deliveryTip}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
