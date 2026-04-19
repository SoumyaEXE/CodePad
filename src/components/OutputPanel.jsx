import React, { useState, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import { Box, Typography, TextField, IconButton, Menu, MenuItem } from '@mui/material';
import AISidebar from './AISidebar';

/* ── Tab button ── */
function Tab({ label, icon, active, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        px: 1.25,
        py: 0.6,
        cursor: 'pointer',
        fontSize: 12,
        fontWeight: active ? 500 : 400,
        color: active ? 'text.primary' : 'text.secondary',
        borderBottom: '2px solid',
        borderColor: active ? 'primary.main' : 'transparent',
        transition: 'all 120ms ease',
        userSelect: 'none',
        '&:hover': { color: 'text.primary' },
        whiteSpace: 'nowrap',
      }}
    >
      {icon}
      {label}
    </Box>
  );
}

/* ── SVG icons ── */
function ConsoleSvg() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M2 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 9.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function IOSvg() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1.5" y="1.5" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4.5 5v3M6.5 4v5M8.5 6v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function BrowserSvg() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1.5" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1.5 5h10" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="3.5" cy="3.5" r="0.5" fill="currentColor" />
      <circle cx="5.2" cy="3.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
function AiAgentSvg() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 10l8.5 8.5M10 2.5l8.5 8.5" />
      <path d="M11.5 5.5l2-2 2.5 2.5-2 2-2.5-2.5z" />
      <path d="M14 8l1.5-1.5M11.5 10.5L13 9" />
      <circle cx="16" cy="16" r="3" />
      <path d="M18 14.5l2 2" />
      <path d="M14 18l-2-2" />
    </svg>
  );
}
function CheckCircle() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="#22c55e" strokeWidth="1.3" />
      <path d="M4 7l2 2 4-4" stroke="#22c55e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ErrorCircle() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="#ef4444" strokeWidth="1.3" />
      <path d="M5 5l4 4M9 5l-4 4" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function MoreVertSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="3" r="1.2" fill="currentColor" />
      <circle cx="7" cy="7" r="1.2" fill="currentColor" />
      <circle cx="7" cy="11" r="1.2" fill="currentColor" />
    </svg>
  );
}

/* ── Web languages that render in iframe ── */
const WEB_LANGS = new Set(['html', 'react', 'vuejs', 'angular', 'bootstrap', 'tailwindcss', 'htmx', 'alpinejs', 'chartjs', 'd3js', 'jquery', 'foundation', 'bulma', 'uikit', 'semanticui', 'skeleton', 'milligram', 'papercss', 'backbonejs', 'materialize', 'ejs', 'coffeescript']);

/* ═══════════════════════════════════════════════════ */
/*  OUTPUT PANEL                                      */
/* ═══════════════════════════════════════════════════ */

