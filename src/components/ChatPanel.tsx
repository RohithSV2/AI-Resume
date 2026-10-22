import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  FileText, 
  Bot, 
  User, 
  Sparkles, 
  Target, 
  Zap, 
  Mic, 
  Paperclip,
  Upload,
  X,
  CheckCircle2
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
  const [showUploadModal, setShowUploadModal] = useState(false);
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
    e.target.value = '';
  };

  const handleApplyCustomIntake = () => {
    if (pastedResume.trim()) {
      onUploadResumeText(pastedResume.trim(), 'Custom_Resume.txt');
    }
    if (pastedJd.trim()) {
      onUpdateJdText(pastedJd.trim(), jdTitle || 'Software Engineer', jdCompany || 'Target Company');
    }
    setShowUploadModal(false);
  };

  return (
    <div className="w-full lg:w-[420px] xl:w-[460px] border-r border-slate-800 bg-slate-950 flex flex-col h-full shrink-0">
      {/* Hidden File Input for Paperclip */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".txt,.md,.json,.pdf,.doc,.docx"
        className="hidden"
      />

      {/* Sleek Copilot Header */}
      <div className="h-13 px-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-purple-500/30">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 text-xs">AI Career Copilot</h3>
            <div className="flex items-center space-x-1.5 text-[10px] text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Multi-Agent Swarm Online</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          title="Upload or paste custom resume & job description"
          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px] font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5 text-purple-400" />
          <span>Upload CV / JD</span>
        </button>
      </div>

      {/* Chat Messages List (Occupies full middle height) */}
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
              Agent analyzing and optimizing response...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Pills (All are 100% functional) */}
      <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/90 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => onTriggerAction('ats100')}
          title="Optimize to 100% ATS score"
          className="px-2.5 py-1 rounded-full bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 text-[11px] font-bold flex items-center space-x-1 shrink-0 transition-colors cursor-pointer"
        >
          <span>💯 100% ATS Match</span>
        </button>

        <button
          onClick={() => onTriggerAction('recon')}
          title="View ATS match analysis"
          className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-blue-400 hover:text-blue-300 text-[11px] font-medium flex items-center space-x-1 shrink-0 transition-colors cursor-pointer"
        >
          <Target className="w-3 h-3" />
          <span>ATS Recon</span>
        </button>

        <button
          onClick={() => onTriggerAction('tailor')}
          title="Review Tailored Resume"
          className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-purple-400 hover:text-purple-300 text-[11px] font-medium flex items-center space-x-1 shrink-0 transition-colors cursor-pointer"
        >
          <FileText className="w-3 h-3" />
          <span>Tailor Resume</span>
        </button>

        <button
          onClick={() => onTriggerAction('star')}
          title="View STAR interview questions"
          className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-400 hover:text-amber-300 text-[11px] font-medium flex items-center space-x-1 shrink-0 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3 h-3" />
          <span>STAR Prep</span>
        </button>

        <button
          onClick={() => onTriggerAction('battlecard')}
          title="View 1-Page Battlecard"
          className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-rose-400 hover:text-rose-300 text-[11px] font-medium flex items-center space-x-1 shrink-0 transition-colors cursor-pointer"
        >
          <Zap className="w-3 h-3" />
          <span>Battlecard</span>
        </button>

        <button
          onClick={() => onTriggerAction('mock')}
          title="Practice in Mock Simulator"
          className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-emerald-400 hover:text-emerald-300 text-[11px] font-medium flex items-center space-x-1 shrink-0 transition-colors cursor-pointer"
        >
          <Mic className="w-3 h-3" />
          <span>Mock Simulator</span>
        </button>
      </div>

      {/* Input Box with Working Paperclip Upload Icon */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-slate-800 bg-slate-900/90">
        <div className="relative flex items-center space-x-2">
          {/* File Upload Icon Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Attach Resume File (.pdf, .docx, .txt)"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-purple-300 border border-slate-700 transition-colors cursor-pointer shrink-0"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Text Input */}
          <div className="relative flex-1 flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isProcessing}
              placeholder="Ask copilot: 'tailor resume', 'give interview answers'..."
              className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isProcessing}
              className="absolute right-1.5 p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </form>

      {/* Optional Upload Modal for Custom Resume & JD */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Upload className="w-4 h-4 text-purple-400" />
                <h4 className="font-semibold text-sm text-white">Upload Custom Resume & Job Description</h4>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">1. Resume File or Raw Text</label>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-dashed border-slate-700 hover:border-purple-500 text-slate-300 flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <Paperclip className="w-4 h-4 text-purple-400" />
                  <span>Browse Resume File (.pdf, .docx, .txt)</span>
                </button>
                <textarea
                  rows={3}
                  placeholder="Or paste resume text, skills, and experience here..."
                  value={pastedResume}
                  onChange={(e) => setPastedResume(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">2. Target Job Description</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Role Title (e.g. AI Engineer)"
                    value={jdTitle}
                    onChange={(e) => setJdTitle(e.target.value)}
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Company Name (e.g. Google)"
                    value={jdCompany}
                    onChange={(e) => setJdCompany(e.target.value)}
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <textarea
                  rows={3}
                  placeholder="Paste the target job description requirements and qualifications here..."
                  value={pastedJd}
                  onChange={(e) => setPastedJd(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="px-5 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-end space-x-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyCustomIntake}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 cursor-pointer"
              >
                Analyze & Synchronize
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
