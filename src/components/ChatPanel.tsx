import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Upload, 
  FileText, 
  Bot, 
  User, 
  Sparkles, 
  Target, 
  Zap, 
  Mic, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2,
  Paperclip
} from 'lucide-react';
import { ChatMessage, AgentType, ResumeData, JobDescriptionData } from '../types';

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isProcessing: boolean;
  activeAgent: AgentType;
  resume: ResumeData | null;
  jd: JobDescriptionData | null;
  onUploadResumeText: (text: string, filename?: string) => void;
  onUpdateJdText: (text: string, title?: string, company?: string) => void;
  onTriggerAction: (actionKey: 'recon' | 'tailor' | 'star' | 'battlecard' | 'mock' | 'ats100') => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  onSendMessage,
  isProcessing,
  activeAgent,
  resume,
  jd,
  onUploadResumeText,
  onUpdateJdText,
  onTriggerAction,
}) => {
  const [inputText, setInputText] = useState('');
  const [showIntakeDrawer, setShowIntakeDrawer] = useState(false);
  const [pastedResume, setPastedResume] = useState('');
  const [pastedJd, setPastedJd] = useState('');
  const [jdTitle, setJdTitle] = useState('');
  const [jdCompany, setJdCompany] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessing) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onUploadResumeText(content, file.name);
    };
    reader.readAsText(file);
  };

  const handleApplyIntake = () => {
    if (pastedResume.trim()) {
      onUploadResumeText(pastedResume.trim(), 'Pasted_Resume.txt');
    }
    if (pastedJd.trim()) {
      onUpdateJdText(pastedJd.trim(), jdTitle || 'Software Engineer', jdCompany || 'Tech Company');
    }
    setShowIntakeDrawer(false);
  };

  const subagents = [
    { type: 'intake', label: 'Intake' },
    { type: 'recon', label: 'Recon' },
    { type: 'tailor', label: 'Tailor' },
    { type: 'interview_coach', label: 'Coach' },
    { type: 'battlecard', label: 'Battlecard' },
  ];

  return (
    <div className="w-full lg:w-[420px] xl:w-[460px] border-r border-slate-800 bg-slate-950 flex flex-col h-full shrink-0">
      {/* Subagent Status Pipeline Bar */}
      <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
          {subagents.map((sa) => {
            const isActive = activeAgent === sa.type;
            return (
              <span
                key={sa.type}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/40 ring-1 ring-purple-400'
                    : 'bg-slate-950 text-slate-500 border border-slate-800'
                }`}
              >
                {sa.label}
              </span>
            );
          })}
        </div>

        <button
          onClick={() => setShowIntakeDrawer(!showIntakeDrawer)}
          className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center space-x-1 ml-2 shrink-0 cursor-pointer"
        >
          <span>{showIntakeDrawer ? 'Close Intake' : 'Input CV / JD'}</span>
          {showIntakeDrawer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Collapsible Intake Drawer */}
      {showIntakeDrawer && (
        <div className="p-4 bg-slate-900 border-b border-slate-800 space-y-3 animate-in slide-in-from-top-2 duration-150 text-xs">
          <div className="font-semibold text-slate-200 flex items-center justify-between">
            <span>Direct Document Intake</span>
            <span className="text-[10px] text-slate-400">PDF, TXT, or Raw Text</span>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">1. Resume (Upload or Paste)</label>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".txt,.md,.json,.pdf,.doc,.docx"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-1.5 px-3 rounded-lg bg-slate-950 border border-slate-700 hover:border-purple-500 text-slate-300 text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <Paperclip className="w-3.5 h-3.5 text-purple-400" />
                <span>Browse File ({resume ? resume.personalInfo.fullName : 'Select Resume'})</span>
              </button>
            </div>
            <textarea
              rows={2}
              placeholder="Or paste resume summary/skills text here..."
              value={pastedResume}
              onChange={(e) => setPastedResume(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">2. Target Job Description</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Role Title (e.g. AI Engineer)"
                value={jdTitle}
                onChange={(e) => setJdTitle(e.target.value)}
                className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                placeholder="Company Name (e.g. Meta)"
                value={jdCompany}
                onChange={(e) => setJdCompany(e.target.value)}
                className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-purple-500"
              />
            </div>
            <textarea
              rows={3}
              placeholder="Paste job description requirements and qualifications here..."
              value={pastedJd}
              onChange={(e) => setPastedJd(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="button"
            onClick={handleApplyIntake}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-md text-xs cursor-pointer"
          >
            Load into Copilot Pipeline
          </button>
        </div>
      )}

      {/* Chat Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                  isUser
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-purple-400 border border-purple-500/30'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Content Bubble */}
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-1.5 ${
                  isUser
                    ? 'bg-purple-600 text-white rounded-tr-sm'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm shadow-md'
                }`}
              >
                {!isUser && msg.agentName && (
                  <div className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider">
                    {msg.agentName}
                  </div>
                )}
                <div className="whitespace-pre-wrap">{msg.content}</div>
                <div
                  className={`text-[9px] ${isUser ? 'text-purple-200 text-right' : 'text-slate-500'}`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isProcessing && (
          <div className="flex items-center space-x-3 text-xs text-slate-400 animate-pulse">
            <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-purple-400">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
              Agent thinking & synthesizing response...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Pills */}
      <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/80 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => onTriggerAction('ats100')}
          className="px-2.5 py-1 rounded-full bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 text-[11px] font-bold flex items-center space-x-1 shrink-0 transition-colors cursor-pointer"
        >
          <span>💯 100% ATS Match</span>
        </button>

        <button
          onClick={() => onTriggerAction('recon')}
          className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-blue-400 hover:text-blue-300 text-[11px] font-medium flex items-center space-x-1 shrink-0 transition-colors cursor-pointer"
        >
          <Target className="w-3 h-3" />
          <span>ATS Recon</span>
        </button>

        <button
          onClick={() => onTriggerAction('tailor')}
          className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-purple-400 hover:text-purple-300 text-[11px] font-medium flex items-center space-x-1 shrink-0 transition-colors cursor-pointer"
        >
          <FileText className="w-3 h-3" />
          <span>Tailor CV</span>
        </button>

        <button
          onClick={() => onTriggerAction('star')}
          className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-400 hover:text-amber-300 text-[11px] font-medium flex items-center space-x-1 shrink-0 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3 h-3" />
          <span>STAR Prep</span>
        </button>

        <button
          onClick={() => onTriggerAction('battlecard')}
          className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-rose-400 hover:text-rose-300 text-[11px] font-medium flex items-center space-x-1 shrink-0 transition-colors cursor-pointer"
        >
          <Zap className="w-3 h-3" />
          <span>Battlecard</span>
        </button>

        <button
          onClick={() => onTriggerAction('mock')}
          className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-emerald-400 hover:text-emerald-300 text-[11px] font-medium flex items-center space-x-1 shrink-0 transition-colors cursor-pointer"
        >
          <Mic className="w-3 h-3" />
          <span>Mock Interview</span>
        </button>
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-slate-800 bg-slate-900/90">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isProcessing}
            placeholder="Ask agent: 'tailor my resume', 'give me interview questions'..."
            className="w-full pl-3.5 pr-11 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isProcessing}
            className="absolute right-1.5 p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
