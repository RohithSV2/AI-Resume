export type AgentType = 
  | 'orchestrator'
  | 'intake'
  | 'recon'
  | 'tailor'
  | 'interview_coach'
  | 'battlecard';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'agent';
  agentType?: AgentType;
  agentName?: string;
  content: string;
  timestamp: string;
  status?: 'thinking' | 'done' | 'error';
  actionPrompt?: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
  tailoredAchievements?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  year: string;
  grade?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  highlights: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  tailoredSummary?: string;
  skills: {
    category: string;
    items: string[];
  }[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  certifications: string[];
}

export interface JobDescriptionData {
  roleTitle: string;
  company: string;
  location?: string;
  rawText: string;
  targetSeniority?: string;
  requiredSkills: string[];
  bonusSkills: string[];
  responsibilities: string[];
}

export interface ReconAnalysis {
  atsScore: number;
  matchBreakdown: {
    skillsMatch: number;
    experienceMatch: number;
    educationMatch: number;
    overall: number;
  };
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  gaps: string[];
  companyCultureNotes: string;
  roleStrategy: string;
}

export interface StarStory {
  id: string;
  question: string;
  category: 'Behavioral' | 'Technical' | 'Situational' | 'Leadership';
  situation: string;
  task: string;
  action: string;
  result: string;
  targetSkill: string;
  keyMetric: string;
  deliveryTip: string;
  practiced: boolean;
}

export interface BattlecardData {
  candidateName: string;
  targetRole: string;
  companyName: string;
  elevatorPitch: string;
  topValueProps: string[];
  keyStoriesHook: {
    trigger: string;
    hook: string;
    punchline: string;
  }[];
  questionsToAsk: {
    category: string;
    question: string;
    purpose: string;
  }[];
  defusers: {
    scenario: string;
    response: string;
  }[];
  dayOfChecklist: string[];
}

export interface MockQuestionResult {
  question: string;
  userAnswer: string;
  score: number;
  feedback: string;
  starRatings: {
    situation: boolean;
    task: boolean;
    action: boolean;
    result: boolean;
  };
  improvedAnswerSnippet: string;
}

export interface AppConfig {
  geminiApiKey: string;
  selectedModel: string;
  mode: 'auto' | 'gemini_only' | 'fallback_only';
}
