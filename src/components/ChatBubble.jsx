import React, { useState } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

/* ── Theme color helpers ──────────────────────────────── */
function useAccentColors() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return {
    isDark,
    // Use actual theme primary colors (indigo)
    accent: isDark ? '#6366F1' : '#4F46E5',
    accentLight: isDark ? '#818CF8' : '#6366F1',
    accentText: isDark ? '#A5B4FC' : '#4338CA',
    accentSubtle: isDark ? 'rgba(99,102,241,0.1)' : 'rgba(79,70,229,0.06)',
    accentBorder: isDark ? 'rgba(99,102,241,0.25)' : 'rgba(79,70,229,0.15)',
    accentBorderLight: isDark ? 'rgba(99,102,241,0.15)' : 'rgba(79,70,229,0.1)',
    accentGlow: isDark ? 'rgba(99,102,241,0.2)' : 'rgba(79,70,229,0.1)',
  };
}

/* ── Code Block with language label + copy button ─────────── */
function CodeBlock({ inline, className, children, canApplyFix, onApplyFix, isDark, colors, ...props }) {
  const [applied, setApplied] = useState(false);
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const codeContent = String(children).replace(/\n$/, '');

  const handleApply = () => { onApplyFix(codeContent); setApplied(true); setTimeout(() => setApplied(false), 2000); };
  const handleCopy = async () => { try { await navigator.clipboard.writeText(codeContent); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {} };

  if (!inline && match) {
    const lang = match[1];
    return (
      <Box sx={{ my: 1.5, position: 'relative' }}>
        <Box sx={{
          borderRadius: '8px', overflow: 'hidden',
          border: '1px solid', borderColor: colors.accentBorder,
          background: isDark
            ? 'linear-gradient(135deg, rgba(15,15,25,0.95), rgba(16,18,30,0.95))'
            : 'rgba(248, 248, 255, 0.9)',
        }}>
          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: 1.25, py: 0.5,
            borderBottom: '1px solid', borderColor: colors.accentBorderLight,
            background: isDark ? 'rgba(99,102,241,0.06)' : 'rgba(79,70,229,0.04)',
          }}>
            <Typography sx={{
              fontSize: 10, fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: colors.accent,
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              {lang}
            </Typography>
            <Button size="small" onClick={handleCopy}
              startIcon={copied ? <CheckIcon sx={{ fontSize: '12px !important' }} /> : <ContentCopyIcon sx={{ fontSize: '12px !important' }} />}
              sx={{
                fontSize: 10, textTransform: 'none', py: 0, px: 0.75, minWidth: 'auto',
                color: copied ? '#34d399' : (isDark ? '#8b8ba0' : '#6b7280'),
                '&:hover': { color: colors.accentLight, background: 'transparent' },
              }}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </Box>
          <SyntaxHighlighter
            style={isDark ? atomOneDark : atomOneLight}
            language={lang} PreTag="div"
            customStyle={{ margin: 0, padding: '14px', fontSize: '12px', fontFamily: "'JetBrains Mono', monospace", background: 'transparent', lineHeight: 1.7 }}
            {...props}
          >
            {codeContent}
          </SyntaxHighlighter>
        </Box>
        {canApplyFix && (
          <Box sx={{ mt: 0.75, display: 'flex', justifyContent: 'flex-start' }}>
            <Button variant="outlined" size="small" onClick={handleApply}
              startIcon={applied ? <CheckIcon fontSize="small"/> : null}
              sx={{
                fontSize: 11, textTransform: 'none', py: 0.25, px: 1.25, borderRadius: '6px',
                borderColor: applied ? 'success.main' : colors.accentBorder,
                color: applied ? 'success.main' : colors.accentLight,
                '&:hover': { borderColor: colors.accent, bgcolor: colors.accentSubtle },
              }}
            >
              {applied ? 'Applied' : '✨ Apply Fix'}
            </Button>
          </Box>
        )}
      </Box>
    );
  }

  // Inline code
  return (
    <code className={className} {...props} style={{
      background: isDark
        ? 'rgba(99, 102, 241, 0.12)'
        : 'rgba(79, 70, 229, 0.08)',
      color: isDark ? '#A5B4FC' : '#4338CA',
      padding: '2px 6px', borderRadius: '4px',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '11.5px', fontWeight: 500,
      border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(79,70,229,0.1)'}`,
    }}>
      {children}
    </code>
  );
}

/* ── Markdown component overrides ─────────────────────────── */
function buildMarkdownComponents(colors, canApplyFix, onApplyFix) {
  const { isDark, accent, accentLight, accentText, accentSubtle } = colors;

  return {
    code(props) {
      return <CodeBlock {...props} isDark={isDark} colors={colors} canApplyFix={canApplyFix} onApplyFix={onApplyFix} />;
    },
    h1({ children }) {
      return (
        <Typography component="h1" sx={{
          fontSize: 18, fontWeight: 700, mt: 1.5, mb: 1,
          color: accentLight, lineHeight: 1.3, letterSpacing: '-0.01em',
          fontFamily: "'Inter', sans-serif",
        }}>
          {children}
        </Typography>
      );
    },
    h2({ children }) {
      return (
        <Typography component="h2" sx={{
          fontSize: 15, fontWeight: 700, mt: 1.5, mb: 0.75,
          color: accentLight, lineHeight: 1.35,
          fontFamily: "'Inter', sans-serif",
          display: 'flex', alignItems: 'center', gap: 0.5,
          '&::before': {
            content: '""', width: 3, height: '1em', borderRadius: 2,
            background: `linear-gradient(180deg, ${accent}, transparent)`,
            flexShrink: 0,
          },
        }}>
          {children}
        </Typography>
      );
    },
    h3({ children }) {
      return (
        <Typography component="h3" sx={{
          fontSize: 13.5, fontWeight: 650, mt: 1.25, mb: 0.5,
          color: isDark ? '#C7D2FE' : '#3730A3', lineHeight: 1.35,
          fontFamily: "'Inter', sans-serif",
        }}>
          {children}
        </Typography>
      );
    },
    p({ children }) {
      return (
        <Typography component="p" sx={{
          fontSize: 12.5, lineHeight: 1.7, mt: 0, mb: 0.75,
          color: 'text.primary', fontFamily: "'Inter', sans-serif",
          '&:last-child': { mb: 0 },
        }}>
          {children}
        </Typography>
      );
    },
    strong({ children }) {
      return <Box component="strong" sx={{ fontWeight: 650, color: isDark ? '#E0E7FF' : '#312E81' }}>{children}</Box>;
    },
    em({ children }) {
      return <Box component="em" sx={{ fontStyle: 'italic', color: accentText }}>{children}</Box>;
    },
    a({ href, children }) {
      return (
        <Box component="a" href={href} target="_blank" rel="noopener noreferrer"
          sx={{
            color: accent, textDecoration: 'none',
            borderBottom: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : 'rgba(79,70,229,0.2)'}`,
            transition: 'all 150ms ease', fontWeight: 500,
            '&:hover': { color: accentLight, borderBottomColor: accentLight },
          }}
        >
          {children}
        </Box>
      );
    },
    ul({ children }) {
      return <Box component="ul" sx={{ pl: 0, my: 0.75, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0.25 }}>{children}</Box>;
    },
    ol({ children }) {
      return <Box component="ol" sx={{ pl: 0, my: 0.75, listStyle: 'none', counterReset: 'md-ol', display: 'flex', flexDirection: 'column', gap: 0.25 }}>{children}</Box>;
    },
    li({ children, node }) {
      const isOrdered = node?.parentNode?.tagName === 'ol';
      return (
        <Box component="li" sx={{
          display: 'flex', alignItems: 'flex-start', gap: 0.75,
          fontSize: 12.5, lineHeight: 1.7, color: 'text.primary',
          fontFamily: "'Inter', sans-serif",
          ...(isOrdered && { counterIncrement: 'md-ol' }),
          '&::before': isOrdered
            ? { content: 'counter(md-ol) "."', color: accent, fontWeight: 700, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", minWidth: '18px', flexShrink: 0, mt: '1px' }
            : { content: '"•"', color: accent, fontWeight: 700, fontSize: 14, lineHeight: '1.55', minWidth: '12px', flexShrink: 0 },
        }}>
          <Box component="span" sx={{ flex: 1 }}>{children}</Box>
        </Box>
      );
    },
    blockquote({ children }) {
      return (
        <Box sx={{
          borderLeft: `3px solid ${accent}`, background: accentSubtle,
          pl: 1.5, pr: 1, py: 0.75, my: 1, borderRadius: '0 6px 6px 0',
          '& p': { mb: '0 !important' },
        }}>
          {children}
        </Box>
      );
    },
    hr() {
      return (
        <Box sx={{
          my: 1.5, height: '1px', border: 'none',
          background: isDark
            ? 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(79,70,229,0.15), transparent)',
        }} />
      );
    },
    table({ children }) {
      return (
        <Box sx={{ overflowX: 'auto', my: 1 }}>
          <Box component="table" sx={{
            width: '100%', borderCollapse: 'collapse', fontSize: 11.5,
            fontFamily: "'Inter', sans-serif",
            border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : 'rgba(79,70,229,0.12)'}`,
            borderRadius: '6px', overflow: 'hidden',
          }}>
            {children}
          </Box>
        </Box>
      );
    },
    thead({ children }) {
      return (
        <Box component="thead" sx={{
          background: isDark ? 'rgba(99,102,241,0.08)' : 'rgba(79,70,229,0.04)',
          '& th': {
            px: 1, py: 0.5, textAlign: 'left', fontWeight: 650, color: accentLight,
            borderBottom: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : 'rgba(79,70,229,0.12)'}`,
          },
        }}>
          {children}
        </Box>
      );
    },
    tbody({ children }) {
      return (
        <Box component="tbody" sx={{
          '& td': {
            px: 1, py: 0.4,
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
            color: 'text.primary',
          },
          '& tr:last-child td': { borderBottom: 'none' },
          '& tr:hover': { background: isDark ? 'rgba(99,102,241,0.04)' : 'rgba(79,70,229,0.02)' },
        }}>
          {children}
        </Box>
      );
    },
  };
}

/* ═══════════════════════════════════════════════════════════ */
/*  CHAT BUBBLE                                               */
/* ═══════════════════════════════════════════════════════════ */

export default function ChatBubble({ role, content, canApplyFix, onApplyFix }) {
  const colors = useAccentColors();
  const { isDark, accent } = colors;
  const isUser = role === 'user';

  if (isUser) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1.5 }}>
        <Box
          sx={{
            maxWidth: '85%',
            background: isDark
              ? 'linear-gradient(135deg, #6366F1, #4F46E5)'
              : 'linear-gradient(135deg, #4F46E5, #4338CA)',
            color: '#fff', px: 1.5, py: 1,
            borderRadius: '10px 10px 2px 10px',
            fontSize: 12.5, lineHeight: 1.55,
            fontFamily: "'Inter', sans-serif",
            whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            boxShadow: isDark
              ? '0 2px 8px rgba(99, 102, 241, 0.25)'
              : '0 2px 8px rgba(79, 70, 229, 0.2)',
          }}
        >
          {content}
        </Box>
      </Box>
    );
  }

  const components = buildMarkdownComponents(colors, canApplyFix, onApplyFix);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1.5 }}>
      <Box
        sx={{
          maxWidth: '92%',
          bgcolor: isDark ? 'rgba(22, 18, 36, 0.7)' : 'rgba(248, 248, 255, 0.9)',
          border: '1px solid',
          borderColor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(79, 70, 229, 0.06)',
          px: 1.75, py: 1.25,
          borderRadius: '10px 10px 10px 2px',
          fontSize: 12.5, lineHeight: 1.7,
          fontFamily: "'Inter', sans-serif",
          color: 'text.primary', wordBreak: 'break-word',
          backdropFilter: 'blur(8px)',
          boxShadow: isDark
            ? '0 1px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(99,102,241,0.05)'
            : '0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(79,70,229,0.03)',
        }}
      >
        <Box sx={{ '& pre': { m: 0 } }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {content}
          </ReactMarkdown>
        </Box>
      </Box>
    </Box>
  );
}
