import { getLangById } from '../utils/languages';

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

/* ── Dispatcher ───────────────────────────────────── */

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
  const langConfig = getLangById(language);
  
  if (langConfig?.icon) {
    return (
      <img 
        src={langConfig.icon} 
        alt={language} 
        style={{ 
          width: size, 
          height: size, 
          display: 'block', 
          objectFit: 'contain',
          filter: langConfig.id === 'bun' ? 'brightness(0.9)' : 'none' // special case for white icons on dark
        }} 
      />
    );
  }

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
