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
      <div className="flex flex-col items-center justify-center p-12 text-center text-slate-500 space-y-4 bg-white rounded-2xl border border-[#e2eccb]">
        <Target className="w-12 h-12 text-lime-400 animate-pulse" />
        <h3 className="text-lg font-bold text-slate-900">No Recon Generated Yet</h3>
        <p className="text-sm max-w-md text-slate-600">
          Upload your resume and provide a target job description, or click "Sample Profile" to generate instant ATS reconnaissance.
        </p>
      </div>
    );
  }

  const is100 = recon.atsScore === 100;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* 100% ATS Badge Banner */}
      {is100 && (
        <div className="p-4 rounded-2xl bg-[#ecfccb] border border-[#bef264] flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#84cc16] flex items-center justify-center text-white shadow-xs shrink-0">
              <Award className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#365314]">
                🏆 100% ATS Perfect Match (Web Standard Verified)
              </h4>
              <p className="text-xs text-[#4d7c0f]">
                Meets 100% of keywords, single-column parsing, and Google XYZ metric formula benchmarks.
              </p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-white text-[#365314] font-extrabold border border-[#bef264] shrink-0 shadow-2xs">
            Grade: A+ (100/100)
          </span>
        </div>
      )}

      {/* Top Banner: ATS Score & Role Target */}
      <div className="p-6 rounded-2xl bg-white border border-[#e2eccb] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 text-xs font-bold uppercase tracking-wider text-[#4d7c0f]">
            <Building2 className="w-4 h-4 text-lime-600" />
            <span>Target Role Recon</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{jd.roleTitle}</h2>
          <p className="text-sm text-slate-600 flex items-center justify-center md:justify-start space-x-2">
            <span className="font-semibold text-slate-800">{jd.company}</span>
            <span>•</span>
            <span>{jd.location || 'Remote / Hybrid'}</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-[#f4fae6] text-[#365314] font-medium text-xs border border-[#d9e6be]">
              {jd.targetSeniority || 'Mid-Senior'}
            </span>
          </p>
        </div>

        {/* ATS Gauge */}
        <div className="flex items-center space-x-4">
          <div className={`w-28 h-28 rounded-2xl border-2 flex flex-col items-center justify-center shadow-xs transition-all ${
            is100
              ? 'bg-[#ecfccb] text-[#365314] border-[#84cc16]'
              : 'bg-[#f7faee] text-[#4d7c0f] border-[#c3d99e]'
          }`}>
            <span className="text-3xl font-extrabold tracking-tight">{recon.atsScore}%</span>
            <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5 text-slate-600">
              {is100 ? 'Perfect ATS' : 'ATS Match'}
            </span>
          </div>

          <div className="space-y-1.5 text-xs min-w-[150px]">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Skills Alignment:</span>
              <span className="font-bold text-[#4d7c0f]">{recon.matchBreakdown.skillsMatch}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Experience Fit:</span>
              <span className="font-bold text-[#4d7c0f]">{recon.matchBreakdown.experienceMatch}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Education Fit:</span>
              <span className="font-bold text-[#4d7c0f]">{recon.matchBreakdown.educationMatch}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Matched Keywords vs Missing Keywords */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Matched Keywords */}
        <div className="p-5 rounded-2xl bg-white border border-[#e2eccb] space-y-3 shadow-xs">
          <div className="flex items-center space-x-2 text-[#365314]">
            <CheckCircle2 className="w-4 h-4 text-lime-600" />
            <h4 className="text-sm font-bold">Matched Core Keywords ({recon.matchedKeywords.length})</h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {recon.matchedKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#ecfccb] text-[#365314] border border-[#d9f99d]"
              >
                ✓ {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Missing / Gap Keywords */}
        <div className="p-5 rounded-2xl bg-white border border-[#e2eccb] space-y-3 shadow-xs">
          <div className="flex items-center space-x-2 text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h4 className="text-sm font-bold">
              {recon.missingKeywords.length === 0 ? 'Missing Keywords (0 - All Matched!)' : `Missing Keywords to Bridge (${recon.missingKeywords.length})`}
            </h4>
          </div>
          {recon.missingKeywords.length === 0 ? (
            <div className="p-3 rounded-xl bg-[#ecfccb] border border-[#d9f99d] text-xs text-[#365314] font-medium flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-lime-600 shrink-0" />
              <span>All target keywords from the job description are present in your resume!</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {recon.missingKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#fffbeb] text-[#92400e] border border-[#fde68a]"
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
        <div className="p-5 rounded-2xl bg-white border border-[#e2eccb] space-y-3 shadow-xs">
          <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-lime-600" />
            <span>Profile Strengths</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-700">
            {recon.strengths.map((s, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-lime-600 shrink-0 font-bold">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#e2eccb] space-y-3 shadow-xs">
          <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <Target className="w-4 h-4 text-lime-600" />
            <span>Strategic Recommendations</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-700">
            {recon.gaps.map((g, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-lime-600 shrink-0 font-bold">•</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Footer Callout */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#ecfccb] to-[#f4fae6] border border-[#bef264] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-[#1a2e05] flex items-center space-x-1.5 justify-center sm:justify-start">
            <Zap className="w-4 h-4 text-lime-600 fill-lime-600" />
            <span>{is100 ? '100% Score Achieved' : 'Elevate to 100% ATS Web Standard'}</span>
          </h4>
          <p className="text-xs text-[#3f6212]">
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
              className="px-4 py-2.5 rounded-xl bg-[#65a30d] hover:bg-[#4d7c0f] text-white text-xs font-bold shadow-xs flex items-center space-x-2 cursor-pointer transition-all"
            >
              <span>⚡ Optimize to 100% ATS</span>
            </button>
          )}
          <button
            onClick={onRunTailoring}
            disabled={isProcessing}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#f7faee] text-slate-800 border border-[#c3d99e] text-xs font-bold shadow-xs flex items-center space-x-2 cursor-pointer transition-all"
          >
            <span>Review Tailored Resume</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
