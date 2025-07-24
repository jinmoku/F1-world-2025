import React from 'react';

export const Input = ({ ...props }) => (
  <input
    {...props}
    className={`border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-400 ${props.className}`}
  />
);
