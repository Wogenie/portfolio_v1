export const EMAIL = 'wogenieliyewsenay@gmail.com'
export const GITHUB = 'https://github.com/Wogenie'

export type Reply = {
  text: string
  chips?: string[]
  links?: { label: string; href: string }[]
}

export type ChatMessage = { role: 'user' | 'assistant'; content: string }

type Intent = { keywords: string[]; reply: Reply }

const mailLink = { label: 'Send an email', href: `mailto:${EMAIL}` }

const intents: Intent[] = [
  {
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'how are you'],
    reply: {
      text: "Hi! I'm the assistant on Wogenie Liyew's portfolio. Ask me about his skills, projects, or how to get in touch.",
      chips: ['What can he build?', 'Show me his projects', 'How do I contact him?'],
    },
  },
  {
    keywords: ['who is', 'about', 'wogenie', 'background', 'experience', 'introduce', 'yourself'],
    reply: {
      text: 'Wogenie Liyew is an AI/ML Engineer & Applied AI Developer who builds intelligent systems end to end — ML and deep-learning models, RAG and AI agents, FastAPI backends, and data pipelines.',
      chips: ['What are his skills?', 'What has he built?'],
    },
  },
  {
    keywords: ['skill', 'skills', 'stack', 'tech', 'technology', 'tool', 'tools', 'expertise', 'language', 'know'],
    reply: {
      text: 'Core stack: Python, TensorFlow / PyTorch, scikit-learn, RAG with LangGraph, FastAPI, React, Docker, and Apache Kafka — across ML, NLP, computer vision, and data systems.',
      links: [{ label: 'Full skill list', href: '#skills' }],
    },
  },
  {
    keywords: ['project', 'projects', 'portfolio', 'work', 'built', 'built?', 'examples', 'case stud'],
    reply: {
      text: 'Four featured projects: ClassMate xAI (a Telegram RAG agent), a brain-tumor MRI system (computer vision), support-ticket classification (production ML), and real-time Kafka streaming. Which one?',
      chips: ['ClassMate xAI', 'Brain tumor system', 'Support tickets', 'Kafka streaming'],
    },
  },
  {
    keywords: ['classmate', 'telegram', 'academic', 'student', 'course', 'assignment', 'quiz'],
    reply: {
      text: 'ClassMate xAI is an AI academic assistant: it ingests Telegram chats and course documents, extracts assignments and deadlines, stores everything in ChromaDB, and answers questions through a LangGraph agent with sources and confidence. Live on Vercel.',
      links: [
        { label: 'GitHub', href: 'https://github.com/Wogenie/ClassMate-xAI' },
        { label: 'Case study', href: '#projects' },
      ],
    },
  },
  {
    keywords: ['brain', 'tumor', 'mri', 'medical', 'imaging', 'segmentation', 'glioma', 'meningioma'],
    reply: {
      text: 'The brain-tumor project classifies and segments MRI scans (glioma, meningioma, pituitary, no tumor) using EfficientNet + U-Net behind a FastAPI service with confidence scores. An educational / research system — not a medical diagnostic tool.',
      links: [{ label: 'GitHub', href: 'https://github.com/Wogenie/Brain-Tumor-Detection-Classification-Segmentation' }],
    },
  },
  {
    keywords: ['ticket', 'support', 'routing', 'department', 'priority', 'random forest', 'tf-idf'],
    reply: {
      text: 'The support-ticket system predicts department and priority from ticket text (TF-IDF + Random Forest), returns confidence and keywords for explainability, and shows results on an agent dashboard — with confusion-matrix evaluation reported honestly.',
      links: [{ label: 'GitHub', href: 'https://github.com/Wogenie/Support-Ticket-Classification-System' }],
    },
  },
  {
    keywords: ['kafka', 'streaming', 'stream', 'event', 'event-driven', 'broker'],
    reply: {
      text: 'The Kafka project is a real-time event pipeline — producer → topic → broker → consumer → processing — exploring event-driven design and distributed log semantics in Python.',
      links: [{ label: 'GitHub', href: 'https://github.com/Wogenie/Big-Data-kafka' }],
    },
  },
  {
    keywords: ['agent', 'agents', 'llm', 'genai', 'generative', 'langgraph', 'langchain', 'vector', 'rag', 'chatbot', 'prompt'],
    reply: {
      text: 'On the GenAI side he builds RAG pipelines with vector databases, LangGraph agents with tool calling and memory, and grounded-answer systems with source attribution — the same pattern behind ClassMate xAI.',
      chips: ['Show me his projects'],
    },
  },
  {
    keywords: ['contact', 'hire', 'hiring', 'available', 'availability', 'freelance', 'reach', 'email', 'collaborate', 'job', 'remote', 'work with', 'work together'],
    reply: {
      text: `Best way to reach Wogenie is by email — he's open to AI/ML engineering work, applied AI projects, and challenging ML problems.`,
      links: [mailLink, { label: 'GitHub', href: GITHUB }],
    },
  },
  {
    keywords: ['build', 'builds', 'service', 'services', 'help', 'can you', 'offer', 'need', 'looking for'],
    reply: {
      text: 'He can build: ML models with proper evaluation, RAG / agent assistants, ML APIs and serving, and real-time data pipelines — from prototype to deployed system.',
      chips: ['What are his skills?', 'How do I contact him?'],
    },
  },
  {
    keywords: ['price', 'pricing', 'cost', 'costs', 'budget', 'rate'],
    reply: {
      text: 'Pricing depends on the scope of the work — send the project details by email and he will reply with an estimate.',
      links: [mailLink],
    },
  },
  {
    keywords: ['resume', 'cv'],
    reply: {
      text: "There's no downloadable CV on this site yet — email him and he'll send it right over.",
      links: [mailLink],
    },
  },
  {
    keywords: ['thank', 'thanks', 'cheers', 'nice', 'great'],
    reply: {
      text: "You're welcome! Anything else you'd like to know?",
      chips: ['What are his skills?', 'How do I contact him?'],
    },
  },
  {
    keywords: ['bye', 'goodbye', 'see you'],
    reply: { text: 'Goodbye! Feel free to come back any time.' },
  },
]

