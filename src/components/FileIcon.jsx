import React from 'react';

/* ── Shared style for text badges ──────────────── */

function Badge({ text, bg, fg, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <rect x="0.5" y="0.5" width="15" height="15" rx="3" fill={bg} />
      <text
        x="8"
        y="11.2"
        textAnchor="middle"
        fontSize={text.length > 2 ? '6.5' : '7.5'}
        fontWeight="700"
        fill={fg}
        fontFamily="Inter, system-ui, sans-serif"
      >
        {text}
      </text>
    </svg>
  );
}

/* ── Language-specific SVG icons ───────────────── */

function PythonIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M7.87 1C5.58 1 4.5 2.15 4.5 3.74V5.5h3.5v.75H3.06C1.83 6.25 1 7.47 1 9.08c0 1.61.83 2.67 2.06 2.67H4.5V9.97c0-1.2.95-2.22 2.12-2.22h3.76c.98 0 1.62-.7 1.62-1.68V3.74c0-.98-.65-2.12-2.31-2.56A8.4 8.4 0 0 0 7.87 1ZM6.15 2.43a.67.67 0 1 1 0 1.34.67.67 0 0 1 0-1.34Z" fill="#3776AB" />
      <path d="M8.13 15c2.29 0 3.37-1.15 3.37-2.74V10.5H8v-.75h4.94c1.23 0 2.06-1.22 2.06-2.83 0-1.61-.83-2.67-2.06-2.67H11.5v1.78c0 1.2-.95 2.22-2.12 2.22H5.62c-.98 0-1.62.7-1.62 1.68v2.33c0 .98.65 2.12 2.31 2.56.83.18 1.64.18 1.82.18ZM9.85 13.57a.67.67 0 1 1 0-1.34.67.67 0 0 1 0 1.34Z" fill="#FFD43B" />
    </svg>
  );
}

function JavaScriptIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <rect width="16" height="16" rx="2.5" fill="#F7DF1E" />
      <path d="M4.5 12.5c.35.6.67.83 1.33.83.79 0 1.3-.4 1.3-1.52V7H8.6v4.84c0 2.05-1.2 2.66-2.55 2.66-.94 0-1.6-.4-2.05-1l.5-1Z" fill="#323330" />
      <path d="M9.5 12.32c.44.72 1.02 1 1.76 1 .74 0 1.21-.37 1.21-.88 0-.6-.48-.83-1.3-1.18l-.45-.19c-1.28-.55-2.13-1.23-2.13-2.68 0-1.33 1.02-2.35 2.6-2.35.84 0 1.57.23 2.14.95l-1.17.95c-.26-.46-.54-.64-.97-.64-.44 0-.72.28-.72.64 0 .45.28.63 1.05.95l.45.19c1.51.65 2.36 1.31 2.36 2.79C14.33 13.5 13.1 14.5 11.34 14.5c-1.07 0-2.06-.38-2.67-1.23l.83-.95Z" fill="#323330" />
    </svg>
  );
}

function TypeScriptIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <rect width="16" height="16" rx="2.5" fill="#3178C6" />
      <path d="M3.5 8.2h4.3v1.1H6.3v4.2H5V9.3H3.5V8.2Z" fill="#fff" />
      <path d="M8.4 13.1v-1.15c.3.24.62.42.96.53.34.11.67.17.99.17.24 0 .44-.02.6-.08a.82.82 0 0 0 .37-.2.6.6 0 0 0 .16-.27c.03-.1.05-.2.05-.3 0-.15-.04-.28-.12-.4a1.15 1.15 0 0 0-.3-.32c-.13-.1-.27-.2-.44-.28l-.5-.25a3.6 3.6 0 0 1-.57-.35 2 2 0 0 1-.42-.42 1.73 1.73 0 0 1-.26-.5 2.03 2.03 0 0 1-.09-.62c0-.3.06-.56.18-.78.12-.22.28-.4.49-.55.2-.15.44-.26.71-.33.27-.07.56-.11.87-.11.16 0 .33.01.5.04.17.02.33.06.49.11v1.08a1.7 1.7 0 0 0-.84-.24c-.22 0-.41.03-.57.08a.87.87 0 0 0-.35.2.6.6 0 0 0-.17.26.79.79 0 0 0-.04.26c0 .12.03.23.08.33.06.1.14.19.25.27.11.08.23.17.38.25l.5.26c.22.11.42.23.6.37.17.13.32.28.44.44.12.17.22.35.28.55.07.2.1.43.1.68 0 .32-.06.6-.19.82a1.6 1.6 0 0 1-.5.56c-.21.14-.46.25-.74.32-.28.07-.58.1-.9.1a4.2 4.2 0 0 1-.56-.04 3.4 3.4 0 0 1-.53-.13Z" fill="#fff" />
    </svg>
  );
}

function HtmlIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M1 1l1.27 14L8 16l5.73-1L15 1H1Z" fill="#E44D26" />
      <path d="M8 14.53l4.63-1.28.92-10.3H8v11.58Z" fill="#F16529" />
      <path d="M8 5.86H5.62l-.16-1.8H8V2.3H3.24l.04.45.42 4.67H8V5.86Z" fill="#EBEBEB" />
      <path d="M8 10.38l-.02.01-2-.54-.13-1.44H4.1l.25 2.84 3.63 1.01.02-.01v-1.86Z" fill="#EBEBEB" />
      <path d="M8 5.86v1.56h2.2l-.21 2.33-2 .54v1.86l3.65-1.01.03-.29.42-4.67.04-.32H8Z" fill="#fff" />
      <path d="M8 2.3v1.76h4.53l.04-.38.08-.93.04-.45H8Z" fill="#fff" />
    </svg>
  );
}

function CssIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M1 1l1.27 14L8 16l5.73-1L15 1H1Z" fill="#1572B6" />
      <path d="M8 14.53l4.63-1.28.92-10.3H8v11.58Z" fill="#33A9DC" />
      <path d="M8 7.42H5.87l-.14-1.56H8V4.06H3.48l.04.45.37 4.12H8V7.42Z" fill="#EBEBEB" />
      <path d="M8 10.52l-.01 0-1.78-.48-.11-1.28H4.37l.22 2.52L8 12.35v-1.83Z" fill="#EBEBEB" />
      <path d="M8 7.42v1.21h1.95L9.78 10l-1.78.48v1.83l3.28-.91.02-.28.37-4.12.04-.45H8v1.56Z" fill="#fff" />
      <path d="M8 4.06v1.8h4.29l.03-.38.08-.93.04-.49H8Z" fill="#fff" />
    </svg>
  );
}

function JavaIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M5.8 11.8s-.7.4.5.5c1.5.2 2.2.1 3.8-.1 0 0 .4.3 1 .5-3.6 1.5-8.1-.1-5.3-.9Z" fill="#5382A1" />
      <path d="M5.3 10.3s-.8.6.4.7c1.6.1 2.8.2 4.9-.2 0 0 .3.3.8.4-4.4 1.3-9.2.1-6.1-.9Z" fill="#5382A1" />
      <path d="M8.7 7.5c.9 1.1-.3 2-.3 2s2.4-1.2 1.3-2.8c-1-1.4-1.8-2.1 2.4-4.6 0 0-6.6 1.7-3.4 5.4Z" fill="#E76F00" />
      <path d="M12.8 12.9s.5.4-.6.7c-2 .6-8.3.8-10 0-.6-.3.6-.6 1-.7.4-.1.6-.1.6-.1-.7-.5-4.4 1-1.9 1.4 6.9 1.1 12.5-.5 10.9-1.3Z" fill="#5382A1" />
      <path d="M6.2 8.7s-3.1.7-1.1 1c.8.1 2.5.1 4-.1 1.2-.1 2.5-.3 2.5-.3s-.4.2-.8.4c-3.1.8-9 .4-7.3-.4 1.4-.7 2.7-.6 2.7-.6Z" fill="#5382A1" />
      <path d="M11.3 11.2c3.1-1.6 1.7-3.2.7-3 -.3.1-.4.1-.4.1s.1-.2.3-.2c2.2-.8 3.8 2.3-.7 3.5 0 0 .1 0 .1-.4Z" fill="#5382A1" />
      <path d="M9.8 1s1.7 1.7-1.6 4.4c-2.7 2.1-.6 3.3 0 4.7-1.6-1.4-2.7-2.7-2-3.8C7.3 4.7 10.5 3.9 9.8 1Z" fill="#E76F00" />
    </svg>
  );
}

/* ── Icon dispatcher ──────────────────────────────── */

const FALLBACK_ICONS = {
  cpp:        { text: 'C+', bg: '#659AD2', fg: '#fff' },
  c:          { text: 'C',  bg: '#A8B9CC', fg: '#222' },
  json:       { text: '{}', bg: '#5B8C5A', fg: '#fff' },
  markdown:   { text: 'MD', bg: '#555',    fg: '#fff' },
  ruby:       { text: 'RB', bg: '#CC342D', fg: '#fff' },
  go:         { text: 'GO', bg: '#00ADD8', fg: '#fff' },
  rust:       { text: 'RS', bg: '#CE422B', fg: '#fff' },
};

export function FileIcon({ language, size = 16 }) {
  switch (language) {
    case 'python':     return <PythonIcon size={size} />;
    case 'javascript': return <JavaScriptIcon size={size} />;
    case 'typescript': return <TypeScriptIcon size={size} />;
    case 'html':       return <HtmlIcon size={size} />;
    case 'css':        return <CssIcon size={size} />;
    case 'java':       return <JavaIcon size={size} />;
    default: {
      const fb = FALLBACK_ICONS[language];
      if (fb) return <Badge text={fb.text} bg={fb.bg} fg={fb.fg} size={size} />;
      // generic file icon
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <path d="M4 1.5h5.5L13 5v9.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1Z" stroke="#6B7280" strokeWidth="1" fill="none" />
          <path d="M9.5 1.5V5H13" stroke="#6B7280" strokeWidth="1" fill="none" />
        </svg>
      );
    }
  }
}

/* ── Folder icon ─────────────────────────────────── */

export function FolderIcon({ open = false, size = 16 }) {
  if (open) {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <path d="M1.5 3.5A1 1 0 0 1 2.5 2.5H6l1.5 1.5h6a1 1 0 0 1 1 1V5H3L1.5 12V3.5Z" fill="#DCAB5E" />
        <path d="M2 6h11.5a1 1 0 0 1 .97 1.24l-1.5 6A1 1 0 0 1 12 14H2.5a1 1 0 0 1-.97-.76L.5 7.24A1 1 0 0 1 1.47 6H2Z" fill="#E8BE6A" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M1.5 3A1 1 0 0 1 2.5 2H6l1.5 1.5H13.5a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1H2.5a1 1 0 0 1-1-1V3Z" fill="#DCAB5E" />
    </svg>
  );
}

/* ── Chevron (▶ / ▼) ─────────────────────────────── */

export function ChevronIcon({ expanded, size = 10 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        flexShrink: 0,
        transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
        transition: 'transform 120ms ease',
      }}
    >
      <path d="M3 1.5L7.5 5 3 8.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
