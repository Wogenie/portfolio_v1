import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './GithubIcon'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function GithubSection() {
  return (
    <Section
      id="open-source"
      label="07 / Open Source"
      title="Open Source & Experiments"
      intro="I build, experiment, document, and iterate in public."
      className="border-t border-line"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-xl border border-line bg-panel p-8 sm:p-10">
          <div className="grid-surface pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-lg border border-line bg-void text-accent">
                  <GithubIcon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[11px] tracking-[0.24em] text-muted-soft uppercase">github.com</p>
                  <p className="text-lg font-medium text-ink">Wogenie</p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
                Every project on this page — code, architectures, and experiments.
              </p>
            </div>

            <a
              href="https://github.com/Wogenie"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-on-accent transition hover:bg-accent/90"
            >
              Explore repositories
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
