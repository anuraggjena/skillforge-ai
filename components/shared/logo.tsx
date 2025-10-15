import React from 'react';

// The 'SVGProps' type allows us to pass standard SVG attributes like 'className'
export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      height="48" 
      viewBox="0 0 44 48" 
      width="44" 
      xmlns="http://www.w3.org/2000/svg"
      {...props} // Pass down any props like className, width, height
    >
      <g fill="currentColor"> {/* This is the key change! */}
        <path d="m16 8 5.0912 10.9088 10.9088 5.0912-10.9088 5.0912-5.0912 10.9088-5.0912-10.9088-10.9088-5.0912 10.9088-5.0912z" />
        <path d="m20.0469 31.3286 6.3539-1.0932 3.6 9.7646 3.6-9.7646 10.2565 1.7646-6.6564-8 6.6564-8-10.2565 1.7646-3.6-9.7646-3.6 9.7646-6.3539-1.0932 1.0442 2.2374 10.9088 5.0912-10.9088 5.0912z" opacity=".5" />
      </g>
    </svg>
  );
}