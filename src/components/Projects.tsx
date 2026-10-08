import { ArrowUpRight, Layers } from 'lucide-react'
import { useState } from 'react'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'
import { BrainTumorArchitecture } from './BrainTumorArchitecture'
import { CaseStudyModal } from './CaseStudyModal'
import { GithubIcon } from './GithubIcon'
import { ProjectVisual } from './ProjectVisual'
import { Reveal } from './Reveal'
import { Section } from './Section'

function Actions({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <div className="mt-auto flex flex-wrap gap-2.5 pt-1">
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex items-center gap-2 rounded-md border border-line px-3.5 py-2 text-sm text-muted-strong transition hover:border-line-strong hover:bg-wash hover:text-ink"
      >
        <GithubIcon className="size-4" aria-hidden="true" />
        GitHub
      </a>
      {project.live ? (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 rounded-md border border-line px-3.5 py-2 text-sm text-muted-strong transition hover:border-line-strong hover:bg-wash hover:text-ink"
        >
          Live Demo
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      ) : null}
      <button
        type="button"
        onClick={onOpen}
        className="inline-flex items-center gap-2 rounded-md bg-accent px-3.5 py-2 text-sm font-medium text-on-accent transition hover:bg-accent/90"
      >
        <Layers className="size-4" aria-hidden="true" />
        View Case Study
      </button>
    </div>
  )
}

function ShowcaseCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <Reveal delay={0.05}>
      <article className="group overflow-hidden rounded-xl border border-line bg-panel transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-panel">
        <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">{project.category}</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">{project.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[15px]">{project.description}</p>
            {project.note ? (
              <p className="mt-4 rounded-md border border-accent/35 bg-accent-soft px-3 py-2 text-xs leading-relaxed text-accent">
                {project.note}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <p className="font-mono text-[10px] tracking-[0.24em] text-muted-soft uppercase">architecture</p>
              <ol className="mt-2.5 flex flex-wrap items-center gap-1.5">
                {project.architecture.map((step, stepIndex) => (
                  <li key={step} className="flex items-center gap-1.5">
                    <span className="rounded border border-line bg-panel-2 px-2 py-1 font-mono text-[10px] text-muted-strong">
                      {step}
                    </span>
                    {stepIndex < project.architecture.length - 1 ? (
                      <span className="text-[10px] text-muted-soft" aria-hidden="true">
                        →
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line bg-void/60 px-2.5 py-1 font-mono text-[10px] text-muted transition group-hover:border-line-strong group-hover:text-muted-strong"
                >
                  {item}
                </span>
              ))}
            </div>

            <Actions project={project} onOpen={onOpen} />
          </div>
        </div>

        <div className="border-t border-line px-4 pt-5 pb-6 sm:px-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2 px-1 pb-3">
            <p className="font-mono text-[10px] tracking-[0.24em] text-accent uppercase">
              system architecture · shared encoder, two heads
            </p>
            <p className="hidden font-mono text-[10px] tracking-[0.18em] text-muted-soft uppercase sm:block">
              one forward pass → class + mask
            </p>
          </div>

          <div className="hairline overflow-x-auto rounded-lg bg-white">
            <BrainTumorArchitecture variant="compact" className="h-auto w-full min-w-[720px]" />
          </div>

          <p className="mt-3 px-1 text-xs leading-relaxed text-muted-soft">
            One shared encoder, two heads: the classification head reads pooled encoder features while the U-Net
            decoder with skip connections returns the pixel-wise mask.{' '}
            <span className="sm:hidden">Swipe the diagram to explore it.</span>{' '}
            <button
              type="button"
              onClick={onOpen}
              className="font-medium text-accent underline decoration-line underline-offset-4 transition hover:decoration-accent"
            >
              Open the case study for the full architecture
            </button>
            .
          </p>
        </div>
      </article>
    </Reveal>
  )
}

function Card({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const flip = index % 2 === 1

  return (
    <Reveal delay={0.05}>
      <article className="group overflow-hidden rounded-xl border border-line bg-panel transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-panel">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div
            className={`relative aspect-[16/10] overflow-hidden border-b border-line lg:aspect-auto lg:border-b-0 ${
              flip ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
            <ProjectVisual kind={project.visual} className="relative h-full w-full" />
          </div>

          <div
            className={`flex flex-col gap-5 p-6 sm:p-8 ${
              flip ? 'lg:order-1 lg:border-r lg:border-line' : 'lg:order-2 lg:border-l lg:border-line'
            }`}
          >
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">{project.category}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                {project.title}
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-muted">{project.description}</p>

            <div>
              <p className="font-mono text-[10px] tracking-[0.24em] text-muted-soft uppercase">architecture</p>
              <ol className="mt-2.5 flex flex-wrap items-center gap-1.5">
                {project.architecture.map((step, stepIndex) => (
                  <li key={step} className="flex items-center gap-1.5">
                    <span className="rounded border border-line bg-panel-2 px-2 py-1 font-mono text-[10px] text-muted-strong">
                      {step}
                    </span>
                    {stepIndex < project.architecture.length - 1 ? (
                      <span className="text-[10px] text-muted-soft" aria-hidden="true">
                        →
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line bg-void/60 px-2.5 py-1 font-mono text-[10px] text-muted transition group-hover:border-line-strong group-hover:text-muted-strong"
                >
                  {item}
                </span>
              ))}
            </div>

            {project.note ? (
              <p className="rounded-md border border-accent/35 bg-accent-soft px-3 py-2 text-xs leading-relaxed text-accent">
                {project.note}
              </p>
            ) : null}

            <Actions project={project} onOpen={onOpen} />
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeProject = projects.find((project) => project.id === activeId) ?? null

  return (
    <>
      <Section
        id="projects"
        label="03 / Selected Work"
        title="Featured Projects"
        intro="Four complete systems — models, agents, APIs, and interfaces."
        className="border-t border-line"
      >
        <div className="space-y-6">
          {projects.map((project, index) =>
            project.figure ? (
              <ShowcaseCard key={project.id} project={project} onOpen={() => setActiveId(project.id)} />
            ) : (
              <Card
                key={project.id}
                project={project}
                index={index}
                onOpen={() => setActiveId(project.id)}
              />
            ),
          )}
        </div>
      </Section>

      <CaseStudyModal project={activeProject} onClose={() => setActiveId(null)} />
    </>
  )
}
