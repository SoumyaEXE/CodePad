import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { ALL_LANGUAGES, CATEGORIES, getLanguagesByCategory } from '../utils/languages';

/* ── Devicon CDN map — real language logos ────────── */
const DEVICON_MAP = {
  python: 'python-original',
  java: 'java-original',
  c: 'c-original',
  cpp: 'cplusplus-original',
  javascript: 'javascript-original',
  lua: 'lua-original',
  php: 'php-original',
  nodejs: 'nodejs-original',
  csharp: 'csharp-original',
  bash: 'bash-original',
  kotlin: 'kotlin-original',
  ruby: 'ruby-original',
  scala: 'scala-original',
  typescript: 'typescript-original',
  haskell: 'haskell-original',
  elixir: 'elixir-original',
  erlang: 'erlang-original',
  fsharp: 'fsharp-original',
  fortran: 'fortran-original',
  perl: 'perl-original',
  go: 'go-original',
  r: 'r-original',
  clojure: 'clojure-original',
  rust: 'rust-original',
  swift: 'swift-original',
  dart: 'dart-original',
  julia: 'julia-original',
  zig: 'zig-original',
  nim: 'nim-original',
  ocaml: 'ocaml-original',
  objectivec: 'objectivec-plain',
  groovy: 'groovy-original',
  html: 'html5-original',
  react: 'react-original',
  vuejs: 'vuejs-original',
  angular: 'angularjs-original',
  bootstrap: 'bootstrap-original',
  tailwindcss: 'tailwindcss-original',
  jquery: 'jquery-original',
  d3js: 'd3js-original',
  mysql: 'mysql-original',
  postgresql: 'postgresql-original',
  mongodb: 'mongodb-original',
  redis: 'redis-original',
  sqlite: 'sqlite-original',
  oracle: 'oracle-original',
  microsoftsqlserver: 'microsoftsqlserver-plain',
  cassandra: 'cassandra-original',
  firebase: 'firebase-plain',
  crystal: 'crystal-original',
  coffeescript: 'coffeescript-original',
};

const DEVICON_CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

function getDeviconUrl(langId) {
  const icon = DEVICON_MAP[langId];
  if (!icon) return null;
  const folder = icon.split('-')[0];
  return `${DEVICON_CDN}/${folder}/${icon}.svg`;
}

/* ── Category SVG icons ── */
function CodeSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M5.5 4L1.5 8l4 4M10.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WebSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="8" cy="8" rx="3" ry="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 8h13" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function DbSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <ellipse cx="8" cy="4" rx="5.5" ry="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2.5 4v8c0 1.1 2.46 2 5.5 2s5.5-.9 5.5-2V4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2.5 8c0 1.1 2.46 2 5.5 2s5.5-.9 5.5-2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

const CATEGORY_ICONS = {
  programming: <CodeSvg />,
  web: <WebSvg />,
  database: <DbSvg />,
};

/* ── Language icon — devicon img or fallback badge ─── */

