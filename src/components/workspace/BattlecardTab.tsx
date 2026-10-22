import React, { useState } from 'react';
import { BattlecardData } from '../../types';
import { Zap, Download, Printer, Copy, Check, MessageSquare, Shield, HelpCircle, CheckSquare } from 'lucide-react';
import { exportElementToPdf } from '../../services/pdfExporter';

interface BattlecardTabProps {
  battlecard: BattlecardData | null;
}

export const BattlecardTab: React.FC<BattlecardTabProps> = ({ battlecard }) => {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  if (!battlecard) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-slate-500 space-y-4">
        <Zap className="w-12 h-12 text-lime-600 animate-pulse" />
        <h3 className="text-lg font-semibold text-slate-800">No Battlecard Assembled</h3>
        <p className="text-sm max-w-md text-slate-600">
          Click "Build Battlecard" in the copilot panel to generate your 1-page day-of interview cheat sheet.
        </p>
      </div>
    );
  }

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(battlecard.elevatorPitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    await exportElementToPdf('battlecard-printable-doc', `${battlecard.candidateName.replace(/\s+/g, '_')}_Interview_Battlecard`);
    setIsExporting(false);
  };

  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-200">
      {/* Top Controls */}
      <div className="p-3 rounded-2xl bg-white border border-[#e2eccb] flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#ecfccb] text-[#365314] border border-[#d9f99d]">
            ⚡ Day-of Battlecard
          </span>
          <span className="text-xs text-slate-600 hidden sm:inline">
            Keep this open or print as your 1-page day-of cheat sheet!
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg bg-[#f7faee] hover:bg-[#eef5dc] text-[#365314] border border-[#d9f99d] text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="px-3.5 py-1.5 rounded-lg bg-[#65a30d] hover:bg-[#4d7c0f] text-white text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Exporting...' : 'Export Battlecard PDF'}</span>
          </button>
        </div>
      </div>

      {/* Printable Battlecard Sheet */}
      <div className="flex justify-center">
        <div
          id="battlecard-printable-doc"
          className="w-full max-w-4xl bg-white text-slate-800 rounded-2xl border border-[#dce9c2] shadow-sm p-6 sm:p-8 space-y-6"
        >
          {/* Header */}
          <div className="border-b border-[#e5eed2] pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-slate-900 tracking-tight">
                  {battlecard.candidateName} — Interview Battlecard
                </span>
              </div>
              <p className="text-xs text-[#4d7c0f] font-semibold mt-0.5">
                Target Role: {battlecard.targetRole} @ {battlecard.companyName}
              </p>
            </div>
            <div className="text-[11px] px-3 py-1 rounded-full bg-[#f4f9e6] text-[#365314] border border-[#d9f99d] font-semibold">
              ⚡ Day-of Quick Reference
            </div>
          </div>

          {/* 60-Second Elevator Pitch */}
          <div className="p-4 rounded-xl bg-[#f7fcee] border border-[#d9f99d] space-y-2 relative group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#3f6212] uppercase tracking-wider flex items-center space-x-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#65a30d]" />
                <span>60-Second Opening Elevator Pitch</span>
              </span>
              <button
                onClick={handleCopyPitch}
                className="text-xs text-[#4d7c0f] hover:text-[#1a2e05] flex items-center space-x-1 cursor-pointer font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-800 leading-relaxed italic">
              "{battlecard.elevatorPitch}"
            </p>
          </div>

          {/* Top Value Props & Key Story Hooks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Top Value Propositions */}
            <div className="p-4 rounded-xl bg-white border border-[#e2eccb] space-y-2.5 shadow-xs">
              <h4 className="text-xs font-bold text-[#3f6212] uppercase tracking-wider flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-[#65a30d]" />
                <span>Top 3 Value Pillars (USPs)</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {battlecard.topValueProps.map((usp, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="font-bold text-[#65a30d] shrink-0">{i + 1}.</span>
                    <span>{usp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick STAR Trigger Hooks */}
            <div className="p-4 rounded-xl bg-white border border-[#e2eccb] space-y-2.5 shadow-xs">
              <h4 className="text-xs font-bold text-[#3f6212] uppercase tracking-wider flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-[#65a30d]" />
                <span>Story Trigger Hooks</span>
              </h4>
              <div className="space-y-2 text-xs">
                {battlecard.keyStoriesHook.map((hook, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-[#f9fbf4] border border-[#e2eccb] space-y-0.5">
                    <div className="font-semibold text-slate-900">{hook.trigger}</div>
                    <div className="text-slate-600 text-[11px]">{hook.hook}</div>
                    <div className="text-[#4d7c0f] font-semibold text-[11px]">→ {hook.punchline}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Questions to Ask Interviewer */}
          <div className="p-4 rounded-xl bg-[#f9fbf4] border border-[#e2eccb] space-y-3">
            <h4 className="text-xs font-bold text-[#3f6212] uppercase tracking-wider flex items-center space-x-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#65a30d]" />
              <span>Smart Questions to Ask Interviewer (Show Seniority)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {battlecard.questionsToAsk.map((q, i) => (
                <div key={i} className="p-3 rounded-xl bg-white border border-[#e2eccb] space-y-1.5 flex flex-col justify-between shadow-xs">
                  <div className="font-bold text-[#4d7c0f] text-[11px] uppercase tracking-wider">
                    {q.category}
                  </div>
                  <div className="text-slate-800 font-medium leading-snug">
                    "{q.question}"
                  </div>
                  <div className="text-[10px] text-slate-500 italic pt-1 border-t border-[#f0f4e4]">
                    Why: {q.purpose}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Situation Defusers */}
          <div className="p-4 rounded-xl bg-white border border-[#e2eccb] space-y-2.5 shadow-xs">
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              <span>Sticky Question Defusers</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {battlecard.defusers.map((def, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#fefce8] border border-[#fef08a] space-y-1">
                  <div className="font-semibold text-amber-900">{def.scenario}</div>
                  <div className="text-amber-800 leading-relaxed text-[11px]">"{def.response}"</div>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div className="p-4 rounded-xl bg-[#f9fbf4] border border-[#e2eccb] space-y-2 text-xs">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-[#65a30d]" />
              <span>Final 15-Minute Countdown Checklist</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
              {battlecard.dayOfChecklist.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
