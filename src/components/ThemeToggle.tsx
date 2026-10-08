import { Moon, Sun } from 'lucide-react'
import { toggleTheme, useTheme } from '../lib/theme'

type Props = { className?: string }

export function ThemeToggle({ className = '' }: Props) {
  const theme = useTheme()
  const dark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`grid size-10 place-items-center rounded-md border border-line text-muted-strong transition hover:border-line-strong hover:bg-wash hover:text-ink ${className}`}
    >
      {dark ? <Sun className="size-4.5" aria-hidden="true" /> : <Moon className="size-4.5" aria-hidden="true" />}
    </button>
  )
}
