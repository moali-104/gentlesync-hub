import PropTypes from 'prop-types'
import PuzzleLogo from './PuzzleLogo'

export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 32,
    md: 64,
    lg: 96,
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <PuzzleLogo size={sizes[size]} isLoading={true} />
    </div>
  )
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
}
