import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { GithubIcon } from './GithubIcon'
import { NeuralBackground } from './NeuralBackground'
import { SystemFlow } from './SystemFlow'

export function Hero() {
  const reduce = useReducedMotion()
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section id="home" className="relative isolate overflow-hidden">
      <NeuralBackground />

      <div className="relative mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-12 px-5 pt-28 pb-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:pt-32">
        <div>
          <motion.span
            {...rise(0)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3.5 py-1.5 font-mono text-[11px] tracking-[0.14em] text-muted-strong backdrop-blur"
          >
            <span className="node-pulse size-1.5 rounded-full bg-emerald-signal" aria-hidden="true" />
            AI/ML Engineer · Applied AI · Intelligent Systems
          </motion.span>

          <motion.h1
            {...rise(0.1)}
            className="mt-7 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Building Intelligent Systems,
            <span className="display-gradient block">
              Not Just Models.
            </span>
          </motion.h1>

          <motion.p {...rise(0.2)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            AI/ML Engineer building intelligent applications across machine learning, deep learning, NLP,
            computer vision, RAG, and AI agents.
          </motion.p>

          <motion.div {...rise(0.3)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-on-accent transition hover:bg-accent/90"
            >
              View Projects
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/Wogenie"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm text-muted-strong transition hover:border-line-strong hover:bg-wash hover:text-ink"
            >
              <GithubIcon className="size-4" aria-hidden="true" />
              GitHub
            </a>
          </motion.div>

          <motion.dl {...rise(0.42)} className="mt-12 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
            {[
              { term: 'Focus', detail: 'ML · DL · CV · NLP' },
              { term: 'Systems', detail: 'RAG · Agents · APIs' },
              { term: 'Data', detail: 'Streaming · Pipelines' },
            ].map((item) => (
              <div key={item.term} className="bg-panel px-4 py-3.5">
                <dt className="font-mono text-[10px] tracking-[0.2em] text-muted-soft uppercase">{item.term}</dt>
                <dd className="mt-1 text-[13px] text-muted-strong">{item.detail}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <SystemFlow />
        </motion.div>
      </div>
    </section>
  )
}
