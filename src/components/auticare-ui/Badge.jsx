/**
 * Badge Component
 * Small status indicators
 */

import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const Badge = ({ children, variant = 'primary', className, ...props }) => {
  const variants = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    danger: 'bg-danger-100 text-danger-800',
    info: 'bg-blue-100 text-blue-800',
  };
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;

Badge.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'info']),
  className: PropTypes.string,
};
