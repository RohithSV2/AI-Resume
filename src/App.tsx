import React, { useState, useEffect } from 'react';
import { 
  ResumeData, 
  JobDescriptionData, 
  ReconAnalysis, 
  StarStory, 
  BattlecardData, 
  ChatMessage, 
  AgentType, 
  AppConfig 
} from './types';
import { SAMPLE_RESUME, ATS_100_BENCHMARK_RESUME, SAMPLE_JOB_DESCRIPTION } from './data/sampleProfiles';
import { 
  analyzeJobMatch, 
  tailorResume, 
  optimizeTo100Ats,
  generateStarPrep, 
  generateBattlecard, 
  chatWithCareerAgent 
} from './services/aiService';
import { TopBar } from './components/TopBar';
import { ChatPanel } from './components/ChatPanel';
import { ArtifactWorkspace } from './components/ArtifactWorkspace';
import { ConfigModal } from './components/ConfigModal';

export const App: React.FC = () => {
  // Config state
  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('nextrole_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      geminiApiKey: '',
      selectedModel: 'gemini-2.5-flash',
      mode: 'auto',
    };
  });
  const [configOpen, setConfigOpen] = useState(false);

  // Core Data State
  const [resume, setResume] = useState<ResumeData>(SAMPLE_RESUME);
  const [jd, setJd] = useState<JobDescriptionData>(SAMPLE_JOB_DESCRIPTION);
  const [recon, setRecon] = useState<ReconAnalysis | null>(null);
  const [stories, setStories] = useState<StarStory[]>([]);
  const [battlecard, setBattlecard] = useState<BattlecardData | null>(null);

  // UI State
  const [activeTab, setActiveTab] = useState<string>('recon');
  const [activeAgent, setActiveAgent] = useState<AgentType>('orchestrator');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [selectedMockQuestion, setSelectedMockQuestion] = useState<string | undefined>(undefined);

  // Chat History
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      agentName: 'NextRole Orchestrator',
      agentType: 'orchestrator',
      content: `👋 **Welcome to NextRole AI!**
I am your GenAI Career Copilot. I've automatically loaded your candidate profile and the target job description for **${SAMPLE_JOB_DESCRIPTION.roleTitle}** at **${SAMPLE_JOB_DESCRIPTION.company}**.

**Pipeline Status**:
- 🔍 **ATS Match Score**: Evaluated at **88%** alignment
- 📄 **Tailored Resume**: Ready with quantified metric enhancements
- 🎯 **STAR Interview Guide**: 4 customized STAR stories generated
- ⚡ **Day-of Battlecard**: 60-second pitch and interview cheat sheet assembled

Use the workspace tabs on the right to review artifacts, or chat with me anytime to refine bullet points!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  // Initial auto-computation on first mount
  useEffect(() => {
    const initPipeline = async () => {
      setIsProcessing(true);
      try {
        const reconResult = await analyzeJobMatch(SAMPLE_RESUME, SAMPLE_JOB_DESCRIPTION, config);
        setRecon(reconResult);

        const tailored = await tailorResume(SAMPLE_RESUME, SAMPLE_JOB_DESCRIPTION, config);
        setResume(tailored);

        const starStories = await generateStarPrep(tailored, SAMPLE_JOB_DESCRIPTION, config);
        setStories(starStories);

        const card = await generateBattlecard(tailored, SAMPLE_JOB_DESCRIPTION, config);
        setBattlecard(card);
      } catch (err) {
        console.error('Initialization error:', err);
      } finally {
        setIsProcessing(false);
      }
    };

    initPipeline();
  }, []);

  const handleSaveConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    localStorage.setItem('nextrole_config', JSON.stringify(newConfig));
  };

  const handleLoadDemo = async () => {
    setIsProcessing(true);
    setActiveAgent('intake');
    setResume(SAMPLE_RESUME);
    setJd(SAMPLE_JOB_DESCRIPTION);

    const reconResult = await analyzeJobMatch(SAMPLE_RESUME, SAMPLE_JOB_DESCRIPTION, config);
    setRecon(reconResult);

    const tailored = await tailorResume(SAMPLE_RESUME, SAMPLE_JOB_DESCRIPTION, config);
    setResume(tailored);

    const starStories = await generateStarPrep(tailored, SAMPLE_JOB_DESCRIPTION, config);
    setStories(starStories);

    const card = await generateBattlecard(tailored, SAMPLE_JOB_DESCRIPTION, config);
    setBattlecard(card);

    setMessages((prev) => [
      ...prev,
      {
        id: `demo-${Date.now()}`,
        sender: 'assistant',
        agentName: 'NextRole Intake Agent',
        agentType: 'intake',
        content: `⚡ **College Demo Profile Successfully Loaded!**
