import { NavLink } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function PublicFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-600">AutiCare</p>
            <p className="text-lg font-semibold text-[var(--ink)] mt-2">Empowering families and clinicians</p>
            <p className="text-sm text-[var(--muted)] mt-2">
              A trusted platform for Autism Spectrum Disorder support, progress tracking, and collaboration.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--ink)] mb-3">Explore</p>
            <div className="space-y-2 text-sm">
              <NavLink to="/" className="block text-[var(--muted)] hover:text-[var(--ink)]">Home</NavLink>
              <NavLink to="/about" className="block text-[var(--muted)] hover:text-[var(--ink)]">About</NavLink>
              <NavLink to="/login" className="block text-[var(--muted)] hover:text-[var(--ink)]">Login</NavLink>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--ink)] mb-3">Contact</p>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-500" /> support@auticare.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-500" /> (800) 555-1212
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-500" /> Remote-first care network
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-[var(--border)] pt-6 text-xs text-[var(--muted-2)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 AutiCare. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-[var(--ink)]">Privacy</span>
            <span className="hover:text-[var(--ink)]">Terms</span>
            <span className="hover:text-[var(--ink)]">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
