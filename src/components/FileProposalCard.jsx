import React, { useMemo, useState } from 'react';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import {
  buildSimpleDiff,
  getProposalActionLabel,
  getProposalTargetPath,
} from '../lib/agent';

/* ── tiny file-type icon ─────────────────────────── */

function FileIcon({ path }) {
  const ext = (path || '').split('.').pop()?.toLowerCase() || '';
  const colors = {
    py: '#3572A5', js: '#f1e05a', jsx: '#61dafb', ts: '#3178c6', tsx: '#3178c6',
    html: '#e34c26', css: '#563d7c', json: '#292929', md: '#083fa1',
    java: '#b07219', cpp: '#f34b7d', c: '#555555', rs: '#dea584',
    go: '#00ADD8', rb: '#701516', php: '#4F5D95', swift: '#F05138',
  };
  const col = colors[ext] || '#6b7280';

  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M4 1h5.5L13 4.5V13a2 2 0 01-2 2H5a2 2 0 01-2-2V3a2 2 0 012-2z" stroke={col} strokeWidth="1.2" />
      <path d="M9 1v4h4" stroke={col} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ── diff line ───────────────────────────────────── */

function DiffLine({ kind, text }) {
  const colors = {
    add:     { fg: '#4ade80', bg: 'rgba(74,222,128,0.07)', marker: '+' },
    remove:  { fg: '#f87171', bg: 'rgba(248,113,113,0.07)', marker: '-' },
    context: { fg: 'inherit', bg: 'transparent', marker: ' ' },
  };
  const c = colors[kind] || colors.context;

  return (
    <Box
      sx={{
        display: 'flex',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        bgcolor: c.bg,
        color: kind === 'context' ? 'text.secondary' : c.fg,
      }}
    >
      <Box
        sx={{
          width: 20,
          flexShrink: 0,
          textAlign: 'center',
          py: 0.15,
          color: c.fg,
          userSelect: 'none',
          opacity: kind === 'context' ? 0.4 : 0.9,
        }}
      >
        {c.marker}
      </Box>
      <Box sx={{ flex: 1, py: 0.15, pr: 1 }}>{text || ' '}</Box>
    </Box>
  );
}

/* ═══════════════════════════════════════════════════ */
/*  FILE PROPOSAL CARD                                */
/* ═══════════════════════════════════════════════════ */

export default function FileProposalCard({ proposal, currentContent = '', onApply, onReject }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const actionLabel = getProposalActionLabel(proposal);
  const targetPath = getProposalTargetPath(proposal);
  const fileName = (targetPath || 'untitled').split('/').pop();

  const isApplied = proposal.status === 'applied';
  const isRejected = proposal.status === 'rejected';
  const isPending = !proposal.status || proposal.status === 'pending';

  const [expanded, setExpanded] = useState(true);

  const diff = useMemo(
    () => buildSimpleDiff(currentContent || '', proposal.content || ''),
    [currentContent, proposal.content],
  );

  const lineDelta = diff.afterLineCount - diff.beforeLineCount;
  const deltaText = proposal.type === 'rename_file'
    ? 'rename'
    : `${lineDelta >= 0 ? '+' : ''}${lineDelta}`;

  const previewRows = useMemo(() => {
    if (['create_folder', 'delete_folder', 'rename_file'].includes(proposal.type)) return [];
    const prefix  = diff.prefixLines.slice(-3).map((t) => ({ kind: 'context', text: t }));
    const removed = diff.removedLines.map((t) => ({ kind: 'remove', text: t }));
    const added   = diff.addedLines.map((t) => ({ kind: 'add', text: t }));
    const suffix  = diff.suffixLines.slice(0, 3).map((t) => ({ kind: 'context', text: t }));
    return [...prefix, ...removed, ...added, ...suffix];
  }, [diff, proposal.type]);

  /* ── action-type color accent ───────────────────── */
  const actionColor = {
    'Create file':   { fg: '#4ade80', bg: 'rgba(74,222,128,0.10)' },
    'Update file':   { fg: '#60a5fa', bg: 'rgba(96,165,250,0.10)' },
    'Delete file':   { fg: '#f87171', bg: 'rgba(248,113,113,0.10)' },
    'Create folder': { fg: '#a78bfa', bg: 'rgba(167,139,250,0.10)' },
    'Delete folder': { fg: '#f87171', bg: 'rgba(248,113,113,0.10)' },
    'Rename file':   { fg: '#fbbf24', bg: 'rgba(251,191,36,0.10)' },
  }[actionLabel] || { fg: '#94a3b8', bg: 'rgba(148,163,184,0.10)' };

  /* ── status badge ───────────────────────────────── */
  const statusBadge = isApplied
    ? { label: '✓ Applied', fg: '#4ade80', bg: 'rgba(74,222,128,0.12)' }
    : isRejected
    ? { label: '✗ Rejected', fg: '#94a3b8', bg: 'rgba(148,163,184,0.10)' }
    : null;

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: isApplied
          ? (isDark ? 'rgba(74,222,128,0.25)' : 'rgba(22,163,74,0.2)')
          : 'divider',
        borderRadius: '8px',
        bgcolor: isDark ? 'rgba(255,255,255,0.02)' : '#fff',
        overflow: 'hidden',
        transition: 'border-color 200ms ease',
      }}
    >
      {/* ── Header row ─────────────────────────────── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          px: 1.25,
          py: 0.75,
          cursor: previewRows.length > 0 ? 'pointer' : 'default',
        }}
        onClick={() => previewRows.length > 0 && setExpanded((p) => !p)}
      >
        {/* file icon + name */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0, flex: 1 }}>
          <FileIcon path={targetPath} />
          <Typography
            noWrap
            sx={{
              fontSize: 11.5,
              fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace",
              color: 'text.primary',
            }}
          >
            {fileName}
          </Typography>
        </Box>

        {/* badges */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
          {/* action badge */}
          <Box
            sx={{
              px: 0.75,
              py: 0.15,
              fontSize: 10,
              fontWeight: 600,
              borderRadius: '4px',
              color: actionColor.fg,
              bgcolor: actionColor.bg,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
            }}
          >
            {actionLabel}
          </Box>

          {/* line delta badge */}
          {!['create_folder', 'delete_folder', 'rename_file'].includes(proposal.type) && (
            <Box
              sx={{
                px: 0.6,
                py: 0.15,
                fontSize: 10,
                fontWeight: 600,
                fontFamily: "'JetBrains Mono', monospace",
                borderRadius: '4px',
                color: lineDelta > 0 ? '#4ade80' : lineDelta < 0 ? '#f87171' : '#94a3b8',
                bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
              }}
            >
              {deltaText}
            </Box>
          )}

          {/* status badge */}
          {statusBadge && (
            <Box
              sx={{
                px: 0.75,
                py: 0.15,
                fontSize: 10,
                fontWeight: 600,
                borderRadius: '4px',
                color: statusBadge.fg,
                bgcolor: statusBadge.bg,
              }}
            >
              {statusBadge.label}
            </Box>
          )}

          {/* expand toggle */}
          {previewRows.length > 0 && (
            <Box sx={{ color: 'text.disabled', display: 'flex', ml: 0.25 }}>
              {expanded
                ? <ExpandLessRoundedIcon sx={{ fontSize: 16 }} />
                : <ExpandMoreRoundedIcon sx={{ fontSize: 16 }} />}
            </Box>
          )}
        </Box>
      </Box>

      {/* ── Summary ────────────────────────────────── */}
      {proposal.summary && (
        <Box sx={{ px: 1.25, pb: 0.75 }}>
          <Typography sx={{ fontSize: 11, color: 'text.secondary', lineHeight: 1.45 }}>
            {proposal.summary}
          </Typography>
        </Box>
      )}

      {/* ── Rename preview ─────────────────────────── */}
      {proposal.type === 'rename_file' && (
        <Box sx={{ px: 1.25, pb: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1,
              py: 0.6,
              borderRadius: '6px',
              bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              border: '1px solid',
              borderColor: 'divider',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
            }}
          >
            <Box sx={{ color: '#f87171' }}>{proposal.fromPath || '?'}</Box>
            <Box sx={{ color: 'text.disabled' }}>→</Box>
            <Box sx={{ color: '#4ade80' }}>{proposal.toPath || '?'}</Box>
          </Box>
        </Box>
      )}

      {/* ── Folder messages ────────────────────────── */}
      {proposal.type === 'create_folder' && (
        <Box sx={{ px: 1.25, pb: 1 }}>
          <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
            Directory will be created at the shown path.
          </Typography>
        </Box>
      )}
      {proposal.type === 'delete_folder' && (
        <Box sx={{ px: 1.25, pb: 1 }}>
          <Typography sx={{ fontSize: 11, color: '#f87171' }}>
            This folder and everything inside it will be removed.
          </Typography>
        </Box>
      )}

      {/* ── Diff preview (collapsible) ─────────────── */}
      {previewRows.length > 0 && expanded && (
        <Box
          sx={{
            mx: 1.25,
            mb: 1,
            borderRadius: '6px',
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: isDark ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.02)',
          }}
        >
          {previewRows.map((row, i) => (
            <DiffLine key={`${row.kind}-${i}`} kind={row.kind} text={row.text} />
          ))}
        </Box>
      )}

      {/* ── Action buttons ─────────────────────────── */}
      {isPending && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 0.5,
            px: 1.25,
            pb: 0.75,
            pt: 0.25,
          }}
        >
          <IconButton
            size="small"
            onClick={onReject}
            sx={{
              width: 28,
              height: 28,
              borderRadius: '6px',
              border: '1px solid',
              borderColor: 'divider',
              color: 'text.secondary',
              '&:hover': {
                borderColor: '#f87171',
                color: '#f87171',
                bgcolor: 'rgba(248,113,113,0.08)',
              },
            }}
          >
            <CloseRoundedIcon sx={{ fontSize: 14 }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={onApply}
            sx={{
              width: 28,
              height: 28,
              borderRadius: '6px',
              bgcolor: isDark ? '#7c3aed' : '#6d28d9',
              color: '#fff',
              '&:hover': {
                bgcolor: isDark ? '#6d28d9' : '#5b21b6',
              },
            }}
          >
            <CheckRoundedIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}