import { NavLink, useNavigate } from '@/lib/router-compat'
import { LogOut, Bell } from 'lucide-react'
import PropTypes from 'prop-types'
import { useAuthStore } from '../../store/authStore'
import { useUIStore } from '../../store/uiStore'
import PuzzleLogo from '../shared/PuzzleLogo'
import ThemeToggle from '../shared/ThemeToggle'

export default function DashboardShell({ portalLabel = 'Portal', children, nav = [] }) {
  const navigate = useNavigate()
  const { logout } = useAuthStore()
  const { addToast } = useUIStore()

  const handleLogout = () => {
    logout()
    addToast({ type: 'success', title: 'Signed out', message: 'See you soon!' })
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)]">
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-3 shrink-0">
            <PuzzleLogo size={40} animate={false} />
            <div className="leading-tight">
              <p className="text-lg font-bold tracking-tight">AutiCare</p>
              <p className="text-[10px] uppercase tracking-widest text-[var(--muted)]">{portalLabel}</p>
            </div>
          </NavLink>

          {nav.length > 0 && (
            <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-xs font-bold tracking-widest transition ${
                      isActive
                        ? 'bg-[var(--ink)] text-[var(--surface)]'
                        : 'text-[var(--muted)] hover:text-[var(--ink)]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--card-alt)] hover:bg-[var(--border)]" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </button>
            <ThemeToggle className="h-10 w-10 rounded-full bg-[var(--card-alt)]" />
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] text-[var(--surface)] px-4 py-2 text-sm font-bold hover:opacity-90"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-8">{children}</main>
    </div>
  )
}

DashboardShell.propTypes = {
  portalLabel: PropTypes.string,
  children: PropTypes.node,
  nav: PropTypes.array,
}
