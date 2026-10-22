import { ResumeData, JobDescriptionData } from '../types';

/**
 * Standard Tech Candidate Profile
 */
export const SAMPLE_RESUME: ResumeData = {
  personalInfo: {
    fullName: "Alex Morgan",
    email: "alex.morgan.tech@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA / Remote",
    linkedin: "linkedin.com/in/alexmorgan-tech",
    github: "github.com/alexmorgan-dev",
    portfolio: "alexmorgan.dev"
  },
  professionalSummary: "Results-driven Software Engineer with 3+ years of experience in building modern web applications, distributed backend services, and AI-enabled tools. Passionate about scalable cloud architectures, developer velocity, and clean modular code.",
  tailoredSummary: "Target-focused Full-Stack & AI Systems Engineer specializing in React 19, TypeScript, Python FastAPI backend architectures, and LLM orchestration. Proven track record of boosting application performance by 35% and automating intelligence workflows with modern GenAI frameworks.",
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
      role: "Software Engineer",
      period: "2023 - Present",
      location: "San Francisco, CA",
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
      role: "Full Stack Developer",
      period: "2022 - 2023",
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
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      year: "2018 - 2022",
      grade: "GPA: 3.8 / 4.0"
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "OmniAI: Multimodal Vision & Intelligence Assistant",
      description: "Full-stack GenAI platform providing multi-lingual visual document comprehension and structured data extraction.",
      techStack: ["React", "Python", "FastAPI", "Gemini Vision", "Docker"],
      highlights: [
        "Integrated Gemini 1.5 Flash multimodal vision API for document parsing with 96% field extraction accuracy.",
        "Designed streaming SSE endpoints delivering real-time LLM token generation with sub-200ms latency."
      ]
    },
    {
      id: "proj-2",
      title: "Distributed Task & Resource Scheduler",
      description: "Fault-tolerant distributed job coordinator managing background worker pools with Redis queues.",
      techStack: ["Node.js", "Express", "PostgreSQL", "Tailwind CSS", "Redis"],
      highlights: [
        "Constructed automated matching algorithm evaluating task priority and worker capacity constraints.",
        "Implemented secure JWT authentication and role-based access control for 50+ enterprise teams."
      ]
    }
  ],
  certifications: [
    "AWS Certified Solutions Architect - Associate",
    "Google Professional Generative AI Leader",
    "Meta Senior Front-End Developer Specialization"
  ]
};

/**
 * 100% ATS Perfect Match Profile (Web Benchmark Standards)
 * Follows Harvard/Stanford single-column format, 100% exact keyword alignment,
 * Google XYZ formula for every achievement bullet, and zero parsing errors.
 */
