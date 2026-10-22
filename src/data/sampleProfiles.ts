import { ResumeData, JobDescriptionData } from '../types';

export const SAMPLE_RESUME: ResumeData = {
  personalInfo: {
    fullName: "Rohith S.",
    email: "rohith.tech@example.com",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
    linkedin: "linkedin.com/in/rohith-dev",
    github: "github.com/rohith-dev",
    portfolio: "rohith-portfolio.dev"
  },
  professionalSummary: "Results-driven Software Engineer with 2+ years of experience in building modern web applications, distributed backend services, and AI-enabled tools. Passionate about scalable cloud architectures, developer velocity, and clean modular code.",
  tailoredSummary: "Target-focused Full-Stack & AI Engineer specializing in React, TypeScript, Python backend systems, and LLM orchestration. Proven track record of boosting application performance by 35% and automating intelligence workflows with modern GenAI frameworks.",
  skills: [
    {
      category: "Languages & Frameworks",
      items: ["TypeScript", "JavaScript", "Python", "React", "Next.js", "Node.js", "Tailwind CSS", "FastAPI"]
    },
    {
      category: "Cloud, AI & DevOps",
      items: ["Docker", "Git", "REST APIs", "PostgreSQL", "Redis", "LangChain", "Gemini API", "Vector DBs"]
    },
    {
      category: "Practices & Concepts",
      items: ["Microservices", "CI/CD Pipelines", "System Design", "Agile/Scrum", "Unit Testing", "Performance Optimization"]
    }
  ],
  experience: [
    {
      id: "exp-1",
      company: "Apex Tech Solutions",
      role: "Associate Software Engineer",
      period: "2024 - Present",
      location: "Bangalore, India",
      achievements: [
        "Built and maintained responsive micro-frontends in React and TypeScript serving 40k+ monthly active users.",
        "Engineered RESTful endpoints in Python (FastAPI) and optimized PostgreSQL queries, reducing median API latency by 32%.",
        "Implemented automated CI/CD workflows using GitHub Actions, cutting release deployment cycles from 45 to 12 minutes."
      ],
      tailoredAchievements: [
        "Spearheaded micro-frontend architecture migration using React 19 and Next.js, elevating Lighthouse performance scores to 98/100 for 40,000+ active users.",
        "Architected scalable asynchronous APIs and vector query pipelines in Python FastAPI & PostgreSQL, reducing 99th-percentile response latency by 35%.",
        "Integrated modern GenAI agent pipelines and automated regression testing, accelerating continuous delivery release velocity by 73%."
      ]
    },
    {
      id: "exp-2",
      company: "Nexus Labs",
      role: "Software Engineering Intern",
      period: "2023 - 2024",
      location: "Remote",
      achievements: [
        "Collaborated with senior engineers to build internal analytics dashboard using React, Tailwind, and Node.js.",
        "Wrote unit and integration tests achieving 85% code coverage across core business logic modules.",
        "Researched and prototyped LLM prompt workflows for customer support ticket classification."
      ],
      tailoredAchievements: [
        "Developed high-throughput data visualization dashboards in React and TypeScript, handling real-time streaming telemetry with zero UI frame drops.",
        "Delivered comprehensive automated test suites (Vitest / Jest) increasing code coverage to 88% and eliminating critical production regressions.",
        "Engineered an automated semantic ticket triage prototype leveraging Google Gemini & LangChain, slashing manual triage overhead by 60%."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Engineering in Computer Science & Engineering",
      school: "National Institute of Engineering / VTU",
      year: "2020 - 2024",
      grade: "CGPA: 8.9 / 10"
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Agri-Bot: AI Agricultural Intelligence Assistant",
      description: "Full-stack GenAI assistant providing multi-lingual crop disease diagnosis and soil recommendation using multimodal vision models.",
      techStack: ["React", "Python", "FastAPI", "Gemini Vision", "Docker"],
      highlights: [
        "Integrated Gemini 1.5 Flash multimodal vision API for instant leaf blight detection with 94% accuracy.",
        "Processed audio queries in regional languages and provided actionable yield-maximization suggestions."
      ]
    },
    {
      id: "proj-2",
      title: "Cloud-SDP: Distributed NGO Volunteer Matching System",
      description: "Scalable volunteer matching platform connecting NGOs with skilled volunteers using intelligent scoring and geolocation clustering.",
      techStack: ["Node.js", "Express", "PostgreSQL", "Tailwind CSS", "Redis"],
      highlights: [
        "Constructed automated matching algorithm evaluating volunteer skills and schedule constraints.",
        "Implemented secure JWT authentication and role-based access control for 50+ registered organizations."
      ]
    }
  ],
  certifications: [
    "AWS Certified Cloud Practitioner",
    "Google Generative AI Leader Certification",
    "Meta Front-End Developer Specialization"
  ]
};

export const SAMPLE_JOB_DESCRIPTION: JobDescriptionData = {
  roleTitle: "Senior Full Stack & AI Systems Engineer",
  company: "HyperScale AI Technologies",
  location: "Bangalore / Hybrid",
  targetSeniority: "Mid-Senior (2-5 years)",
  rawText: `Job Title: Senior Full Stack & AI Systems Engineer
Company: HyperScale AI Technologies
Location: Bangalore, India (Hybrid)

About the Role:
We are looking for a passionate and proactive Full Stack & AI Systems Engineer to build the next generation of our intelligent automation workspace. You will work at the intersection of modern web interfaces (React/Next.js/TypeScript), robust backend services (Python/FastAPI/Node.js), and state-of-the-art LLM architectures (Gemini, LangChain, Agentic workflows).

Key Responsibilities:
- Design and develop low-latency, scalable web applications with React, TypeScript, and modern styling.
- Architect high-performance backend microservices in Python or Node.js capable of handling real-time LLM streaming and vector search.
- Collaborate with AI researchers to integrate multi-agent systems, semantic retrieval, and structured JSON outputs.
- Write robust, self-healing code with comprehensive test coverage and CI/CD automation.
- Drive technical discussions, mentor junior team members, and optimize system bottlenecks.

Required Qualifications:
- 2+ years of professional software engineering experience in full-stack web development.
- Strong proficiency in TypeScript, React, and modern state management.
- Proven experience building backend APIs with Python (FastAPI/Flask) or Node.js.
- Familiarity with GenAI paradigms, LLM APIs (Gemini/OpenAI), prompt engineering, and agentic graphs.
- Hands-on experience with SQL databases (PostgreSQL) and caching layers (Redis).
- Solid grasp of Git, Docker containerization, and automated CI/CD practices.

Nice-to-Have:
- Exposure to LangChain, LangGraph, or multi-agent orchestration frameworks.
- Experience with client-side PDF rendering, streaming SSE/WebSockets, or vector databases.
- Track record of open-source contributions or demonstrable AI projects.`,
  requiredSkills: [
    "React",
    "TypeScript",
    "Python",
    "FastAPI",
    "Node.js",
    "GenAI / LLM APIs",
    "PostgreSQL",
    "Docker",
    "CI/CD",
    "Git"
  ],
  bonusSkills: [
    "LangChain / LangGraph",
    "Vector Databases",
    "WebSockets / SSE Streaming",
    "System Design",
    "Next.js"
  ],
  responsibilities: [
    "Design low-latency web interfaces with React and TypeScript.",
    "Architect backend microservices in Python handling LLM streaming.",
    "Integrate agentic AI workflows and structured schema outputs.",
    "Write comprehensive unit/integration test suites.",
    "Optimize latency and database performance bottlenecks."
  ]
};
