import React from 'react';
import { ReconAnalysis, JobDescriptionData } from '../../types';
import { Target, Award, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

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
      <div className="flex flex-col items-center justify-center p-12 text-center text-[#94a3b8] space-y-4 rounded-2xl border border-[#262836] bg-[#111218]">
        <Target className="w-12 h-12 text-[#ff6600] animate-pulse" />
        <h3 className="text-lg font-bold text-white font-['Sora']">No Recon Generated Yet</h3>
        <p className="text-sm max-w-md text-[#94a3b8]">
          Upload your resume and provide a target job description, or click "Sample Profile" to generate instant ATS reconnaissance.
        </p>
      </div>
    );
  }

  const is100 = recon.atsScore === 100;

  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-200">
      {/* 100% ATS Badge Banner */}
      {is100 && (
        <div className="p-4 rounded-2xl bg-[#ff6600]/15 border border-[#ff6600]/40 flex items-center justify-between gap-4 shadow-lg shadow-[#ff6600]/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff6600] flex items-center justify-center text-white shadow-md shadow-[#ff6600]/30 shrink-0">
              <Award className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white font-['Sora']">
                🏆 100% ATS Perfect Match (Web Standard Verified)
              </h4>
              <p className="text-xs text-[#ffa05c]">
                Meets 100% of keywords, single-column parsing, and Google XYZ metric formula benchmarks.
              </p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-black/40 text-[#ff8833] font-bold border border-[#ff6600]/40 shrink-0">
            Grade: A+ (100/100)
          </span>
        </div>
      )}

      {/* Target Role & ATS Gauge Section: Exact Lovable Studio Layout */}
      <section className="rounded-2xl border border-[#262836] bg-[#111218] p-6 shadow-xl space-y-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">Target role</p>
          <h2 className="mt-1 text-2xl font-bold font-['Sora'] text-white tracking-tight">{jd.roleTitle}</h2>
          <p className="mt-1 text-sm text-[#94a3b8]">
            {jd.company} · {jd.location || 'San Francisco / Remote'} · {jd.targetSeniority || 'Mid-Senior (2–5 yrs)'}
          </p>
        </div>

        <div className="mt-5 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center pt-2">
          {/* Circular ATS Gauge */}
          <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border-4 border-[#ff6600] bg-[#181922] shadow-xl shadow-[#ff6600]/15 shrink-0 mx-auto sm:mx-0">
            <span className="text-3xl font-extrabold text-white font-['Sora'] tracking-tight">
              {recon.atsScore}%
            </span>
            <span className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider">
              {is100 ? 'Perfect' : 'ATS match'}
            </span>
          </div>

          {/* Breakdown Progress Bars */}
          <div className="space-y-3.5">
            <div>
              <div className="mb-1.5 flex justify-between text-xs sm:text-sm">
                <span className="text-[#cbd5e1] font-medium">Skills Alignment</span>
                <span className="font-bold text-[#ffa05c]">{recon.matchBreakdown.skillsMatch}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#1e202b] overflow-hidden">
                <div
                  className="h-2 rounded-full bg-[#ff6600] transition-all duration-500 shadow-sm shadow-[#ff6600]/40"
                  style={{ width: `${recon.matchBreakdown.skillsMatch}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex justify-between text-xs sm:text-sm">
                <span className="text-[#cbd5e1] font-medium">Experience Fit</span>
                <span className="font-bold text-[#ffa05c]">{recon.matchBreakdown.experienceMatch}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#1e202b] overflow-hidden">
                <div
                  className="h-2 rounded-full bg-[#ff6600] transition-all duration-500 shadow-sm shadow-[#ff6600]/40"
                  style={{ width: `${recon.matchBreakdown.experienceMatch}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex justify-between text-xs sm:text-sm">
                <span className="text-[#cbd5e1] font-medium">Education Fit</span>
                <span className="font-bold text-[#ffa05c]">{recon.matchBreakdown.educationMatch}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#1e202b] overflow-hidden">
                <div
                  className="h-2 rounded-full bg-[#ff6600] transition-all duration-500 shadow-sm shadow-[#ff6600]/40"
                  style={{ width: `${recon.matchBreakdown.educationMatch}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2x2 Grid: Matched Keywords, Missing Keywords, Strengths, Recommendations */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Matched Keywords */}
        <section className="rounded-2xl border border-[#262836] bg-[#111218] p-5 shadow-xl space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
            Matched keywords ({recon.matchedKeywords.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {recon.matchedKeywords.map((kw, i) => (
              <span
                key={i}
                className="rounded-lg bg-[#ff6600]/15 text-[#ffa05c] border border-[#ff6600]/30 px-2.5 py-1 text-xs font-semibold"
              >
                ✓ {kw}
              </span>
            ))}
          </div>
        </section>

        {/* Missing Keywords */}
        <section className="rounded-2xl border border-[#262836] bg-[#111218] p-5 shadow-xl space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
            {recon.missingKeywords.length === 0 ? 'Missing keywords (0 — None!)' : `Missing keywords (${recon.missingKeywords.length})`}
          </h3>
          {recon.missingKeywords.length === 0 ? (
            <div className="p-3 rounded-xl bg-[#10b981]/15 border border-[#10b981]/30 text-xs text-[#6ee7b7] font-semibold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
              <span>All target job description keywords are present in your resume!</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {recon.missingKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="rounded-lg border border-dashed border-[#ff4500]/60 bg-[#ff4500]/10 px-2.5 py-1 text-xs text-[#ff6644] font-medium"
                >
                  + {kw}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Strengths */}
        <section className="rounded-2xl border border-[#262836] bg-[#111218] p-5 shadow-xl space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">Strengths</h3>
          <ul className="list-disc space-y-2 pl-5 text-xs sm:text-sm leading-relaxed text-[#cbd5e1]">
            {recon.strengths.map((s, idx) => (
              <li key={idx}>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Recommendations */}
        <section className="rounded-2xl border border-[#262836] bg-[#111218] p-5 shadow-xl space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">Recommendations</h3>
          <ul className="list-disc space-y-2 pl-5 text-xs sm:text-sm leading-relaxed text-[#cbd5e1]">
            {recon.gaps.map((g, idx) => (
              <li key={idx}>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Reach 100% ATS Section: Exact Lovable Studio callout */}
      <section className="rounded-2xl border border-[#ff6600]/40 bg-gradient-to-r from-[#1c1712] to-[#12131b] p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold font-['Sora'] text-white">
              {is100 ? '100% ATS Score Achieved' : 'Reach 100% ATS'}
            </h3>
            <p className="text-xs sm:text-sm text-[#94a3b8] mt-0.5">
              {is100
                ? 'Your resume is fully optimized according to web ATS parser standards (Jobscan & Workday benchmarks).'
                : 'Add missing keywords and rewrite bullets with the XYZ formula.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!is100 && (
              <button
                onClick={onOptimize100Ats}
                disabled={isProcessing}
                className="rounded-xl bg-[#ff6600] hover:bg-[#ff771a] px-5 py-2.5 font-bold text-white text-xs sm:text-sm transition shadow-md shadow-[#ff6600]/30 cursor-pointer flex items-center space-x-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Optimize now</span>
              </button>
            )}
            <button
              onClick={onRunTailoring}
              disabled={isProcessing}
              className="rounded-xl border border-[#262836] bg-[#181924] hover:bg-[#202230] text-[#cbd5e1] hover:text-white px-4 py-2.5 font-semibold text-xs sm:text-sm transition cursor-pointer flex items-center space-x-1.5"
            >
              <span>Review Tailored Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
