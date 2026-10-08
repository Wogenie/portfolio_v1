type Props = { className?: string; variant?: 'full' | 'compact' }

const ink = '#1c1917'
const muted = '#78716c'
const accent = '#b45309'
const border = '#d6d3cb'
const soft = '#f5f2ea'
const grid = '#f4f1e6'

const mono = "'JetBrains Mono', monospace"
const sans = "'Inter', sans-serif"

function BrainGlyph({ cx, cy, scale = 1, masked = false }: { cx: number; cy: number; scale?: number; masked?: boolean }) {
  const blob = 'M-14 -12 q16 -11 27 4 q9 13 -7 24 q-18 9 -24 -7 q-5 -13 4 -21 Z'
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <ellipse rx="33" ry="40" fill={soft} stroke={border} strokeWidth={1.2 / scale} />
      <ellipse rx="24" ry="31" fill="none" stroke={border} strokeWidth={1 / scale} strokeDasharray="3 3" />
      <path
        d={blob}
        transform="translate(8 -8)"
        fill={masked ? accent : 'rgba(180,83,9,0.22)'}
        fillOpacity={masked ? 0.9 : 1}
        stroke={accent}
        strokeWidth={1.3 / scale}
      />
    </g>
  )
}

const encoder = [
  { x: 150, y: 150, title: 'STAGE 1', sub: '32ch · 1/2' },
  { x: 256, y: 200, title: 'STAGE 2', sub: '24ch · 1/4' },
  { x: 362, y: 250, title: 'STAGE 3', sub: '40ch · 1/8' },
  { x: 468, y: 300, title: 'STAGE 4', sub: '112ch · 1/16' },
  { x: 574, y: 350, title: 'BOTTLENECK', sub: '320ch · 1/32' },
]

const decoder = [
  { x: 700, y: 300, sub: 'concat 112' },
  { x: 806, y: 250, sub: 'concat 40' },
  { x: 912, y: 200, sub: 'concat 24' },
  { x: 1018, y: 150, sub: 'concat 32' },
]

const skips = ['M556 326 H700', 'M450 276 H806', 'M344 226 H912', 'M238 176 H1018']

const flow = [
  'M128 190 L150 176',
  'M238 176 L256 226',
  'M344 226 L362 276',
  'M450 276 L468 326',
  'M556 326 L574 376',
  'M662 376 L700 326',
  'M784 326 L806 276',
  'M890 276 L912 226',
  'M996 226 L1018 176',
  'M1102 176 H1130',
  'M1173 202 V220',
  'M774 102 H796',
  'M914 102 H936',
]

const classes = ['GLIOMA', 'MENINGIOMA', 'PITUITARY', 'NO TUMOR']
const branch = 'M620 350 V102 H656'

function Stacked({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <>
      <rect x={x + 8} y={y - 8} width={w} height={h} rx={8} fill="#ffffff" stroke="#eceadf" />
      <rect x={x + 4} y={y - 4} width={w} height={h} rx={8} fill="#ffffff" stroke="#e4e1d5" />
    </>
  )
}

function Box({
  x,
  y,
  w,
  h,
  title,
  sub,
  tone = 'default',
}: {
  x: number
  y: number
  w: number
  h: number
  title: string
  sub?: string
  tone?: 'default' | 'accent'
}) {
  const cx = x + w / 2
  return (
    <g>
      <Stacked x={x} y={y} w={w} h={h} />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill="#ffffff"
        stroke={tone === 'accent' ? accent : border}
        strokeWidth={tone === 'accent' ? 1.6 : 1.3}
      />
      <text
        x={cx}
        y={sub ? y + h / 2 - 2 : y + h / 2 + 4}
        textAnchor="middle"
        fontSize={12.5}
        fontWeight={600}
        fill={tone === 'accent' ? accent : ink}
        fontFamily={sans}
      >
        {title}
      </text>
      {sub ? (
        <text x={cx} y={y + h / 2 + 15} textAnchor="middle" fontSize={10.5} fill={muted} fontFamily={mono}>
          {sub}
        </text>
      ) : null}
    </g>
  )
}

