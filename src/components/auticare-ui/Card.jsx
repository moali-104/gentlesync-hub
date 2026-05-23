/**
 * Card Component
 * Reusable card container
 */

import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

export const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-card p-6 transition-shadow duration-200 hover:shadow-card-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const CardHeader = ({ children, className, ...props }) => {
  return (
    <div
      className={cn('mb-4', className)}
      {...props}
    >
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3
      className={cn('text-xl font-semibold text-gray-900', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

CardTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const CardDescription = ({ children, className, ...props }) => {
  return (
    <p
      className={cn('text-sm text-gray-600 mt-1', className)}
      {...props}
    >
      {children}
    </p>
  );
};

CardDescription.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
};

CardContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const CardFooter = ({ children, className, ...props }) => {
  return (
    <div
      className={cn('mt-6 pt-4 border-t border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};

CardFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