export const ATS_100_BENCHMARK_RESUME: ResumeData = {
  personalInfo: {
    fullName: "Alex Morgan",
    email: "alex.morgan.tech@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA / Remote",
    linkedin: "linkedin.com/in/alexmorgan-tech",
    github: "github.com/alexmorgan-dev",
    portfolio: "alexmorgan.dev"
  },
  professionalSummary: "High-impact Senior Full Stack & AI Systems Engineer with 4+ years of experience architecting distributed web applications and production GenAI pipelines. Expert in React, TypeScript, Python FastAPI, Node.js, Docker, CI/CD, and PostgreSQL. Proven track record of boosting system throughput by 42%, slashing p99 latency by 35%, and orchestrating multi-agent LLM workflows with LangChain, LangGraph, and Vector Databases.",
  tailoredSummary: "High-impact Senior Full Stack & AI Systems Engineer with 4+ years of experience architecting distributed web applications and production GenAI pipelines. Expert in React, TypeScript, Python FastAPI, Node.js, Docker, CI/CD, and PostgreSQL. Proven track record of boosting system throughput by 42%, slashing p99 latency by 35%, and orchestrating multi-agent LLM workflows with LangChain, LangGraph, and Vector Databases.",
  skills: [
    {
      category: "Frontend Engineering",
      items: ["React", "TypeScript", "JavaScript", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "WebSockets / SSE Streaming"]
    },
    {
      category: "Backend & Distributed Systems",
      items: ["Python", "FastAPI", "Node.js", "PostgreSQL", "Redis", "REST APIs", "Microservices", "System Design"]
    },
    {
      category: "Generative AI & Agentic Workflows",
      items: ["GenAI / LLM APIs", "Google Gemini API", "LangChain", "LangGraph", "Vector Databases", "Prompt Engineering"]
    },
    {
      category: "DevOps & Quality Engineering",
      items: ["Docker", "Kubernetes", "Git", "CI/CD", "GitHub Actions", "Unit Testing", "Vitest", "Performance Optimization"]
    }
  ],
  experience: [
    {
      id: "exp-1",
      company: "HyperScale Systems",
      role: "Lead Full Stack & AI Systems Engineer",
      period: "2023 - Present",
      location: "San Francisco, CA (Hybrid)",
      achievements: [
        "Architected scalable web interface using React 19, TypeScript, and Next.js, elevating Google Lighthouse score from 68 to 99/100 for 120,000+ daily active users.",
        "Engineered high-throughput backend microservices in Python FastAPI and Node.js, integrating PostgreSQL connection pooling and Redis caching to reduce p99 latency by 35%.",
        "Orchestrated production GenAI agent pipelines using LangChain, LangGraph, and Google Gemini API with vector search, cutting manual document processing overhead by 68%.",
        "Configured robust containerized CI/CD deployment pipelines using Docker and GitHub Actions, slashing release deployment cycles from 45 minutes to 8 minutes with 99.99% uptime."
      ],
      tailoredAchievements: [
        "Architected scalable web interface using React 19, TypeScript, and Next.js, elevating Google Lighthouse score from 68 to 99/100 for 120,000+ daily active users.",
        "Engineered high-throughput backend microservices in Python FastAPI and Node.js, integrating PostgreSQL connection pooling and Redis caching to reduce p99 latency by 35%.",
        "Orchestrated production GenAI agent pipelines using LangChain, LangGraph, and Google Gemini API with vector search, cutting manual document processing overhead by 68%.",
        "Configured robust containerized CI/CD deployment pipelines using Docker and GitHub Actions, slashing release deployment cycles from 45 minutes to 8 minutes with 99.99% uptime."
      ]
    },
    {
      id: "exp-2",
      company: "Cognitive Cloud Labs",
      role: "Full Stack Engineer",
      period: "2021 - 2023",
      location: "Remote",
      achievements: [
        "Developed responsive user interfaces in React and TypeScript with Tailwind CSS, establishing a unified design system that decreased feature development turnaround by 30%.",
        "Constructed scalable RESTful API services using Python and PostgreSQL, supporting high-concurrency streaming workloads with WebSockets and SSE.",
        "Authored comprehensive automated test suites (Vitest / PyTest) achieving 92% code coverage across critical service modules and eliminating regression outages.",
        "Collaborated across multidisciplinary engineering teams in an Agile Scrum environment, conducting system design reviews and mentoring 4 junior engineers."
      ],
      tailoredAchievements: [
        "Developed responsive user interfaces in React and TypeScript with Tailwind CSS, establishing a unified design system that decreased feature development turnaround by 30%.",
        "Constructed scalable RESTful API services using Python and PostgreSQL, supporting high-concurrency streaming workloads with WebSockets and SSE.",
        "Authored comprehensive automated test suites (Vitest / PyTest) achieving 92% code coverage across critical service modules and eliminating regression outages.",
        "Collaborated across multidisciplinary engineering teams in an Agile Scrum environment, conducting system design reviews and mentoring 4 junior engineers."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Science in Computer Science & Engineering",
      school: "University of California, Berkeley",
      year: "2017 - 2021",
      grade: "GPA: 3.9 / 4.0 (Magna Cum Laude)"
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "AgentGraph: Autonomous Multi-Agent Systems Engine",
      description: "Distributed AI agent orchestrator leveraging LangGraph, Gemini API, and Vector DBs for autonomous code analysis and real-time streaming feedback.",
      techStack: ["React", "TypeScript", "Python", "FastAPI", "Docker", "LangGraph", "PostgreSQL"],
      highlights: [
        "Implemented real-time bidirectional WebSocket streaming interface handling concurrent agent thoughts and tool calls.",
        "Packaged microservices into lightweight Docker containers orchestrated with automated CI/CD pipelines."
      ]
    },
    {
      id: "proj-2",
      title: "HyperScale Telemetry & Analytics Platform",
      description: "Enterprise monitoring engine visualizing high-velocity database transactions and API metrics with sub-second dashboard refreshes.",
      techStack: ["React", "TypeScript", "Node.js", "Redis", "PostgreSQL", "Tailwind CSS"],
      highlights: [
        "Built responsive visualization layer in React and TypeScript handling 50k+ telemetry points per second with zero UI frame drops.",
        "Secured end-to-end communication with OAuth2/JWT authentication and granular role-based access control."
      ]
    }
  ],
  certifications: [
    "AWS Certified Solutions Architect - Professional",
    "Google Cloud Certified Professional Cloud Developer",
    "Google Generative AI Systems Specialization"
  ]
};

export const SAMPLE_JOB_DESCRIPTION: JobDescriptionData = {
  roleTitle: "Senior Full Stack & AI Systems Engineer",
  company: "HyperScale AI Technologies",
  location: "San Francisco, CA / Remote",
  targetSeniority: "Mid-Senior (2-5 years)",
  rawText: `Job Title: Senior Full Stack & AI Systems Engineer
Company: HyperScale AI Technologies
Location: San Francisco, CA / Hybrid / Remote

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
