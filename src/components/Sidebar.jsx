import React, { useState, useRef, useMemo } from 'react';
import {
  Box, Typography, IconButton, TextField, Tooltip,
  Menu, MenuItem,
} from '@mui/material';
import { FileIcon, FolderIcon, ChevronIcon } from './FileIcon';

/* ── Tiny SVG icons for the context menu ─────────── */

function MoreVertSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="3" r="1.2" fill="currentColor" />
      <circle cx="7" cy="7" r="1.2" fill="currentColor" />
      <circle cx="7" cy="11" r="1.2" fill="currentColor" />
    </svg>
  );
}

function RenameSvg() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M8.5 2.5l4 4-8 8H.5v-4l8-8Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M7 4l4 4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

function DownloadSvg() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M7.5 1.5v9M4 8l3.5 3.5L11 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 12.5h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function DeleteSvg() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M2.5 4.5h10M5 4.5V3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M3.5 4.5l.7 8.5a1 1 0 0 0 1 .9h4.6a1 1 0 0 0 1-.9l.7-8.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M6 7v4M9 7v4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

/* ── Icons (inline SVGs for crispness) ───────────── */

function NewFileSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 1h5.5L13 4.5V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.1" fill="none" />
      <path d="M9.5 1v3.5H13" stroke="currentColor" strokeWidth="1.1" fill="none" />
      <path d="M8 7v5M5.5 9.5h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function NewFolderSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1.5 3.5A1 1 0 0 1 2.5 2.5H5.5L7 4h6.5a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V3.5Z" stroke="currentColor" strokeWidth="1.1" fill="none" />
      <path d="M7.5 7.5v4M5.5 9.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function UploadSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2.5 10.5v2a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M8 10V3M5 5.5 8 2.5l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CollapseAllSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 5h8M4 8h8M4 11h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M2 5l1.5 1L2 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Tree builder ────────────────────────────────── */

function buildTree(files, explicitFolders = []) {
  const root = [];
  const folderNodes = {};

  function ensureFolder(folderPath) {
    if (folderNodes[folderPath]) return folderNodes[folderPath];
    const parts = folderPath.split('/');
    const name = parts[parts.length - 1];
    const parentPath = parts.slice(0, -1).join('/');
    const node = { type: 'folder', name, path: folderPath, children: [] };
    folderNodes[folderPath] = node;
    if (parentPath) {
      const parent = ensureFolder(parentPath);
      if (!parent.children.find((c) => c.path === folderPath)) {
        parent.children.push(node);
      }
    } else {
      if (!root.find((c) => c.path === folderPath)) root.push(node);
    }
    return node;
  }

  for (const fp of explicitFolders) ensureFolder(fp);

  for (const [filePath, fileData] of Object.entries(files)) {
    const parts = filePath.split('/');
    const name = parts[parts.length - 1];
    const parentPath = parts.slice(0, -1).join('/');
    const fileNode = { type: 'file', name, path: filePath, language: fileData.language };
    if (parentPath) {
      ensureFolder(parentPath).children.push(fileNode);
    } else {
      root.push(fileNode);
    }
  }

  function sortNodes(arr) {
    arr.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    for (const n of arr) {
      if (n.type === 'folder') sortNodes(n.children);
    }
  }
  sortNodes(root);
  return root;
}

/* ── Inline rename / create input ────────────────── */

function InlineInput({ placeholder, onSubmit, onCancel }) {
  const [value, setValue] = useState('');
  return (
    <TextField
      autoFocus
      fullWidth
      size="small"
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const v = value.trim();
          if (v) onSubmit(v);
          else onCancel();
        }
        if (e.key === 'Escape') onCancel();
      }}
      onBlur={() => {
        const v = value.trim();
        if (v) onSubmit(v);
        else onCancel();
      }}
      sx={{
        '& .MuiInputBase-input': {
          fontSize: 12,
          py: 0.4,
          px: 0.75,
          fontFamily: "'JetBrains Mono', monospace",
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: 'primary.main' },
        },
      }}
    />
  );
}

/* ── File row (with 3-dot context menu) ──────────── */

