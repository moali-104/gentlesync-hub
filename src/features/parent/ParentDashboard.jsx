import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from '@/lib/router-compat'
import {
  Users, Calendar, FileText, Activity, LogOut, Plus, Bell,
  TrendingUp, Clock, ChevronRight, Sparkles,
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useUIStore } from '../../store/uiStore'
import { getParentDashboard } from '../../api/dashboard.api'
import { getChildren } from '../../api/children.api'
import { getUpcomingBookings, getMyBookings } from '../../api/sessions.api'
import { getNotes } from '../../api/notes.api'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import PuzzleLogo from '../../components/shared/PuzzleLogo'
import ThemeToggle from '../../components/shared/ThemeToggle'
import usePageTitle from '../../utils/usePageTitle'

const asArray = (v) => (Array.isArray(v) ? v : Array.isArray(v?.data) ? v.data : Array.isArray(v?.items) ? v.items : [])

function StatCard({ icon: Icon, label, value, hint, tone = 'orange' }) {
  const tones = {
    orange: 'from-orange-500/15 to-orange-500/5 text-orange-600',
    blue: 'from-blue-500/15 to-blue-500/5 text-blue-600',
    green: 'from-emerald-500/15 to-emerald-500/5 text-emerald-600',
    purple: 'from-violet-500/15 to-violet-500/5 text-violet-600',
  }
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold tracking-widest text-[var(--muted)] uppercase">{label}</p>
          <p className="mt-3 text-4xl font-bold text-[var(--ink)]">{value}</p>
          {hint && <p className="mt-2 text-xs text-[var(--muted-2)]">{hint}</p>}
        </div>
        <div className={`rounded-2xl bg-gradient-to-br ${tones[tone]} p-3`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}

export default function ParentDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { addToast } = useUIStore()
  const [loading, setLoading] = useState(true)
  const [dashboard, setDashboard] = useState(null)
  const [children, setChildren] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [notes, setNotes] = useState([])

  usePageTitle('Parent Dashboard')

  useEffect(() => {
    let cancel = false
    async function load() {
      setLoading(true)
      const settle = (p) => p.then((v) => v).catch(() => null)
      const [d, c, u, n] = await Promise.all([
        settle(getParentDashboard()),
        settle(getChildren()),
        settle(getUpcomingBookings()),
        settle(getNotes()),
      ])
      if (cancel) return
      setDashboard(d || null)
      setChildren(asArray(c))
      setUpcoming(asArray(u))
      setNotes(asArray(n))
      setLoading(false)
    }
    load()
    return () => { cancel = true }
  }, [])

  const handleLogout = () => {
    logout()
    addToast({ type: 'success', title: 'Signed out', message: 'See you soon!' })
    navigate('/login')
  }

  const stats = {
    children: dashboard?.totalChildren ?? dashboard?.childrenCount ?? children.length,
    sessions: dashboard?.upcomingSessions ?? dashboard?.totalSessions ?? upcoming.length,
    notes: dashboard?.totalNotes ?? notes.length,
    progress: dashboard?.progressScore ?? dashboard?.averageProgress ?? '—',
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)]">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 h-20">
          <NavLink to="/" className="flex items-center gap-3">
            <PuzzleLogo size={40} animate={false} />
            <div className="leading-tight">
              <p className="text-lg font-bold tracking-tight">AutiCare</p>
              <p className="text-[10px] uppercase tracking-widest text-[var(--muted)]">Parent portal</p>
            </div>
          </NavLink>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="hidden sm:inline-flex items-center justify-center h-10 w-10 rounded-full bg-[var(--card-alt)] hover:bg-[var(--border)] transition-colors" aria-label="Notifications">
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

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-8">
        {/* Welcome */}
        <section className="rounded-[2rem] border border-[var(--border)] bg-gradient-to-br from-[var(--hero-from)] via-[var(--hero-via)] to-[var(--hero-to)] p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--card)]/70 border border-[var(--border)] px-3 py-1 text-xs font-semibold text-[var(--muted)]">
                <Sparkles className="h-3.5 w-3.5" />
                Phase 2 — Parent dashboard
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Welcome back, {user?.name || 'Parent'} 👋
              </h1>
              <p className="text-[var(--muted)] max-w-2xl">
                Here&apos;s an overview of your children&apos;s care, upcoming sessions, and recent notes from your specialists.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-orange-500 text-white px-5 py-3 text-sm font-bold shadow-md shadow-orange-500/20 hover:bg-orange-600 transition">
                <Plus className="h-4 w-4" />
                Add child
              </button>
              <button className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] text-[var(--surface)] px-5 py-3 text-sm font-bold hover:opacity-90 transition">
                <Calendar className="h-4 w-4" />
                Book session
              </button>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Users} label="Children" value={stats.children} hint="In your care" tone="orange" />
              <StatCard icon={Calendar} label="Upcoming sessions" value={stats.sessions} hint="Next 30 days" tone="blue" />
              <StatCard icon={FileText} label="Notes" value={stats.notes} hint="From specialists" tone="purple" />
              <StatCard icon={TrendingUp} label="Progress" value={stats.progress} hint="Across active plans" tone="green" />
            </section>

            {/* Two-column content */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Children */}
              <div className="lg:col-span-2 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-bold">My children</h2>
                    <p className="text-sm text-[var(--muted)]">Profiles, plans and progress</p>
                  </div>
                  <button className="text-xs font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1">
                    Manage <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                {children.length === 0 ? (
                  <EmptyState
                    icon={Users}
                    title="No children yet"
                    description="Add your first child profile to begin tracking their journey."
                    cta="Add a child"
                  />
                ) : (
                  <ul className="divide-y divide-[var(--border)]">
                    {children.slice(0, 5).map((child, idx) => {
                      const name = child.fullName || child.name || child.firstName || `Child #${child.id ?? idx + 1}`
                      const age = child.age ?? child.ageYears
                      const initials = String(name).split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
                      return (
                        <li key={child.id ?? idx} className="flex items-center gap-4 py-4">
                          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 text-white grid place-items-center font-bold">
                            {initials || '?'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{name}</p>
                            <p className="text-xs text-[var(--muted)]">
                              {age != null ? `${age} years` : 'Age —'}
                              {child.diagnosis ? ` • ${child.diagnosis}` : ''}
                            </p>
                          </div>
                          <button className="text-xs font-bold text-[var(--muted)] hover:text-[var(--ink)] inline-flex items-center gap-1">
                            View <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>

              {/* Upcoming sessions */}
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold">Upcoming</h2>
                  <Calendar className="h-4 w-4 text-[var(--muted)]" />
                </div>
                {upcoming.length === 0 ? (
                  <EmptyState
                    icon={Clock}
                    title="No upcoming sessions"
                    description="Book a session with a specialist to get started."
                  />
                ) : (
                  <ul className="space-y-3">
                    {upcoming.slice(0, 4).map((b, idx) => {
                      const when = b.startTime || b.date || b.scheduledAt
                      const dt = when ? new Date(when) : null
                      return (
                        <li key={b.id ?? idx} className="rounded-2xl border border-[var(--border)] p-3">
                          <p className="text-sm font-semibold truncate">{b.title || b.specialistName || b.serviceName || 'Therapy session'}</p>
                          <p className="text-xs text-[var(--muted)] mt-1">
                            {dt ? dt.toLocaleString() : 'Time TBD'}
                          </p>
                          {b.status && (
                            <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-orange-100 text-orange-700">
                              {b.status}
                            </span>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            </section>

            {/* Recent notes */}
            <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold">Recent notes</h2>
                  <p className="text-sm text-[var(--muted)]">Updates from your care team</p>
                </div>
                <Activity className="h-4 w-4 text-[var(--muted)]" />
              </div>
              {notes.length === 0 ? (
                <EmptyState
                  icon={FileText}
                  title="No notes yet"
                  description="Notes from doctors and therapists will appear here."
                />
              ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {notes.slice(0, 6).map((n, idx) => (
                    <li key={n.id ?? idx} className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card-alt)]">
                      <p className="text-sm font-semibold truncate">{n.title || n.subject || 'Note'}</p>
                      <p className="text-xs text-[var(--muted)] mt-1 line-clamp-3">{n.content || n.body || n.description || '—'}</p>
                      {(n.createdAt || n.date) && (
                        <p className="text-[10px] uppercase tracking-wider text-[var(--muted-2)] mt-2">
                          {new Date(n.createdAt || n.date).toLocaleDateString()}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}

function EmptyState({ icon: Icon, title, description, cta }) {
  return (
    <div className="text-center py-10 px-4">
      <div className="mx-auto h-12 w-12 rounded-2xl bg-[var(--card-alt)] grid place-items-center mb-3">
        <Icon className="h-5 w-5 text-[var(--muted)]" />
      </div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-[var(--muted)] mt-1 max-w-xs mx-auto">{description}</p>
      {cta && (
        <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-500 text-white px-4 py-2 text-sm font-bold hover:bg-orange-600">
          <Plus className="h-4 w-4" /> {cta}
        </button>
      )}
    </div>
  )
}
