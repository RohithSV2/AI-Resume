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
      <div className="flex flex-col items-center justify-center p-12 text-center text-slate-500 space-y-4 bg-white rounded-2xl border border-[#e2eccb]">
        <FileText className="w-12 h-12 text-lime-400 animate-pulse" />
        <h3 className="text-lg font-bold text-slate-900">No Resume Loaded</h3>
        <p className="text-sm max-w-md text-slate-600">
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
      <div className="p-3.5 rounded-2xl bg-white border border-[#e2eccb] flex flex-wrap items-center justify-between gap-3 shadow-xs">
        {/* Toggle Mode */}
        <div className="flex items-center space-x-3">
          <div className="bg-[#f7faee] p-1 rounded-xl border border-[#d9e6be] flex items-center space-x-1">
            <button
              onClick={() => setViewMode('tailored')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                viewMode === 'tailored'
                  ? 'bg-[#65a30d] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Version</span>
            </button>
            <button
              onClick={() => setViewMode('original')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                viewMode === 'original'
                  ? 'bg-white text-slate-900 border border-[#d9e6be] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Original</span>
            </button>
          </div>

          {viewMode === 'tailored' && (
            <label className="flex items-center space-x-1.5 text-xs text-slate-700 font-medium cursor-pointer select-none">
              <input
                type="checkbox"
                checked={highlightDiff}
                onChange={(e) => setHighlightDiff(e.target.checked)}
                className="rounded border-[#c3d99e] text-lime-600 focus:ring-lime-500"
              />
              <span>Highlight Enhancements</span>
            </label>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyMarkdown}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#f7faee] text-slate-700 border border-[#d9e6be] text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-lime-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied MD!' : 'Copy Markdown'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#f7faee] text-slate-700 border border-[#d9e6be] text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="px-4 py-1.5 rounded-xl bg-[#65a30d] hover:bg-[#4d7c0f] text-white text-xs font-bold shadow-xs flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Generating...' : 'Export PDF'}</span>
          </button>
        </div>
      </div>

      {/* Printable / Rendered Resume Sheet */}
      <div className="flex justify-center">
        <div
          id="resume-printable-doc"
          className="w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-sm p-8 sm:p-12 space-y-6 font-sans text-sm leading-relaxed border border-[#e2eccb]"
        >
          {/* Header */}
          <div className="border-b border-slate-200 pb-5 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {resume.personalInfo.fullName}
              </h1>
              <p className="text-[#4d7c0f] font-bold text-sm mt-0.5">
                Senior Full-Stack & AI Systems Engineer
              </p>
            </div>
            <div className="text-xs text-slate-600 space-y-1 sm:text-right font-medium">
              <div>{resume.personalInfo.email} • {resume.personalInfo.phone}</div>
              <div>{resume.personalInfo.location}</div>
              <div className="text-[#4d7c0f]">
                {resume.personalInfo.linkedin} • {resume.personalInfo.github}
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#365314] border-b-2 border-[#bef264] pb-1">
              Professional Summary
            </h2>
            <div
              className={`text-xs text-slate-700 leading-relaxed p-2.5 rounded-xl ${
                viewMode === 'tailored' && highlightDiff
                  ? 'bg-[#ecfccb]/50 border-l-4 border-[#84cc16]'
                  : ''
              }`}
            >
              {currentSummary}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#365314] border-b-2 border-[#bef264] pb-1">
              Technical Core Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {resume.skills.map((skillGroup, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="font-bold text-slate-900">{skillGroup.category}: </span>
                  <span className="text-slate-600">{skillGroup.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#365314] border-b-2 border-[#bef264] pb-1">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {resume.experience.map((exp) => {
                const bullets = (viewMode === 'tailored' && exp.tailoredAchievements)
                  ? exp.tailoredAchievements
                  : exp.achievements;

                return (
                  <div key={exp.id} className="space-y-1.5">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">{exp.role}</span>
                      <span className="text-[11px] text-slate-500 font-semibold">{exp.period}</span>
                    </div>
                    <div className="flex justify-between items-baseline text-xs text-[#4d7c0f] font-semibold">
                      <span>{exp.company}</span>
                      <span className="text-slate-500">{exp.location}</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 pl-1">
                      {bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className={`leading-relaxed ${
                            viewMode === 'tailored' && highlightDiff && bIdx < 2
                              ? 'bg-[#ecfccb]/50 text-slate-950 font-medium px-1 rounded'
                              : ''
                          }`}
                        >
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#365314] border-b-2 border-[#bef264] pb-1">
              Key Projects & Systems
            </h2>
            <div className="space-y-3">
              {resume.projects.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-xs">{proj.title}</span>
                    <span className="text-[11px] text-[#4d7c0f] font-semibold">
                      {proj.techStack.join(' • ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{proj.description}</p>
                  <ul className="list-disc list-inside text-xs text-slate-700 pl-1">
                    {proj.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#365314] border-b-2 border-[#bef264] pb-1">
                Education
              </h2>
              {resume.education.map((ed) => (
                <div key={ed.id} className="text-xs text-slate-700">
                  <div className="font-bold text-slate-900">{ed.degree}</div>
                  <div>{ed.school} ({ed.year})</div>
                  {ed.grade && <div className="text-[#4d7c0f] font-semibold">{ed.grade}</div>}
                </div>
              ))}
            </div>

            <div className="space-y-1">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#365314] border-b-2 border-[#bef264] pb-1">
                Certifications
              </h2>
              <ul className="list-disc list-inside text-xs text-slate-700">
                {resume.certifications.map((cert, cIdx) => (
                  <li key={cIdx}>{cert}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
