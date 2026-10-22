import React, { useState } from 'react';
import { X, Upload, Paperclip, CheckCircle2, RefreshCw } from 'lucide-react';
import { extractTextFromFile } from '../services/fileParser';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyIntake: (data: {
    resumeText: string;
    filename: string;
    jdText?: string;
    jdTitle?: string;
    jdCompany?: string;
  }) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onApplyIntake,
}) => {
  const [resumeText, setResumeText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [jdText, setJdText] = useState('');
  const [jdTitle, setJdTitle] = useState('');
  const [jdCompany, setJdCompany] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtracting(true);
    setErrorMsg(null);
    try {
      const extracted = await extractTextFromFile(file);
      if (!extracted || extracted.trim().length === 0) {
        throw new Error('Extracted text is empty');
      }
      setUploadedFileName(file.name);
      setResumeText(extracted);
    } catch (err: any) {
      console.error('File extraction error:', err);
      setErrorMsg('Could not read file text automatically. Please paste your resume text below.');
    } finally {
      setIsExtracting(false);
      e.target.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim() && !jdText.trim()) return;

    onApplyIntake({
      resumeText: resumeText.trim(),
      filename: uploadedFileName || 'Custom_Resume.txt',
      jdText: jdText.trim() || undefined,
      jdTitle: jdTitle.trim() || undefined,
      jdCompany: jdCompany.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-[#111218] border border-[#262836] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#262836] flex items-center justify-between bg-[#15161f]">
          <div className="flex items-center space-x-2">
            <Upload className="w-4 h-4 text-[#ff6600]" />
            <h4 className="font-['Sora'] font-bold text-sm text-white">Upload Resume & Job Description</h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#1f212d] transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-5 space-y-4 text-xs">
            {/* Step 1: Resume Upload / Paste */}
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

              {/* Native Label File Selector — 100% reliable click on all browsers */}
              <label className={`w-full py-3 px-3 rounded-xl border-2 border-dashed transition flex items-center justify-center space-x-2 cursor-pointer select-none ${
                uploadedFileName
                  ? 'bg-[#10b981]/10 border-[#10b981]/50 text-white'
                  : 'bg-[#090a0f] border-[#262836] hover:border-[#ff6600] text-[#cbd5e1]'
              }`}>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.doc,.txt,.md,.json"
                  className="sr-only"
                  disabled={isExtracting}
                />
                {isExtracting ? (
                  <>
                    <RefreshCw className="w-4 h-4 text-[#ff6600] animate-spin" />
                    <span className="text-[#ffa05c] font-semibold">Extracting resume text (PDF / Word / TXT)...</span>
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
              </label>

              {errorMsg && (
                <p className="text-[11px] text-[#ff6644] font-medium">{errorMsg}</p>
              )}

              <textarea
                rows={4}
                placeholder="Or paste resume text, skills, and experience here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#090a0f] border border-[#262836] text-white placeholder-[#64748b] focus:outline-none focus:border-[#ff6600] font-mono text-[11px] leading-relaxed"
              />
            </div>

            {/* Step 2: Target Job Description */}
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
                placeholder="Paste target job description requirements and qualifications here..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#090a0f] border border-[#262836] text-white placeholder-[#64748b] focus:outline-none focus:border-[#ff6600]"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-3.5 bg-[#15161f] border-t border-[#262836] flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#94a3b8] hover:text-white transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isExtracting || (!resumeText.trim() && !jdText.trim())}
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
        </form>
      </div>
    </div>
  );
};
