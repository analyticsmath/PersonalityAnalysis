import React from 'react';

/** Screen-reader-only text; keep concise. */
export default function VisuallyHidden({ children, as: Component = 'span', ...rest }) {
  return (
    <Component className="visually-hidden" {...rest}>
      {children}
    </Component>
  );
}
