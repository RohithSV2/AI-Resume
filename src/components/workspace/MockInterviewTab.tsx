import React, { useState } from 'react';
import { JobDescriptionData, MockQuestionResult, StarStory } from '../../types';
import { evaluateMockAnswer } from '../../services/aiService';
import { Mic, Send, Award, RefreshCw, CheckCircle2, XCircle, Sparkles, AlertCircle } from 'lucide-react';

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
    <div className="space-y-5 pb-12 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-md">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              AI Mock Simulator
            </span>
            <span className="text-xs text-slate-400">
              Interactive Interview Practice & Instant STAR Scoring
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Question {currentQIndex + 1} of {defaultQuestions.length}
          </p>
        </div>

        <button
          onClick={handleNextQuestion}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Next Question</span>
        </button>
      </div>

      {/* Active Question Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-purple-500/30 shadow-xl space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 flex items-center space-x-1.5">
          <Mic className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>Interviewer Prompt</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
          "{activeQuestion}"
        </h3>
        <p className="text-xs text-slate-400">
          💡 <em>Tip: Structure your response using the STAR method: Situation, Task, Action, and Measurable Result.</em>
        </p>
      </div>

      {/* User Answer Textarea */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span>Your Response</span>
          <span className="text-[11px] text-slate-500">
            {userAnswer.trim().split(/\s+/).filter(Boolean).length} words
          </span>
        </label>
        <textarea
          rows={5}
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="e.g. During my previous role at Apex Tech, our micro-frontend dashboard experienced severe latency under 40k active users. I was tasked with reducing bundle size..."
          className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors leading-relaxed"
        />

        <div className="flex justify-end space-x-2 pt-1">
          <button
            onClick={handleEvaluate}
            disabled={evaluating || !userAnswer.trim()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 flex items-center space-x-2 cursor-pointer transition-all"
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
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex flex-col items-center justify-center text-purple-300 font-bold">
                <span className="text-lg">{result.score}</span>
                <span className="text-[9px] uppercase -mt-1 text-slate-400">/ 10</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Interview Performance Rating</h4>
                <p className="text-xs text-slate-400">
                  {result.score >= 8 ? '🌟 Outstanding execution & delivery' : result.score >= 6 ? '👍 Good structure with room for metric enhancement' : '⚠️ Missing crucial STAR components'}
                </p>
              </div>
            </div>
          </div>

          {/* STAR Checklist */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${result.starRatings.situation ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
              {result.starRatings.situation ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-slate-600" />}
              <span>Situation</span>
            </div>

            <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${result.starRatings.task ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
              {result.starRatings.task ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-slate-600" />}
              <span>Task</span>
            </div>

            <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${result.starRatings.action ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
              {result.starRatings.action ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-slate-600" />}
              <span>Action (You)</span>
            </div>

            <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${result.starRatings.result ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
              {result.starRatings.result ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-slate-600" />}
              <span>Metric Result</span>
            </div>
          </div>

          {/* Feedback */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs text-slate-300">
            <div className="font-semibold text-purple-300 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Coach Feedback</span>
            </div>
            <p className="leading-relaxed">{result.feedback}</p>
          </div>

          {/* Improved Answer Snippet */}
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/30 space-y-1.5 text-xs">
            <div className="font-semibold text-emerald-400 flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Suggested Enhancement Ending</span>
            </div>
            <p className="text-slate-300 italic leading-relaxed">
              "{result.improvedAnswerSnippet}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
