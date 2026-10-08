import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionProps = {
  id: string
  label: string
  title: string
  intro?: string
  children: ReactNode
  className?: string
}

export function Section({ id, label, title, intro, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 ${className}`}>
      <Reveal>
        <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase">{label}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
        {intro ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{intro}</p> : null}
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  )
}
