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
      <div className="flex flex-col items-center justify-center p-12 text-center text-slate-400 space-y-4">
        <Target className="w-12 h-12 text-slate-600 animate-pulse" />
        <h3 className="text-lg font-semibold text-slate-300">No STAR Stories Generated</h3>
        <p className="text-sm max-w-md text-slate-400">
          Click "Generate STAR Prep" in the copilot panel to build tailored interview responses mapped directly to the job requirements.
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
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>STAR Method Interview Guide</span>
            </h3>
            <p className="text-xs text-slate-400">
              Structured responses demonstrating real technical leadership and quantifiable impact.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400">Readiness:</span>
            <div className="w-28 h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-semibold text-emerald-400">{practicedCount}/{stories.length} Done</span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filtered.map((story) => {
          const isExpanded = expandedId === story.id;

          return (
            <div
              key={story.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded 
                  ? 'bg-slate-900/90 border-purple-500/50 shadow-xl shadow-purple-950/20' 
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : story.id)}
                className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {story.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      🎯 {story.targetSkill}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
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
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      story.practiced
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                        : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
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
                <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {/* S: Situation */}
                    <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-900/40 space-y-1">
                      <div className="font-bold text-blue-400 flex items-center space-x-1.5">
                        <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px]">S</span>
                        <span>Situation</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed pl-6">{story.situation}</p>
                    </div>

                    {/* T: Task */}
                    <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-900/40 space-y-1">
                      <div className="font-bold text-indigo-400 flex items-center space-x-1.5">
                        <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px]">T</span>
                        <span>Task</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed pl-6">{story.task}</p>
                    </div>

                    {/* A: Action */}
                    <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-900/40 space-y-1">
                      <div className="font-bold text-purple-400 flex items-center space-x-1.5">
                        <span className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px]">A</span>
                        <span>Action</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed pl-6">{story.action}</p>
                    </div>

                    {/* R: Result */}
                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1">
                      <div className="font-bold text-emerald-400 flex items-center space-x-1.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px]">R</span>
                        <span>Result</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed pl-6">{story.result}</p>
                    </div>
                  </div>

                  {/* Key Metric & Delivery Tip */}
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center space-x-2 text-amber-300">
                      <Award className="w-4 h-4 shrink-0" />
                      <span><strong>Key Metric to Quote:</strong> {story.keyMetric}</span>
                    </div>

                    <button
                      onClick={() => onNavigateToMock(story.question)}
                      className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      🎙️ Practice in Mock Simulator
                    </button>
                  </div>

                  <div className="flex items-start space-x-2 text-xs text-slate-400 pl-1">
                    <Lightbulb className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
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