function FullFigure({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 1264 470"
      className={className}
      role="img"
      aria-label="Architecture diagram: a pretrained EfficientNet-B0 encoder shared by a 4-class classification head and a U-Net segmentation decoder that outputs a pixel-wise tumor mask."
      style={{ fontFamily: sans }}
    >
      <defs>
        <marker id="bt-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill={accent} />
        </marker>
        <pattern id="bt-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 H0 V40" fill="none" stroke={grid} strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="1264" height="470" fill="#ffffff" />
      <rect width="1264" height="470" fill="url(#bt-grid)" />

      {/* header */}
      <text x="24" y="30" fontSize={18} fontWeight={600} fill={ink}>
        EfficientNet–U-Net Multi-Task Architecture
      </text>
      <text x="24" y="52" fontSize={11.5} fill={muted}>
        A pretrained EfficientNet-B0 encoder shared by a 4-class classification head and a U-Net decoder — detect,
        classify, and segment in one forward pass.
      </text>
      <rect x="1050" y="12" width="190" height="26" rx="13" fill="#fff7ed" stroke="#f0c48a" />
      <text x="1145" y="29" textAnchor="middle" fontSize={9.5} fill={accent} fontFamily={mono} letterSpacing="0.08em">
        EDUCATIONAL / RESEARCH
      </text>

      {/* input */}
      <rect x="24" y="140" width="100" height="100" rx="10" fill="#ffffff" stroke={border} strokeWidth="1.3" />
      <ellipse cx="74" cy="190" rx="33" ry="40" fill={soft} stroke={border} />
      <ellipse cx="74" cy="190" rx="24" ry="31" fill="none" stroke={border} strokeDasharray="3 3" />
      <path
        d="M60 178 q14 -10 24 4 q8 12 -6 22 q-16 8 -22 -6 q-4 -12 4 -20 Z"
        fill="rgba(180,83,9,0.22)"
        stroke={accent}
        strokeWidth="1.3"
      />
      <text x="74" y="258" textAnchor="middle" fontSize={11} fill={ink} fontFamily={mono} letterSpacing="0.08em">
        MRI INPUT
      </text>
      <text x="74" y="273" textAnchor="middle" fontSize={9.5} fill={muted} fontFamily={mono}>
        PREPROCESSED
      </text>

      {/* classification head */}
      <text x="715" y="150" textAnchor="middle" fontSize={9.5} fill={muted} fontFamily={mono} letterSpacing="0.06em">
        TAPPED FROM SHARED ENCODER
      </text>
      <Box x={656} y={76} w={118} h={52} title="GLOBAL AVG POOL" sub="feature vector" tone="accent" />
      <Box x={796} y={76} w={118} h={52} title="DENSE + SOFTMAX" sub="4 CLASSES" tone="accent" />
      <text x="1095" y="62" textAnchor="middle" fontSize={10.5} fill={accent} fontFamily={mono} letterSpacing="0.1em">
        CLASSIFICATION HEAD
      </text>
      <path d="M936 70 H1254 M936 70 V78 M1254 70 V78" fill="none" stroke={accent} strokeWidth="1.3" />
      {classes.map((label, index) => {
        const x = 936 + index * 80
        return (
          <g key={label}>
            <rect x={x} y={82} width={78} height={42} rx={7} fill="#ffffff" stroke={border} strokeWidth="1.3" />
            <text
              x={x + 39}
              y={107}
              textAnchor="middle"
              fontSize={10}
              fill={ink}
              fontFamily={mono}
              letterSpacing="0.04em"
            >
              {label}
            </text>
          </g>
        )
      })}

      {/* encoder */}
      {encoder.map((stage) => (
        <Box key={stage.title} x={stage.x} y={stage.y} w={84} h={52} title={stage.title} sub={stage.sub} />
      ))}

      {/* decoder */}
      {decoder.map((stage) => (
        <Box key={stage.x} x={stage.x} y={stage.y} w={84} h={52} title="UP ×2" sub={stage.sub} />
      ))}

      {/* segmentation head + mask */}
      <Box x={1130} y={150} w={86} h={52} title="1×1 CONV" sub="SIGMOID" tone="accent" />
      <text x="1130" y="138" fontSize={10.5} fill={accent} fontFamily={mono} letterSpacing="0.1em">
        SEGMENTATION HEAD
      </text>
      <rect x="1130" y="220" width="86" height="86" rx="8" fill="#ffffff" stroke={border} strokeWidth="1.3" />
      <ellipse cx="1173" cy="263" rx="24" ry="30" fill={soft} stroke={border} />
      <path
        d="M1163 253 q11 -8 19 3 q6 10 -5 18 q-13 6 -17 -5 q-3 -10 3 -16 Z"
        fill={accent}
        opacity="0.9"
      />
      <text x="1173" y="324" textAnchor="middle" fontSize={11} fill={ink} fontFamily={mono} letterSpacing="0.08em">
        PIXEL MASK
      </text>

      {/* brackets */}
      <path d="M150 418 V428 H662 V418" fill="none" stroke={border} strokeWidth="1.3" />
      <text x="406" y="448" textAnchor="middle" fontSize={11} fill={muted} fontFamily={mono} letterSpacing="0.06em">
        EFFICIENTNET-B0 ENCODER · PRETRAINED · SHARED
      </text>
      <path d="M700 368 V378 H1102 V368" fill="none" stroke={border} strokeWidth="1.3" />
      <text x="901" y="398" textAnchor="middle" fontSize={11} fill={muted} fontFamily={mono} letterSpacing="0.06em">
        U-NET DECODER · UPSAMPLE + SKIP CONCAT
      </text>

      {/* connections — white casings first so crossings read cleanly */}
      <g fill="none" strokeLinecap="round">
        {skips.map((d) => (
          <path key={`c-${d}`} d={d} stroke="#ffffff" strokeWidth="6" />
        ))}
        {flow.map((d) => (
          <path key={`c-${d}`} d={d} stroke="#ffffff" strokeWidth="6" />
        ))}
        <path d={branch} stroke="#ffffff" strokeWidth="8" />
      </g>

      <g fill="none" strokeLinecap="round">
        {skips.map((d) => (
          <path
            key={`s-${d}`}
            d={d}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 5"
            markerEnd="url(#bt-arrow)"
          />
        ))}
        {flow.map((d) => (
          <path key={`f-${d}`} d={d} stroke={accent} strokeWidth="1.8" markerEnd="url(#bt-arrow)" />
        ))}
        <path d={branch} stroke={accent} strokeWidth="2" markerEnd="url(#bt-arrow)" />
      </g>
      <circle cx="620" cy="350" r="3.5" fill={accent} />
    </svg>
  )
}

