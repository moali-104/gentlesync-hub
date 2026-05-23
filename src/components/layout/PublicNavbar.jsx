import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { useUIStore } from '../../store/uiStore'
import { useAuthStore } from '../../store/authStore'
import ThemeToggle from '../shared/ThemeToggle'
import PuzzleLogo from '../shared/PuzzleLogo'

const navLinks = [
  { label: 'HOME', to: '/' },
  { label: 'GET STARTED', to: '/signup' },
  { label: 'ABOUT US', to: '/about' },
]

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useUIStore()
  const { isAuthenticated, role } = useAuthStore()

  const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-full text-xs tracking-widest font-bold transition-all duration-200 ${
      isActive
        ? 'text-[var(--ink)] border-b-2 border-orange-500 rounded-none'
        : 'text-[var(--muted)] hover:text-[var(--ink)]'
    }`

  return (
    <header className="sticky top-0 z-40 bg-[var(--card)]/80 backdrop-blur-md border-b border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3">
            <PuzzleLogo size={44} animate={true} />
            <div className="leading-tight">
              <p className="text-lg font-bold text-[var(--ink)] tracking-tight">AutiCare</p>
            </div>
          </NavLink>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClasses}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <NavLink
              to="/login"
              className="px-6 py-2 rounded-full bg-[var(--ink)] text-[var(--surface)] text-sm font-bold hover:opacity-90 transition-all shadow-md"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="px-6 py-2 rounded-full bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20"
            >
              Signup
            </NavLink>
            <ThemeToggle className="h-10 w-10 rounded-full bg-[var(--card-alt)]" />
          </div>

          <button
            className="lg:hidden p-2 rounded-xl hover:bg-[var(--card-alt)] transition-colors"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-[var(--border)] bg-[var(--card)]">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-2xl text-sm font-bold tracking-widest ${
                    isActive ? 'bg-orange-50 text-orange-700' : 'text-[var(--muted)]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[var(--border)]">
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center py-3 rounded-2xl bg-slate-800 text-white text-sm font-bold"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center py-3 rounded-2xl bg-slate-900 text-white text-sm font-bold"
              >
                Signup
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