function LangIcon({ langId, label, color, size = 24 }) {
  const url = getDeviconUrl(langId);

  if (url) {
    return (
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <img
          src={url}
          alt={label}
          width={size}
          height={size}
          style={{ objectFit: 'contain' }}
          loading="lazy"
        />
      </Box>
    );
  }

  // Fallback: colored text badge
  const abbr = label.length <= 3
    ? label
    : label.replace(/[^A-Z0-9#+-]/gi, '').slice(0, 3) || label.slice(0, 2);

  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const fg = lum > 0.55 ? '#1a1a2e' : '#ffffff';

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '5px',
        bgcolor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Typography
        sx={{
          fontSize: size * 0.36,
          fontWeight: 700,
          color: fg,
          lineHeight: 1,
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '-0.02em',
        }}
      >
        {abbr}
      </Typography>
    </Box>
  );
}

/* ── Single language card ───────────────────────────── */

function LangCard({ lang, isSelected, onSelect }) {
  return (
    <Box
      onClick={() => onSelect(lang.id)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 1,
        py: 0.6,
        borderRadius: '8px',
        cursor: 'pointer',
        bgcolor: isSelected ? 'primary.main' : 'transparent',
        border: '1px solid',
        borderColor: isSelected ? 'primary.main' : 'divider',
        transition: 'all 120ms ease',
        '&:hover': {
          bgcolor: isSelected ? 'primary.main' : 'action.hover',
          borderColor: isSelected ? 'primary.main' : 'primary.light',
          transform: 'translateY(-1px)',
        },
        minWidth: 0,
      }}
    >
      <LangIcon langId={lang.id} label={lang.label} color={lang.color} size={22} />
      <Typography
        noWrap
        sx={{
          fontSize: 12,
          fontWeight: isSelected ? 600 : 400,
          color: isSelected ? '#fff' : 'text.primary',
          lineHeight: 1.2,
        }}
      >
        {lang.label}
      </Typography>
    </Box>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  LANGUAGE SELECTOR MODAL                               */
/* ═══════════════════════════════════════════════════════ */

export default function LanguageModal({ open, onClose, currentLangId, onSelectLanguage }) {
  const [search, setSearch] = useState('');

  /* Filter languages by search */
  const filteredByCategory = useMemo(() => {
    const q = search.toLowerCase().trim();
    return CATEGORIES.map((cat) => {
      let langs = getLanguagesByCategory(cat.key);
      if (q) {
        langs = langs.filter(
          (l) =>
            l.label.toLowerCase().includes(q) ||
            l.id.toLowerCase().includes(q) ||
            l.ext.toLowerCase().includes(q),
        );
      }
      return { ...cat, langs };
    }).filter((cat) => cat.langs.length > 0);
  }, [search]);

  const totalResults = filteredByCategory.reduce((s, c) => s + c.langs.length, 0);

  const handleSelect = (langId) => {
    onSelectLanguage(langId);
    onClose();
    setSearch('');
  };

  return (
    <Dialog
      open={open}
      onClose={() => { onClose(); setSearch(''); }}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          backgroundImage: 'none',
          borderRadius: '12px',
          maxHeight: '80vh',
          border: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      {/* ── Header ──────────────────────────────── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
          pt: 2,
          pb: 1,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Select Language
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              color: 'text.secondary',
              mt: 0.25,
            }}
          >
            {ALL_LANGUAGES.length} languages available
          </Typography>
        </Box>
        <IconButton
          onClick={() => { onClose(); setSearch(''); }}
          size="small"
          sx={{ color: 'text.secondary' }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* ── Search ──────────────────────────────── */}
      <Box sx={{ px: 2.5, pb: 1 }}>
        <TextField
          autoFocus
          fullWidth
          size="small"
          placeholder="Search languages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              fontSize: 13,
              '& fieldset': { borderColor: 'divider' },
              '&:hover fieldset': { borderColor: 'primary.light' },
              '&.Mui-focused fieldset': { borderColor: 'primary.main' },
            },
          }}
        />
      </Box>

      {/* ── Content ─────────────────────────────── */}
      <DialogContent
        sx={{
          px: 2.5,
          pt: 0.5,
          pb: 2.5,
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'action.disabled',
            borderRadius: 3,
          },
        }}
      >
        {totalResults === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
              No languages found for "{search}"
            </Typography>
          </Box>
        )}

        {filteredByCategory.map((cat) => (
          <Box key={cat.key} sx={{ mb: 2.5 }}>
            {/* Category header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                mb: 1,
                pb: 0.5,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ color: 'text.secondary', display: 'flex' }}>
                {CATEGORY_ICONS[cat.key] || <CodeSvg />}
              </Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'primary.main',
                  letterSpacing: '0.02em',
                }}
              >
                {cat.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: 11,
                  color: 'text.secondary',
                  ml: 0.5,
                }}
              >
                ({cat.langs.length})
              </Typography>
            </Box>

            {/* Language grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 0.75,
              }}
            >
              {cat.langs.map((lang) => (
                <LangCard
                  key={lang.id}
                  lang={lang}
                  isSelected={lang.id === currentLangId}
                  onSelect={handleSelect}
                />
              ))}
            </Box>
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
}
