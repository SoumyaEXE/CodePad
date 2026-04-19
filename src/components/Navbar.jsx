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

  /* ── Download current file ── */
  const handleDownload = () => {
    if (!activeFile || !activeContent) {
      setSnackMsg('No file to download');
      return;
    }
    const fileName = activeFile.includes('/')
      ? activeFile.split('/').pop()
      : activeFile;
    const blob = new Blob([activeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    setSnackMsg(`Downloaded ${fileName}`);
  };

  /* ── Copy code to clipboard ── */
  const handleCopyCode = async () => {
    if (!activeContent) {
      setSnackMsg('No code to copy');
      return;
    }
    try {
      await navigator.clipboard.writeText(activeContent);
      setSnackMsg('Code copied to clipboard');
    } catch {
      setSnackMsg('Failed to copy');
    }
  };

  /* ── Share code (copies shareable text) ── */
  const handleShare = async () => {
    if (!activeContent) {
      setSnackMsg('No code to share');
      return;
    }
    const fileName = activeFile?.includes('/')
      ? activeFile.split('/').pop()
      : activeFile || 'untitled';
    const shareText = `// ${fileName} — Shared from CodePad\n\n${activeContent}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${fileName} — CodePad`,
          text: shareText,
        });
        return;
      } catch {
        /* user cancelled or not supported */
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setSnackMsg('Share link copied to clipboard');
    } catch {
      setSnackMsg('Failed to share');
    }
  };

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
                ? 'linear-gradient(135deg, #7c3aed, #6d28d9)'
                : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)',
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
                fontWeight: 700,
                fontSize: 16,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                color: 'text.primary',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Code
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                background: darkMode
                  ? 'linear-gradient(135deg, #a78bfa, #7c3aed)'
                  : 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Pad
            </Typography>
          </Box>

          {/* PRO badge */}
          <Box
            sx={{
              px: 0.6,
              py: 0.15,
              borderRadius: '4px',
              background: darkMode
                ? 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(124,58,237,0.2))'
                : 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(139,92,246,0.1))',
              border: '1px solid',
              borderColor: darkMode ? 'rgba(139,92,246,0.3)' : 'rgba(124,58,237,0.2)',
            }}
          >
            <Typography
              sx={{
                fontSize: 8.5,
                fontWeight: 700,
                color: darkMode ? '#a78bfa' : '#7c3aed',
                lineHeight: 1,
                letterSpacing: '0.08em',
              }}
            >
              PRO
            </Typography>
          </Box>

          {/* Divider */}
          <Box
            sx={{
              width: '1px',
              height: 20,
              bgcolor: 'divider',
              mx: 0.5,
              opacity: 0.5,
            }}
          />

          {/* New Playground — full text button */}
          <Button
            onClick={onNewProject}
            startIcon={<AddIcon sx={{ fontSize: '16px !important' }} />}
            size="small"
            sx={{
              textTransform: 'none',
              fontSize: 12,
              fontWeight: 500,
              color: 'text.secondary',
              px: 1.25,
              py: 0.4,
              borderRadius: '6px',
              minWidth: 'auto',
              border: '1px solid',
              borderColor: 'divider',
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.2,
              transition: 'all 150ms ease',
              '&:hover': {
                color: darkMode ? '#a78bfa' : '#7c3aed',
                borderColor: darkMode ? 'rgba(139,92,246,0.4)' : 'rgba(124,58,237,0.3)',
                bgcolor: darkMode ? 'rgba(139,92,246,0.06)' : 'rgba(124,58,237,0.04)',
              },
            }}
          >
            New Playground
          </Button>
        </Box>

        {/* Right actions — tools first, settings last */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
          {/* Copy Code */}
          <Tooltip title="Copy code" arrow>
            <IconButton
              onClick={handleCopyCode}
              size="small"
              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              <ContentCopyOutlinedIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Tooltip>

          {/* Download */}
          <Tooltip title="Download file" arrow>
            <IconButton
              onClick={handleDownload}
              size="small"
              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              <FileDownloadOutlinedIcon sx={{ fontSize: 19 }} />
            </IconButton>
          </Tooltip>

          {/* Share */}
          <Tooltip title="Share code" arrow>
            <IconButton
              onClick={handleShare}
              size="small"
              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              <ShareOutlinedIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Tooltip>

          {/* Divider */}
          <Box
            sx={{
              width: '1px',
              height: 20,
              bgcolor: 'divider',
              mx: 0.5,
              opacity: 0.5,
            }}
          />

          {/* Dark mode */}
          <Tooltip title={darkMode ? 'Light mode' : 'Dark mode'} arrow>
            <IconButton id="theme-toggle" onClick={onToggleDarkMode} size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
              {darkMode ? (
                <WbSunnyOutlinedIcon sx={{ fontSize: 19 }} />
              ) : (
                <DarkModeOutlinedIcon sx={{ fontSize: 19 }} />
              )}
            </IconButton>
          </Tooltip>

          {/* Settings — always last */}
          <Tooltip title="Settings" arrow>
            <IconButton onClick={onSettings} size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
              <SettingsOutlinedIcon sx={{ fontSize: 19 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Toast notification */}
      <Snackbar
        open={!!snackMsg}
        autoHideDuration={2000}
        onClose={() => setSnackMsg('')}
        message={snackMsg}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{
          sx: {
            bgcolor: 'background.paper',
            color: 'text.primary',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '8px',
            fontSize: 12,
            fontWeight: 500,
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
            minWidth: 'auto',
            py: 0.25,
            '& .MuiSnackbarContent-message': { py: 0 },
          },
        }}
      />
    </>
  );
}
