/**
 * Input Component
 * Reusable input field with label and error handling
 */

import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(({
  label,
  error,
  helperText,
  className,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {props.required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        className={cn(
          'w-full px-4 py-2 border rounded-lg transition-all',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          error 
            ? 'border-danger-500 focus:ring-danger-500' 
            : 'border-gray-300',
          className
        )}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-danger-500">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
};
