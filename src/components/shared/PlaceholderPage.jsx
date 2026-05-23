import PropTypes from 'prop-types'

export default function PlaceholderPage({ title, description }) {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-[var(--ink)] mb-2">{title}</h2>
        <p className="text-[var(--muted)]">{description || 'This page is under construction.'}</p>
      </div>
    </div>
  )
}

PlaceholderPage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
}
