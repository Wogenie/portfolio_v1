import { Section } from './Section'
import { Reveal } from './Reveal'

const paragraphs = [
  "I'm Wogenie Liyew, an AI/ML Engineer and Applied AI Developer building intelligent systems that solve practical problems — across machine learning, software engineering, and AI-powered applications.",
  'From medical imaging systems that detect and segment brain tumors to AI agents that turn unstructured conversations into structured knowledge, I care about the full pipeline: data, models, APIs, deployment, and the people who use it.',
]

const pipeline = [
  'Data Preparation',
  'Model Architecture',
  'Evaluation',
  'Inference',
  'APIs',
  'System Architecture',
  'Deployment',
  'User Experience',
]

export function About() {
  return (
    <Section
      id="about"
      label="01 / About"
      title="About Me"
      className="border-t border-line"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          {paragraphs.map((text, index) => (
            <Reveal key={index} delay={index * 0.06}>
              <p className="mb-5 text-base leading-relaxed text-muted sm:text-[17px]">{text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="hairline rounded-xl bg-panel p-6">
            <p className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
              engineering pipeline
            </p>
            <ol className="relative mt-6">
              <span className="absolute top-1 bottom-1 left-[7px] w-px bg-line" aria-hidden="true" />
              {pipeline.map((step, index) => (
                <li key={step} className="group relative flex items-start gap-4 pb-5 last:pb-0">
                  <span className="relative z-10 mt-1.5 size-[15px] shrink-0 rounded-full border border-line bg-void transition group-hover:border-accent/60">
                    <span className="absolute inset-[3px] rounded-full bg-muted-strong transition group-hover:bg-accent" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted-strong">{step}</span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                      step {String(index + 1).padStart(2, '0')}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
