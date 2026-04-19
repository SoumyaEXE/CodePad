import React from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

/* ── Sidebar toggle icon ──────────────────────────── */

function SidebarIcon({ open }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="2.5" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <line x1="6.5" y1="2.5" x2="6.5" y2="15.5" stroke="currentColor" strokeWidth="1.3" />
      {open && (
        <>
          <line x1="3.5" y1="5.5" x2="5" y2="5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <line x1="3.5" y1="7.5" x2="5" y2="7.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <line x1="3.5" y1="9.5" x2="5" y2="9.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export default function Navbar({ darkMode, onToggleDarkMode, sidebarOpen, onToggleSidebar, onNewProject, onSettings, aiSidebarOpen, onToggleAiSidebar }) {
  return (
    <Box
      id="navbar"
      component="nav"
      sx={{
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        flexShrink: 0,
      }}
    >
      {/* Left — brand + sidebar toggle + new project */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <TerminalIcon sx={{ fontSize: 20, color: 'primary.main' }} />
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, fontSize: 15, lineHeight: 1 }}
        >
          CodePad
        </Typography>
        <Box
          sx={{
            ml: 0.75,
            px: 0.75,
            py: 0.2,
            borderRadius: 0.5,
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: 9,
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1,
              letterSpacing: '0.06em',
            }}
          >
            PRO
          </Typography>
        </Box>

        {/* Sidebar toggle */}
        <Tooltip title={`${sidebarOpen ? 'Hide' : 'Show'} Explorer (Ctrl+B)`} arrow>
          <IconButton
            id="sidebar-toggle"
            onClick={onToggleSidebar}
            size="small"
            sx={{
              ml: 1,
              color: sidebarOpen ? 'text.primary' : 'text.secondary',
            }}
          >
            <SidebarIcon open={sidebarOpen} />
          </IconButton>
        </Tooltip>

        {/* New Project button */}
        <Tooltip title="New playground" arrow>
          <IconButton
            onClick={onNewProject}
            size="small"
            sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="2" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.3" />
              <path d="M9 6v6M6 9h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </IconButton>
        </Tooltip>
      </Box>

      {/* Right actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Tooltip title="Settings" arrow>
          <IconButton onClick={onSettings} size="small" sx={{ color: 'text.secondary' }}>
            <SettingsOutlinedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} arrow>
          <IconButton id="theme-toggle" onClick={onToggleDarkMode} size="small">
            {darkMode ? (
              <WbSunnyOutlinedIcon sx={{ fontSize: 20 }} />
            ) : (
              <DarkModeOutlinedIcon sx={{ fontSize: 20 }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

