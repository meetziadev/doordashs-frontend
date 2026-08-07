import React from 'react';

// Reusable custom SVG icons with clean, modern vector paths matching high-end design
export const FreeShippingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

export const PremiumQualityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

export const EasyReturnsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" />
    <path d="m21 8-9-6-9 6" />
    <path d="M12 22V8" />
    <path d="M16 12a4 4 0 0 0-8 0" />
    <polyline points="10 10 8 12 10 14" />
  </svg>
);

export const SecurePaymentsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
