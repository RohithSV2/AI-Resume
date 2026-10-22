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
      <div className="flex flex-col items-center justify-center p-12 text-center text-[#94a3b8] space-y-4 rounded-2xl border border-[#262836] bg-[#111218]">
        <Zap className="w-12 h-12 text-[#ff6600] animate-pulse" />
        <h3 className="text-lg font-bold text-white font-['Sora']">No Battlecard Assembled</h3>
        <p className="text-sm max-w-md text-[#94a3b8]">
          Click "Build Battlecard" in the chat panel to generate your 1-page day-of interview cheat sheet.
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
      <div className="p-3.5 rounded-2xl bg-[#111218] border border-[#262836] flex items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#ff6600]/15 text-[#ffa05c] border border-[#ff6600]/30">
            ⚡ Day-of Battlecard
          </span>
          <span className="text-xs text-[#94a3b8] hidden sm:inline">
            Keep this open or print as your 1-page day-of cheat sheet!
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
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
            <span>{isExporting ? 'Exporting...' : 'Export PDF'}</span>
          </button>
        </div>
      </div>

      {/* Printable Battlecard Sheet */}
      <div className="flex justify-center">
        <div
          id="battlecard-printable-doc"
          className="w-full max-w-4xl bg-[#111218] text-[#f8fafc] rounded-2xl border border-[#262836] shadow-2xl p-6 sm:p-8 space-y-6"
        >
          {/* Header */}
          <div className="border-b border-[#262836] pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold font-['Sora'] text-white tracking-tight">
                  {battlecard.candidateName} — Interview Battlecard
                </span>
              </div>
              <p className="text-xs text-[#ffa05c] font-semibold mt-0.5">
                Target Role: {battlecard.targetRole} @ {battlecard.companyName}
              </p>
            </div>
            <div className="text-[11px] px-3 py-1 rounded-full bg-[#181924] text-[#ffa05c] border border-[#ff6600]/30 font-semibold">
              ⚡ Day-of Quick Reference
            </div>
          </div>

          {/* 60-Second Elevator Pitch */}
          <div className="p-4 rounded-xl bg-[#ff6600]/10 border border-[#ff6600]/30 space-y-2 relative group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#ffa05c] uppercase tracking-wider flex items-center space-x-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#ff6600]" />
                <span>60-Second Opening Elevator Pitch</span>
              </span>
              <button
                onClick={handleCopyPitch}
                className="text-xs text-[#ffa05c] hover:text-white flex items-center space-x-1 cursor-pointer font-medium transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#f1f5f9] leading-relaxed italic">
              "{battlecard.elevatorPitch}"
            </p>
          </div>

          {/* Top Value Props & Key Story Hooks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Top Value Propositions */}
            <div className="p-4 rounded-xl bg-[#171822] border border-[#262836] space-y-2.5">
              <h4 className="text-xs font-bold text-[#ffa05c] uppercase tracking-wider flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-[#ff6600]" />
                <span>Top 3 Value Pillars (USPs)</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#cbd5e1]">
                {battlecard.topValueProps.map((usp, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="font-bold text-[#ff6600] shrink-0">{i + 1}.</span>
                    <span>{usp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick STAR Trigger Hooks */}
            <div className="p-4 rounded-xl bg-[#171822] border border-[#262836] space-y-2.5">
              <h4 className="text-xs font-bold text-[#ffa05c] uppercase tracking-wider flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-[#ff6600]" />
                <span>Story Trigger Hooks</span>
              </h4>
              <div className="space-y-2 text-xs">
                {battlecard.keyStoriesHook.map((hook, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-[#0d0e14] border border-[#262836] space-y-0.5">
                    <div className="font-semibold text-white">{hook.trigger}</div>
                    <div className="text-[#94a3b8] text-[11px]">{hook.hook}</div>
                    <div className="text-[#ffa05c] font-semibold text-[11px]">→ {hook.punchline}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Questions to Ask Interviewer */}
          <div className="p-4 rounded-xl bg-[#171822] border border-[#262836] space-y-3">
            <h4 className="text-xs font-bold text-[#ffa05c] uppercase tracking-wider flex items-center space-x-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#ff6600]" />
              <span>Smart Questions to Ask Interviewer (Show Seniority)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {battlecard.questionsToAsk.map((q, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#0d0e14] border border-[#262836] space-y-1.5 flex flex-col justify-between">
                  <div className="font-bold text-[#ffa05c] text-[11px] uppercase tracking-wider">
                    {q.category}
                  </div>
                  <div className="text-white font-medium leading-snug">
                    "{q.question}"
                  </div>
                  <div className="text-[10px] text-[#64748b] italic pt-1 border-t border-[#1e202b]">
                    Why: {q.purpose}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Situation Defusers */}
          <div className="p-4 rounded-xl bg-[#171822] border border-[#262836] space-y-2.5">
            <h4 className="text-xs font-bold text-[#ff8833] uppercase tracking-wider flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-[#ff6600]" />
              <span>Sticky Question Defusers</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {battlecard.defusers.map((def, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#0d0e14] border border-[#262836] space-y-1">
                  <div className="font-semibold text-white">{def.scenario}</div>
                  <div className="text-[#cbd5e1] leading-relaxed text-[11px]">"{def.response}"</div>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div className="p-4 rounded-xl bg-[#171822] border border-[#262836] space-y-2 text-xs">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-[#ff6600]" />
              <span>Final 15-Minute Countdown Checklist</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#cbd5e1]">
              {battlecard.dayOfChecklist.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6600]" />
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
