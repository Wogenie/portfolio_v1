import { BrainCircuit, ServerCog, Sparkles, Waves } from 'lucide-react'
import { Reveal } from './Reveal'
import { Section } from './Section'

const capabilities = [
  {
    title: 'AI & Machine Learning',
    Icon: BrainCircuit,
    items: ['Deep learning', 'Computer vision', 'NLP', 'Model evaluation'],
  },
  {
    title: 'Generative AI',
    Icon: Sparkles,
    items: ['RAG', 'AI agents', 'LangGraph', 'Vector databases'],
  },
  {
    title: 'AI Engineering',
    Icon: ServerCog,
    items: ['FastAPI & APIs', 'Model serving', 'Data pipelines', 'Deployment'],
  },
  {
    title: 'Intelligent Data Systems',
    Icon: Waves,
    items: ['Real-time streaming', 'Event-driven systems', 'Data processing', 'Docker'],
  },
]

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      label="02 / Capabilities"
      title="What I Build"
      intro="From model to production — one discipline: turning ML research into systems that run and serve people."
      className="border-t border-line"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((capability, index) => (
          <Reveal key={capability.title} delay={index * 0.07}>
            <article className="group relative h-full overflow-hidden rounded-xl border border-line bg-panel p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-panel">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="grid size-10 place-items-center rounded-md border border-line bg-panel-2 text-accent transition group-hover:border-accent/40">
                <capability.Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-base font-medium text-ink">{capability.title}</h3>
              <ul className="mt-4 space-y-2">
                {capability.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted">
                    <span className="mt-[7px] size-1 shrink-0 rounded-full bg-muted" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