const OutputPanel = forwardRef(function OutputPanel({
  width = 380,
  output,
  isRunning,
  stdin,
  onStdinChange,
  onClearOutput,
  language,
  fileContent,
  onApplyFix,
  workspace,
  actions,
}, ref) {
  const [activeTab, setActiveTab] = useState('console');
  const [menuAnchor, setMenuAnchor] = useState(null);
  const menuOpen = Boolean(menuAnchor);
  const [contextMenuCoords, setContextMenuCoords] = useState(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuCoords({ mouseX: e.clientX, mouseY: e.clientY });
  };
  const handleCloseContextMenu = () => setContextMenuCoords(null);

  const handleCopyAll = () => {
    const textToCopy = `${output.stdout || ''}\n${output.stderr || ''}\n${output.exception || ''}\n${output.error || ''}`.trim();
    if (textToCopy) navigator.clipboard.writeText(textToCopy);
    handleCloseContextMenu();
  };

  useImperativeHandle(ref, () => ({
    switchToTab(tab) {
      setActiveTab(tab);
    },
  }), []);

  const hasRun = output.status !== null;
  const isSuccess = output.status === 'success' && !output.exception && !output.error;
  const hasOutput = output.stdout || output.stderr || output.exception || output.error;
  const isWebLang = WEB_LANGS.has(language);

  /* Build srcdoc for HTML preview */
  const htmlSrcDoc = useMemo(() => {
    if (!isWebLang || !fileContent) return '';
    return fileContent;
  }, [isWebLang, fileContent]);

  return (
    <Box
      id="output-panel"
      sx={{
        width: width,
        minWidth: 200,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: (t) => t.palette.mode === 'dark' ? '#0d0f14' : '#fafafa',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {/* ── Tab bar ──────────────────────────────── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          px: 0.5,
          minHeight: 34,
        }}
      >
        <Tab label="Console" icon={<ConsoleSvg />} active={activeTab === 'console'} onClick={() => setActiveTab('console')} />
        <Tab label="I/O" icon={<IOSvg />} active={activeTab === 'io'} onClick={() => setActiveTab('io')} />
        {isWebLang ? (
          <Tab label="Preview" icon={<BrowserSvg />} active={activeTab === 'preview'} onClick={() => setActiveTab('preview')} />
        ) : (
          <Tab label="AI Agent" icon={<AiAgentSvg />} active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} />
        )}

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Execution time + status indicator */}
        {hasRun && !isRunning && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, pr: 0.5 }}>
            {output.executionTime != null && (
              <Typography
                sx={{
                  fontSize: 11,
                  color: 'text.secondary',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {output.executionTime} ms
              </Typography>
            )}
            {isSuccess ? <CheckCircle /> : <ErrorCircle />}
          </Box>
        )}

        {isRunning && (
          <Typography
            sx={{
              fontSize: 11,
              color: '#22c55e',
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 500,
              pr: 0.5,
            }}
          >
            ● Running
          </Typography>
        )}

        {/* 3-dot menu */}
        <IconButton
          size="small"
          onClick={(e) => setMenuAnchor(e.currentTarget)}
          sx={{ p: 0.3, color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
        >
          <MoreVertSvg />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={menuOpen}
          onClose={() => setMenuAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
          <MenuItem
            onClick={() => { setMenuAnchor(null); onClearOutput?.(); }}
            sx={{ fontSize: 12.5, py: 0.5, px: 1.5, minHeight: 0 }}
          >
            Clear output
          </MenuItem>
        </Menu>
      </Box>

      {/* ── I/O Tab — STDIN input ───────────────── */}
      {activeTab === 'io' && (
        <Box sx={{ px: 1.5, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography
            sx={{ fontWeight: 600, fontSize: 11, letterSpacing: '0.05em', color: 'text.secondary', mb: 0.5, userSelect: 'none' }}
          >
            STDIN
          </Typography>
          <TextField
            multiline
            rows={3}
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Input for the program ( Optional )"
            value={stdin}
            onChange={(e) => onStdinChange(e.target.value)}
            sx={{
              '& .MuiInputBase-root': { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, bgcolor: 'transparent' },
              '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'divider' } },
            }}
          />
        </Box>
      )}

      {/* ── Preview Tab — HTML iframe ────────────── */}
      {activeTab === 'preview' && isWebLang && (
        <Box sx={{ flexGrow: 1, overflow: 'hidden', bgcolor: '#fff' }}>
          <iframe
            srcDoc={htmlSrcDoc}
            title="web-preview"
            sandbox="allow-scripts allow-downloads"
            style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }}
          />
        </Box>
      )}

      <Box
        sx={{
          display: activeTab === 'ai' ? 'flex' : 'none',
          flexGrow: 1,
          overflow: 'hidden',
          flexDirection: 'column'
        }}
      >
        <AISidebar
          activeContent={fileContent}
          onApplyFix={onApplyFix}
          workspace={workspace}
          actions={actions}
        />
      </Box>

      {/* ── Console output area ─────────────────── */}
      {(activeTab === 'console' || activeTab === 'io') && (
        <Box
          onContextMenu={handleContextMenu}
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            px: 1.5,
            py: 1,
            '&::-webkit-scrollbar': { width: 5 },
            '&::-webkit-scrollbar-thumb': { bgcolor: 'action.disabled', borderRadius: 3 },
          }}
        >
          {activeTab === 'io' && (
            <Typography sx={{ fontWeight: 600, fontSize: 11, letterSpacing: '0.05em', color: 'text.secondary', mb: 0.5, userSelect: 'none' }}>
              Output:
            </Typography>
          )}

          {isRunning ? (
            <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'text.secondary' }}>
              Running…
            </Typography>
          ) : hasRun ? (
            <Box sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: 1.6 }}>
              {output.stdout && <Box component="span" sx={{ color: 'text.primary' }}>{output.stdout}</Box>}
              {output.stderr && <Box component="span" sx={{ color: '#ef4444', display: 'block', mt: output.stdout ? 0.5 : 0 }}>{output.stderr}</Box>}
              {output.exception && <Box component="span" sx={{ color: '#ef4444', display: 'block', mt: output.stdout ? 0.5 : 0 }}>{output.exception}</Box>}
              {output.error && <Box component="span" sx={{ color: '#f59e0b', display: 'block', mt: 0.5 }}>{output.error}</Box>}
              {!hasOutput && <Box component="span" sx={{ color: 'text.secondary' }}>Program finished with no output.</Box>}
            </Box>
          ) : (
            <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'text.secondary' }}>
              Click on RUN button to see the output
            </Typography>
          )}
        </Box>
      )}

      {/* ── Custom Context Menu ─────────────────── */}
      <Menu
        open={contextMenuCoords !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenuCoords !== null
            ? { top: contextMenuCoords.mouseY, left: contextMenuCoords.mouseX }
            : undefined
        }
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
        <MenuItem
          onClick={() => { handleCloseContextMenu(); onClearOutput?.(); }}
          sx={{ fontSize: 12.5, py: 0.5, px: 1.5, minHeight: 0 }}
        >
          Clear output
        </MenuItem>
        <MenuItem
          onClick={handleCopyAll}
          sx={{ fontSize: 12.5, py: 0.5, px: 1.5, minHeight: 0 }}
        >
          Copy all
        </MenuItem>
      </Menu>
    </Box>
  );
});

export default OutputPanel;
