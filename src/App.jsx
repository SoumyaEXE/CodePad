import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { ThemeProvider, CssBaseline, Box, IconButton, Menu, MenuItem } from '@mui/material';

import { getTheme } from './theme';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import FileTabs from './components/FileTabs';
import CodeEditor from './components/CodeEditor';
import OutputPanel from './components/OutputPanel';
import StatusBar from './components/StatusBar';
import LanguageModal from './components/LanguageModal';
import NewProjectModal from './components/NewProjectModal';
import SettingsModal from './components/SettingsModal';
import AISidebar from './components/AISidebar';
import { useFileSystem } from './hooks/useFileSystem';
import { useCodeExecution } from './hooks/useCodeExecution';
import { useEditorSettings } from './hooks/useEditorSettings';
import { getLanguageFromExtension } from './utils/languages';

/* ── Thin resize handle (no 3D) ───────────────────── */

function ResizeHandle({ onMouseDown }) {
  return (
    <Box
      onMouseDown={onMouseDown}
      sx={{
        width: 3,
        cursor: 'col-resize',
        flexShrink: 0,
        bgcolor: 'divider',
        opacity: 0.3,
        transition: 'opacity 120ms ease',
        '&:hover': { opacity: 1 },
      }}
    />
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

  /* ── sidebar toggle ────────────────────────────── */
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = useCallback(() => setSidebarOpen((p) => !p), []);

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
  } = useFileSystem();

  /* ── execution ─────────────────────────────── */
  const { execute, isRunning, output, clearOutput } = useCodeExecution();
  const [runStatus, setRunStatus] = useState('idle');
  const [stdin, setStdin] = useState('');
  const [showOutput, setShowOutput] = useState(true);
  const outputPanelRef = useRef(null);

  const handleRun = useCallback(async () => {
    const file = files[activeFile];
    if (!file) return;
    setShowOutput(true);
    // Switch to I/O tab so user sees the output
    outputPanelRef.current?.switchToTab('io');
    const result = await execute(file.content, file.language, stdin);
    setRunStatus(result.success ? 'success' : 'idle');
  }, [files, activeFile, stdin, execute]);

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
      // Ctrl+B → toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setSidebarOpen((p) => !p);
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
    (template) => {
      const lang = getLanguageFromExtension(template.file);
      createFile(template.file);
      // Need to set content after creation
      setTimeout(() => {
        updateFileContent(template.file, template.code);
        if (template.id) changeFileLanguage(template.file, template.id);
      }, 50);
    },
    [createFile, updateFileContent, changeFileLanguage],
  );

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



  /* ── render ────────────────────────────────────── */
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Drag overlay — blocks iframe from stealing mouse events */}
      {isDragging && (
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            cursor: 'col-resize',
          }}
        />
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
        />

        {/* Main area */}
        <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
          {/* Sidebar */}
          {sidebarOpen && (
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
              <ResizeHandle onMouseDown={startSidebarDrag} />
            </>
          )}

          {/* Editor + Output area */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              overflow: 'hidden',
              minWidth: 0,
            }}
          >
            {/* Tab bar */}
            <FileTabs
              openTabs={openTabs}
              activeFile={activeFile}
              onSelectTab={setActiveFile}
              onCloseTab={closeTab}
              onRun={handleRun}
              isRunning={isRunning}
              showOutput={showOutput}
              onToggleOutput={() => setShowOutput((p) => !p)}
            />

            {/* Editor + Output split */}
            <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0, overflow: 'hidden' }}>
                <CodeEditor
                  value={activeContent}
                  language={activeLanguage}
                  darkMode={darkMode}
                  settings={settings}
                  onChange={handleContentChange}
                  onCursorChange={setCursorPos}
                />
              </Box>

              {showOutput && (
                <>
                  {/* Resize gutter with editor 3-dot at top */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flexShrink: 0,
                      width: 14,
                      cursor: 'col-resize',
                      bgcolor: 'divider',
                      opacity: 0.3,
                      transition: 'opacity 120ms ease',
                      '&:hover': { opacity: 1 },
                    }}
                    onMouseDown={startOutputDrag}
                  >
                    <IconButton
                      size="small"
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => { e.stopPropagation(); setEditorMenuAnchor(e.currentTarget); }}
                      sx={{
                        p: 0.2,
                        mt: 0.25,
                        color: 'text.secondary',
                        '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
                        borderRadius: '4px',
                        zIndex: 1,
                        cursor: 'pointer',
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
              )}
            </Box>
          </Box>
        </Box>

        {/* Status bar */}
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
