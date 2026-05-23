import PropTypes from 'prop-types'
import { Moon, Sun } from 'lucide-react'
import { useUIStore } from '../../store'

export default function ThemeToggle({ className = '', children = null }) {
  const { theme, toggleTheme } = useUIStore()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)] ${className}`}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {children}
    </button>
  )
}

ThemeToggle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}
