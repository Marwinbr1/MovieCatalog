import React from 'react';
import '../index.css';

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) {
  const classes = `btn btn-${variant} btn-${size} ${className}`.trim();

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
