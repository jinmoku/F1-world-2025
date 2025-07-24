import React from 'react';

export const Button = ({ children, ...props }) => (
  <button
    {...props}
    className={`bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 ${props.className}`}
  >
    {children}
  </button>
);