const compactFlow = ['M138 149 H170', 'M292 149 H324', 'M504 149 L552 78', 'M504 149 L552 182', 'M732 182 H760']

function CompactFigure({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 980 280"
      className={className}
      role="img"
      aria-label="Compact architecture diagram: MRI input through a pretrained EfficientNet-B0 encoder, branching to a classification head and a U-Net decoder that outputs a pixel mask."
      style={{ fontFamily: sans }}
    >
      <defs>
        <marker id="bc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill={accent} />
        </marker>
        <pattern id="bc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 H0 V40" fill="none" stroke={grid} strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="980" height="280" fill="#ffffff" />
      <rect width="980" height="280" fill="url(#bc-grid)" />

      {/* input */}
      <rect x="20" y="90" width="118" height="118" rx="10" fill="#ffffff" stroke={border} strokeWidth="1.4" />
      <BrainGlyph cx={79} cy={145} scale={1.05} />
      <text x="79" y="230" textAnchor="middle" fontSize={12.5} fill={ink} fontFamily={mono} letterSpacing="0.08em">
        MRI INPUT
      </text>

      {/* preprocess */}
      <rect x="174" y="124" width="118" height="50" rx="8" fill="#ffffff" stroke={border} strokeWidth="1.4" />
      <text x="233" y="145" textAnchor="middle" fontSize={13.5} fontWeight={600} fill={ink}>
        PREPROCESS
      </text>
      <text x="233" y="163" textAnchor="middle" fontSize={11} fill={muted} fontFamily={mono}>
        normalized
      </text>

      {/* encoder */}
      <rect x="334" y="106" width="176" height="74" rx="10" fill="#ffffff" stroke="#eceadf" />
      <rect x="331" y="109" width="176" height="74" rx="10" fill="#ffffff" stroke="#e4e1d5" />
      <rect x="328" y="112" width="176" height="74" rx="10" fill="#ffffff" stroke={accent} strokeWidth="1.6" />
      <text x="416" y="145" textAnchor="middle" fontSize={15} fontWeight={600} fill={ink}>
        EFFICIENTNET-B0
      </text>
      <text x="416" y="166" textAnchor="middle" fontSize={11.5} fill={accent} fontFamily={mono} letterSpacing="0.08em">
        PRETRAINED ENCODER
      </text>

      {/* classification head */}
      <rect x="556" y="42" width="210" height="76" rx="10" fill="#ffffff" stroke={accent} strokeWidth="1.6" />
      <text x="661" y="70" textAnchor="middle" fontSize={14.5} fontWeight={600} fill={accent}>
        CLASSIFICATION HEAD
      </text>
      <text x="661" y="92" textAnchor="middle" fontSize={11.5} fill={muted} fontFamily={mono}>
        glioma · meningioma ·
      </text>
      <text x="661" y="108" textAnchor="middle" fontSize={11.5} fill={muted} fontFamily={mono}>
        pituitary · no tumor
      </text>
      <text x="661" y="140" textAnchor="middle" fontSize={11.5} fill={ink} fontFamily={mono} letterSpacing="0.1em">
        OUTPUT · CLASS
      </text>

      {/* decoder */}
      <rect x="556" y="150" width="176" height="64" rx="10" fill="#ffffff" stroke={border} strokeWidth="1.4" />
      <text x="644" y="178" textAnchor="middle" fontSize={14.5} fontWeight={600} fill={ink}>
        U-NET DECODER
      </text>
      <text x="644" y="199" textAnchor="middle" fontSize={11.5} fill={muted} fontFamily={mono}>
        upsample + skips
      </text>

      {/* mask output */}
      <rect x="764" y="136" width="110" height="104" rx="10" fill="#ffffff" stroke={border} strokeWidth="1.4" />
      <BrainGlyph cx={819} cy={184} scale={0.86} masked />
      <text x="819" y="262" textAnchor="middle" fontSize={11.5} fill={ink} fontFamily={mono} letterSpacing="0.08em">
        OUTPUT · PIXEL MASK
      </text>

      <g fill="none" strokeLinecap="round">
        {compactFlow.map((d) => (
          <path key={d} d={d} stroke={accent} strokeWidth="2" markerEnd="url(#bc-arrow)" />
        ))}
      </g>
    </svg>
  )
}

export function BrainTumorArchitecture({ className = '', variant = 'full' }: Props) {
  if (variant === 'compact') return <CompactFigure className={className} />
  return <FullFigure className={className} />
}
