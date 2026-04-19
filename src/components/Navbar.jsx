import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip, Snackbar, Button } from '@mui/material';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';

export default function Navbar({
  darkMode,
  onToggleDarkMode,
  sidebarOpen,
  onToggleSidebar,
  onNewProject,
  onSettings,
  aiSidebarOpen,
  onToggleAiSidebar,
  isFullScreen,
  onToggleFullScreen,
  activeFile,
  activeContent,
  files,
  editorRef,
  onRun,
  isRunning,
  showOutput,
  onToggleOutput,
  onFormat
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
        {/* Left actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'default',
              userSelect: 'none',
              mr: 1,
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                flexShrink: 0,
              }}
            >
              <DataObjectOutlinedIcon sx={{ fontSize: 18, color: '#FFFFFF' }} />
            </Box>

            <Typography
              sx={{
                fontWeight: 800,
                fontSize: '17px',
                letterSpacing: '-0.5px',
                color: 'text.primary',
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Code<Box component="span" sx={{ color: primary }}>Pad</Box>
            </Typography>
          </Box>

          <Box sx={{ width: '1px', height: 20, bgcolor: 'divider', mx: 0.5, opacity: 0.5 }} />

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
              border: 'none',
              transition: 'all 150ms ease',
              '&:hover': {
                background: darkMode
                  ? 'linear-gradient(135deg, #818CF8, #6366F1)'
                  : 'linear-gradient(135deg, #6366F1, #4F46E5)',
              },
            }}
          >
            New Playground
          </Button>
        </Box>

        {/* Right actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            {/* RUN BUTTON (Moved to right) */}
            <Button
              onClick={onRun}
              disabled={isRunning}
              startIcon={<PlayArrowIcon sx={{ fontSize: '18px !important' }} />}
              size="small"
              sx={{
                height: 28,
                textTransform: 'none', fontSize: 12, fontWeight: 700,
                color: '#fff', px: 2, py: 0, borderRadius: '6px',
                fontFamily: "'Inter', sans-serif",
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                mr: 1,
                '&:hover': {
                  background: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
                },
                '&:disabled': {
                  background: '#ccc',
                  color: '#666',
                }
              }}
            >
              {isRunning ? 'Running...' : 'Run'}
            </Button>

            <Button
              size="small"
              variant="outlined"
              onClick={onFormat}
              sx={{
                height: 26,
                fontSize: 12,
                textTransform: 'none',
                fontWeight: 500,
                minWidth: 0,
                px: 1.5,
                borderColor: 'divider',
                color: 'text.secondary',
                '&:hover': { borderColor: 'text.primary', bgcolor: 'action.hover' },
              }}
            >
              Format
            </Button>
          </Box>

          <Box sx={{ width: '1px', height: 20, bgcolor: 'divider', mx: 0.5, opacity: 0.5 }} />

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
          <Tooltip title={isFullScreen ? "Exit full screen" : "Full screen"} arrow>
            <IconButton onClick={onToggleFullScreen} size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
              {isFullScreen ? <FullscreenExitOutlinedIcon sx={{ fontSize: 20 }} /> : <FullscreenOutlinedIcon sx={{ fontSize: 20 }} />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings" arrow>
            <IconButton onClick={onSettings} size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
              <SettingsOutlinedIcon sx={{ fontSize: 19 }} />
            </IconButton>
          </Tooltip>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={!!snackMsg} autoHideDuration={2000} onClose={() => setSnackMsg('')}
        message={snackMsg} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{
          sx: {
            bgcolor: 'background.paper', color: 'text.primary',
            border: '1px solid', borderColor: 'divider', borderRadius: '8px',
            fontSize: 12, fontWeight: 500, boxShadow: '0 4px 166 rgba(0,0,0,0.25)',
            minWidth: 'auto', py: 0.25, '& .MuiSnackbarContent-message': { py: 0 },
          },
        }}
      />
    </>
  );
}
