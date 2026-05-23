import { Outlet } from '@/lib/router-compat'
import PublicNavbar from './PublicNavbar'
import PublicFooter from './PublicFooter'

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface)] text-[var(--ink)]">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  )
}
