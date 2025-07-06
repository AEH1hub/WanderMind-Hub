import React from 'react';

const ChatBubbleLeftRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72.372a3.527 3.527 0 01-3.14-1.592l-1.146-2.047a3.527 3.527 0 00-3.14-1.592l-3.72-.372c-1.133-.112-1.98-.988-1.98-2.193V10.608c0-.97.616-1.813 1.5-2.097L6.75 8.25m.75 12l-3.75-3.75" 
    />
  </svg>
);

export default ChatBubbleLeftRightIcon;
