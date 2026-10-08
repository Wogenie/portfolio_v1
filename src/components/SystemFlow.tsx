import { Boxes, Bot, Braces, Database, ServerCog } from 'lucide-react'

const stages = [
  { label: 'DATA', hint: 'ingestion · features', Icon: Database },
  { label: 'ML MODEL', hint: 'training · evaluation', Icon: Boxes },
  { label: 'AI AGENT', hint: 'retrieval · tools · memory', Icon: Bot },
  { label: 'API', hint: 'FastAPI · inference', Icon: ServerCog },
  { label: 'APPLICATION', hint: 'product · users', Icon: Braces },
]

export function SystemFlow() {
  return (
    <div className="hairline rounded-xl bg-panel p-5 backdrop-blur-sm sm:p-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] tracking-[0.25em] text-muted-soft uppercase">system flow</p>
        <span className="flex items-center gap-2 font-mono text-[11px] text-emerald-signal">
          <span className="node-pulse size-1.5 rounded-full bg-emerald-signal" />
          live
        </span>
      </div>

      <ol className="mt-5">
        {stages.map((stage, index) => (
          <li key={stage.label}>
            <div className="group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 transition hover:border-line hover:bg-wash">
              <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line bg-panel-2 text-accent transition group-hover:border-accent/40">
                <stage.Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-xs tracking-[0.18em] text-ink">{stage.label}</span>
                <span className="block truncate text-[11px] text-muted-soft">{stage.hint}</span>
              </span>
              <span className="ml-auto font-mono text-[10px] text-muted">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            {index < stages.length - 1 ? (
              <div className="ml-[26px] h-6 w-px overflow-hidden">
                <div className="flow-line size-full" />
              </div>
            ) : null}
          </li>
        ))}
      </ol>

      <p className="mt-4 border-t border-line pt-3 font-mono text-[11px] leading-relaxed text-muted-soft">
        research → system → product
      </p>
    </div>
  )
}
