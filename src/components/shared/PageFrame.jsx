import PropTypes from 'prop-types'

export function PageHeader({ title, subtitle, action = null }) {
  return (
    <div className="flex flex-col gap-4 rounded-[2rem] border border-[var(--border)] bg-[var(--card)] px-6 py-6 shadow-sm sm:px-7 sm:py-7 lg:flex-row lg:items-start lg:justify-between">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">{title}</h1>
        <p className="max-w-3xl text-sm leading-6 text-[var(--muted)] sm:text-base">{subtitle}</p>
      </div>
      {action}
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  action: PropTypes.node,
}
