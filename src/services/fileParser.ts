import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set worker source to CDN matching pdfjs-dist version
if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/pdf.worker.min.js`;
}

/**
 * Extracts plain text from an uploaded file (PDF, DOCX, TXT, MD, etc.)
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const fileName = file.name.toLowerCase();

  // Plain text / Markdown / JSON
  if (fileName.endsWith('.txt') || fileName.endsWith('.md') || fileName.endsWith('.json') || fileName.endsWith('.csv')) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || '');
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  // Word Document (.docx)
  if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      if (result.value && result.value.trim().length > 0) {
        return result.value.trim();
      }
    } catch (err) {
      console.warn('Mammoth docx parsing failed, falling back:', err);
    }
  }

  // PDF Document (.pdf)
  if (fileName.endsWith('.pdf')) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(arrayBuffer),
        useSystemFonts: true,
        isEvalSupported: false,
      });

      const pdf = await loadingTask.promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageStrings = textContent.items
          .map((item: any) => ('str' in item ? item.str : ''))
          .join(' ');
        fullText += pageStrings + '\n\n';
      }

      if (fullText.trim().length > 0) {
        return fullText.trim();
      }
    } catch (err) {
      console.warn('PDF.js parsing failed, attempting fallback extractor:', err);
    }
  }

  // Fallback: Read as text or extract readable ASCII chunks
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const raw = (e.target?.result as string) || '';
      // Strip binary non-printable control characters
      const cleaned = raw.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ' ').replace(/\s+/g, ' ').trim();
      resolve(cleaned || 'Resume content loaded.');
    };
    reader.onerror = () => resolve('Uploaded document');
    reader.readAsText(file);
  });
}

/**
 * Intelligent parser to parse raw extracted resume text into structured ResumeData
 */
export function parseResumeTextToStructured(rawText: string, filename?: string): {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  summary: string;
  experienceSnippet: string;
} {
  const clean = rawText.trim();
  const lines = clean.split('\n').map(l => l.trim()).filter(Boolean);

  // Email extraction
  const emailMatch = clean.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : 'candidate@example.com';

  // Phone extraction
  const phoneMatch = clean.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : '+1 (555) 019-2834';

  // Name extraction (first non-empty line or from filename)
  let fullName = lines[0] && lines[0].length < 40 && !lines[0].includes('@') ? lines[0] : '';
  if (!fullName && filename) {
    fullName = filename.replace(/\.(pdf|docx|txt|doc|md)$/i, '').replace(/[-_]/g, ' ');
  }
  if (!fullName) fullName = 'Alex Morgan';

  // Location extraction
  const locMatch = clean.match(/(?:San Francisco|New York|Seattle|Austin|Boston|London|Bangalore|Remote|Los Angeles|Chicago)[^,\n]*/i);
  const location = locMatch ? locMatch[0].trim() : 'San Francisco, CA / Remote';

  // Core Tech Skills Detection
  const techKeywords = [
    'React', 'TypeScript', 'JavaScript', 'Python', 'FastAPI', 'Node.js', 'Next.js',
    'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Git', 'Redis',
    'CI/CD', 'GraphQL', 'REST APIs', 'Microservices', 'LangChain', 'Gemini', 'OpenAI',
    'PyTorch', 'TensorFlow', 'Java', 'Go', 'Golang', 'Rust', 'SQL', 'MongoDB', 'Tailwind',
    'System Design', 'Kafka', 'Terraform', 'Linux'
  ];

  const detectedSkills = techKeywords.filter(kw => {
    const reg = new RegExp(`\\b${kw}\\b`, 'i');
    return reg.test(clean);
  });

  // Summary
  let summary = clean.slice(0, 450);
  if (lines.length > 2) {
    const candidateSummaryLines = lines.slice(1, 6).join(' ');
    if (candidateSummaryLines.length > 50) {
      summary = candidateSummaryLines.slice(0, 400);
    }
  }

  return {
    fullName,
    email,
    phone,
    location,
    skills: detectedSkills.length > 0 ? detectedSkills : ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    summary,
    experienceSnippet: clean.slice(0, 800),
  };
}
