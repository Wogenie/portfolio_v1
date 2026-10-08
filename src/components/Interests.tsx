import { Reveal } from './Reveal'
import { Section } from './Section'

const topics = [
  'Agentic AI',
  'Multi-agent systems',
  'RAG architectures',
  'Local / open-source LLMs',
  'Multimodal AI',
  'AI automation',
  'Model serving',
  'ML infrastructure',
  'Distributed AI systems',
  'Real-time AI pipelines',
]

export function Interests() {
  return (
    <Section
      id="interests"
      label="06 / Research Notes"
      title="Currently Exploring"
      intro="The directions I'm reading about and prototyping right now."
      className="border-t border-line"
    >
      <Reveal>
        <div className="overflow-hidden rounded-xl border border-line bg-panel">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <p className="font-mono text-[11px] tracking-[0.24em] text-muted-soft uppercase">
              notes.md — research log
            </p>
            <span className="flex items-center gap-2 font-mono text-[11px] text-emerald-signal">
              <span className="node-pulse size-1.5 rounded-full bg-emerald-signal" aria-hidden="true" />
              active
            </span>
          </div>

          <ul className="divide-y divide-line">
            {topics.map((topic, index) => (
              <li
                key={topic}
                className="group flex items-center gap-4 px-5 py-3 transition hover:bg-wash"
              >
                <span className="font-mono text-[11px] text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-muted-strong transition group-hover:text-ink">{topic}</span>
                <span className="ml-auto flex items-center gap-2">
                  <span className="hidden font-mono text-[10px] tracking-[0.2em] text-muted uppercase sm:inline">
                    exploring
                  </span>
                  <span className="size-1.5 rounded-full bg-accent/70" aria-hidden="true" />
                </span>
              </li>
            ))}
          </ul>

          <div className="border-t border-line px-5 py-3 font-mono text-[11px] text-muted-soft">
            <span className="text-accent">$</span> next<span className="caret ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-accent/80" />
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
