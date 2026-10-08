import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const KEY = 'portfolio-theme'

function read(): Theme {
  try {
    const stored = localStorage.getItem(KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    // storage unavailable (private mode) — fall back to light
  }
  return 'light'
}

let theme: Theme = typeof document !== 'undefined' ? (document.documentElement.getAttribute('data-theme') as Theme) || read() : 'light'

const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((listener) => listener())
}

export function getTheme(): Theme {
  return theme
}

export function setTheme(next: Theme) {
  if (next === theme) return
  theme = next
  document.documentElement.setAttribute('data-theme', next)
  try {
    localStorage.setItem(KEY, next)
  } catch {
    // ignore storage failures
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', next === 'dark' ? '#121110' : '#fbfaf4')
  emit()
}

export function toggleTheme() {
  setTheme(theme === 'light' ? 'dark' : 'light')
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, getTheme)
}
