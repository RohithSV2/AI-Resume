import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  FileText, 
  Sparkles, 
  Zap, 
  Mic, 
  Paperclip,
  Upload,
  X,
  Award,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { ChatMessage, AgentType, ResumeData, JobDescriptionData } from '../types';
import { extractTextFromFile } from '../services/fileParser';

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
  showUploadModal?: boolean;
  onCloseUploadModal?: () => void;
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
  showUploadModal: externalShowUploadModal,
  onCloseUploadModal,
}) => {
  const [inputText, setInputText] = useState('');
  const [internalShowModal, setInternalShowModal] = useState(false);
  const [pastedResume, setPastedResume] = useState('');
  const [pastedJd, setPastedJd] = useState('');
  const [jdTitle, setJdTitle] = useState('');
  const [jdCompany, setJdCompany] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showModal = externalShowUploadModal ?? internalShowModal;
  const setShowModal = (open: boolean) => {
    setInternalShowModal(open);
    if (!open && onCloseUploadModal) {
      onCloseUploadModal();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessing) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtracting(true);
    try {
      const extractedText = await extractTextFromFile(file);
      setUploadedFileName(file.name);
      setPastedResume(extractedText);

      // If user clicked paperclip outside the modal, process directly
      if (!showModal) {
        onUploadResumeText(extractedText, file.name);
      }
    } catch (err) {
      console.error('File extraction failed:', err);
      alert('Could not read file directly. You can paste your resume text into the text box.');
    } finally {
      setIsExtracting(false);
      e.target.value = '';
    }
  };

  const handleApplyCustomIntake = () => {
    const resumeTextToUse = pastedResume.trim();
    if (resumeTextToUse) {
      onUploadResumeText(resumeTextToUse, uploadedFileName || 'Custom_Resume.txt');
    }
    if (pastedJd.trim()) {
      onUpdateJdText(pastedJd.trim(), jdTitle || 'Software Engineer', jdCompany || 'Target Company');
    }
    setShowModal(false);
  };

  return (
    <aside className="flex h-[75vh] lg:h-[calc(100vh-6.5rem)] flex-col rounded-2xl border border-[#262836] bg-[#111218] shadow-2xl lg:sticky lg:top-20 overflow-hidden w-full">
      {/* Hidden File Input for Paperclip */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".txt,.md,.json,.pdf,.doc,.docx"
        className="hidden"
      />

      {/* Chat Assistant Header */}
      <div className="border-b border-[#262836] px-5 py-4 flex items-center justify-between bg-[#15161f] shrink-0">
        <div>
          <h2 className="font-['Sora'] font-semibold text-sm text-white">AI Career Assistant</h2>
          <p className="flex items-center gap-1.5 text-xs text-[#94a3b8] mt-0.5">
            <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
            <span>Ready to assist</span>
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          title="Upload custom resume and target job description"
          className="flex items-center gap-1.5 rounded-lg border border-[#262836] bg-[#1a1b24] hover:bg-[#222430] px-2.5 py-1.5 text-xs font-semibold text-[#cbd5e1] hover:text-white transition cursor-pointer"
        >
          <Upload className="h-3.5 w-3.5 text-[#ff6600]" />
          <span>Upload CV / JD</span>
        </button>
      </div>

      {/* Messages List */}
      <div className="flex-1 space-y-3.5 overflow-y-auto p-4 sm:p-5 bg-[#0c0d12]">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`max-w-[88%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed transition-all ${
                isUser
                  ? 'ml-auto bg-[#ff6600] text-white font-medium shadow-md shadow-[#ff6600]/25'
                  : 'bg-[#171822] text-[#f1f5f9] border border-[#262836] shadow-sm'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
              <div
                className={`text-[10px] mt-1.5 text-right ${
                  isUser ? 'text-white/75' : 'text-[#64748b]'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          );
        })}

        {isProcessing && (
          <div className="max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed bg-[#171822] border border-[#262836] text-[#cbd5e1] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff6600] animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-[#ff6600] animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-[#ff6600] animate-bounce [animation-delay:0.4s]" />
            <span className="ml-1 text-xs text-[#94a3b8] italic">AI is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Chips Bar */}
      <div className="px-3 py-2 border-t border-[#262836] bg-[#111218] flex items-center space-x-1.5 overflow-x-auto no-scrollbar shrink-0">
        <button
          onClick={() => onTriggerAction('ats100')}
          title="Optimize to 100% ATS score"
          className="px-2.5 py-1 rounded-full bg-[#ff6600]/15 hover:bg-[#ff6600]/25 border border-[#ff6600]/40 text-[#ffa05c] text-[11px] font-bold flex items-center space-x-1 shrink-0 transition cursor-pointer"
        >
          <Award className="w-3 h-3 text-[#ff6600]" />
          <span>100% ATS</span>
        </button>

        <button
          onClick={() => onTriggerAction('tailor')}
          title="Tailor resume to job description"
          className="px-2.5 py-1 rounded-full bg-[#171822] hover:bg-[#1f212d] hover:border-[#ff6600]/40 border border-[#262836] text-[#cbd5e1] hover:text-white text-[11px] font-medium flex items-center space-x-1 shrink-0 transition cursor-pointer"
        >
          <FileText className="w-3 h-3 text-[#ff6600]" />
          <span>Tailor Resume</span>
        </button>

        <button
          onClick={() => onTriggerAction('star')}
          title="View STAR interview questions"
          className="px-2.5 py-1 rounded-full bg-[#171822] hover:bg-[#1f212d] hover:border-[#ff6600]/40 border border-[#262836] text-[#cbd5e1] hover:text-white text-[11px] font-medium flex items-center space-x-1 shrink-0 transition cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-[#ff6600]" />
          <span>STAR Prep</span>
        </button>

        <button
          onClick={() => onTriggerAction('battlecard')}
          title="View 1-Page Battlecard"
          className="px-2.5 py-1 rounded-full bg-[#171822] hover:bg-[#1f212d] hover:border-[#ff6600]/40 border border-[#262836] text-[#cbd5e1] hover:text-white text-[11px] font-medium flex items-center space-x-1 shrink-0 transition cursor-pointer"
        >
          <Zap className="w-3 h-3 text-[#ff6600]" />
          <span>Battlecard</span>
        </button>

        <button
          onClick={() => onTriggerAction('mock')}
          title="Practice in Mock Simulator"
          className="px-2.5 py-1 rounded-full bg-[#171822] hover:bg-[#1f212d] hover:border-[#ff6600]/40 border border-[#262836] text-[#cbd5e1] hover:text-white text-[11px] font-medium flex items-center space-x-1 shrink-0 transition cursor-pointer"
        >
          <Mic className="w-3 h-3 text-[#ff6600]" />
          <span>Mock Interview</span>
        </button>
      </div>

      {/* Input Box with Paperclip */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-[#262836] bg-[#111218] flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Attach Resume (.pdf, .docx, .txt)"
          disabled={isExtracting}
          className="p-2.5 rounded-xl bg-[#171822] hover:bg-[#202230] text-[#ff6600] border border-[#262836] transition cursor-pointer shrink-0 disabled:opacity-50"
        >
          {isExtracting ? (
            <RefreshCw className="w-4 h-4 animate-spin text-[#ff6600]" />
          ) : (
            <Paperclip className="w-4 h-4" />
          )}
        </button>

        <div className="relative flex-1 flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isProcessing}
            placeholder="Ask: 'tailor resume', 'give interview answers'..."
            className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-[#090a0f] border border-[#262836] text-xs sm:text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600] transition"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isProcessing}
            className="absolute right-1.5 p-1.5 rounded-lg bg-[#ff6600] hover:bg-[#ff771a] disabled:opacity-30 text-white transition cursor-pointer shadow-sm shadow-[#ff6600]/25"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111218] border border-[#262836] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="px-5 py-4 border-b border-[#262836] flex items-center justify-between bg-[#15161f]">
              <div className="flex items-center space-x-2">
                <Upload className="w-4 h-4 text-[#ff6600]" />
                <h4 className="font-['Sora'] font-bold text-sm text-white">Upload Resume & Job Description</h4>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#1f212d] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[#cbd5e1] font-semibold">1. Resume File or Raw Text</label>
                  {uploadedFileName && (
                    <span className="text-[11px] text-[#10b981] font-bold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{uploadedFileName} ready</span>
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isExtracting}
                  className={`w-full py-3 px-3 rounded-xl border-2 border-dashed transition flex items-center justify-center space-x-2 cursor-pointer ${
                    uploadedFileName
                      ? 'bg-[#10b981]/10 border-[#10b981]/50 text-white'
                      : 'bg-[#090a0f] border-[#262836] hover:border-[#ff6600] text-[#cbd5e1]'
                  }`}
                >
                  {isExtracting ? (
                    <>
                      <RefreshCw className="w-4 h-4 text-[#ff6600] animate-spin" />
                      <span className="text-[#ffa05c] font-semibold">Extracting text from document (PDF / Word / TXT)...</span>
                    </>
                  ) : uploadedFileName ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                      <span className="font-bold text-white">✓ Loaded: {uploadedFileName}</span>
                      <span className="text-xs text-[#94a3b8]">(Click to replace)</span>
                    </>
                  ) : (
                    <>
                      <Paperclip className="w-4 h-4 text-[#ff6600]" />
                      <span className="font-semibold">Browse Resume File (.pdf, .docx, .txt)</span>
                    </>
                  )}
                </button>

                <textarea
                  rows={4}
                  placeholder="Or paste resume text, skills, and experience here..."
                  value={pastedResume}
                  onChange={(e) => setPastedResume(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#090a0f] border border-[#262836] text-white placeholder-[#64748b] focus:outline-none focus:border-[#ff6600] font-mono text-[11px] leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#cbd5e1] font-semibold">2. Target Job Description (Optional)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Role Title (e.g. AI Systems Engineer)"
                    value={jdTitle}
                    onChange={(e) => setJdTitle(e.target.value)}
                    className="p-2 rounded-xl bg-[#090a0f] border border-[#262836] text-white placeholder-[#64748b] focus:outline-none focus:border-[#ff6600]"
                  />
                  <input
                    type="text"
                    placeholder="Company Name (e.g. HyperScale AI)"
                    value={jdCompany}
                    onChange={(e) => setJdCompany(e.target.value)}
                    className="p-2 rounded-xl bg-[#090a0f] border border-[#262836] text-white placeholder-[#64748b] focus:outline-none focus:border-[#ff6600]"
                  />
                </div>
                <textarea
                  rows={3}
                  placeholder="Paste target job description requirements, qualifications, and role responsibilities..."
                  value={pastedJd}
                  onChange={(e) => setPastedJd(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#090a0f] border border-[#262836] text-white placeholder-[#64748b] focus:outline-none focus:border-[#ff6600]"
                />
              </div>
            </div>

            <div className="px-5 py-3.5 bg-[#15161f] border-t border-[#262836] flex items-center justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#94a3b8] hover:text-white transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyCustomIntake}
                disabled={isExtracting || (!pastedResume.trim() && !pastedJd.trim())}
                className="px-5 py-2.5 rounded-xl bg-[#ff6600] hover:bg-[#ff771a] disabled:opacity-40 text-white text-xs font-bold shadow-md shadow-[#ff6600]/25 transition cursor-pointer flex items-center space-x-1.5"
              >
                {isExtracting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Extracting...</span>
                  </>
                ) : (
                  <span>Analyze & Synchronize</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
