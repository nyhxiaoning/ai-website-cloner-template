import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

export function MeanderPattern(props: IconProps) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <pattern id="meander" width="40" height="20" patternUnits="userSpaceOnUse">
          <path d="M 0,10 L 15,10 L 15,3 L 5,3 L 5,17 L 25,17 L 25,7 L 10,7 L 10,13 L 20,13 L 20,10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" strokeLinecap="square" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#meander)" />
    </svg>
  );
}

export function PhilosopiaBadge(props: IconProps) {
  return (
    <svg viewBox="0 0 300 50" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 45 L150 5 L300 45 Z" fill="currentColor" opacity="0.15" />
      <path d="M0 45 L150 5 L300 45 Z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
      <line x1="0" y1="45" x2="300" y2="45" stroke="currentColor" strokeWidth="5" />
      <circle cx="150" cy="45" r="4" fill="currentColor" />
    </svg>
  );
}

export function ColumnDecoration(props: IconProps) {
  return (
    <svg viewBox="0 0 100 800" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="10" y="30" width="80" height="15" rx="2" />
      <circle cx="20" cy="65" r="16" fill="none" stroke="currentColor" strokeWidth="6" />
      <circle cx="20" cy="65" r="8" />
      <circle cx="80" cy="65" r="16" fill="none" stroke="currentColor" strokeWidth="6" />
      <circle cx="80" cy="65" r="8" />
    </svg>
  );
}

export function AcademicSeal(props: IconProps) {
  return (
    <svg width="450" height="450" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 50,15 L 20,40 L 20,80 L 80,80 L 80,40 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="35" y1="40" x2="35" y2="80" stroke="currentColor" strokeWidth="1.5" />
      <line x1="50" y1="40" x2="50" y2="80" stroke="currentColor" strokeWidth="1.5" />
      <line x1="65" y1="40" x2="65" y2="80" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="3" fill="currentColor" />
    </svg>
  );
}

export function ScrollIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
      <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
      <path d="M10 5h5" /><path d="M10 9h5" /><path d="M10 13h5" />
    </svg>
  );
}

export function SwordsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
      <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
      <line x1="13" x2="19" y1="19" y2="13" />
      <line x1="16" x2="20" y1="16" y2="20" />
      <line x1="19" x2="21" y1="13" y2="15" />
      <polyline points="14.5 17.5 18 21 21 21 21 18 17.5 14.5" />
      <polyline points="9.5 6.5 6 3 3 3 3 6 6.5 9.5" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M18 7a4 4 0 0 0-4-4" />
      <circle cx="9" cy="9" r="4" />
    </svg>
  );
}

export function HelpCircleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export function BookOpenIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export function ConnectionLines(props: IconProps) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <marker id="arrow-succession" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>
    </svg>
  );
}
