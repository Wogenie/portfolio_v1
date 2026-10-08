type Props = { className?: string }

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

const arrows = ['M166 115 H206', 'M380 115 L426 66', 'M380 115 L436 178']

export function BrainInOut({ className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 780 278"
      className={className}
      role="img"
      aria-label="Input and output panel: an MRI brain scan goes through the shared encoder and returns a four-class output plus a segmented pixel mask of the tumor."
      style={{ fontFamily: sans }}
    >
      <defs>
        <marker id="io-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill={accent} />
        </marker>
        <pattern id="io-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 H0 V40" fill="none" stroke={grid} strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="780" height="278" fill="#ffffff" />
      <rect width="780" height="278" fill="url(#io-grid)" />

      {/* input brain */}
      <rect x="16" y="40" width="150" height="150" rx="12" fill="#ffffff" stroke={border} strokeWidth="1.4" />
      <BrainGlyph cx={91} cy={112} scale={1.25} />
      <text x="91" y="216" textAnchor="middle" fontSize={12.5} fill={ink} fontFamily={mono} letterSpacing="0.1em">
        INPUT · MRI
      </text>

      {/* shared encoder */}
      <rect x="210" y="92" width="170" height="46" rx="9" fill="#ffffff" stroke={accent} strokeWidth="1.6" />
      <text x="295" y="113" textAnchor="middle" fontSize={14} fontWeight={600} fill={ink}>
        EFFICIENTNET-B0
      </text>
      <text x="295" y="130" textAnchor="middle" fontSize={10.5} fill={accent} fontFamily={mono} letterSpacing="0.08em">
        PRETRAINED · SHARED
      </text>

      {/* class output */}
      <rect x="430" y="30" width="240" height="76" rx="10" fill="#ffffff" stroke={accent} strokeWidth="1.6" />
      <text x="550" y="56" textAnchor="middle" fontSize={14.5} fontWeight={600} fill={accent}>
        4-CLASS OUTPUT
      </text>
      <text x="550" y="78" textAnchor="middle" fontSize={11.5} fill={muted} fontFamily={mono}>
        glioma · meningioma ·
      </text>
      <text x="550" y="96" textAnchor="middle" fontSize={11.5} fill={muted} fontFamily={mono}>
        pituitary · no tumor
      </text>
      <text x="550" y="128" textAnchor="middle" fontSize={11.5} fill={ink} fontFamily={mono} letterSpacing="0.1em">
        OUTPUT · CLASS
      </text>

      {/* mask output */}
      <rect x="440" y="140" width="120" height="100" rx="10" fill="#ffffff" stroke={border} strokeWidth="1.4" />
      <BrainGlyph cx={500} cy={184} scale={0.85} masked />
      <text x="500" y="264" textAnchor="middle" fontSize={11.5} fill={ink} fontFamily={mono} letterSpacing="0.08em">
        OUTPUT · PIXEL MASK
      </text>

      <g fill="none" strokeLinecap="round">
        {arrows.map((d) => (
          <path key={d} d={d} stroke={accent} strokeWidth="2" markerEnd="url(#io-arrow)" />
        ))}
      </g>
    </svg>
  )
}
