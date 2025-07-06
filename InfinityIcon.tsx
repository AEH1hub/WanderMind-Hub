import React from 'react';

const InfinityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}>
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M13.5 10.5H21A7.5 7.5 0 007.5 3v2.25m0 0L3 7.5m4.5-2.25L7.5 3" 
    />
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M10.5 13.5H3A7.5 7.5 0 0016.5 21v-2.25m0 0L21 16.5m-4.5 2.25L16.5 21" 
    />
  </svg>
);

export default InfinityIcon;
