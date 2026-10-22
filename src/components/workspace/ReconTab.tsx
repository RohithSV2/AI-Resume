import React from 'react';
import { ReconAnalysis, JobDescriptionData } from '../../types';
import { CheckCircle2, AlertTriangle, Building2, Target, ArrowRight, ShieldCheck, Zap, Award } from 'lucide-react';

interface ReconTabProps {
  recon: ReconAnalysis | null;
  jd: JobDescriptionData | null;
  onNavigateTab: (tabId: string) => void;
  onRunTailoring: () => void;
  onOptimize100Ats: () => void;
  isProcessing: boolean;
}

export const ReconTab: React.FC<ReconTabProps> = ({
  recon,
  jd,
  onNavigateTab,
  onRunTailoring,
  onOptimize100Ats,
  isProcessing,
}) => {
  if (!recon || !jd) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-slate-400 space-y-4">
        <Target className="w-12 h-12 text-slate-600 animate-pulse" />
        <h3 className="text-lg font-semibold text-slate-300">No Match Recon Generated Yet</h3>
        <p className="text-sm max-w-md text-slate-400">
          Upload your resume and provide a target job description, then click "Analyze ATS Match" in the copilot panel to generate deep hiring reconnaissance.
        </p>
      </div>
    );
  }

  const is100 = recon.atsScore === 100;

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-emerald-400 border-emerald-500/60 bg-emerald-500/15 shadow-emerald-500/30';
    if (score >= 80) return 'text-teal-400 border-teal-500/40 bg-teal-500/10';
    if (score >= 65) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* 100% ATS Badge if achieved */}
      {is100 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-purple-900/40 border border-emerald-500/50 flex items-center justify-between gap-4 shadow-xl shadow-emerald-950/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0">
              <Award className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-300 flex items-center space-x-1.5">
                <span>🏆 100% ATS Perfect Match (Web Standard Verified)</span>
              </h4>
              <p className="text-xs text-slate-300">
                Meets 100% of keywords, single-column parsing, and Google XYZ metric formula benchmarks.
              </p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 shrink-0">
            Grade: A+ (100/100)
          </span>
        </div>
      )}

      {/* Top Banner: ATS Score & Role Target */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
            <Building2 className="w-4 h-4" />
            <span>Target Role Recon</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">{jd.roleTitle}</h2>
          <p className="text-sm text-slate-400 flex items-center justify-center md:justify-start space-x-2">
            <span>{jd.company}</span>
            <span>•</span>
            <span>{jd.location || 'Remote / Hybrid'}</span>
            <span>•</span>
            <span className="text-purple-300">{jd.targetSeniority || 'Mid-Senior'}</span>
          </p>
        </div>

        {/* ATS Gauge */}
        <div className="flex items-center space-x-4">
          <div className={`w-28 h-28 rounded-2xl border-2 flex flex-col items-center justify-center shadow-lg transition-all ${getScoreColor(recon.atsScore)}`}>
            <span className="text-3xl font-extrabold tracking-tight">{recon.atsScore}%</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider mt-0.5">
              {is100 ? 'Perfect ATS' : 'ATS Match'}
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300 min-w-[140px]">
            <div className="flex justify-between">
              <span className="text-slate-400">Skills Alignment:</span>
              <span className="font-semibold text-emerald-400">{recon.matchBreakdown.skillsMatch}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Experience Fit:</span>
              <span className="font-semibold text-blue-400">{recon.matchBreakdown.experienceMatch}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Education Fit:</span>
              <span className="font-semibold text-purple-400">{recon.matchBreakdown.educationMatch}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Matched Keywords vs Missing Keywords */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Matched Keywords */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <h4 className="text-sm font-semibold">Matched Core Keywords ({recon.matchedKeywords.length})</h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {recon.matchedKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
              >
                ✓ {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Missing / Gap Keywords */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <h4 className="text-sm font-semibold">
              {recon.missingKeywords.length === 0 ? 'Missing Keywords (0 - All Matched!)' : `Missing Keywords to Bridge (${recon.missingKeywords.length})`}
            </h4>
          </div>
          {recon.missingKeywords.length === 0 ? (
            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-xs text-emerald-300 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>All target keywords from the job description are present in your resume!</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {recon.missingKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30"
                >
                  + {kw}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Strengths & Strategic Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <h4 className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Profile Strengths</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {recon.strengths.map((s, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-indigo-400 shrink-0 font-bold">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <h4 className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
            <Target className="w-4 h-4 text-purple-400" />
            <span>Strategic Recommendations</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {recon.gaps.map((g, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-purple-400 shrink-0 font-bold">•</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Footer Callout */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-semibold text-white flex items-center space-x-1.5 justify-center sm:justify-start">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>{is100 ? '100% Score Achieved' : 'Elevate to 100% ATS Web Standard'}</span>
          </h4>
          <p className="text-xs text-slate-300">
            {is100
              ? 'Your resume is fully optimized according to web ATS parser standards (Jobscan & Workday benchmarks).'
              : 'Auto-inject missing keywords and rewrite bullets using Google XYZ formula to achieve a verified 100% ATS score.'}
          </p>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          {!is100 && (
            <button
              onClick={onOptimize100Ats}
              disabled={isProcessing}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center space-x-2 cursor-pointer transition-all"
            >
              <span>⚡ Optimize to 100% ATS</span>
            </button>
          )}
          <button
            onClick={onRunTailoring}
            disabled={isProcessing}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 flex items-center space-x-2 cursor-pointer transition-all"
          >
            <span>Review Tailored Resume</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
