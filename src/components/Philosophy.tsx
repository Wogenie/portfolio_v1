import { Reveal } from './Reveal'
import { Section } from './Section'

const steps = [
  { title: 'Understand the Problem' },
  { title: 'Design the System' },
  { title: 'Build the Intelligence' },
  { title: 'Evaluate' },
  { title: 'Integrate & Deploy' },
  { title: 'Iterate' },
]

export function Philosophy() {
  return (
    <Section
      id="philosophy"
      label="05 / Process"
      title="How I Build"
      intro="A repeatable engineering pipeline, applied to every project."
      className="border-t border-line"
    >
      <div className="relative">
        <span
          className="pointer-events-none absolute top-[38px] right-4 left-4 hidden h-px bg-gradient-to-r from-transparent via-line-strong to-transparent lg:block"
          aria-hidden="true"
        />
        <ol className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="h-full">
              <Reveal delay={index * 0.07} className="h-full">
                <div className="group relative h-full rounded-xl border border-line bg-panel p-6 transition hover:-translate-y-1 hover:border-accent/35">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full border border-line bg-void font-mono text-xs text-accent transition group-hover:border-accent/50">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="h-px flex-1 bg-line transition group-hover:bg-accent/40" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-base font-medium text-ink">{step.title}</h3>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