const fallback: Reply = {
  text: "I can help with Wogenie's skills, projects, and contact details. Try one of these:",
  chips: ['What are his skills?', 'Show me his projects', 'How do I contact him?'],
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s'-]/g, ' ').replace(/\s+/g, ' ').trim()
}

export function answerQuestion(question: string): Reply {
  const text = normalize(question)
  if (!text) return fallback

  let best: Intent | null = null
  let bestScore = 0

  for (const intent of intents) {
    let score = 0
    for (const keyword of intent.keywords) {
      if (text.includes(keyword)) {
        score += keyword.includes(' ') ? 3 : keyword.length > 4 ? 2 : 1
      }
    }
    if (score > bestScore) {
      bestScore = score
      best = intent
    }
  }

  return best ? best.reply : fallback
}

const SYSTEM_PROMPT = `You are the assistant on Wogenie Liyew's portfolio website. Answer client questions concisely (2-4 sentences), warmly, and only from these facts:
- Wogenie Liyew, AI/ML Engineer & Applied AI Developer; builds intelligent systems (ML, deep learning, CV, NLP, RAG, AI agents, backend, data systems).
- Projects: ClassMate xAI (Telegram + RAG + LangGraph academic agent, live demo), brain tumor MRI classification/segmentation (educational, not medical advice), support ticket classification (TF-IDF + Random Forest), Apache Kafka real-time streaming.
- Stack: Python, TensorFlow/PyTorch, scikit-learn, LangGraph, FastAPI, React, Docker, Kafka.
- Contact: ${EMAIL}; GitHub: ${GITHUB}.
Never invent employers, metrics, awards, availability dates, or pricing. For pricing, project-specific questions, or anything uncertain, suggest emailing ${EMAIL}.`

const config = {
  url: import.meta.env.VITE_LLM_API_URL,
  key: import.meta.env.VITE_LLM_API_KEY,
  model: import.meta.env.VITE_LLM_MODEL || 'gpt-4o-mini',
}

export const hasLLM = Boolean(config.url && config.key)

export async function askAssistant(history: ChatMessage[], question: string): Promise<Reply> {
  const local = answerQuestion(question)

  if (!hasLLM) return local

  try {
    const response = await fetch(config.url as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.key}`,
      },
      body: JSON.stringify({
        model: config.model,
        temperature: 0.4,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history.slice(-8),
          { role: 'user', content: question },
        ],
      }),
    })

    if (!response.ok) throw new Error(`LLM request failed: ${response.status}`)
    const data = await response.json()
    const text = data?.choices?.[0]?.message?.content
    if (typeof text === 'string' && text.trim()) {
      return { text: text.trim(), chips: local.chips, links: local.links }
    }
  } catch {
    // Network / auth / quota problems fall back to the built-in knowledge base.
  }

  return local
}
