import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Users, Calendar, FileText, TrendingUp, Plus, Sparkles, ChevronRight, Clock, Activity, Stethoscope, HeartPulse,
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { getSpecialistDashboard } from '../../api/dashboard.api'
import { getUpcomingBookings } from '../../api/sessions.api'
import { getNotes } from '../../api/notes.api'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import DashboardShell from '../../components/layout/DashboardShell'
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
StatCard.propTypes = { icon: PropTypes.any, label: PropTypes.string, value: PropTypes.any, hint: PropTypes.string, tone: PropTypes.string }

export default function SpecialistDashboard({ role = 'Doctor' }) {
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [dashboard, setDashboard] = useState(null)
  const [upcoming, setUpcoming] = useState([])
  const [notes, setNotes] = useState([])

  const isDoctor = role === 'Doctor'
  const portalLabel = `${role} portal`
  const RoleIcon = isDoctor ? Stethoscope : HeartPulse
  const basePath = isDoctor ? '/doctor' : '/therapist'

  usePageTitle(`${role} Dashboard`)

  useEffect(() => {
    let cancel = false
    async function load() {
      setLoading(true)
      const settle = (p) => p.then((v) => v).catch(() => null)
      const [d, u, n] = await Promise.all([
        settle(getSpecialistDashboard()),
        settle(getUpcomingBookings()),
        settle(getNotes()),
      ])
      if (cancel) return
      setDashboard(d || null)
      setUpcoming(asArray(u))
      setNotes(asArray(n))
      setLoading(false)
    }
    load()
    return () => { cancel = true }
  }, [])

  const stats = {
    patients: dashboard?.totalPatients ?? dashboard?.patientCount ?? '—',
    sessions: dashboard?.upcomingSessions ?? upcoming.length,
    plans: dashboard?.activePlans ?? dashboard?.totalPlans ?? '—',
    notes: dashboard?.totalNotes ?? notes.length,
  }

  const nav = [
    { label: 'OVERVIEW', to: `${basePath}/home` },
    { label: 'PATIENTS', to: `${basePath}/patients` },
    { label: 'SESSIONS', to: `${basePath}/sessions` },
    { label: 'NOTES', to: `${basePath}/notes` },
  ]

  return (
    <DashboardShell portalLabel={portalLabel} nav={nav}>
      <section className="rounded-[2rem] border border-[var(--border)] bg-gradient-to-br from-[var(--hero-from)] via-[var(--hero-via)] to-[var(--hero-to)] p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--card)]/70 border border-[var(--border)] px-3 py-1 text-xs font-semibold text-[var(--muted)]">
              <Sparkles className="h-3.5 w-3.5" />
              {portalLabel}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-3">
              <RoleIcon className="h-8 w-8 text-orange-500" />
              Welcome, {isDoctor ? 'Dr. ' : ''}{user?.name || role}
            </h1>
            <p className="text-[var(--muted)] max-w-2xl">
              Review your patients, manage upcoming sessions and treatment plans, and stay in touch with families.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-orange-500 text-white px-5 py-3 text-sm font-bold shadow-md shadow-orange-500/20 hover:bg-orange-600">
              <Plus className="h-4 w-4" /> New treatment plan
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] text-[var(--surface)] px-5 py-3 text-sm font-bold hover:opacity-90">
              <Calendar className="h-4 w-4" /> Schedule session
            </button>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex items-center justify-center py-20"><LoadingSpinner /></div>
      ) : (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Users} label="Patients" value={stats.patients} hint="Under your care" tone="orange" />
            <StatCard icon={Calendar} label="Upcoming sessions" value={stats.sessions} hint="Next 30 days" tone="blue" />
            <StatCard icon={TrendingUp} label="Active plans" value={stats.plans} hint="In progress" tone="green" />
            <StatCard icon={FileText} label="Notes" value={stats.notes} hint="Recently written" tone="purple" />
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold">Today&apos;s schedule</h2>
                  <p className="text-sm text-[var(--muted)]">Upcoming therapy and consultation sessions</p>
                </div>
                <button className="text-xs font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1">
                  Full calendar <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
              {upcoming.length === 0 ? (
                <EmptyState icon={Clock} title="No upcoming sessions" description="Your schedule is clear." />
              ) : (
                <ul className="divide-y divide-[var(--border)]">
                  {upcoming.slice(0, 6).map((b, idx) => {
                    const when = b.startTime || b.date || b.scheduledAt
                    const dt = when ? new Date(when) : null
                    return (
                      <li key={b.id ?? idx} className="flex items-center gap-4 py-4">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white grid place-items-center">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{b.title || b.childName || b.serviceName || 'Therapy session'}</p>
                          <p className="text-xs text-[var(--muted)]">{dt ? dt.toLocaleString() : 'Time TBD'}</p>
                        </div>
                        {b.status && (
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-orange-100 text-orange-700">{b.status}</span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">Recent activity</h2>
                <Activity className="h-4 w-4 text-[var(--muted)]" />
              </div>
              {notes.length === 0 ? (
                <EmptyState icon={FileText} title="No recent notes" description="Notes you write appear here." />
              ) : (
                <ul className="space-y-3">
                  {notes.slice(0, 4).map((n, idx) => (
                    <li key={n.id ?? idx} className="rounded-2xl border border-[var(--border)] p-3">
                      <p className="text-sm font-semibold truncate">{n.title || n.subject || 'Note'}</p>
                      <p className="text-xs text-[var(--muted)] mt-1 line-clamp-2">{n.content || n.body || '—'}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </>
      )}
    </DashboardShell>
  )
}

SpecialistDashboard.propTypes = { role: PropTypes.oneOf(['Doctor', 'Therapist']) }

function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="text-center py-10 px-4">
      <div className="mx-auto h-12 w-12 rounded-2xl bg-[var(--card-alt)] grid place-items-center mb-3">
        <Icon className="h-5 w-5 text-[var(--muted)]" />
      </div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-[var(--muted)] mt-1 max-w-xs mx-auto">{description}</p>
    </div>
  )
}
EmptyState.propTypes = { icon: PropTypes.any, title: PropTypes.string, description: PropTypes.string }
