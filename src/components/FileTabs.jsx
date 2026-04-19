import React from 'react';
import { Box, Button, Typography, IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

/* ── single tab ─────────────────────────────────── */

function Tab({ filename, isActive, onSelect, onClose }) {
  return (
    <Box
      onClick={() => onSelect(filename)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        height: '100%',
        px: 1.5,
        cursor: 'pointer',
        bgcolor: isActive ? 'background.paper' : 'transparent',
        borderRight: '1px solid',
        borderColor: 'divider',
        borderBottom: isActive ? '2px solid' : '2px solid transparent',
        borderBottomColor: isActive ? 'primary.main' : 'transparent',
        '&:hover': {
          bgcolor: isActive ? 'background.paper' : 'action.hover',
        },
        transition: 'background-color 150ms ease',
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      <Typography
        variant="caption"
        noWrap
        sx={{
          fontSize: 12,
          fontWeight: isActive ? 500 : 400,
          color: isActive ? 'text.primary' : 'text.secondary',
          maxWidth: 140,
        }}
      >
        {filename}
      </Typography>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onClose(filename);
        }}
        sx={{
          p: 0.1,
          ml: 0.25,
          opacity: 0.6,
          '&:hover': { opacity: 1, color: 'error.main' },
          transition: 'opacity 150ms ease, color 150ms ease',
        }}
      >
        <CloseIcon sx={{ fontSize: 14 }} />
      </IconButton>
    </Box>
  );
}

/* ── tab bar ────────────────────────────────────── */

export default function FileTabs({
  openTabs,
  activeFile,
  onSelectTab,
  onCloseTab,
  onRun,
  isRunning,
  showOutput,
  onToggleOutput,
}) {
  return (
    <Box
      id="tab-bar"
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: 36,
        bgcolor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'divider',
        flexShrink: 0,
      }}
    >
      {/* Scrollable tabs */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
          overflow: 'hidden',
          height: '100%',
        }}
      >
        {openTabs.map((name) => (
          <Tab
            key={name}
            filename={name}
            isActive={name === activeFile}
            onSelect={onSelectTab}
            onClose={onCloseTab}
          />
        ))}
      </Box>

      {/* Actions */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          px: 1,
          flexShrink: 0,
          borderLeft: '1px solid',
          borderColor: 'divider',
          height: '100%',
        }}
      >
        <Button
          id="run-btn"
          size="small"
          variant="contained"
          onClick={onRun}
          disabled={isRunning}
          disableElevation
          startIcon={<PlayArrowIcon sx={{ fontSize: 16 }} />}
          sx={{
            bgcolor: '#16A34A',
            '&:hover': { bgcolor: '#15803D' },
            '&.Mui-disabled': { bgcolor: '#16A34A80' },
            fontSize: 12,
            fontWeight: 500,
            height: 26,
            minWidth: 0,
            px: 1.5,
          }}
        >
          {isRunning ? 'Running…' : 'Run'}
        </Button>

        <Tooltip title="Toggle output panel" arrow>
          <Button
            id="output-toggle"
            size="small"
            variant={showOutput ? 'contained' : 'outlined'}
            onClick={onToggleOutput}
            disableElevation
            sx={{
              fontSize: 12,
              fontWeight: 500,
              height: 26,
              minWidth: 0,
              px: 1.5,
            }}
          >
            Output
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
