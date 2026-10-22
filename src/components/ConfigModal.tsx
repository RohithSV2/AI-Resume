import React, { useState } from 'react';
import { X, Key, Cpu, ShieldCheck, ExternalLink, CheckCircle2 } from 'lucide-react';
import { AppConfig } from '../types';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  onSaveConfig: (newConfig: AppConfig) => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [apiKey, setApiKey] = useState(config.geminiApiKey || '');
  const [model, setModel] = useState(config.selectedModel || 'gemini-2.5-flash');
  const [mode, setMode] = useState<AppConfig['mode']>(config.mode || 'auto');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveConfig({
      geminiApiKey: apiKey.trim(),
      selectedModel: model,
      mode: mode,
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white border border-[#d2e2b3] rounded-2xl w-full max-w-lg overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#fbfdf7] border-b border-[#e2eccb] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-[#65a30d]" />
            <h3 className="font-bold text-base text-slate-900">Model & Engine Configuration</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-[#f4fae6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 bg-white">
          {/* Engine Notice */}
          <div className="p-3.5 rounded-xl bg-[#f7fcee] border border-[#d9f99d] text-xs text-[#365314] flex items-start space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-[#65a30d] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#3f6212]">Dual-Intelligence Architecture:</span> If you provide a Google Gemini API Key, live generative calls will be used. If no key is entered, NextRole automatically switches to its built-in intelligent engine so all features (ATS scoring, resume tailoring, STAR prep, battlecard) work 100% reliably for offline demos and college vivas!
            </div>
          </div>

          {/* Gemini API Key */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-700 flex items-center space-x-1.5">
                <span>Google Gemini API Key</span>
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-[#4d7c0f] font-semibold hover:text-[#365314] flex items-center space-x-1 underline"
              >
                <span>Get free key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#fbfdf7] border border-[#d2e2b3] text-sm text-slate-800 focus:outline-none focus:border-[#65a30d] font-mono shadow-xs"
            />
            <p className="text-[11px] text-slate-500">
              Keys are stored securely in your browser's localStorage and never transmitted to external servers.
            </p>
          </div>

          {/* Gemini Model Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center space-x-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#65a30d]" />
              <span>Select Model</span>
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#fbfdf7] border border-[#d2e2b3] text-sm text-slate-800 focus:outline-none focus:border-[#65a30d] cursor-pointer shadow-xs"
            >
              <option value="gemini-2.5-flash">Gemini 2.5 Flash (Ultra-fast & Recommended)</option>
              <option value="gemini-1.5-flash">Gemini 1.5 Flash (High throughput)</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro (Deep reasoning)</option>
            </select>
          </div>

          {/* Execution Mode */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Execution Mode</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMode('auto')}
                className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                  mode === 'auto'
                    ? 'bg-[#ecfccb] border-[#84cc16] text-[#365314] font-bold shadow-xs'
                    : 'bg-white border-[#d2e2b3] text-slate-600 hover:text-slate-900 hover:bg-[#f7faee]'
                }`}
              >
                Auto (Smart)
              </button>
              <button
                type="button"
                onClick={() => setMode('gemini_only')}
                className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                  mode === 'gemini_only'
                    ? 'bg-[#ecfccb] border-[#84cc16] text-[#365314] font-bold shadow-xs'
                    : 'bg-white border-[#d2e2b3] text-slate-600 hover:text-slate-900 hover:bg-[#f7faee]'
                }`}
              >
                Gemini LLM
              </button>
              <button
                type="button"
                onClick={() => setMode('fallback_only')}
                className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                  mode === 'fallback_only'
                    ? 'bg-[#ecfccb] border-[#84cc16] text-[#365314] font-bold shadow-xs'
                    : 'bg-white border-[#d2e2b3] text-slate-600 hover:text-slate-900 hover:bg-[#f7faee]'
                }`}
              >
                Offline Engine
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#fbfdf7] border-t border-[#e2eccb] flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-[#f4fae6] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#65a30d] hover:bg-[#4d7c0f] text-white shadow-xs flex items-center space-x-1.5 cursor-pointer"
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
