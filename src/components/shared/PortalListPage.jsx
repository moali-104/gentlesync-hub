import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import DashboardShell from '../../components/layout/DashboardShell'
import LoadingSpinner from '../../components/shared/LoadingSpinner'

const asArray = (v) => (Array.isArray(v) ? v : Array.isArray(v?.data) ? v.data : Array.isArray(v?.items) ? v.items : [])

export default function PortalListPage({
  title, subtitle, portalLabel, nav, fetcher, columns, emptyTitle, emptyDescription, pageTitle,
}) {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState([])

  useEffect(() => {
    if (pageTitle) document.title = `${pageTitle} — AutiCare`
    let cancel = false
    fetcher()
      .then((d) => { if (!cancel) setRows(asArray(d)) })
      .catch(() => { if (!cancel) setRows([]) })
      .finally(() => { if (!cancel) setLoading(false) })
    return () => { cancel = true }
  }, [fetcher, pageTitle])

  return (
    <DashboardShell portalLabel={portalLabel} nav={nav}>
      <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-[var(--muted)]">{subtitle}</p>
        </div>
      </section>

      <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex items-center justify-center"><LoadingSpinner /></div>
        ) : rows.length === 0 ? (
          <div className="text-center py-16 px-4">
            <p className="font-semibold text-lg">{emptyTitle}</p>
            <p className="text-sm text-[var(--muted)] mt-2 max-w-md mx-auto">{emptyDescription}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--card-alt)] text-[var(--muted)] text-xs uppercase tracking-widest">
                  {columns.map((c) => (
                    <th key={c.key} className="text-left font-bold px-6 py-4">{c.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={row.id ?? idx} className="border-t border-[var(--border)] hover:bg-[var(--card-alt)]/40">
                    {columns.map((c) => (
                      <td key={c.key} className="px-6 py-4">
                        {c.render ? c.render(row) : (row[c.key] ?? '—')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </DashboardShell>
  )
}

PortalListPage.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  portalLabel: PropTypes.string,
  nav: PropTypes.array,
  fetcher: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  emptyTitle: PropTypes.string,
  emptyDescription: PropTypes.string,
  pageTitle: PropTypes.string,
}
