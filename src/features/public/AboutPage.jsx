import { NavLink } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  Compass,
  HandHeart,
  Lightbulb,
  Sparkles,
  Users,
} from 'lucide-react'
import usePageTitle from '../../utils/usePageTitle'

const steps = [
  {
    title: 'Discover',
    description: 'Complete a short intake to align on needs, goals, and care context.',
    icon: Compass,
  },
  {
    title: 'Coordinate',
    description: 'Collaborate across clinicians, therapists, and caregivers in one workspace.',
    icon: Users,
  },
  {
    title: 'Track',
    description: 'Measure progress with clear dashboards, alerts, and tailored insights.',
    icon: BadgeCheck,
  },
]

const benefits = [
  {
    title: 'Doctors',
    description: 'See longitudinal insights, risk flags, and coordinated treatment plans.',
    icon: Sparkles,
  },
  {
    title: 'Therapists',
    description: 'Plan sessions, log outcomes, and align therapy goals with the care team.',
    icon: Lightbulb,
  },
  {
    title: 'Parents',
    description: 'Stay informed with daily routines, progress summaries, and trusted guidance.',
    icon: HandHeart,
  },
]

export default function AboutPage() {
  usePageTitle('About')

  return (
    <div className="bg-[var(--surface)] text-[var(--ink)]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-surface" />
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full hero-glow-1 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-80 w-80 rounded-full hero-glow-2 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl space-y-4 slide-up">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-600">Our mission</p>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-[var(--ink)]">
              Elevating autism care with clarity and compassion
            </h1>
            <p className="text-lg text-[var(--muted)]">
              AutiCare helps families, clinicians, and therapists work together to create supportive, measurable, and personalized care journeys for children with ASD.
            </p>
            <NavLink
              to="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-[var(--surface)] font-semibold shadow-lg hover:opacity-90 transition-colors"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </NavLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-600">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--ink)]">
            A simple, structured path to progress
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <span className="text-sm font-semibold text-[var(--muted-2)]">0{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-[var(--ink)] mt-4">{step.title}</h3>
                <p className="text-sm text-[var(--muted)] mt-2">{step.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-600">Benefits by role</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--ink)]">
              Designed for every care partner
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg">
                  <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--ink)] mt-4">{benefit.title}</h3>
                  <p className="text-sm text-[var(--muted)] mt-2">{benefit.description}</p>
                </div>
              )}
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--ink)]">Impact at a glance</h2>
            <p className="text-[var(--muted)]">
              We focus on measurable impact, from faster care coordination to meaningful family engagement.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Families supported', value: '1,000+' },
                { label: 'Care specialists', value: '240+' },
                { label: 'Hours saved weekly', value: '320+' },
                { label: 'Satisfaction score', value: '4.9/5' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
                  <p className="text-xs text-[var(--muted-2)]">{stat.label}</p>
                  <p className="text-2xl font-semibold text-[var(--ink)] mt-1">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-[var(--ink)]">Team spotlight</h3>
            <p className="text-sm text-[var(--muted)] mt-2">
              A multidisciplinary team of clinicians, researchers, and engineers focused on human-centered autism care.
            </p>
            <div className="mt-6 space-y-4">
              {[
                { name: 'Dr. Alana Pierce', role: 'Clinical Director' },
                { name: 'Sofia Martinez', role: 'Therapy Operations' },
                { name: 'Jordan Blake', role: 'Family Success Lead' },
              ].map((member) => (
                <div key={member.name} className="flex items-center justify-between rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <div>
                    <p className="text-sm font-semibold text-[var(--ink)]">{member.name}</p>
                    <p className="text-xs text-[var(--muted-2)]">{member.role}</p>
                  </div>
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">Available</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-display font-bold">Join a community focused on progress</h2>
          <p className="text-white/80 mt-3 max-w-2xl mx-auto">
            Take the first step in creating a coordinated care experience for your family or practice.
          </p>
          <NavLink
            to="/signup"
            className="inline-flex items-center gap-2 mt-6 rounded-full bg-white text-slate-900 font-semibold px-6 py-3 shadow-lg hover:bg-slate-100 transition-colors"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </NavLink>
        </div>
      </section>
    </div>
  )
}


