import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import type { Project } from '../data/projects'
import { BrainInOut } from './BrainInOut'
import { BrainTumorArchitecture } from './BrainTumorArchitecture'
import { GithubIcon } from './GithubIcon'
import { ProjectVisual } from './ProjectVisual'

type Props = { project: Project | null; onClose: () => void }

function Block({ index, title, children }: { index: string; title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line pt-7">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[11px] tracking-[0.2em] text-accent">{index}</span>
        <h3 className="text-lg font-medium text-ink">{title}</h3>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
          <span className="mt-2 size-1 shrink-0 rounded-full bg-accent/70" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function CaseStudyModal({ project, onClose }: Props) {
  const reduce = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!project) return

    restoreRef.current = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      restoreRef.current?.focus()
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/30 p-0 backdrop-blur-sm sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.article
            initial={reduce ? undefined : { y: 28, opacity: 0 }}
            animate={reduce ? undefined : { y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: 20, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`relative my-0 w-full border border-line bg-panel shadow-2xl shadow-black/10 sm:my-6 sm:rounded-xl ${
              project.figure ? 'max-w-4xl' : 'max-w-3xl'
            }`}
          >
            <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-panel px-5 py-4 sm:rounded-t-xl sm:px-8">
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                  {project.category}
                </p>
                <h2 id="case-study-title" className="mt-1.5 text-xl font-semibold text-ink sm:text-2xl">
                  {project.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="grid size-9 shrink-0 place-items-center rounded-md border border-line text-muted-strong transition hover:border-line-strong hover:bg-wash hover:text-ink"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </header>

            <div className="px-5 py-7 sm:px-8">
              {project.figure ? (
                <div className="space-y-5">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.24em] text-accent uppercase">
                      input → output · one forward pass
                    </p>
                    <div className="hairline mt-2.5 overflow-x-auto rounded-lg bg-white">
                      <BrainInOut className="h-auto w-full min-w-[620px]" />
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] tracking-[0.24em] text-accent uppercase">
                      system architecture · full view
                    </p>
                    <div className="hairline mt-2.5 overflow-x-auto rounded-lg bg-white">
                      <BrainTumorArchitecture className="h-auto w-full min-w-[820px]" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hairline overflow-hidden rounded-lg bg-white">
                  <ProjectVisual kind={project.visual} className="aspect-[5/3] w-full" />
                </div>
              )}

              {project.note ? (
                <p className="mt-5 rounded-md border border-accent/35 bg-accent-soft px-4 py-3 text-xs leading-relaxed text-accent">
                  {project.note}
                </p>
              ) : null}

              <div className="mt-8 space-y-7">
                <Block index="01" title="Problem">
                  <p className="text-sm leading-relaxed text-muted">{project.caseStudy.problem}</p>
                </Block>

                <Block index="02" title="Solution">
                  <p className="text-sm leading-relaxed text-muted">{project.caseStudy.solution}</p>
                </Block>

                <Block index="03" title="Architecture">
                  <Bullets items={project.caseStudy.architecture} />
                </Block>

                <Block index="04" title="Data Flow">
                  <ol className="flex flex-wrap items-center gap-2">
                    {project.caseStudy.dataFlow.map((step, index) => (
                      <li key={step} className="flex items-center gap-2">
                        <span className="rounded-md border border-line bg-panel px-2.5 py-1.5 font-mono text-[11px] text-muted-strong">
                          {step}
                        </span>
                        {index < project.caseStudy.dataFlow.length - 1 ? (
                          <span className="text-muted" aria-hidden="true">
                            →
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ol>
                </Block>

                <Block index="05" title="Model / System Design">
                  <Bullets items={project.caseStudy.systemDesign} />
                </Block>

                <Block index="06" title="Technology Stack">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-line bg-panel px-3 py-1 font-mono text-[11px] text-muted-strong"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Block>

                <Block index="07" title="Engineering Challenges">
                  <Bullets items={project.caseStudy.challenges} />
                </Block>

                <Block index="08" title="Evaluation">
                  <Bullets items={project.caseStudy.evaluation} />
                </Block>

                <Block index="09" title="Results">
                  <Bullets items={project.caseStudy.results} />
                </Block>

                <Block index="10" title="Lessons Learned">
                  <Bullets items={project.caseStudy.lessons} />
                </Block>

                <Block index="11" title="GitHub">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm text-muted-strong transition hover:border-line-strong hover:bg-wash hover:text-ink"
                  >
                    <GithubIcon className="size-4" aria-hidden="true" />
                    View repository
                  </a>
                </Block>

                {project.live ? (
                  <Block index="12" title="Live Demo">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-on-accent transition hover:bg-accent/90"
                    >
                      Open live demo
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  </Block>
                ) : null}
              </div>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
