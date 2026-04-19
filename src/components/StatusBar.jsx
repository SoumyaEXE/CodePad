import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { getLangById } from '../utils/languages';

/* ── Tiny separator ── */
function Sep() {
  return (
    <Box
      sx={{
        width: '1px',
        height: 13,
        bgcolor: 'divider',
        mx: 0.75,
        flexShrink: 0,
        opacity: 0.5,
      }}
    />
  );
}

/* ── Status item ── */
function Item({ children, sx: sxOverride, onClick, ...rest }) {
  return (
    <Typography
      variant="caption"
      onClick={onClick}
      sx={{
        fontSize: 11,
        color: 'text.secondary',
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 400,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        userSelect: 'none',
        cursor: onClick ? 'pointer' : 'default',
        px: 0.5,
        py: 0.25,
        borderRadius: 0.5,
        '&:hover': { bgcolor: 'action.hover' },
        transition: 'background-color 120ms ease',
        ...sxOverride,
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
}



/* ── Format bytes ── */
function formatBytes(bytes) {
  if (bytes == null) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/* ═══════════════════════════════════════════════════ */
/*  STATUS BAR                                        */
/* ═══════════════════════════════════════════════════ */

export default function StatusBar({
  runStatus,
  output,
  cursorPosition,
  language,
  activeFile,
  fileContent,
  showSaved,
  onLanguageClick,
}) {
  const isSuccess = runStatus === 'success';
  const langConfig = getLangById(language);
  const langLabel = langConfig?.label || language || 'Plain Text';

  /* Compute file stats */
  const lineCount = useMemo(() => {
    if (!fileContent) return 0;
    return fileContent.split('\n').length;
  }, [fileContent]);

  const fileSize = useMemo(() => {
    if (!fileContent) return null;
    return new Blob([fileContent]).size;
  }, [fileContent]);

  /* Run stats from output */
  const execTime = output?.executionTime;
  const memUsed = output?.memoryUsed ? formatBytes(output.memoryUsed) : null;

  return (
    <Box
      id="status-bar"
      component="footer"
      sx={{
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 1,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A1D27' : '#f0f0f3',
        borderTop: '1px solid',
        borderColor: 'divider',
        flexShrink: 0,
      }}
    >
      {/* ── LEFT side ──────────────────────────── */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, minWidth: 0 }}>
        {/* Run indicator dot */}
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            bgcolor: isSuccess ? '#22c55e' : '#6B7280',
            transition: 'background-color 200ms ease',
            flexShrink: 0,
            ml: 0.5,
          }}
        />

        <Item>{isSuccess ? 'Success' : 'Ready'}</Item>

        {/* Execution stats */}
        {isSuccess && execTime != null && (
          <>
            <Sep />
            <Item>
              <Box component="span" sx={{ color: '#6B7280' }}>⏱</Box>{' '}
              {execTime} ms
            </Item>
          </>
        )}
        {isSuccess && memUsed && (
          <>
            <Sep />
            <Item>
              <Box component="span" sx={{ color: '#6B7280' }}>⬡</Box>{' '}
              {memUsed}
            </Item>
          </>
        )}

        {/* Auto-save indicator */}
        {showSaved && (
          <>
            <Sep />
            <Item sx={{ color: '#22c55e' }}>● Saved</Item>
          </>
        )}
      </Box>

      {/* ── RIGHT side ─────────────────────────── */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, minWidth: 0 }}>
        {/* Cursor position */}
        {cursorPosition && (
          <>
            <Item>
              Ln {cursorPosition.line}, Col {cursorPosition.column}
            </Item>
            <Sep />
          </>
        )}

        {/* Lines count */}
        {lineCount > 0 && (
          <>
            <Item>{lineCount} lines</Item>
            <Sep />
          </>
        )}

        {/* File size */}
        {fileSize != null && (
          <>
            <Item>{formatBytes(fileSize)}</Item>
            <Sep />
          </>
        )}

        {/* Indentation */}
        <Item>Spaces: 4</Item>
        <Sep />

        {/* Encoding */}
        <Item>UTF-8</Item>
        <Sep />

        {/* Language — clickable to open language modal */}
        <Item
          sx={{
            fontWeight: 500,
            cursor: 'pointer',
            '&:hover': { bgcolor: 'action.selected', color: 'primary.main' },
          }}
          onClick={onLanguageClick}
        >
          {langLabel}
        </Item>
      </Box>
    </Box>
  );
}
