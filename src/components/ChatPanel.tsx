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
  X
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
    <div className="w-full lg:w-[400px] xl:w-[440px] border-r border-[#e0ecc8] bg-white flex flex-col h-full shrink-0 shadow-xs">
      {/* Hidden File Input for Paperclip */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".txt,.md,.json,.pdf,.doc,.docx"
        className="hidden"
      />

      {/* Clean Copilot Header */}
      <div className="h-14 px-4 bg-[#fbfdf7] border-b border-[#e2eccb] flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#ecfccb] border border-[#d9f99d] flex items-center justify-center text-[#3f6212]">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-xs">AI Career Copilot</h3>
            <div className="flex items-center space-x-1.5 text-[10px] text-lime-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
              <span>Ready to assist</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          title="Upload custom resume and job description"
          className="px-2.5 py-1.5 rounded-lg bg-[#f4fae6] hover:bg-[#ecfccb] text-[#3f6212] border border-[#d9e6be] text-[11px] font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload CV / JD</span>
        </button>
      </div>

      {/* Chat Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#fbfdf7]/40">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs shadow-2xs ${
                  isUser
                    ? 'bg-[#65a30d] text-white'
                    : 'bg-white text-[#4d7c0f] border border-[#d9e6be]'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Content Bubble */}
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-1 ${
                  isUser
                    ? 'bg-[#65a30d] text-white rounded-tr-xs shadow-xs'
                    : 'bg-white border border-[#e2eccb] text-slate-800 rounded-tl-xs shadow-xs'
                }`}
              >
                {!isUser && msg.agentName && (
                  <div className="text-[10px] font-bold text-lime-700 uppercase tracking-wider">
                    {msg.agentName}
                  </div>
                )}
                <div className="whitespace-pre-wrap">{msg.content}</div>
                <div
                  className={`text-[9px] ${isUser ? 'text-lime-100 text-right' : 'text-slate-400'}`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isProcessing && (
          <div className="flex items-center space-x-2.5 text-xs text-slate-500 animate-pulse">
            <div className="w-7 h-7 rounded-lg bg-white border border-[#d9e6be] flex items-center justify-center text-lime-600">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#e2eccb] text-slate-600 shadow-xs">
              Agent is analyzing and formulating response...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Pills */}
      <div className="px-4 py-2 border-t border-[#e2eccb] bg-[#fbfdf7] flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => onTriggerAction('ats100')}
          title="Optimize to 100% ATS score"
          className="px-2.5 py-1 rounded-full bg-[#ecfccb] hover:bg-[#d9f99d] border border-[#bef264] text-[#365314] text-[11px] font-bold flex items-center space-x-1 shrink-0 transition-colors cursor-pointer"
        >
          <span>💯 100% ATS</span>
        </button>

        <button
          onClick={() => onTriggerAction('recon')}
          title="View ATS match analysis"
          className="px-2.5 py-1 rounded-full bg-white hover:bg-[#f4fae6] border border-[#d9e6be] text-slate-700 text-[11px] font-medium flex items-center space-x-1 shrink-0 transition-colors cursor-pointer"
        >
          <Target className="w-3 h-3 text-lime-600" />
          <span>ATS Recon</span>
        </button>

        <button
          onClick={() => onTriggerAction('tailor')}
          title="Review Tailored Resume"
          className="px-2.5 py-1 rounded-full bg-white hover:bg-[#f4fae6] border border-[#d9e6be] text-slate-700 text-[11px] font-medium flex items-center space-x-1 shrink-0 transition-colors cursor-pointer"
        >
          <FileText className="w-3 h-3 text-lime-600" />
          <span>Tailor Resume</span>
        </button>

        <button
          onClick={() => onTriggerAction('star')}
          title="View STAR interview questions"
          className="px-2.5 py-1 rounded-full bg-white hover:bg-[#f4fae6] border border-[#d9e6be] text-slate-700 text-[11px] font-medium flex items-center space-x-1 shrink-0 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-lime-600" />
          <span>STAR Prep</span>
        </button>

        <button
          onClick={() => onTriggerAction('battlecard')}
          title="View 1-Page Battlecard"
          className="px-2.5 py-1 rounded-full bg-white hover:bg-[#f4fae6] border border-[#d9e6be] text-slate-700 text-[11px] font-medium flex items-center space-x-1 shrink-0 transition-colors cursor-pointer"
        >
          <Zap className="w-3 h-3 text-lime-600" />
          <span>Battlecard</span>
        </button>

        <button
          onClick={() => onTriggerAction('mock')}
          title="Practice in Mock Simulator"
          className="px-2.5 py-1 rounded-full bg-white hover:bg-[#f4fae6] border border-[#d9e6be] text-slate-700 text-[11px] font-medium flex items-center space-x-1 shrink-0 transition-colors cursor-pointer"
        >
          <Mic className="w-3 h-3 text-lime-600" />
          <span>Mock Simulator</span>
        </button>
      </div>

      {/* Input Box with Paperclip */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-[#e2eccb] bg-white">
        <div className="relative flex items-center space-x-2">
          {/* File Upload Icon Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Attach Resume (.pdf, .docx, .txt)"
            className="p-2 rounded-xl bg-[#f4fae6] hover:bg-[#ecfccb] text-lime-700 border border-[#d9e6be] transition-colors cursor-pointer shrink-0"
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
              className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-[#fbfdf7] border border-[#d9e6be] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#84cc16] transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isProcessing}
              className="absolute right-1.5 p-1.5 rounded-lg bg-[#65a30d] hover:bg-[#4d7c0f] disabled:opacity-30 text-white transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </form>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-[#d9e6be] rounded-2xl w-full max-w-lg overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="px-5 py-4 border-b border-[#e2eccb] flex items-center justify-between bg-[#fbfdf7]">
              <div className="flex items-center space-x-2">
                <Upload className="w-4 h-4 text-lime-700" />
                <h4 className="font-bold text-sm text-slate-900">Upload Resume & Job Description</h4>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-[#f4fae6] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-800 font-semibold">1. Resume File or Raw Text</label>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2 px-3 rounded-xl bg-[#fbfdf7] border border-dashed border-[#c3d99e] hover:border-lime-500 text-slate-700 flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <Paperclip className="w-4 h-4 text-lime-600" />
                  <span>Browse Resume File (.pdf, .docx, .txt)</span>
                </button>
                <textarea
                  rows={3}
                  placeholder="Or paste resume text, skills, and experience here..."
                  value={pastedResume}
                  onChange={(e) => setPastedResume(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#d9e6be] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-lime-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-800 font-semibold">2. Target Job Description</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Role Title (e.g. AI Engineer)"
                    value={jdTitle}
                    onChange={(e) => setJdTitle(e.target.value)}
                    className="p-2 rounded-xl bg-white border border-[#d9e6be] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-lime-500"
                  />
                  <input
                    type="text"
                    placeholder="Company Name (e.g. Google)"
                    value={jdCompany}
                    onChange={(e) => setJdCompany(e.target.value)}
                    className="p-2 rounded-xl bg-white border border-[#d9e6be] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-lime-500"
                  />
                </div>
                <textarea
                  rows={3}
                  placeholder="Paste the target job description requirements and qualifications here..."
                  value={pastedJd}
                  onChange={(e) => setPastedJd(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#d9e6be] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-lime-500"
                />
              </div>
            </div>

            <div className="px-5 py-3.5 bg-[#fbfdf7] border-t border-[#e2eccb] flex items-center justify-end space-x-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyCustomIntake}
                className="px-4 py-2 rounded-xl bg-[#65a30d] hover:bg-[#4d7c0f] text-white text-xs font-semibold shadow-xs cursor-pointer"
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
