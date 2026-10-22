import React, { useState } from 'react';
import { ResumeData } from '../../types';
import { Download, Printer, Copy, Check, Sparkles, Eye, FileText } from 'lucide-react';
import { exportElementToPdf } from '../../services/pdfExporter';

interface ResumeTabProps {
  resume: ResumeData | null;
  onUpdateResume: (updated: ResumeData) => void;
}

export const ResumeTab: React.FC<ResumeTabProps> = ({
  resume,
  onUpdateResume,
}) => {
  const [viewMode, setViewMode] = useState<'tailored' | 'original'>('tailored');
  const [highlightDiff, setHighlightDiff] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!resume) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-[#94a3b8] space-y-4 rounded-2xl border border-[#262836] bg-[#111218]">
        <FileText className="w-12 h-12 text-[#ff6600] animate-pulse" />
        <h3 className="text-lg font-bold text-white font-['Sora']">No Resume Loaded</h3>
        <p className="text-sm max-w-md text-[#94a3b8]">
          Upload a resume or click "Sample Profile" in the top bar to inspect and tailor your resume.
        </p>
      </div>
    );
  }

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    await exportElementToPdf('resume-printable-doc', `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Tailored_Resume`);
    setIsExporting(false);
  };

  const handleCopyMarkdown = () => {
    const summary = viewMode === 'tailored' ? (resume.tailoredSummary || resume.professionalSummary) : resume.professionalSummary;
    const expText = resume.experience.map(e => {
      const bullets = (viewMode === 'tailored' && e.tailoredAchievements) ? e.tailoredAchievements : e.achievements;
      return `### ${e.role} — ${e.company} (${e.period})\n${bullets.map(b => `- ${b}`).join('\n')}`;
    }).join('\n\n');

    const md = `# ${resume.personalInfo.fullName}
${resume.personalInfo.email} | ${resume.personalInfo.phone} | ${resume.personalInfo.location}

## Professional Summary
${summary}

## Skills
${resume.skills.map(s => `**${s.category}:** ${s.items.join(', ')}`).join('\n')}

## Experience
${expText}

## Education
${resume.education.map(ed => `- **${ed.degree}**, ${ed.school} (${ed.year})`).join('\n')}
`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentSummary = viewMode === 'tailored' 
    ? (resume.tailoredSummary || resume.professionalSummary) 
    : resume.professionalSummary;

  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-200">
      {/* Control Toolbar */}
      <div className="p-3.5 rounded-2xl bg-[#111218] border border-[#262836] flex flex-wrap items-center justify-between gap-3 shadow-xl">
        {/* Toggle Mode */}
        <div className="flex items-center space-x-3">
          <div className="bg-[#090a0f] p-1 rounded-xl border border-[#262836] flex items-center space-x-1">
            <button
              onClick={() => setViewMode('tailored')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer ${
                viewMode === 'tailored'
                  ? 'bg-[#ff6600] text-white shadow-md shadow-[#ff6600]/25'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Version</span>
            </button>
            <button
              onClick={() => setViewMode('original')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer ${
                viewMode === 'original'
                  ? 'bg-[#181924] text-white border border-[#262836]'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Original Version</span>
            </button>
          </div>

          {viewMode === 'tailored' && (
            <label className="flex items-center space-x-2 text-xs text-[#cbd5e1] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={highlightDiff}
                onChange={(e) => setHighlightDiff(e.target.checked)}
                className="rounded border-[#262836] bg-[#090a0f] text-[#ff6600] focus:ring-[#ff6600]"
              />
              <span>Highlight Enhancements</span>
            </label>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyMarkdown}
            className="px-3 py-1.5 rounded-lg bg-[#181924] hover:bg-[#202230] text-[#cbd5e1] hover:text-white border border-[#262836] text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied MD' : 'Copy MD'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-[#181924] hover:bg-[#202230] text-[#cbd5e1] hover:text-white border border-[#262836] text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="px-3.5 py-1.5 rounded-lg bg-[#ff6600] hover:bg-[#ff771a] text-white text-xs font-bold shadow-md shadow-[#ff6600]/25 flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Generating PDF...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* Resume Document Preview */}
      <div className="flex justify-center">
        <div
          id="resume-printable-doc"
          className="w-full max-w-4xl bg-[#111218] text-[#f8fafc] rounded-2xl border border-[#262836] shadow-2xl p-6 sm:p-10 space-y-6"
        >
          {/* Header */}
          <div className="border-b border-[#262836] pb-5 text-center space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-['Sora'] text-white tracking-tight">
              {resume.personalInfo.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-[#94a3b8] flex flex-wrap justify-center items-center gap-2">
              <span>{resume.personalInfo.email}</span>
              <span>•</span>
              <span>{resume.personalInfo.phone}</span>
              <span>•</span>
              <span>{resume.personalInfo.location}</span>
              {resume.personalInfo.github && (
                <>
                  <span>•</span>
                  <span>{resume.personalInfo.github}</span>
                </>
              )}
            </p>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#ff6600] border-b border-[#262836] pb-1">
              Professional Summary
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed text-[#cbd5e1] ${
              viewMode === 'tailored' && highlightDiff && resume.tailoredSummary
                ? 'p-3 rounded-xl bg-[#ff6600]/10 border border-[#ff6600]/30 text-white'
                : ''
            }`}>
              {currentSummary}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#ff6600] border-b border-[#262836] pb-1">
              Technical Core Competencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm">
              {resume.skills.map((cat, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <span className="font-bold text-white shrink-0">{cat.category}:</span>
                  <span className="text-[#94a3b8]">{cat.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#ff6600] border-b border-[#262836] pb-1">
              Work Experience
            </h2>
            <div className="space-y-5">
              {resume.experience.map((exp) => {
                const bullets = (viewMode === 'tailored' && exp.tailoredAchievements)
                  ? exp.tailoredAchievements
                  : exp.achievements;

                return (
                  <div key={exp.id} className="space-y-2">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center text-xs sm:text-sm">
                      <div className="font-bold text-white">
                        <span>{exp.role}</span>
                        <span className="text-[#ff6600] font-normal"> — {exp.company}</span>
                      </div>
                      <span className="text-[#94a3b8] text-xs">{exp.period}</span>
                    </div>

                    <ul className="space-y-1.5 text-xs sm:text-sm leading-relaxed text-[#cbd5e1]">
                      {bullets.map((b, idx) => {
                        const isTailored = viewMode === 'tailored' && exp.tailoredAchievements && highlightDiff;
                        return (
                          <li
                            key={idx}
                            className={`flex items-start space-x-2 ${
                              isTailored ? 'p-1.5 rounded-lg bg-[#ff6600]/10 border-l-2 border-[#ff6600] text-white' : ''
                            }`}
                          >
                            <span className="text-[#ff6600] shrink-0 mt-0.5">•</span>
                            <span>{b}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#ff6600] border-b border-[#262836] pb-1">
              Education & Degrees
            </h2>
            <div className="space-y-2">
              {resume.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-white">{edu.degree}</span>
                    <span className="text-[#94a3b8]"> — {edu.school}</span>
                  </div>
                  <span className="text-[#94a3b8] text-xs">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
