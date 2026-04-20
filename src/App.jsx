import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { ThemeProvider, CssBaseline, Box, IconButton, Menu, MenuItem, Tooltip, Typography, useTheme, useMediaQuery } from '@mui/material';

import { getTheme } from './theme';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import FileTabs from './components/FileTabs';
import CodeEditor from './components/CodeEditor';
import OutputPanel from './components/OutputPanel';
import Editor from './components/Editor';
import StatusBar from './components/StatusBar';
import LanguageModal from './components/LanguageModal';
import NewProjectModal from './components/NewProjectModal';
import SettingsModal from './components/SettingsModal';
import AISidebar from './components/AISidebar';
import Preloader from './components/Preloader';
import { useFileSystem } from './hooks/useFileSystem';
import { useCodeExecution } from './hooks/useCodeExecution';
import { useEditorSettings } from './hooks/useEditorSettings';
import { getLanguageFromExtension, WEB_LANGS, getLangById } from './utils/languages';
import { LANGUAGE_TEMPLATES } from './utils/languageTemplates';

/* ── VS Code–style Activity Bar ───────────────────── */

function ActivityBar({ activePanel, onSelectPanel }) {
  const items = [
    {
      id: 'explorer',
      tooltip: 'Explorer (Ctrl+B)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <polyline points="13 2 13 9 20 9" />
        </svg>
      ),
    },
    {
      id: 'search',
      tooltip: 'Search (Ctrl+Shift+F)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: 44,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        pt: 0.5,
        gap: 0.25,
      }}
    >
      {items.map((item) => {
        const isActive = activePanel === item.id;
        return (
          <Tooltip key={item.id} title={item.tooltip} arrow placement="right">
            <IconButton
              size="small"
              onClick={() => onSelectPanel(item.id)}
              sx={{
                width: 40,
                height: 40,
                borderRadius: 0,
                color: isActive ? 'text.primary' : 'text.disabled',
                position: 'relative',
                transition: 'color 120ms ease',
                '&:hover': {
                  color: 'text.primary',
                  bgcolor: 'transparent',
                },
                '&::before': isActive ? {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '25%',
                  bottom: '25%',
                  width: '2px',
                  borderRadius: '0 2px 2px 0',
                  bgcolor: 'text.primary',
                } : {},
              }}
            >
              {item.icon}
            </IconButton>
          </Tooltip>
        );
      })}
    </Box>
  );
}

/* ── Search Panel ─────────────────────────────────── */

