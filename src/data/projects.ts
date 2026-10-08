export type VisualKind = 'agents' | 'medical' | 'routing' | 'streaming'

export type CaseStudy = {
  problem: string
  solution: string
  architecture: string[]
  dataFlow: string[]
  systemDesign: string[]
  challenges: string[]
  evaluation: string[]
  results: string[]
  lessons: string[]
}

export type Project = {
  id: string
  title: string
  category: string
  description: string
  capabilities: string[]
  architecture: string[]
  tech: string[]
  contribution: string
  github: string
  live?: string
  visual: VisualKind
  figure?: 'brain-tumor'
  note?: string
  caseStudy: CaseStudy
}

export const projects: Project[] = [
  {
    id: 'classmate-xai',
    title: 'ClassMate xAI',
    category: 'AI Agents · RAG · LangGraph · NLP',
    description:
      'An AI-powered academic assistant that transforms unstructured Telegram conversations and course documents into organized, searchable, and personalized academic knowledge.',
    capabilities: [
      'Telegram message ingestion',
      'Assignment extraction',
      'Deadline tracking',
      'Quiz and exam tracking',
      'Course document ingestion',
      'RAG with ChromaDB',
      'LangGraph agent',
      'Grounded answers',
      'Source and confidence tracking',
      'Missed-class assistance',
      'Notifications',
      'Web dashboard',
    ],
    architecture: [
      'Telegram',
      'Message Ingestion',
      'Information Extraction',
      'Structured Data + Vector Store',
      'LangGraph Agent',
      'Retrieval + Tools',
      'Grounded Response',
      'Web Dashboard',
    ],
    tech: [
      'Python',
      'FastAPI',
      'LangGraph',
      'RAG',
      'ChromaDB',
      'LLMs',
      'Telegram/Telethon',
      'React',
      'Tailwind',
      'SQLite',
      'Docker',
    ],
    contribution:
      'Designed the retrieval and agent loop: ingested Telegram traffic and course documents were normalized, chunked into ChromaDB, and exposed as tools to a LangGraph agent that returns grounded answers with source and confidence tracking.',
    github: 'https://github.com/Wogenie/ClassMate-xAI',
    live: 'https://class-mate-x.vercel.app/',
    visual: 'agents',
    caseStudy: {
      problem:
        'Course information is scattered across unstructured Telegram conversations and document dumps. Assignments, deadlines, quizzes, and announcements are hard to retrieve at the moment they are needed, and students who miss a class lose the thread of what was communicated.',
      solution:
        'A pipeline that ingests Telegram messages and course documents, extracts structured academic information (assignments, deadlines, quizzes), stores both structured records and vectorized content, and lets a LangGraph agent answer questions through retrieval with visible sources and confidence.',
      architecture: [
        'Ingestion layer connects to Telegram through Telethon and accepts course documents through the API.',
        'Extraction layer converts raw messages and documents into structured records (assignments, deadlines, quizzes) plus chunked passages for vector search.',
        'Storage layer keeps structured records in SQLite and embeddings in ChromaDB.',
        'Agent layer is a LangGraph graph that selects retrieval and tool calls per turn and composes a grounded response.',
        'Presentation layer is a React dashboard served behind FastAPI.',
      ],
      dataFlow: [
        'Telegram / course documents',
        'Message ingestion',
        'Information extraction',
        'Structured data + vector store',
        'LangGraph agent',
        'Retrieval + tools',
        'Grounded response',
        'Web dashboard',
      ],
      systemDesign: [
        'FastAPI service exposing ingestion, query, and dashboard endpoints.',
        'LangGraph agent with retrieval and tool-calling nodes rather than a single monolithic prompt.',
        'ChromaDB vector store with source metadata for attribution.',
        'SQLite for structured academic records and schedule tracking.',
        'Dockerized services for reproducible local runs; React + Tailwind frontend.',
      ],
      challenges: [
        'Telegram content is noisy and inconsistent — extraction had to separate signal (deadlines, tasks) from conversation.',
        'Grounded answering requires retrieval that preserves source identity, so chunks carry metadata end to end.',
        'Agent behavior needed explicit control flow (retrieval → tools → answer) instead of open-ended generation.',
      ],
      evaluation: [
        'Answers are checked for grounding: every response carries source attribution and a confidence score.',
        'Extraction quality is validated against ingested assignments, deadlines, and quiz records.',
        'Failure cases (missing context, ambiguous queries) are surfaced rather than hidden behind fluent text.',
      ],
      results: [
        'Unstructured Telegram traffic becomes searchable, structured academic knowledge.',
        'Assignment, deadline, and quiz tracking in one place.',
        'Grounded answers with visible sources instead of unverifiable generation.',
        'A live web dashboard for daily use.',
      ],
      lessons: [
        'Retrieval quality, not model size, determines whether a RAG assistant is trustworthy.',
        'Structured extraction and vector search are complementary — schedules want records, explanations want passages.',
        'Agent graphs make behavior debuggable; every step can be inspected and corrected.',
      ],
    },
  },
  {
    id: 'brain-tumor',
    title: 'Brain Tumor Detection, Classification & Segmentation',
    category: 'Computer Vision · Deep Learning · Medical AI',
    description:
      'A multi-task deep learning system that detects, classifies, and segments brain tumors in MRI images from a single forward pass.',
    capabilities: [
      'Tumor detection',
      'Tumor classification',
      'Tumor segmentation',
      'Confidence score',
      'MRI visualization',
      'FastAPI inference',
      'Web interface',
    ],
    architecture: [
      'MRI',
      'Preprocessing',
      'EfficientNet Encoder',
      '4-Class Head',
      'U-Net Decoder',
      'Pixel Mask',
    ],
    tech: [
      'Python',
      'TensorFlow/Keras',
      'CNN',
      'EfficientNet',
      'U-Net',
      'Computer Vision',
      'FastAPI',
      'HTML',
      'CSS',
      'JavaScript',
    ],
    contribution:
      'Designed a shared-encoder multi-task architecture: a pretrained EfficientNet-B0 serves as the U-Net encoder, its features feed a 4-class classification head (Glioma, Meningioma, Pituitary, No Tumor), and the U-Net decoder with skip connections segments the tumor pixel by pixel — served through FastAPI with confidence output and an MRI visualization interface.',
    github:
      'https://github.com/Wogenie/Brain-Tumor-Detection-Classification-Segmentation',
    visual: 'medical',
    figure: 'brain-tumor',
    note: 'Educational / research system. Not a medical diagnostic replacement — always consult qualified medical professionals.',
    caseStudy: {
      problem:
        'Reading brain MRI scans is time-consuming and expertise-dependent. An educational system was needed to demonstrate how deep learning can support detection, classification, and segmentation of tumors in a single workflow.',
      solution:
        'A multi-task pipeline: MRI images are preprocessed and passed through a single network whose encoder is a pretrained EfficientNet-B0. Features from that shared encoder feed a classification head that predicts one of four classes, while the U-Net decoder upsamples the same features with skip connections to produce a pixel-wise tumor mask — both outputs returned in one forward pass, with confidence scoring and visualization exposed through a FastAPI-backed web interface.',
      architecture: [
        'Input layer receives MRI images through the web interface.',
        'Preprocessing normalizes and prepares images for the network.',
        'Shared encoder: a pretrained EfficientNet-B0 extracts features once and serves both heads — no duplicate backbone.',
        'Classification head: encoder features are globally pooled and passed through a dense + softmax layer to predict Glioma, Meningioma, Pituitary, or No Tumor.',
        'Segmentation head: the U-Net decoder upsamples the bottleneck and concatenates encoder skip connections at every scale to produce a pixel-wise mask.',
        'Serving layer exposes inference via FastAPI with confidence output; the interface renders the MRI, predicted class, and mask overlay.',
      ],
      dataFlow: [
        'MRI image',
        'Preprocessing',
        'EfficientNet encoder (shared)',
        '4-class classification',
        'U-Net decoder + skips',
        'Mask + confidence',
        'Visualization',
      ],
      systemDesign: [
        'One multi-task network: a single pretrained encoder feeds both a classification head and a U-Net decoder, so one forward pass returns class and mask together.',
        'Transfer learning: EfficientNet-B0 pretrained weights initialize the encoder; skip connections carry fine spatial detail into the decoder.',
        'Classification is read from pooled encoder features while segmentation is decoded from the same feature pyramid — the two tasks share computation instead of duplicating it.',
        'TensorFlow/Keras model definitions served behind a FastAPI inference endpoint.',
        'Lightweight HTML/CSS/JavaScript interface for uploading images and viewing results.',
        'Educational scope: the system demonstrates methodology rather than production clinical deployment.',
      ],
      challenges: [
        'Medical images require consistent preprocessing — orientation, scale, and intensity normalization directly affect predictions.',
        'Segmentation masks must align pixel-perfectly with the original image for visualization to be meaningful.',
        'Classification and segmentation outputs had to be combined into one coherent, interpretable view.',
      ],
      evaluation: [
        'Classification is evaluated with standard metrics (accuracy, precision, recall, F1) across the four classes: Glioma, Meningioma, Pituitary, No Tumor.',
        'Segmentation is evaluated with overlap metrics against annotated masks — both heads are measured from the same model checkpoint.',
        'Evaluation methodology and results are documented in the repository — no accuracy figure is claimed here without that context.',
      ],
      results: [
        'Detection, classification, and segmentation from one shared encoder.',
        'One model checkpoint serving both the class prediction and the pixel mask.',
        'Confidence scores surfaced with every prediction.',
        'Visual overlay of segmentation on the original MRI.',
        'FastAPI inference with a browser-based interface.',
      ],
      lessons: [
        'Data hygiene dominates model choice in medical imaging.',
        'A shared encoder forces one feature pyramid to serve a coarse decision (class) and a fine one (pixels) — both heads must be evaluated separately to know if sharing helped.',
        'A model output is only useful when it is visualized in the way the domain expert reads the data.',
      ],
    },
  },
  {
    id: 'support-ticket',
    title: 'Support Ticket Classification & Intelligent Routing',
    category: 'Machine Learning · NLP · Production ML',
    description:
      'A machine-learning system that automatically classifies customer support tickets and routes them according to department and priority.',
    capabilities: [
      'Department classification',
      'Priority prediction',
      'Confidence scores',
      'Keyword extraction',
      'Explainability',
      'Agent dashboard',
      'FastAPI inference',
      'Docker deployment',
    ],
    architecture: [
      'Customer Message',
      'Text Preprocessing',
      'TF-IDF',
      'Random Forest',
      'Department + Priority',
      'Confidence + Keywords',
      'Agent Dashboard',
    ],
    tech: ['Python', 'Scikit-learn', 'Random Forest', 'TF-IDF', 'NLTK', 'FastAPI', 'Docker'],
    contribution:
      'Built the full ML pipeline — NLTK preprocessing, TF-IDF feature extraction, and Random Forest models predicting department and priority — plus a FastAPI inference API and agent dashboard exposing confidence scores and extracted keywords for explainability.',
    github: 'https://github.com/Wogenie/Support-Ticket-Classification-System',
    live: 'https://wogenie.github.io/FUTURE_ML_02-main',
    visual: 'routing',
    caseStudy: {
      problem:
        'Support tickets arrive continuously and must be routed to the right department with the right priority. Manual triage is slow, inconsistent, and does not scale with volume.',
      solution:
        'A supervised ML pipeline that takes raw ticket text, preprocesses it with NLTK, vectorizes it with TF-IDF, and predicts both the target department and the priority level, returning confidence scores and extracted keywords so agents can verify each decision.',
      architecture: [
        'Ingestion: customer message received as ticket text.',
        'Preprocessing: tokenization, stop-word handling, and normalization with NLTK.',
        'Feature extraction: TF-IDF vectors over the cleaned corpus.',
        'Model: Random Forest classifiers for department and priority.',
        'Post-processing: confidence scores and keyword extraction for explainability.',
        'Serving: FastAPI inference endpoint, Docker deployment, agent dashboard.',
      ],
      dataFlow: [
        'Customer message',
        'Text preprocessing',
        'TF-IDF',
        'Random Forest',
        'Department + priority',
        'Confidence + keywords',
        'Agent dashboard',
      ],
      systemDesign: [
        'Two related prediction targets (department, priority) sharing one feature pipeline.',
        'Scikit-learn models kept interchangeable behind a thin service layer.',
        'FastAPI exposes a single inference API consumed by the dashboard.',
        'Docker packaging for reproducible deployment.',
      ],
      challenges: [
        'Class imbalance: departments and priority levels are not equally represented, biasing predictions toward majority classes.',
        'Short, noisy ticket text limits the signal available to TF-IDF features.',
        'Predictions without explanation are hard for agents to trust, so confidence and keywords are first-class outputs.',
      ],
      evaluation: [
        'Evaluated with per-class precision, recall, and F1 rather than a single headline number.',
        'Confusion matrix analysis reveals which departments and priorities are most often confused.',
        'Class imbalance is reported explicitly as part of the evaluation instead of being hidden.',
        'Limitations are documented alongside the results.',
      ],
      results: [
        'Automatic department and priority assignment for incoming tickets.',
        'Confidence score attached to every prediction.',
        'Keyword extraction as lightweight explainability.',
        'Agent dashboard for reviewing and acting on routed tickets.',
      ],
      lessons: [
        'In production ML, the error analysis (confusion matrix, imbalance) is more informative than the accuracy headline.',
        'Explainability features are what make a model acceptable to the people who use its output.',
        'A simple, well-evaluated TF-IDF + Random Forest baseline is often the right first system.',
      ],
    },
  },
  {
    id: 'kafka-streaming',
    title: 'Real-Time Data Streaming with Apache Kafka',
    category: 'Data Engineering · Distributed Systems · Streaming',
    description:
      'A real-time data engineering project exploring event-driven data streaming using Apache Kafka.',
    capabilities: [
      'Event-driven architecture',
      'Real-time streaming',
      'Producer/consumer design',
      'Distributed systems concepts',
    ],
    architecture: ['Producer', 'Kafka Topic', 'Kafka Broker', 'Consumer', 'Data Processing'],
    tech: ['Apache Kafka', 'Python', 'Real-Time Streaming', 'Event-Driven Architecture', 'Distributed Systems'],
    contribution:
      'Implemented the core Kafka flow in Python — a producer writing events to a topic, a broker managing the log, and a consumer reading and processing the stream — to explore event-driven design and distributed-systems behavior.',
    github: 'https://github.com/Wogenie/Big-Data-kafka',
    visual: 'streaming',
    caseStudy: {
      problem:
        'Batch-oriented processing cannot keep up with data that arrives continuously. The goal was to understand how event-driven systems move data in real time instead of polling for it.',
      solution:
        'An Apache Kafka pipeline: a producer publishes events to a topic, the broker persists and orders the log, and a consumer subscribes and processes the stream as it arrives.',
      architecture: [
        'Producer publishes events to a Kafka topic.',
        'Kafka broker stores the append-only log for the topic.',
        'Consumer subscribes to the topic and reads messages in order.',
        'Processing step transforms or aggregates the consumed events.',
      ],
      dataFlow: ['Producer', 'Kafka topic', 'Kafka broker', 'Consumer', 'Data processing'],
      systemDesign: [
        'Python producer and consumer clients.',
        'Topics as the unit of partitioning and organization.',
        'Decoupled producers and consumers — neither depends on the other being online.',
      ],
      challenges: [
        'Understanding delivery semantics: what is guaranteed, and what the consumer must handle itself.',
        'Consumer group behavior — how parallel readers split partitions.',
        'Keeping producers and consumers decoupled while preserving ordered processing per key.',
      ],
      evaluation: [
        'Validated by observing end-to-end flow: events published by the producer appear on the topic and are processed by the consumer.',
        'Behavior under repeated runs checks that consumption is resumable rather than stateless.',
      ],
      results: [
        'Working real-time producer → topic → broker → consumer pipeline.',
        'Hands-on understanding of event-driven architecture and distributed log semantics.',
      ],
      lessons: [
        'The log is the primitive: everything else in streaming design is a view over it.',
        'Designing for reprocessing is as important as designing for the happy path.',
      ],
    },
  },
]
