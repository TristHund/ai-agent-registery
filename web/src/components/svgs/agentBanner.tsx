import React from 'react';

const AgentBanner: React.FC = () => {
  return (
    <div className="absolute inset-0 -top-20 flex items-center justify-center opacity-70">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" className="w-full max-w-5xl">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity: 0.2}} />
            <stop offset="100%" style={{stopColor: '#1D4ED8', stopOpacity: 0.1}} />
          </linearGradient>
          <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#2563EB', stopOpacity: 0.15}} />
            <stop offset="100%" style={{stopColor: '#1E40AF', stopOpacity: 0.05}} />
          </linearGradient>
          <radialGradient id="grad3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity: 0.1}} />
            <stop offset="100%" style={{stopColor: '#1E40AF', stopOpacity: 0}} />
          </radialGradient>
        </defs>

        <rect width="800" height="400" fill="none" />
        
        <g opacity="0.3">
          <path d="M100,200 Q400,50 700,200" stroke="#3B82F6" fill="none" strokeWidth="1" />
          <path d="M100,180 Q400,330 700,180" stroke="#3B82F6" fill="none" strokeWidth="1" />
          <path d="M100,220 Q400,150 700,220" stroke="#3B82F6" fill="none" strokeWidth="1" />
        </g>

        <circle cx="200" cy="200" r="60" fill="url(#grad1)" opacity="0.6">
          <animate attributeName="r" values="60;65;60" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="600" cy="200" r="80" fill="url(#grad2)" opacity="0.6">
          <animate attributeName="r" values="80;85;80" dur="5s" repeatCount="indefinite" />
        </circle>

        <circle cx="400" cy="200" r="150" fill="url(#grad3)" opacity="0.4">
          <animate attributeName="r" values="150;160;150" dur="6s" repeatCount="indefinite" />
        </circle>

        <g opacity="0.4">
          <circle cx="300" cy="150" r="2" fill="#60A5FA">
            <animate attributeName="cy" values="150;140;150" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="500" cy="250" r="2" fill="#60A5FA">
            <animate attributeName="cy" values="250;260;250" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="180" r="2" fill="#60A5FA">
            <animate attributeName="cy" values="180;170;180" dur="5s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export {AgentBanner};