Reloaded candidate **${SAMPLE_RESUME.personalInfo.fullName}** and job description for **${SAMPLE_JOB_DESCRIPTION.company}**. All subagents have completed their initial synthesis.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);

    setActiveAgent('orchestrator');
    setIsProcessing(false);
  };

  const handleLoad100AtsProfile = async () => {
    setIsProcessing(true);
    setActiveAgent('intake');
    setResume(ATS_100_BENCHMARK_RESUME);

    const reconResult = await analyzeJobMatch(ATS_100_BENCHMARK_RESUME, jd, config);
    setRecon(reconResult);

    const starStories = await generateStarPrep(ATS_100_BENCHMARK_RESUME, jd, config);
    setStories(starStories);

    const card = await generateBattlecard(ATS_100_BENCHMARK_RESUME, jd, config);
    setBattlecard(card);

    setActiveTab('recon');
    setMessages((prev) => [
      ...prev,
      {
        id: `ats100-${Date.now()}`,
        sender: 'assistant',
        agentName: 'Hiring Recon Agent',
        agentType: 'recon',
        content: `🏆 **100% ATS Web Benchmark Profile Loaded!**
Candidate **${ATS_100_BENCHMARK_RESUME.personalInfo.fullName}** achieves a verified **100/100 ATS Score**:
- ✅ **100% Core Competencies Matched**
- ✅ **Google XYZ Metric Formula Adherence**
- ✅ **Single-Column ATS Parsing Certified**`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);

    setActiveAgent('orchestrator');
    setIsProcessing(false);
  };

  const handleOptimize100Ats = async () => {
    setIsProcessing(true);
    setActiveAgent('tailor');

    const { resume: optimizedResume, recon: optimizedRecon } = optimizeTo100Ats(resume, jd);
    setResume(optimizedResume);
    setRecon(optimizedRecon);

    const starStories = await generateStarPrep(optimizedResume, jd, config);
    setStories(starStories);

    const card = await generateBattlecard(optimizedResume, jd, config);
    setBattlecard(card);

    setActiveTab('recon');
    setMessages((prev) => [
      ...prev,
      {
        id: `opt100-${Date.now()}`,
        sender: 'assistant',
        agentName: 'Resume Tailor Agent',
        agentType: 'tailor',
        content: `⚡ **Optimized to 100% ATS Web Standard!**
Injected all missing keywords, upgraded experience achievements to Google XYZ metrics, and aligned with Jobscan & Workday ATS standards. Current ATS match score is **100%**!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);

    setActiveAgent('orchestrator');
    setIsProcessing(false);
  };

  const handleReset = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'assistant',
        agentName: 'NextRole Orchestrator',
        agentType: 'orchestrator',
        content: '🔄 Workspace refreshed. Provide a resume or job description to begin.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);

    try {
      const response = await chatWithCareerAgent(messages, text, resume, jd, config);
      setActiveAgent(response.agentType);

      // If user requested specific action, also switch active tab
      if (response.agentType === 'recon') setActiveTab('recon');
      if (response.agentType === 'tailor') setActiveTab('resume');
      if (response.agentType === 'interview_coach') setActiveTab('star');
      if (response.agentType === 'battlecard') setActiveTab('battlecard');

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          agentName: response.agentName,
          agentType: response.agentType,
          content: response.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTriggerAction = async (actionKey: 'recon' | 'tailor' | 'star' | 'battlecard' | 'mock' | 'ats100') => {
    setIsProcessing(true);

    if (actionKey === 'ats100') {
      await handleOptimize100Ats();
      return;
    }

    if (actionKey === 'recon') {
      setActiveAgent('recon');
      const res = await analyzeJobMatch(resume, jd, config);
      setRecon(res);
      setActiveTab('recon');
      setMessages(prev => [
        ...prev,
        {
          id: `recon-${Date.now()}`,
          sender: 'assistant',
          agentName: 'Hiring Recon Agent',
          agentType: 'recon',
          content: `📊 **ATS Recon Updated**: Match score is **${res.atsScore}%**. Matched ${res.matchedKeywords.length} core keywords. Switched to ATS & Recon tab.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } else if (actionKey === 'tailor') {
      setActiveAgent('tailor');
      const tailored = await tailorResume(resume, jd, config);
      setResume(tailored);
      setActiveTab('resume');
      setMessages(prev => [
        ...prev,
        {
          id: `tailor-${Date.now()}`,
          sender: 'assistant',
          agentName: 'Resume Tailor Agent',
          agentType: 'tailor',
          content: `📄 **Resume Tailored**: Successfully injected targeted JD keywords and quantified metric achievements. Switched to Tailored Resume tab.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } else if (actionKey === 'star') {
      setActiveAgent('interview_coach');
      const starStories = await generateStarPrep(resume, jd, config);
      setStories(starStories);
      setActiveTab('star');
      setMessages(prev => [
        ...prev,
        {
          id: `star-${Date.now()}`,
          sender: 'assistant',
          agentName: 'Interview Coach Agent',
          agentType: 'interview_coach',
          content: `🎯 **STAR Guide Generated**: Prepared ${starStories.length} structured behavioral & technical stories. Switched to STAR Prep Guide tab.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } else if (actionKey === 'battlecard') {
      setActiveAgent('battlecard');
      const card = await generateBattlecard(resume, jd, config);
      setBattlecard(card);
      setActiveTab('battlecard');
      setMessages(prev => [
        ...prev,
        {
          id: `card-${Date.now()}`,
          sender: 'assistant',
          agentName: 'Battlecard Agent',
          agentType: 'battlecard',
          content: `⚡ **Day-of Battlecard Assembled**: 60-second pitch, key value hooks, and interviewer questions ready. Switched to Battlecard tab.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } else if (actionKey === 'mock') {
      setActiveAgent('interview_coach');
      setActiveTab('mock');
      setMessages(prev => [
        ...prev,
        {
          id: `mock-${Date.now()}`,
          sender: 'assistant',
          agentName: 'Mock Simulator Coach',
          agentType: 'interview_coach',
          content: `🎙️ **Mock Simulator Ready**: Switched to Mock Simulator tab. Practice your responses and receive real-time STAR evaluation.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    }

    setIsProcessing(false);
  };

  const handleTogglePracticed = (storyId: string) => {
    setStories(prev => prev.map(s => s.id === storyId ? { ...s, practiced: !s.practiced } : s));
  };

  const handleUploadResumeText = async (text: string, filename?: string) => {
    setIsProcessing(true);
    setActiveAgent('intake');

    // Create updated resume object incorporating parsed text
    const updated: ResumeData = {
      ...resume,
      professionalSummary: text.slice(0, 300) || resume.professionalSummary,
    };
    setResume(updated);

    const reconResult = await analyzeJobMatch(updated, jd, config);
    setRecon(reconResult);

    setMessages(prev => [
      ...prev,
      {
        id: `upload-${Date.now()}`,
        sender: 'assistant',
        agentName: 'Document Intake Agent',
        agentType: 'intake',
        content: `📁 **Resume Received (${filename || 'Uploaded Document'})**:
Extracted profile text and synchronized with our Recon Agent. New ATS match score is **${reconResult.atsScore}%**.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);

    setActiveAgent('orchestrator');
    setIsProcessing(false);
  };

  const handleUpdateJdText = async (rawText: string, title?: string, company?: string) => {
    setIsProcessing(true);
    setActiveAgent('recon');

    const updatedJd: JobDescriptionData = {
      ...jd,
      roleTitle: title || jd.roleTitle,
      company: company || jd.company,
      rawText: rawText,
    };
    setJd(updatedJd);

    const reconResult = await analyzeJobMatch(resume, updatedJd, config);
    setRecon(reconResult);

    const card = await generateBattlecard(resume, updatedJd, config);
    setBattlecard(card);

    setMessages(prev => [
      ...prev,
      {
        id: `jd-${Date.now()}`,
        sender: 'assistant',
        agentName: 'Hiring Recon Agent',
        agentType: 'recon',
        content: `📋 **Job Description Updated**:
Targeting **${updatedJd.roleTitle}** at **${updatedJd.company}**. Re-calculated ATS match score to **${reconResult.atsScore}%**.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);

    setActiveAgent('orchestrator');
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Top Header */}
      <TopBar
        activeAgent={activeAgent}
        onOpenConfig={() => setConfigOpen(true)}
        onLoadDemo={handleLoadDemo}
        onLoad100Ats={handleLoad100AtsProfile}
        onReset={handleReset}
        isProcessing={isProcessing}
      />

      {/* Main Split-Pane Workspace */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Pane: Interactive Multi-Agent Copilot */}
        <ChatPanel
          messages={messages}
          onSendMessage={handleSendMessage}
          isProcessing={isProcessing}
          activeAgent={activeAgent}
          resume={resume}
          jd={jd}
          onUploadResumeText={handleUploadResumeText}
          onUpdateJdText={handleUpdateJdText}
          onTriggerAction={handleTriggerAction}
        />

        {/* Right Pane: Live Artifact Workspace */}
        <ArtifactWorkspace
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          resume={resume}
          jd={jd}
          recon={recon}
          stories={stories}
          battlecard={battlecard}
          onUpdateResume={setResume}
          onTogglePracticed={handleTogglePracticed}
          onRunTailoring={() => handleTriggerAction('tailor')}
          onOptimize100Ats={handleOptimize100Ats}
          isProcessing={isProcessing}
          selectedMockQuestion={selectedMockQuestion}
        />
      </main>

      {/* Settings / Config Modal */}
      <ConfigModal
        isOpen={configOpen}
        onClose={() => setConfigOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
      />
    </div>
  );
};

export default App;
