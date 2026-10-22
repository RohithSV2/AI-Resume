import React, { useState } from 'react';
import { JobDescriptionData, MockQuestionResult, StarStory } from '../../types';
import { evaluateMockAnswer } from '../../services/aiService';
import { Mic, Award, RefreshCw, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

interface MockInterviewTabProps {
  jd: JobDescriptionData | null;
  stories: StarStory[];
  initialQuestion?: string;
}

export const MockInterviewTab: React.FC<MockInterviewTabProps> = ({
  jd,
  stories,
  initialQuestion,
}) => {
  const defaultQuestions = stories.length > 0 
    ? stories.map(s => s.question)
    : [
        `Can you walk us through a time you architected a high-traffic web service and handled unexpected production bottlenecks?`,
        `Tell me about a situation where you had to resolve a severe technical disagreement with a teammate or stakeholder.`,
        `How do you evaluate engineering trade-offs when integrating GenAI APIs under tight latency and budget limits?`
      ];

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<MockQuestionResult | null>(null);

  const activeQuestion = initialQuestion || defaultQuestions[currentQIndex] || defaultQuestions[0];

  const handleEvaluate = async () => {
    if (!userAnswer.trim()) return;
    setEvaluating(true);
    try {
      const evaluation = await evaluateMockAnswer(
        activeQuestion,
        userAnswer,
        jd || {
          roleTitle: "Full-Stack Engineer",
          company: "Tech Company",
          rawText: "",
          requiredSkills: ["React", "Python"],
          bonusSkills: [],
          responsibilities: []
        }
      );
      setResult(evaluation);
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluating(false);
    }
  };

  const handleNextQuestion = () => {
    const nextIdx = (currentQIndex + 1) % defaultQuestions.length;
    setCurrentQIndex(nextIdx);
    setUserAnswer('');
    setResult(null);
  };

  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#111218] border border-[#262836] flex items-center justify-between shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#ff6600]/15 text-[#ffa05c] border border-[#ff6600]/30">
              AI Mock Simulator
            </span>
            <span className="text-xs text-[#94a3b8] font-medium hidden sm:inline">
              Interactive Interview Practice & Instant STAR Scoring
            </span>
          </div>
          <p className="text-xs text-[#64748b] mt-1">
            Question {currentQIndex + 1} of {defaultQuestions.length}
          </p>
        </div>

        <button
          onClick={handleNextQuestion}
          className="px-3 py-1.5 rounded-lg bg-[#181924] hover:bg-[#202230] text-[#cbd5e1] hover:text-white border border-[#262836] text-xs font-medium flex items-center space-x-1.5 transition cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Next Question</span>
        </button>
      </div>

      {/* Active Question Box */}
      <div className="p-6 rounded-2xl bg-[#151620] border border-[#ff6600]/40 shadow-xl space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-[#ffa05c] flex items-center space-x-1.5">
          <Mic className="w-4 h-4 text-[#ff6600]" />
          <span>Interviewer Prompt</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold font-['Sora'] text-white leading-snug">
          "{activeQuestion}"
        </h3>
        <p className="text-xs text-[#94a3b8]">
          💡 <em>Tip: Structure your response using the STAR method: Situation, Task, Action, and Measurable Result.</em>
        </p>
      </div>

      {/* User Answer Textarea */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#cbd5e1] flex items-center justify-between">
          <span>Your Response</span>
          <span className="text-[11px] text-[#64748b]">
            {userAnswer.trim().split(/\s+/).filter(Boolean).length} words
          </span>
        </label>
        <textarea
          rows={5}
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="e.g. During my previous role at Apex Tech, our micro-frontend dashboard experienced severe latency under 40k active users. I was tasked with reducing bundle size..."
          className="w-full p-4 rounded-xl bg-[#0d0e14] border border-[#262836] text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600] transition leading-relaxed shadow-xl"
        />

        <div className="flex justify-end space-x-2 pt-1">
          <button
            onClick={handleEvaluate}
            disabled={evaluating || !userAnswer.trim()}
            className="px-5 py-2.5 rounded-xl bg-[#ff6600] hover:bg-[#ff771a] disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-[#ff6600]/25 flex items-center space-x-2 cursor-pointer transition"
          >
            {evaluating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Evaluating Response...</span>
              </>
            ) : (
              <>
                <Award className="w-3.5 h-3.5" />
                <span>Score My Response</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Real-Time Evaluation Result */}
      {result && (
        <div className="p-6 rounded-2xl bg-[#111218] border border-[#262836] shadow-2xl space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-[#262836] pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-[#ff6600]/15 border border-[#ff6600]/40 flex flex-col items-center justify-center text-[#ffa05c] font-bold">
                <span className="text-lg font-['Sora']">{result.score}</span>
                <span className="text-[9px] uppercase -mt-1 text-[#94a3b8]">/ 10</span>
              </div>
              <div>
                <h4 className="text-sm font-bold font-['Sora'] text-white">Interview Performance Rating</h4>
                <p className="text-xs text-[#94a3b8]">
                  {result.score >= 8 ? '🌟 Outstanding execution & delivery' : result.score >= 6 ? '👍 Good structure with room for metric enhancement' : '⚠️ Missing crucial STAR components'}
                </p>
              </div>
            </div>
          </div>

          {/* STAR Checklist */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${result.starRatings.situation ? 'bg-[#10b981]/15 border-[#10b981]/30 text-[#6ee7b7]' : 'bg-[#171822] border-[#262836] text-[#64748b]'}`}>
              {result.starRatings.situation ? <CheckCircle2 className="w-4 h-4 text-[#10b981]" /> : <XCircle className="w-4 h-4 text-[#64748b]" />}
              <span>Situation</span>
            </div>

            <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${result.starRatings.task ? 'bg-[#10b981]/15 border-[#10b981]/30 text-[#6ee7b7]' : 'bg-[#171822] border-[#262836] text-[#64748b]'}`}>
              {result.starRatings.task ? <CheckCircle2 className="w-4 h-4 text-[#10b981]" /> : <XCircle className="w-4 h-4 text-[#64748b]" />}
              <span>Task</span>
            </div>

            <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${result.starRatings.action ? 'bg-[#10b981]/15 border-[#10b981]/30 text-[#6ee7b7]' : 'bg-[#171822] border-[#262836] text-[#64748b]'}`}>
              {result.starRatings.action ? <CheckCircle2 className="w-4 h-4 text-[#10b981]" /> : <XCircle className="w-4 h-4 text-[#64748b]" />}
              <span>Action (You)</span>
            </div>

            <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${result.starRatings.result ? 'bg-[#10b981]/15 border-[#10b981]/30 text-[#6ee7b7]' : 'bg-[#171822] border-[#262836] text-[#64748b]'}`}>
              {result.starRatings.result ? <CheckCircle2 className="w-4 h-4 text-[#10b981]" /> : <XCircle className="w-4 h-4 text-[#64748b]" />}
              <span>Metric Result</span>
            </div>
          </div>

          {/* Feedback */}
          <div className="p-3.5 rounded-xl bg-[#171822] border border-[#262836] space-y-1.5 text-xs text-[#cbd5e1]">
            <div className="font-semibold text-[#ffa05c] flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ff6600]" />
              <span>Coach Feedback</span>
            </div>
            <p className="leading-relaxed">{result.feedback}</p>
          </div>

          {/* Improved Answer Snippet */}
          <div className="p-3.5 rounded-xl bg-[#ff6600]/10 border border-[#ff6600]/30 space-y-1.5 text-xs">
            <div className="font-semibold text-[#ffa05c] flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
              <span>Suggested Enhancement Ending</span>
            </div>
            <p className="text-[#f1f5f9] italic leading-relaxed">
              "{result.improvedAnswerSnippet}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
