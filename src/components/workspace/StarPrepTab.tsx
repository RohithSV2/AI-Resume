import React, { useState } from 'react';
import { StarStory } from '../../types';
import { Target, CheckCircle2, ChevronDown, ChevronUp, Sparkles, Lightbulb } from 'lucide-react';

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
      <div className="flex flex-col items-center justify-center p-12 text-center text-[#94a3b8] space-y-4 rounded-2xl border border-[#262836] bg-[#111218]">
        <Target className="w-12 h-12 text-[#ff6600] animate-pulse" />
        <h3 className="text-lg font-bold text-white font-['Sora']">No STAR Stories Generated</h3>
        <p className="text-sm max-w-md text-[#94a3b8]">
          Click "STAR Prep" in the chat panel to build tailored interview responses mapped directly to the job requirements.
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
    <div className="space-y-4 pb-12 animate-in fade-in duration-200">
      {/* Progress & Category Filter */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#111218] border border-[#262836] space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white font-['Sora'] flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#ff6600]" />
              <span>STAR Method Interview Guide</span>
            </h3>
            <p className="text-xs text-[#94a3b8] mt-0.5">
              Structured responses demonstrating real technical leadership and quantifiable impact.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="text-[#94a3b8] font-medium">Readiness:</span>
            <div className="w-28 h-2.5 rounded-full bg-[#1e202b] overflow-hidden">
              <div 
                className="h-full bg-[#ff6600] transition-all duration-300 shadow-sm shadow-[#ff6600]/40"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-bold text-[#ffa05c]">{practicedCount}/{stories.length} Done</span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#ff6600] text-white shadow-md shadow-[#ff6600]/25'
                  : 'bg-[#181924] text-[#cbd5e1] hover:text-white border border-[#262836]'
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
                  ? 'bg-[#111218] border-[#ff6600] shadow-xl shadow-[#ff6600]/10' 
                  : 'bg-[#111218] border-[#262836] hover:border-[#ff6600]/40'
              }`}
            >
              {/* Card Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : story.id)}
                className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#ff6600]/15 text-[#ffa05c] border border-[#ff6600]/30 uppercase tracking-wider">
                      {story.category}
                    </span>
                    {story.practiced && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#10b981]/15 text-[#6ee7b7] border border-[#10b981]/30 flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3 text-[#10b981]" />
                        <span>Practiced</span>
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white font-['Sora'] leading-snug">
                    "{story.question}"
                  </h4>
                  <p className="text-xs text-[#94a3b8] flex items-center space-x-1">
                    <Lightbulb className="w-3.5 h-3.5 text-[#ff6600]" />
                    <span>Target Skill: <strong className="text-[#cbd5e1]">{story.targetSkill}</strong></span>
                  </p>
                </div>

                <div className="p-1 rounded-lg text-[#94a3b8]">
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-[#ff6600]" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Expanded STAR Breakdown */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-[#262836] space-y-4 bg-[#0d0e14]">
                  {/* STAR 4 Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {/* Situation */}
                    <div className="p-3.5 rounded-xl bg-[#171822] border border-[#262836] space-y-1">
                      <span className="font-extrabold text-[#ffa05c] uppercase tracking-wider text-[11px] block">
                        Situation (Context)
                      </span>
                      <p className="text-[#cbd5e1] leading-relaxed">{story.situation}</p>
                    </div>

                    {/* Task */}
                    <div className="p-3.5 rounded-xl bg-[#171822] border border-[#262836] space-y-1">
                      <span className="font-extrabold text-[#ffa05c] uppercase tracking-wider text-[11px] block">
                        Task (Objective)
                      </span>
                      <p className="text-[#cbd5e1] leading-relaxed">{story.task}</p>
                    </div>

                    {/* Action */}
                    <div className="p-3.5 rounded-xl bg-[#171822] border border-[#262836] space-y-1">
                      <span className="font-extrabold text-[#ffa05c] uppercase tracking-wider text-[11px] block">
                        Action (What YOU Did)
                      </span>
                      <p className="text-[#cbd5e1] leading-relaxed">{story.action}</p>
                    </div>

                    {/* Result */}
                    <div className="p-3.5 rounded-xl bg-[#171822] border border-[#262836] space-y-1">
                      <span className="font-extrabold text-[#10b981] uppercase tracking-wider text-[11px] block">
                        Result (Metrics & ROI)
                      </span>
                      <p className="text-[#cbd5e1] leading-relaxed font-medium">{story.result}</p>
                    </div>
                  </div>

                  {/* Talking Track Tip */}
                  <div className="p-3.5 rounded-xl bg-[#ff6600]/10 border border-[#ff6600]/30 text-xs text-[#cbd5e1]">
                    <span className="font-bold text-[#ffa05c]">💡 Executive Delivery Coach: </span>
                    <span>{story.deliveryTip}</span>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => onTogglePracticed(story.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer ${
                        story.practiced
                          ? 'bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/40'
                          : 'bg-[#171822] hover:bg-[#202230] text-[#cbd5e1] border border-[#262836]'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{story.practiced ? 'Marked Practiced' : 'Mark as Practiced'}</span>
                    </button>

                    <button
                      onClick={() => onNavigateToMock(story.question)}
                      className="px-4 py-1.5 rounded-xl bg-[#ff6600] hover:bg-[#ff771a] text-white text-xs font-bold shadow-md shadow-[#ff6600]/25 transition cursor-pointer"
                    >
                      <span>Practice in Simulator →</span>
                    </button>
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
