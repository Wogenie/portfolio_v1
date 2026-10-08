import type { ReactNode } from 'react'
import type { VisualKind } from '../data/projects'

type Props = { kind: VisualKind; className?: string }

const stroke = 'var(--color-accent)'
const dim = 'var(--color-line-strong)'
const label = { fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.14em' }

function Frame({ children, title }: { children: ReactNode; title: string }) {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" role="img" aria-label={title}>
      <rect width="400" height="240" fill="var(--color-void)" />
      <g stroke={dim} strokeWidth="0.5">
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`v${i}`} x1={i * 34} y1="0" x2={i * 34} y2="240" />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 34} x2="400" y2={i * 34} />
        ))}
      </g>
      {children}
    </svg>
  )
}

function Dot({ x, y, r = 4 }: { x: number | string; y: number | string; r?: number }) {
  return (
    <>
      <circle cx={x} cy={y} r={r + 4} fill={stroke} opacity="0.12" />
      <circle cx={x} cy={y} r={r} fill="var(--color-ink)" stroke={stroke} strokeWidth="1.5" />
    </>
  )
}

export function ProjectVisual({ kind, className = '' }: Props) {
  if (kind === 'agents') {
    return (
      <div className={className}>
        <Frame title="Architecture diagram: Telegram ingestion feeding a LangGraph agent with retrieval tools">
          <text x="24" y="32" fill="var(--color-muted-soft)" style={label}>
            RAG + AGENT LOOP
          </text>
          <g stroke={stroke} strokeWidth="1.2" fill="none" opacity="0.7">
            <path d="M70 70 H150" />
            <path d="M150 70 V120 H185" />
            <path d="M250 120 H285" />
            <path d="M217 150 V185 H150" />
            <path d="M217 90 V60 H300 V70" />
          </g>
          <rect x="30" y="55" width="80" height="30" rx="6" fill="var(--color-panel)" stroke={dim} />
          <text x="70" y="74" fill="var(--color-ink)" textAnchor="middle" style={label}>
            TELEGRAM
          </text>
          <rect x="150" y="105" width="70" height="30" rx="6" fill="var(--color-panel)" stroke={stroke} />
          <text x="185" y="124" fill="var(--color-accent)" textAnchor="middle" style={label}>
            AGENT
          </text>
          <rect x="285" y="105" width="86" height="30" rx="6" fill="var(--color-panel)" stroke={dim} />
          <text x="328" y="124" fill="var(--color-ink)" textAnchor="middle" style={label}>
            CHROMADB
          </text>
          <rect x="70" y="170" width="80" height="30" rx="6" fill="var(--color-panel)" stroke={dim} />
          <text x="110" y="189" fill="var(--color-ink)" textAnchor="middle" style={label}>
            SQLITE
          </text>
          <rect x="270" y="55" width="100" height="30" rx="6" fill="var(--color-panel)" stroke={dim} />
          <text x="320" y="74" fill="var(--color-ink)" textAnchor="middle" style={label}>
            DASHBOARD
          </text>
          <Dot x="150" y="70" r={3} />
          <Dot x="250" y="120" r={3} />
          <Dot x="217" y="90" r={3} />
          <text x="24" y="222" fill="var(--color-muted)" style={label}>
            INGEST → EXTRACT → STORE → RETRIEVE → ANSWER
          </text>
        </Frame>
      </div>
    )
  }

  if (kind === 'medical') {
    return (
      <div className={className}>
        <Frame title="Diagram: MRI scan flowing through classification and segmentation heads">
          <text x="24" y="32" fill="var(--color-muted-soft)" style={label}>
            CLASSIFY + SEGMENT
          </text>
          <rect x="30" y="55" width="110" height="110" rx="8" fill="var(--color-panel)" stroke={dim} />
          <circle cx="85" cy="110" r="38" fill="none" stroke={dim} />
          <circle cx="85" cy="110" r="26" fill="none" stroke={dim} opacity="0.6" />
          <path
            d="M72 96 q16 -10 26 4 q8 14 -6 24 q-18 8 -24 -8 q-4 -12 4 -20 Z"
            fill="var(--color-accent-soft)"
            stroke={stroke}
            strokeWidth="1.2"
          />
          <text x="85" y="184" fill="var(--color-muted)" textAnchor="middle" style={label}>
            MRI INPUT
          </text>
          <g stroke={stroke} strokeWidth="1.2" fill="none" opacity="0.7">
            <path d="M140 110 H175" />
            <path d="M245 88 H280" />
            <path d="M245 132 H280" />
          </g>
          <rect x="175" y="92" width="70" height="36" rx="6" fill="var(--color-panel)" stroke={stroke} />
          <text x="210" y="114" fill="var(--color-accent)" textAnchor="middle" style={label}>
            MODEL
          </text>
          <rect x="280" y="70" width="94" height="34" rx="6" fill="var(--color-panel)" stroke={dim} />
          <text x="327" y="91" fill="var(--color-ink)" textAnchor="middle" style={label}>
            CLASS: GLIOMA
          </text>
          <rect x="280" y="116" width="94" height="34" rx="6" fill="var(--color-panel)" stroke={dim} />
          <text x="327" y="137" fill="var(--color-ink)" textAnchor="middle" style={label}>
            MASK + SCORE
          </text>
          <text x="24" y="222" fill="var(--color-muted)" style={label}>
            PREPROCESS → CNN / EFFICIENTNET → U-NET → VISUALIZE
          </text>
        </Frame>
      </div>
    )
  }

  if (kind === 'routing') {
    return (
      <div className={className}>
        <Frame title="Diagram: ticket text routed to a department and priority prediction">
          <text x="24" y="32" fill="var(--color-muted-soft)" style={label}>
            TF-IDF → RANDOM FOREST
          </text>
          <rect x="26" y="96" width="96" height="46" rx="6" fill="var(--color-panel)" stroke={dim} />
          <text x="74" y="116" fill="var(--color-ink)" textAnchor="middle" style={label}>
            TICKET
          </text>
          <text x="74" y="131" fill="var(--color-muted)" textAnchor="middle" style={label}>
            TEXT
          </text>
          <g stroke={stroke} strokeWidth="1.2" fill="none" opacity="0.7">
            <path d="M122 119 H160" />
            <path d="M230 119 H250 V78 H280" />
            <path d="M250 119 V160 H280" />
          </g>
          <rect x="160" y="96" width="70" height="46" rx="6" fill="var(--color-panel)" stroke={stroke} />
          <text x="195" y="116" fill="var(--color-accent)" textAnchor="middle" style={label}>
            TF-IDF
          </text>
          <text x="195" y="131" fill="var(--color-muted)" textAnchor="middle" style={label}>
            + FOREST
          </text>
          <rect x="280" y="60" width="94" height="36" rx="6" fill="var(--color-panel)" stroke={dim} />
          <text x="327" y="82" fill="var(--color-ink)" textAnchor="middle" style={label}>
            DEPARTMENT
          </text>
          <rect x="280" y="142" width="94" height="36" rx="6" fill="var(--color-panel)" stroke={dim} />
          <text x="327" y="164" fill="var(--color-ink)" textAnchor="middle" style={label}>
            PRIORITY
          </text>
          <text x="24" y="222" fill="var(--color-muted)" style={label}>
            PREPROCESS → VECTORS → PREDICT → CONFIDENCE + KEYWORDS
          </text>
        </Frame>
      </div>
    )
  }

  return (
    <div className={className}>
      <Frame title="Diagram: producer publishing events to a Kafka topic consumed by a worker">
        <text x="24" y="32" fill="var(--color-muted-soft)" style={label}>
        EVENT STREAM
        </text>
        <g stroke={stroke} strokeWidth="1.2" fill="none" opacity="0.7">
          <path d="M96 120 H140" />
          <path d="M300 120 H340" />
        </g>
        <rect x="30" y="100" width="66" height="40" rx="6" fill="var(--color-panel)" stroke={dim} />
        <text x="63" y="124" fill="var(--color-ink)" textAnchor="middle" style={label}>
          PRODUCER
        </text>
        <rect x="140" y="76" width="160" height="88" rx="8" fill="var(--color-panel)" stroke={stroke} />
        <text x="220" y="98" fill="var(--color-accent)" textAnchor="middle" style={label}>
          KAFKA TOPIC
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={154 + i * 28} y="112" width="20" height="14" rx="2" fill="var(--color-accent-soft)" stroke={stroke} strokeWidth="0.8" />
        ))}
        <text x="220" y="150" fill="var(--color-muted)" textAnchor="middle" style={label}>
          APPEND-ONLY LOG · BROKER
        </text>
        <rect x="326" y="100" width="62" height="40" rx="6" fill="var(--color-panel)" stroke={dim} />
        <text x="357" y="124" fill="var(--color-ink)" textAnchor="middle" style={label}>
          CONSUME
        </text>
        <Dot x="140" y="120" r={3} />
        <Dot x="300" y="120" r={3} />
        <text x="24" y="222" fill="var(--color-muted)" style={label}>
          PRODUCE → TOPIC → BROKER → CONSUMER → PROCESS
        </text>
      </Frame>
    </div>
  )
}
