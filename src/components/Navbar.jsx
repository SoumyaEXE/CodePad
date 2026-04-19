import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip, Snackbar, Button } from '@mui/material';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import AddIcon from '@mui/icons-material/Add';

export default function Navbar({
  darkMode,
  onToggleDarkMode,
  sidebarOpen,
  onToggleSidebar,
  onNewProject,
  onSettings,
  aiSidebarOpen,
  onToggleAiSidebar,
  activeFile,
  activeContent,
  files,
}) {
  const [snackMsg, setSnackMsg] = useState('');

  const handleDownload = () => {
    if (!activeFile || !activeContent) { setSnackMsg('No file to download'); return; }
    const fileName = activeFile.includes('/') ? activeFile.split('/').pop() : activeFile;
    const blob = new Blob([activeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = fileName; a.click();
    URL.revokeObjectURL(url);
    setSnackMsg(`Downloaded ${fileName}`);
  };

  const handleCopyCode = async () => {
    if (!activeContent) { setSnackMsg('No code to copy'); return; }
    try { await navigator.clipboard.writeText(activeContent); setSnackMsg('Code copied to clipboard'); }
    catch { setSnackMsg('Failed to copy'); }
  };

  const handleShare = async () => {
    if (!activeContent) { setSnackMsg('No code to share'); return; }
    const fileName = activeFile?.includes('/') ? activeFile.split('/').pop() : activeFile || 'untitled';
    const shareText = `// ${fileName} — Shared from CodePad\n\n${activeContent}`;
    if (navigator.share) {
      try { await navigator.share({ title: `${fileName} — CodePad`, text: shareText }); return; }
      catch { /* cancelled */ }
    }
    try { await navigator.clipboard.writeText(shareText); setSnackMsg('Share link copied to clipboard'); }
    catch { setSnackMsg('Failed to share'); }
  };

  // Theme-derived colors (indigo)
  const primary = darkMode ? '#6366F1' : '#4F46E5';
  const primaryLight = darkMode ? '#818CF8' : '#6366F1';

  return (
    <>
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
        {/* Left — brand + new playground */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Logo icon */}
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '7px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: darkMode
                ? 'linear-gradient(135deg, #6366F1, #4F46E5)'
                : 'linear-gradient(135deg, #4F46E5, #4338CA)',
              boxShadow: `0 2px 8px ${darkMode ? 'rgba(99,102,241,0.3)' : 'rgba(79,70,229,0.3)'}`,
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M8 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 6l6 6-6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 4l-4 16" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Box>

          {/* Brand text */}
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.25 }}>
            <Typography
              sx={{
                fontWeight: 700, fontSize: 16, lineHeight: 1,
                letterSpacing: '-0.02em', color: 'text.primary',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Code
            </Typography>
            <Typography
              sx={{
                fontWeight: 700, fontSize: 16, lineHeight: 1,
                letterSpacing: '-0.02em',
                color: primary,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Pad
            </Typography>
          </Box>

          {/* PRO badge */}
          <Box
            sx={{
              px: 0.6, py: 0.15, borderRadius: '4px',
              bgcolor: darkMode ? 'rgba(99,102,241,0.12)' : 'rgba(79,70,229,0.08)',
              border: '1px solid',
              borderColor: darkMode ? 'rgba(99,102,241,0.25)' : 'rgba(79,70,229,0.15)',
            }}
          >
            <Typography
              sx={{
                fontSize: 8.5, fontWeight: 700,
                color: primaryLight,
                lineHeight: 1, letterSpacing: '0.08em',
              }}
            >
              PRO
            </Typography>
          </Box>

          {/* Divider */}
          <Box sx={{ width: '1px', height: 20, bgcolor: 'divider', mx: 0.5, opacity: 0.5 }} />

          {/* New Playground */}
          <Button
            onClick={onNewProject}
            startIcon={<AddIcon sx={{ fontSize: '15px !important' }} />}
            size="small"
            sx={{
              textTransform: 'none', fontSize: 12, fontWeight: 600,
              color: '#fff', px: 1.5, py: 0.45, borderRadius: '7px',
              minWidth: 'auto', fontFamily: "'Inter', sans-serif", lineHeight: 1.2,
              background: darkMode
                ? 'linear-gradient(135deg, #6366F1, #4F46E5)'
                : 'linear-gradient(135deg, #4F46E5, #4338CA)',
              boxShadow: `0 2px 8px ${darkMode ? 'rgba(99,102,241,0.3)' : 'rgba(79,70,229,0.3)'}`,
              border: 'none',
              transition: 'all 150ms ease',
              '&:hover': {
                background: darkMode
                  ? 'linear-gradient(135deg, #818CF8, #6366F1)'
                  : 'linear-gradient(135deg, #6366F1, #4F46E5)',
                boxShadow: `0 4px 14px ${darkMode ? 'rgba(99,102,241,0.4)' : 'rgba(79,70,229,0.4)'}`,
                transform: 'translateY(-1px)',
              },
            }}
          >
            New Playground
          </Button>
        </Box>

        {/* Right actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
          <Tooltip title="Copy code" arrow>
            <IconButton onClick={handleCopyCode} size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
              <ContentCopyOutlinedIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download file" arrow>
            <IconButton onClick={handleDownload} size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
              <FileDownloadOutlinedIcon sx={{ fontSize: 19 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share code" arrow>
            <IconButton onClick={handleShare} size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
              <ShareOutlinedIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Tooltip>

          <Box sx={{ width: '1px', height: 20, bgcolor: 'divider', mx: 0.5, opacity: 0.5 }} />

          <Tooltip title={darkMode ? 'Light mode' : 'Dark mode'} arrow>
            <IconButton id="theme-toggle" onClick={onToggleDarkMode} size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
              {darkMode ? <WbSunnyOutlinedIcon sx={{ fontSize: 19 }} /> : <DarkModeOutlinedIcon sx={{ fontSize: 19 }} />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings" arrow>
            <IconButton onClick={onSettings} size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
              <SettingsOutlinedIcon sx={{ fontSize: 19 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Snackbar
        open={!!snackMsg} autoHideDuration={2000} onClose={() => setSnackMsg('')}
        message={snackMsg} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{
          sx: {
            bgcolor: 'background.paper', color: 'text.primary',
            border: '1px solid', borderColor: 'divider', borderRadius: '8px',
            fontSize: 12, fontWeight: 500, boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
            minWidth: 'auto', py: 0.25, '& .MuiSnackbarContent-message': { py: 0 },
          },
        }}
      />
    </>
  );
}