function SearchPanel({ width, files, onOpenFile }) {
  const [query, setQuery] = useState('');
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const matches = [];
    for (const [filePath, fileData] of Object.entries(files)) {
      const fileName = filePath.includes('/') ? filePath.split('/').pop() : filePath;
      const nameMatch = fileName.toLowerCase().includes(q);
      const contentLines = [];

      if (fileData.content) {
        const lines = fileData.content.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].toLowerCase().includes(q)) {
            contentLines.push({ lineNum: i + 1, text: lines[i].trim() });
            if (contentLines.length >= 5) break; // cap at 5 matches per file
          }
        }
      }

      if (nameMatch || contentLines.length > 0) {
        matches.push({ filePath, fileName, nameMatch, contentLines });
      }
    }
    return matches;
  }, [query, files]);

  /* Highlight matching text */
  const highlightMatch = (text, q) => {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <Box component="span" sx={{ bgcolor: isDark ? 'rgba(99,102,241,0.3)' : 'rgba(79,70,229,0.2)', borderRadius: '2px', px: '1px' }}>
          {text.slice(idx, idx + q.length)}
        </Box>
        {text.slice(idx + q.length)}
      </>
    );
  };

  return (
    <Box
      sx={{
        width,
        minWidth: 160,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box sx={{ px: 1.5, py: 0.75, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography
          variant="caption"
          sx={{ fontWeight: 600, fontSize: 11, letterSpacing: '0.08em', color: 'text.secondary', userSelect: 'none' }}
        >
          SEARCH
        </Typography>
      </Box>

      {/* Search input */}
      <Box sx={{ px: 1, py: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '5px',
            px: 1,
            py: 0.4,
            transition: 'border-color 150ms ease',
            '&:focus-within': { borderColor: isDark ? '#818CF8' : '#4F46E5' },
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files..."
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: isDark ? '#e4e4e7' : '#27272a',
              fontSize: 12,
              fontFamily: "'Inter', sans-serif",
              padding: 0,
            }}
          />
          {query && (
            <IconButton size="small" onClick={() => setQuery('')} sx={{ p: 0.2, color: 'text.disabled', '&:hover': { color: 'text.primary' } }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Results */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 0.5 }}>
        {query.trim() && results.length === 0 && (
          <Typography sx={{ fontSize: 11, color: 'text.disabled', px: 1, py: 2, textAlign: 'center' }}>
            No results found
          </Typography>
        )}

        {results.map((result) => (
          <Box key={result.filePath} sx={{ mb: 0.5 }}>
            {/* File name */}
            <Box
              onClick={() => onOpenFile(result.filePath)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1,
                py: 0.4,
                cursor: 'pointer',
                borderRadius: '4px',
                '&:hover': { bgcolor: 'action.hover' },
                transition: 'background-color 120ms ease',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.5, flexShrink: 0 }}>
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
              <Typography noWrap sx={{ fontSize: 12, fontWeight: 500, color: 'text.primary' }}>
                {highlightMatch(result.fileName, query.trim())}
              </Typography>
            </Box>

            {/* Content matches */}
            {result.contentLines.map((line, i) => (
              <Box
                key={i}
                onClick={() => onOpenFile(result.filePath)}
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 0.75,
                  pl: 3.5,
                  pr: 1,
                  py: 0.2,
                  cursor: 'pointer',
                  borderRadius: '4px',
                  '&:hover': { bgcolor: 'action.hover' },
                  transition: 'background-color 120ms ease',
                }}
              >
                <Typography sx={{ fontSize: 10, color: 'text.disabled', fontFamily: "'JetBrains Mono', monospace", flexShrink: 0, minWidth: 20, textAlign: 'right' }}>
                  {line.lineNum}
                </Typography>
                <Typography noWrap sx={{ fontSize: 11, color: 'text.secondary', fontFamily: "'JetBrains Mono', monospace" }}>
                  {highlightMatch(line.text, query.trim())}
                </Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ── Thin resize handle between sidebar panel and editor ─ */

function PanelResizeHandle({ onMouseDown }) {
  return (
    <Box
      onMouseDown={onMouseDown}
      sx={{
        width: 3,
        cursor: 'col-resize',
        flexShrink: 0,
        bgcolor: 'divider',
        opacity: 0,
        transition: 'opacity 150ms ease',
        '&:hover': { opacity: 1 },
      }}
    />
  );
}

/* ── Mobile Bottom Tab Bar ─────────────────────── */

function MobileBottomTabs({ activeTab, onSelectTab, isDark }) {
  const tabs = [
    {
      id: 'files',
      label: 'Files',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <polyline points="13 2 13 9 20 9" />
        </svg>
      ),
    },
    {
      id: 'code',
      label: 'Code',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      id: 'output',
      label: 'Output',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      ),
    },
    {
      id: 'ai',
      label: 'AI',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
        </svg>
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 52,
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        flexShrink: 0,
        position: 'relative',
        zIndex: 10,
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Box
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.15,
              flex: 1,
              py: 0.5,
              cursor: 'pointer',
              color: isActive ? 'primary.main' : 'text.disabled',
              transition: 'color 120ms ease',
              userSelect: 'none',
              '&:active': { opacity: 0.7 },
            }}
          >
            {tab.icon}
            <Typography sx={{ fontSize: 9.5, fontWeight: isActive ? 600 : 400, lineHeight: 1 }}>
              {tab.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

/* ═══════════════════════════════════════════════════ */

export default function App() {
  /* ── theme ─────────────────────────────────────── */
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('codePad_darkMode');
      return saved === null ? true : saved === 'true';
    } catch {
      return true;
    }
  });

  const theme = useMemo(() => getTheme(darkMode ? 'dark' : 'light'), [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem('codePad_darkMode', String(darkMode));
    } catch { /* noop */ }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => setDarkMode((p) => !p), []);

  /* ── user settings ───────────────────────────── */
  const { settings, update: updateSetting } = useEditorSettings();
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  /* ── sidebar / activity bar panel ──────────────── */
  const [activePanel, setActivePanel] = useState('explorer'); // 'explorer' | 'search' | null
  const sidebarOpen = activePanel !== null;
  const handleSelectPanel = useCallback((panelId) => {
    setActivePanel((prev) => prev === panelId ? null : panelId);
  }, []);
  const toggleSidebar = useCallback(() => {
    setActivePanel((prev) => prev ? null : 'explorer');
  }, []);

  /* ── full screen logic ───────────────────────── */
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  /* ── mobile detection + tab ──────────────────── */
  const isMobile = useMediaQuery('(max-width:768px)');
  const [mobileTab, setMobileTab] = useState('code');
  const editorRef = useRef(null);
  const formatRef = useRef(null);
  const runRef = useRef(null);

  /* ── resizable panel widths ────────────────────── */
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    try {
      const v = localStorage.getItem('codePad_sidebarWidth');
      return v ? parseInt(v, 10) : 220;
    } catch {
      return 220;
    }
  });

  const [outputWidth, setOutputWidth] = useState(() => {
    try {
      const v = localStorage.getItem('codePad_outputWidth');
      return v ? parseInt(v, 10) : 380;
    } catch {
      return 380;
    }
  });

  // Persist widths
  useEffect(() => {
    try {
      localStorage.setItem('codePad_sidebarWidth', String(sidebarWidth));
      localStorage.setItem('codePad_outputWidth', String(outputWidth));
    } catch { /* noop */ }
  }, [sidebarWidth, outputWidth]);

  /* ── drag overlay (prevents Monaco iframe stealing events) ── */
  const [isDragging, setIsDragging] = useState(false);

  const startSidebarDrag = useCallback(
    (e) => {
      e.preventDefault();
      const startX = e.clientX;
      const startW = sidebarWidth;
      setIsDragging(true);

      const move = (ev) => {
        const x = ev.clientX;
        requestAnimationFrame(() => {
          setSidebarWidth(Math.max(160, Math.min(450, startW + (x - startX))));
        });
      };
      const up = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        setIsDragging(false);
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    },
    [sidebarWidth],
  );

  const startOutputDrag = useCallback(
    (e) => {
      e.preventDefault();
      const startX = e.clientX;
      const startW = outputWidth;
      setIsDragging(true);

      const move = (ev) => {
        const x = ev.clientX;
        requestAnimationFrame(() => {
          setOutputWidth(Math.max(200, Math.min(700, startW - (x - startX))));
        });
      };
      const up = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        setIsDragging(false);
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    },
    [outputWidth],
  );

  /* ── file system ───────────────────────────────── */
  const {
    files,
    folders,
    openTabs,
    activeFile,
    showSaved,
    setActiveFile,
    updateFileContent,
    createFile,
    createFolder,
    deleteFile,
    deleteFolder,
    uploadFile,
    openFile,
    closeTab,
    changeFileLanguage,
    renameFile,
    renameFolder,
  } = useFileSystem();

  /* ── execution (Legacy) ─────────────────────── */
  /* const { execute, isRunning, output, clearOutput } = useCodeExecution();
  const [runStatus, setRunStatus] = useState('idle');
  const [stdin, setStdin] = useState('');
  const [showOutput, setShowOutput] = useState(true);
  const outputPanelRef = useRef(null);

  const handleRun = useCallback(async () => {
    const file = files[activeFile];
    if (!file) return;
    setShowOutput(true);
    
    if (WEB_LANGS.has(file.language)) {
      outputPanelRef.current?.switchToTab('preview');
    } else {
      outputPanelRef.current?.switchToTab('io');
    }

    const result = await execute(file.content, file.language, stdin);
    setRunStatus(result.success ? 'success' : 'idle');
  }, [files, activeFile, stdin, execute]); */
  const isRunning = false;
  const output = '';
  const clearOutput = () => {};
  const handleRun = useCallback(() => {
    if (runRef.current) {
      runRef.current.runCode();
    }
  }, []);
  const showOutput = false;
  const setShowOutput = () => {};
  const outputPanelRef = { current: null };
  const runStatus = 'idle';
  const stdin = '';
  const setStdin = () => {};

  /* ── cursor position (for status bar) ──────────── */
  const [cursorPos, setCursorPos] = useState({ line: 1, column: 1 });

  /* ── language modal ────────────────────────────── */
  const [langModalOpen, setLangModalOpen] = useState(false);
  const [newProjectOpen, setNewProjectOpen] = useState(false);

  const handleLanguageChange = useCallback(
    (newLangId) => {
      if (activeFile) {
        changeFileLanguage(activeFile, newLangId);
      }
    },
    [activeFile, changeFileLanguage],
  );

  /* ── keyboard shortcuts ────────────────────────── */
  useEffect(() => {
    function handler(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
      }
      if (
        ((e.ctrlKey || e.metaKey) && e.key === 'Enter') ||
        e.key === 'F5'
      ) {
        e.preventDefault();
        handleRun();
      }
      // Ctrl+B → toggle explorer
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setActivePanel((p) => p === 'explorer' ? null : 'explorer');
      }
      // Ctrl+Shift+F → toggle search
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        setActivePanel((p) => p === 'search' ? null : 'search');
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleRun]);

  /* ── derived ───────────────────────────────────── */
  const activeFileObj = files[activeFile];
  const activeContent = activeFileObj?.content ?? '';
  const activeLanguage = activeFileObj?.language ?? '';

  const aiWorkspace = useMemo(() => ({
    activeFile,
    activeLanguage,
    activeContent,
    files,
    folders,
    openTabs,
    output,
    stdin,
  }), [activeFile, activeLanguage, activeContent, files, folders, openTabs, output, stdin]);

  const aiActions = useMemo(() => ({
    setActiveFile,
    updateFileContent,
    createFile,
    createFolder,
    deleteFile,
    deleteFolder,
    renameFile,
    openFile,
    changeFileLanguage,
    setStdin,
    runCode: () => handleRun(),
    switchOutputTab: (tab) => outputPanelRef.current?.switchToTab(tab),
  }), [
    setActiveFile,
    updateFileContent,
    createFile,
    createFolder,
    deleteFile,
    deleteFolder,
    renameFile,
    openFile,
    changeFileLanguage,
    handleRun,
  ]);

  const handleContentChange = useCallback(
    (val) => {
      if (activeFile) updateFileContent(activeFile, val);
    },
    [activeFile, updateFileContent],
  );

  const handleDeleteFile = useCallback(
    (filename) => {
      if (Object.keys(files).length <= 1) return;
      deleteFile(filename);
    },
    [files, deleteFile],
  );

  /* ── new project ─────────────────────────────── */
  const handleCreateProject = useCallback(
    (template, isFromUrl = false) => {
      if (!isFromUrl) {
        // Just open in new tab
        window.open('/' + template.id, '_blank');
        return;
      }

      // If we're bootstrapping from URL, check if files already exist
      const mainFile = `${template.id}/${template.files[0].name}`;
      if (files[mainFile]) {
        openFile(mainFile);
        return;
      }

      // Create all files associated with the template
      template.files.forEach((fileObj, idx) => {
        const filePath = `${template.id}/${fileObj.name}`;
        createFile(filePath);

        // Use timeout to let the state settle before updating content
        setTimeout(() => {
          updateFileContent(filePath, fileObj.code);
          const lang = getLanguageFromExtension(fileObj.name);
          changeFileLanguage(filePath, lang);
        }, 50 + idx * 10);
      });

      // After creating files, set active to the primary file
      setTimeout(() => {
        openFile(mainFile);
      }, 50 + template.files.length * 10);

    },
    [createFile, updateFileContent, changeFileLanguage, openFile, files],
  );

  /* ── URL Bootstrapping ───────────────────────── */
  useEffect(() => {
    const path = window.location.pathname.substring(1).replace(/\/$/, ''); 
    if (path) {
      const template = LANGUAGE_TEMPLATES.find(t => t.id === path);
      if (template) {
        handleCreateProject(template, true);
      }
    }
  }, []);

  /* ── editor context menu actions ─────────────── */
  const [editorMenuAnchor, setEditorMenuAnchor] = useState(null);

  const handleClearEditor = useCallback(() => {
    if (activeFile) updateFileContent(activeFile, '');
    setEditorMenuAnchor(null);
  }, [activeFile, updateFileContent]);

  const handleCopyAll = useCallback(() => {
    navigator.clipboard.writeText(activeContent);
    setEditorMenuAnchor(null);
  }, [activeContent]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (activeFile) updateFileContent(activeFile, activeContent + text);
    } catch { /* clipboard denied */ }
    setEditorMenuAnchor(null);
  }, [activeFile, activeContent, updateFileContent]);



  /* ── mobile-aware file open ──────────────────── */
  const handleMobileOpenFile = useCallback((file) => {
    openFile(file);
    if (isMobile) setMobileTab('code');
  }, [openFile, isMobile]);

  /* ── render ────────────────────────────────────── */
  const [appReady, setAppReady] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Preloader onFinish={() => setAppReady(true)} />

      {/* Drag overlay */}
      {isDragging && (
        <Box sx={{ position: 'fixed', inset: 0, zIndex: 9999, cursor: 'col-resize' }} />
      )}

      <Box
        id="app-root"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          bgcolor: 'background.default',
        }}
      >
        {/* Top navbar */}
        <Navbar
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={toggleSidebar}
          onNewProject={() => setNewProjectOpen(true)}
          onSettings={() => setSettingsModalOpen(true)}
          isFullScreen={isFullScreen}
          onToggleFullScreen={toggleFullScreen}
          activeFile={activeFile}
          activeContent={activeContent}
          files={files}
          isMobile={isMobile}
          editorRef={editorRef}
          onFormat={() => formatRef.current?.formatCode()}
          onRun={handleRun}
        />

        {/* ═══ MOBILE LAYOUT ═══ */}
        {isMobile ? (
          <>
            <Box sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {/* Files tab */}
              {mobileTab === 'files' && (
                <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                  <Sidebar
                    width="100%"
                    files={files}
                    folders={folders}
                    activeFile={activeFile}
                    onOpenFile={handleMobileOpenFile}
                    onCreateFile={createFile}
                    onCreateFolder={createFolder}
                    onDeleteFile={handleDeleteFile}
                    onRenameFile={renameFile}
                    onDeleteFolder={deleteFolder}
                    onUploadFile={uploadFile}
                    darkMode={darkMode}
                    onToggleDarkMode={toggleDarkMode}
                  />
                </Box>
              )}

              {/* Code tab */}
              {mobileTab === 'code' && (
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <FileTabs
                    files={files}
                    openTabs={openTabs}
                    activeFile={activeFile}
                    onSelectTab={setActiveFile}
                    onCloseTab={closeTab}
                    onRun={handleRun}
                    isRunning={isRunning}
                    showOutput={showOutput}
                    onToggleOutput={() => setMobileTab('output')}
                  />
                  <CodeEditor
                    value={activeContent}
                    language={activeLanguage}
                    darkMode={darkMode}
                    settings={settings}
                    onChange={handleContentChange}
                    onCursorChange={setCursorPos}
                    ref={editorRef}
                  />
                </Box>
              )}

              {/* Output tab */}
              {mobileTab === 'output' && (
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  {/* <OutputPanel
                    ref={outputPanelRef}
                    width="100%"
                    output={output}
                    isRunning={isRunning}
                    stdin={stdin}
                    onStdinChange={setStdin}
                    onClearOutput={clearOutput}
                    language={activeLanguage}
                    fileContent={activeContent}
                    onApplyFix={handleContentChange}
                    workspace={aiWorkspace}
                    actions={aiActions}
                  /> */}
                </Box>
              )}

              {/* AI tab */}
              {mobileTab === 'ai' && (
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <AISidebar
                    activeContent={activeContent}
                    onApplyFix={handleContentChange}
                    workspace={aiWorkspace}
                    actions={aiActions}
                  />
                </Box>
              )}
            </Box>

            {/* Mobile bottom tab bar */}
            <MobileBottomTabs
              activeTab={mobileTab}
              onSelectTab={setMobileTab}
              isDark={darkMode}
            />
          </>
        ) : (
          /* ═══ DESKTOP LAYOUT ═══ */
          <>
            {/* Main area */}
            <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
              {/* Activity Bar */}
              <ActivityBar activePanel={activePanel} onSelectPanel={handleSelectPanel} />

              {/* Explorer panel */}
              {activePanel === 'explorer' && (
                <>
                  <Sidebar
                    width={sidebarWidth}
                    files={files}
                    folders={folders}
                    activeFile={activeFile}
                    onOpenFile={openFile}
                    onCreateFile={createFile}
                    onCreateFolder={createFolder}
                    onDeleteFile={handleDeleteFile}
                    onRenameFile={renameFile}
                    onDeleteFolder={deleteFolder}
                    onUploadFile={uploadFile}
                    darkMode={darkMode}
                    onToggleDarkMode={toggleDarkMode}
                  />
                  <PanelResizeHandle onMouseDown={startSidebarDrag} />
                </>
              )}

              {/* Search panel */}
              {activePanel === 'search' && (
                <>
                  <SearchPanel
                    width={sidebarWidth}
                    files={files}
                    onOpenFile={openFile}
                  />
                  <PanelResizeHandle onMouseDown={startSidebarDrag} />
                </>
              )}

              {/* Editor + Output area */}
              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden', minWidth: 0 }}>
                <FileTabs
                  files={files}
                  openTabs={openTabs}
                  activeFile={activeFile}
                  onSelectTab={setActiveFile}
                  onCloseTab={closeTab}
                  onRun={handleRun}
                  isRunning={isRunning}
                  showOutput={showOutput}
                  onToggleOutput={() => setShowOutput((p) => !p)}
                />

                <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0, overflow: 'hidden' }}>
                    <CodeEditor
                      value={activeContent}
                      language={activeLanguage}
                      darkMode={darkMode}
                      settings={settings}
                      onChange={handleContentChange}
                      onCursorChange={setCursorPos}
                      ref={editorRef}
                    />
                  </Box>

                  {/* {showOutput && (
                    <>
                      <Box
                        sx={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center',
                          flexShrink: 0, width: 14, cursor: 'col-resize',
                          bgcolor: 'divider', opacity: 0.3, transition: 'opacity 120ms ease',
                          '&:hover': { opacity: 1 },
                        }}
                        onMouseDown={startOutputDrag}
                      >
                        <IconButton
                          size="small"
                          onMouseDown={(e) => e.stopPropagation()}
                          onClick={(e) => { e.stopPropagation(); setEditorMenuAnchor(e.currentTarget); }}
                          sx={{
                            p: 0.2, mt: 0.25, color: 'text.secondary',
                            '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
                            borderRadius: '4px', zIndex: 1, cursor: 'pointer',
                          }}
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <circle cx="5" cy="1.5" r="1" fill="currentColor" />
                            <circle cx="5" cy="5" r="1" fill="currentColor" />
                            <circle cx="5" cy="8.5" r="1" fill="currentColor" />
                          </svg>
                        </IconButton>
                      </Box>
                      <OutputPanel
                        ref={outputPanelRef}
                        width={outputWidth}
                        output={output}
                        isRunning={isRunning}
                        stdin={stdin}
                        onStdinChange={setStdin}
                        onClearOutput={clearOutput}
                        language={activeLanguage}
                        fileContent={activeContent}
                        onApplyFix={handleContentChange}
                        workspace={aiWorkspace}
                        actions={aiActions}
                      />
                    </>
                  )} */}
                </Box>
              </Box>
            </Box>

            {/* Status bar — desktop only */}
            <StatusBar
              runStatus={runStatus}
              output={output}
              cursorPosition={cursorPos}
              language={activeLanguage}
              activeFile={activeFile}
              fileContent={activeContent}
              showSaved={showSaved}
              onLanguageClick={() => setLangModalOpen(true)}
            />
          </>
        )}
      </Box>

      {/* Hidden OneCompiler bridge: keeps Run/Format working while Monaco is visible editor */}
      <Box sx={{ width: 0, height: 0, overflow: 'hidden', position: 'absolute', pointerEvents: 'none' }}>
        <Editor
          language={getLangById(activeLanguage)?.ocLang || activeLanguage}
          code={activeContent}
          fileName={activeFile || ''}
          activeFilePath={activeFile || ''}
          filesMap={files}
          darkMode={darkMode}
          onChange={handleContentChange}
          formatRef={formatRef}
          runRef={runRef}
        />
      </Box>

      {/* Language selector modal */}
      <LanguageModal
        open={langModalOpen}
        onClose={() => setLangModalOpen(false)}
        currentLangId={activeLanguage}
        onSelectLanguage={handleLanguageChange}
      />

      {/* New project modal */}
      <NewProjectModal
        open={newProjectOpen}
        onClose={() => setNewProjectOpen(false)}
        onCreateProject={handleCreateProject}
      />

      {/* Editor context menu */}
      <Menu
        anchorEl={editorMenuAnchor}
        open={Boolean(editorMenuAnchor)}
        onClose={() => setEditorMenuAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 130,
              bgcolor: (t) => t.palette.mode === 'dark' ? '#252830' : '#fff',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '6px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              py: 0.25,
            },
          },
        }}
      >
        <MenuItem onClick={handleClearEditor} sx={{ fontSize: 12.5, py: 0.5, px: 1.5, minHeight: 0 }}>Clear editor</MenuItem>
        <MenuItem onClick={handleCopyAll} sx={{ fontSize: 12.5, py: 0.5, px: 1.5, minHeight: 0 }}>Copy all</MenuItem>
        <MenuItem onClick={handlePaste} sx={{ fontSize: 12.5, py: 0.5, px: 1.5, minHeight: 0 }}>Paste</MenuItem>
      </Menu>

      {/* Settings Modal */}
      <SettingsModal
        open={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        settings={settings}
        onUpdateSetting={updateSetting}
      />
    </ThemeProvider>
  );
}