function FileRow({ node, depth, isActive, onOpen, onDelete, onRename, onDownload, isOnly }) {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contextMenuCoords, setContextMenuCoords] = useState(null);
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(node.name);
  const btnRef = useRef(null);

  const handleMenuOpen = (e) => {
    e.stopPropagation();
    setMenuOpen(true);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenuCoords({ mouseX: e.clientX, mouseY: e.clientY });
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setContextMenuCoords(null);
  };

  const handleRename = () => {
    handleMenuClose();
    setRenameValue(node.name);
    setRenaming(true);
  };

  const handleRenameSubmit = () => {
    const trimmed = renameValue.trim();
    if (trimmed && trimmed !== node.name) {
      onRename(node.path, trimmed);
    }
    setRenaming(false);
  };

  const handleDownload = () => {
    handleMenuClose();
    onDownload(node.path);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete(node.path);
  };

  /* Inline rename mode */
  if (renaming) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          pl: 1.5 + depth * 1.25,
          pr: 0.75,
          py: 0.25,
          minHeight: 26,
        }}
      >
        <FileIcon language={node.language} size={15} />
        <TextField
          autoFocus
          size="small"
          variant="outlined"
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRenameSubmit();
            if (e.key === 'Escape') setRenaming(false);
          }}
          onBlur={handleRenameSubmit}
          sx={{
            ml: 0.75,
            flexGrow: 1,
            '& .MuiInputBase-input': {
              fontSize: 12,
              py: 0.3,
              px: 0.5,
              fontFamily: "'JetBrains Mono', monospace",
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'primary.main' },
            },
          }}
        />
      </Box>
    );
  }

  return (
    <>
      <Box
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onOpen(node.path)}
        onContextMenu={handleContextMenu}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pl: 1.5 + depth * 1.25,
          pr: 0.75,
          py: 0.4,
          cursor: 'pointer',
          bgcolor: isActive ? 'action.selected' : 'transparent',
          '&:hover': { bgcolor: 'action.hover' },
          transition: 'background-color 150ms ease',
          userSelect: 'none',
          minHeight: 26,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
          <FileIcon language={node.language} size={15} />
          <Typography
            variant="body2"
            noWrap
            sx={{
              fontSize: 13,
              color: isActive ? 'text.primary' : 'text.secondary',
              fontWeight: isActive ? 500 : 400,
            }}
          >
            {node.name}
          </Typography>
        </Box>

        {/* 3-dot menu button — visible on hover OR when menu is open */}
        <IconButton
          ref={btnRef}
          size="small"
          onClick={handleMenuOpen}
          sx={{
            p: 0.2,
            opacity: hovered || menuOpen ? 0.6 : 0,
            '&:hover': { opacity: 1 },
            transition: 'opacity 100ms ease',
            pointerEvents: hovered || menuOpen ? 'auto' : 'none',
          }}
        >
          <MoreVertSvg />
        </IconButton>
      </Box>

      {/* Context menu — compact, reference-matching style */}
      <Menu
        anchorEl={contextMenuCoords !== null ? null : btnRef.current}
        open={menuOpen || contextMenuCoords !== null}
        onClose={handleMenuClose}
        anchorReference={contextMenuCoords !== null ? 'anchorPosition' : 'anchorEl'}
        anchorPosition={
          contextMenuCoords !== null
            ? { top: contextMenuCoords.mouseY, left: contextMenuCoords.mouseX }
            : undefined
        }
        anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
        transformOrigin={contextMenuCoords !== null ? undefined : { vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 120,
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
          onClick={handleRename}
          sx={{ fontSize: 12.5, py: 0.5, px: 1.5, minHeight: 0 }}
        >
          Rename
        </MenuItem>
        <MenuItem
          onClick={handleDownload}
          sx={{ fontSize: 12.5, py: 0.5, px: 1.5, minHeight: 0 }}
        >
          Download
        </MenuItem>
        {!isOnly && (
          <MenuItem
            onClick={handleDelete}
            sx={{ fontSize: 12.5, py: 0.5, px: 1.5, minHeight: 0, color: 'error.main' }}
          >
            Delete
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

/* ── Folder row ──────────────────────────────────── */

function FolderRow({
  node,
  depth,
  collapsed,
  onToggle,
  onDelete,
  onCreateInside,
  children,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <Box
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onToggle(node.path)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pl: 1 + depth * 1.25,
          pr: 0.75,
          py: 0.4,
          cursor: 'pointer',
          '&:hover': { bgcolor: 'action.hover' },
          transition: 'background-color 150ms ease',
          userSelect: 'none',
          minHeight: 26,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0 }}>
          <ChevronIcon expanded={!collapsed} size={10} />
          <FolderIcon open={!collapsed} size={15} />
          <Typography
            variant="body2"
            noWrap
            sx={{ fontSize: 13, color: 'text.primary', fontWeight: 500 }}
          >
            {node.name}
          </Typography>
        </Box>

        {hovered && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.1 }}>
            <Tooltip title="New file inside" arrow placement="top">
              <IconButton
                size="small"
                onClick={(e) => { e.stopPropagation(); onCreateInside(node.path, 'file'); }}
                sx={{ p: 0.2, opacity: 0.6, '&:hover': { opacity: 1 } }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete folder" arrow placement="top">
              <IconButton
                size="small"
                onClick={(e) => { e.stopPropagation(); onDelete(node.path); }}
                sx={{ p: 0.2, opacity: 0.6, '&:hover': { opacity: 1, color: 'error.main' } }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>

      {!collapsed && children}
    </>
  );
}

/* ── Recursive tree renderer ─────────────────────── */

function TreeView({
  nodes,
  depth,
  activeFile,
  collapsedFolders,
  creatingIn,
  createType,
  fileCount,
  onToggleFolder,
  onOpenFile,
  onDeleteFile,
  onRenameFile,
  onDownloadFile,
  onDeleteFolder,
  onCreateInside,
  onSubmitCreate,
  onCancelCreate,
}) {
  return nodes.map((node) => {
    if (node.type === 'folder') {
      const isCollapsed = collapsedFolders.has(node.path);
      return (
        <React.Fragment key={`folder-${node.path}`}>
          <FolderRow
            node={node}
            depth={depth}
            collapsed={isCollapsed}
            onToggle={onToggleFolder}
            onDelete={onDeleteFolder}
            onCreateInside={onCreateInside}
          >
            {/* inline create input inside this folder */}
            {creatingIn === node.path && (
              <Box sx={{ pl: 2.75 + depth * 1.25, pr: 1, py: 0.3 }}>
                <InlineInput
                  placeholder={createType === 'folder' ? 'folder name' : 'filename.py'}
                  onSubmit={(name) => onSubmitCreate(name, node.path)}
                  onCancel={onCancelCreate}
                />
              </Box>
            )}
            <TreeView
              nodes={node.children}
              depth={depth + 1}
              activeFile={activeFile}
              collapsedFolders={collapsedFolders}
              creatingIn={creatingIn}
              createType={createType}
              fileCount={fileCount}
              onToggleFolder={onToggleFolder}
              onOpenFile={onOpenFile}
              onDeleteFile={onDeleteFile}
              onRenameFile={onRenameFile}
              onDownloadFile={onDownloadFile}
              onDeleteFolder={onDeleteFolder}
              onCreateInside={onCreateInside}
              onSubmitCreate={onSubmitCreate}
              onCancelCreate={onCancelCreate}
            />
          </FolderRow>
        </React.Fragment>
      );
    }

    return (
      <FileRow
        key={node.path}
        node={node}
        depth={depth}
        isActive={node.path === activeFile}
        onOpen={onOpenFile}
        onDelete={onDeleteFile}
        onRename={onRenameFile}
        onDownload={onDownloadFile}
        isOnly={fileCount <= 1}
      />
    );
  });
}

/* ═══════════════════════════════════════════════════ */
/*  SIDEBAR (exported)                                */
/* ═══════════════════════════════════════════════════ */

export default function Sidebar({
  width = 220,
  files,
  folders,
  activeFile,
  onOpenFile,
  onCreateFile,
  onCreateFolder,
  onDeleteFile,
  onRenameFile,
  onDeleteFolder,
  onUploadFile,
  darkMode,
  onToggleDarkMode,
}) {
  /* local state */
  const [collapsedFolders, setCollapsedFolders] = useState(new Set());
  const [creatingIn, setCreatingIn] = useState(null);   // null | '' (root) | 'path'
  const [createType, setCreateType] = useState('file');  // 'file' | 'folder'
  const uploadRef = useRef(null);

  const fileCount = Object.keys(files).length;

  /* build tree */
  const tree = useMemo(() => buildTree(files, folders), [files, folders]);

  /* toggle folder */
  const toggleFolder = (path) => {
    setCollapsedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  /* collapse all */
  const collapseAll = () => {
    setCollapsedFolders(new Set(folders));
  };

  /* create inside a folder */
  const handleCreateInside = (folderPath, type) => {
    setCreatingIn(folderPath);
    setCreateType(type);
    // make sure the folder is expanded
    setCollapsedFolders((prev) => {
      const next = new Set(prev);
      next.delete(folderPath);
      return next;
    });
  };

  /* submit creation */
  const handleSubmitCreate = (name, parentPath) => {
    const fullPath = parentPath ? `${parentPath}/${name}` : name;
    if (createType === 'folder') {
      onCreateFolder(fullPath);
    } else {
      onCreateFile(fullPath);
    }
    setCreatingIn(null);
  };

  /* cancel creation */
  const handleCancelCreate = () => {
    setCreatingIn(null);
  };

  /* file upload */
  const handleUploadChange = (e) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    for (const f of fileList) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        onUploadFile(f.name, ev.target.result);
      };
      reader.readAsText(f);
    }
    e.target.value = '';
  };

  /* download file as .txt blob */
  const handleDownloadFile = (filePath) => {
    const file = files[filePath];
    if (!file) return;
    const name = filePath.split('/').pop();
    const blob = new Blob([file.content || ''], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Box
      id="sidebar"
      sx={{
        width: width,
        minWidth: 160,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {/* ── Header with toolbar ─────────────────── */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 1.5,
          py: 0.75,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: '0.08em',
            color: 'text.secondary',
            userSelect: 'none',
          }}
        >
          EXPLORER
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.1 }}>
          <Tooltip title="New File" arrow>
            <IconButton
              size="small"
              onClick={() => { setCreatingIn(''); setCreateType('file'); }}
              sx={{ p: 0.35, color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
            >
              <NewFileSvg />
            </IconButton>
          </Tooltip>

          <Tooltip title="New Folder" arrow>
            <IconButton
              size="small"
              onClick={() => { setCreatingIn(''); setCreateType('folder'); }}
              sx={{ p: 0.35, color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
            >
              <NewFolderSvg />
            </IconButton>
          </Tooltip>

          <Tooltip title="Upload File" arrow>
            <IconButton
              size="small"
              onClick={() => uploadRef.current?.click()}
              sx={{ p: 0.35, color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
            >
              <UploadSvg />
            </IconButton>
          </Tooltip>

          <Tooltip title="Collapse All" arrow>
            <IconButton
              size="small"
              onClick={collapseAll}
              sx={{ p: 0.35, color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
            >
              <CollapseAllSvg />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* hidden upload input */}
      <input
        ref={uploadRef}
        type="file"
        multiple
        accept=".py,.js,.jsx,.ts,.tsx,.java,.cpp,.c,.h,.hpp,.rb,.go,.rs,.html,.css,.json,.md,.txt,.xml,.yaml,.yml,.toml,.sh,.bat"
        onChange={handleUploadChange}
        style={{ display: 'none' }}
      />

      {/* ── File tree ───────────────────────────── */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', py: 0.5 }}>
        {/* root-level inline create */}
        {creatingIn === '' && (
          <Box sx={{ px: 1, py: 0.3 }}>
            <InlineInput
              placeholder={createType === 'folder' ? 'folder name' : 'filename.py'}
              onSubmit={(name) => handleSubmitCreate(name, '')}
              onCancel={handleCancelCreate}
            />
          </Box>
        )}

        <TreeView
          nodes={tree}
          depth={0}
          activeFile={activeFile}
          collapsedFolders={collapsedFolders}
          creatingIn={creatingIn}
          createType={createType}
          fileCount={fileCount}
          onToggleFolder={toggleFolder}
          onOpenFile={onOpenFile}
          onDeleteFile={onDeleteFile}
          onRenameFile={onRenameFile}
          onDownloadFile={handleDownloadFile}
          onDeleteFolder={onDeleteFolder}
          onCreateInside={handleCreateInside}
          onSubmitCreate={handleSubmitCreate}
          onCancelCreate={handleCancelCreate}
        />
      </Box>

    </Box>
  );
}
