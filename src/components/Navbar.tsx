import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Mail, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { GithubIcon } from './GithubIcon'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const reduceMotion = useReducedMotion()

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    setOpen(false)
    const target = document.querySelector<HTMLElement>(href)
    if (!target) return
    // Wait for the menu to unmount and the body scroll-lock to be released.
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
      window.history.pushState(null, '', href)
    }, 120)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-line bg-void/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Primary">
        <a href="#home" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-8 place-items-center rounded-md border border-line bg-panel font-mono text-sm text-accent transition group-hover:border-accent/50">
            W
          </span>
          <span className="text-sm font-medium tracking-tight text-ink">Neural Engineer-Wogenie L</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm transition ${
                  active === link.href
                    ? 'text-ink'
                    : 'text-muted hover:bg-wash hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <a
            href="https://github.com/Wogenie"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-md border border-line px-3.5 py-2 text-sm text-muted-strong transition hover:border-line-strong hover:bg-wash hover:text-ink"
          >
            <GithubIcon className="size-4" aria-hidden="true" />
            GitHub
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-3.5 py-2 text-sm font-medium text-on-accent transition hover:bg-accent/90"
          >
            <Mail className="size-4" aria-hidden="true" />
            Contact
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-md border border-line text-muted-strong"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-void/95 backdrop-blur-xl md:hidden"
          >
            <ul className="px-5 py-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className={`block rounded-md px-3 py-3 text-base ${
                      active === link.href ? 'bg-wash text-ink' : 'text-muted-strong'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-3 flex gap-2">
                <a
                  href="https://github.com/Wogenie"
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => setOpen(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-md border border-line px-3 py-2.5 text-sm text-muted-strong"
                >
                  <GithubIcon className="size-4" aria-hidden="true" />
                  GitHub
                </a>
                <a
                  href="#contact"
                  onClick={(event) => handleNavClick(event, '#contact')}
                  className="flex flex-1 items-center justify-center gap-2 rounded-md bg-accent px-3 py-2.5 text-sm font-medium text-on-accent"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
