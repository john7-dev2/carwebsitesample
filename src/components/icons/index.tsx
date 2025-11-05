// Icon components - Replace SVG paths with Noun Project icons
import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

// Base Icon wrapper
const IconWrapper: React.FC<{ children: React.ReactNode } & IconProps> = ({ 
  children, 
  size = 24, 
  className = '' 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
};

// Header & Navigation Icons
export const Phone: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </IconWrapper>
);

export const Menu: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </IconWrapper>
);

export const X: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </IconWrapper>
);

// Contact Icons
export const Mail: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </IconWrapper>
);

export const MapPin: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </IconWrapper>
);

export const Clock: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </IconWrapper>
);

export const Send: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </IconWrapper>
);

// Social Media Icons
export const Facebook: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </IconWrapper>
);

export const Instagram: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </IconWrapper>
);

export const Linkedin: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </IconWrapper>
);

// Service Icons
export const Search: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </IconWrapper>
);

export const Settings: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H5m13.2 5.2l-4.2-4.2m0-6l4.2-4.2"></path>
  </IconWrapper>
);

export const Shield: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </IconWrapper>
);

export const Crown: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M2 19h20"></path>
    <path d="m2 19 3-7 4 3 4-6 4 6 4-3 3 7"></path>
  </IconWrapper>
);

// Equipment Icons
export const Plug: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 2v4m-2-2v4m4-4v4m-6 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zm4 12v4"></path>
  </IconWrapper>
);

export const Ruler: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0z"></path>
    <path d="m14.5 12.5 2-2m-4-4 2-2m-4 10 2-2m-4-4 2-2"></path>
  </IconWrapper>
);

export const Gauge: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 2v4m-8 6H0m4.22-5.78L1.93 3.93M19.78 6.22l2.29-2.29M24 12h-4m-8 10v-6l-4-4"></path>
    <circle cx="12" cy="12" r="10"></circle>
  </IconWrapper>
);

export const Camera: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </IconWrapper>
);

export const Battery: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect>
    <line x1="23" y1="13" x2="23" y2="11"></line>
  </IconWrapper>
);

export const Thermometer: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
  </IconWrapper>
);

export const Eye: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </IconWrapper>
);

export const ClipboardList: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <path d="M12 11h4m-4 4h4m-6-4h.01M10 15h.01"></path>
  </IconWrapper>
);

// Process Icons
export const Wrench: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
  </IconWrapper>
);

export const FileText: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </IconWrapper>
);

export const Calendar: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </IconWrapper>
);

// Feature Icons
export const UserCheck: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <polyline points="17 11 19 13 23 9"></polyline>
  </IconWrapper>
);

export const Cog: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 1v6m0 6v6"></path>
    <path d="m5.64 5.64 4.24 4.24m6.24 0 4.24-4.24m-4.24 12.72 4.24 4.24m-16.72-4.24 4.24-4.24"></path>
  </IconWrapper>
);

export const FileCheck: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <path d="m9 15 2 2 4-4"></path>
  </IconWrapper>
);

export const BookOpen: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </IconWrapper>
);

export const Package: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </IconWrapper>
);

export const CheckCircle: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </IconWrapper>
);

export const Check: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </IconWrapper>
);

// Vehicle Icons
export const Car: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10l-1.5-4.5c-.3-.8-1-1.5-2-1.5h-5c-.9 0-1.6.7-2 1.5L4 10s-2.7.6-4.5 1.1c-.8.2-1.5 1-1.5 1.9v3c0 .6.4 1 1 1h2"></path>
    <circle cx="7" cy="17" r="2"></circle>
    <path d="M9 17h6"></path>
    <circle cx="17" cy="17" r="2"></circle>
  </IconWrapper>
);

export const User: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </IconWrapper>
);

export const MessageSquare: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </IconWrapper>
);
