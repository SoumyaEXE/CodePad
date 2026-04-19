import { useState, useCallback, useEffect, useRef } from 'react';
import { getLanguageFromExtension } from '../utils/languages';

const KEYS = {
  FILES: 'codePad_files',
  TABS: 'codePad_openTabs',
  ACTIVE: 'codePad_activeFile',
  FOLDERS: 'codePad_folders',
};

const DEFAULT_FILES = {
  'main.py': {
    content:
      '# Welcome to CodePad!\n# Write your Python code here and click Run.\n\nprint("Hello, World!")\n',
    language: 'python',
  },
  'arithmetic.py': {
    content:
      'a = int(input("Enter Number 1: "))\nb = int(input("Enter Number 2: "))\n\nsum_result = a + b\ndiff_result = a - b\nprod_result = a * b\n\nprint(f"Sum: {sum_result}")\nprint(f"Difference: {diff_result}")\nprint(f"Product: {prod_result}")\n',
    language: 'python',
  },
  'greeting.js': {
    content:
      '// JavaScript greeting example\n\nfunction greet(name) {\n  return `Hello, ${name}! Welcome to CodePad.`;\n}\n\nconsole.log(greet("World"));\n',
    language: 'javascript',
  },
};

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full — silent */
  }
}

export function useFileSystem() {
  /* ── state ─────────────────────────────────────── */
  const [files, setFiles] = useState(() => load(KEYS.FILES, DEFAULT_FILES));
  const [folders, setFolders] = useState(() => load(KEYS.FOLDERS, []));

  const [openTabs, setOpenTabs] = useState(() => {
    const saved = load(KEYS.TABS, null);
    if (saved && saved.length > 0) return saved;
    return Object.keys(load(KEYS.FILES, DEFAULT_FILES)).slice(0, 2);
  });

  const [activeFile, setActiveFile] = useState(() => {
    const saved = load(KEYS.ACTIVE, null);
    if (saved) return saved;
    const all = Object.keys(load(KEYS.FILES, DEFAULT_FILES));
    return all[0] || '';
  });

  const [showSaved, setShowSaved] = useState(false);
  const fadeRef = useRef(null);

  /* ── persist on every change ───────────────────── */
  useEffect(() => save(KEYS.FILES, files), [files]);
  useEffect(() => save(KEYS.FOLDERS, folders), [folders]);
  useEffect(() => save(KEYS.TABS, openTabs), [openTabs]);
  useEffect(() => save(KEYS.ACTIVE, activeFile), [activeFile]);

  /* ── consistency guard ─────────────────────────── */
  useEffect(() => {
    const names = Object.keys(files);
    if (names.length === 0) return;
    if (!files[activeFile]) {
      const valid = openTabs.find((t) => files[t]) || names[0];
      setActiveFile(valid);
      if (!openTabs.includes(valid))
        setOpenTabs((prev) => [...prev, valid]);
    }
  }, [files, activeFile, openTabs]);

  /* ── helpers ───────────────────────────────────── */

  const flashSaved = useCallback(() => {
    setShowSaved(true);
    clearTimeout(fadeRef.current);
    fadeRef.current = setTimeout(() => setShowSaved(false), 1500);
  }, []);

  /** Ensure all parent folders for a path exist in the folders list */
  const ensureParentFolders = useCallback((filePath) => {
    const parts = filePath.split('/');
    if (parts.length <= 1) return;
    setFolders((prev) => {
      const next = [...prev];
      let path = '';
      for (let i = 0; i < parts.length - 1; i++) {
        path = path ? `${path}/${parts[i]}` : parts[i];
        if (!next.includes(path)) next.push(path);
      }
      return next;
    });
  }, []);

  /* ── actions ───────────────────────────────────── */

  const updateFileContent = useCallback(
    (filename, content) => {
      setFiles((prev) => ({
        ...prev,
        [filename]: { ...prev[filename], content },
      }));
      flashSaved();
    },
    [flashSaved],
  );

  const createFile = useCallback(
    (filename) => {
      const language = getLanguageFromExtension(filename);
      ensureParentFolders(filename);
      setFiles((prev) => ({
        ...prev,
        [filename]: { content: '', language },
      }));
      setOpenTabs((prev) =>
        prev.includes(filename) ? prev : [...prev, filename],
      );
      setActiveFile(filename);
    },
    [ensureParentFolders],
  );

  const createFolder = useCallback((folderPath) => {
    const normalized = folderPath.replace(/\/+$/, '').trim();
    if (!normalized) return;
    setFolders((prev) => {
      const next = [...prev];
      // ensure all ancestors too
      const parts = normalized.split('/');
      let path = '';
      for (const part of parts) {
        path = path ? `${path}/${part}` : part;
        if (!next.includes(path)) next.push(path);
      }
      return next;
    });
  }, []);

  const deleteFile = useCallback((filename) => {
    setFiles((prev) => {
      const next = { ...prev };
      delete next[filename];
      return next;
    });
    setOpenTabs((prev) => prev.filter((f) => f !== filename));
    // consistency guard handles activeFile
  }, []);

  const deleteFolder = useCallback((folderPath) => {
    // Remove the folder and all sub-folders
    setFolders((prev) =>
      prev.filter(
        (f) => f !== folderPath && !f.startsWith(folderPath + '/'),
      ),
    );
    // Remove all files inside the folder
    setFiles((prev) => {
      const next = {};
      for (const [path, data] of Object.entries(prev)) {
        if (!path.startsWith(folderPath + '/')) {
          next[path] = data;
        }
      }
      return next;
    });
    // Close tabs for deleted files
    setOpenTabs((prev) =>
      prev.filter((t) => !t.startsWith(folderPath + '/')),
    );
  }, []);

  const uploadFile = useCallback(
    (filename, content) => {
      const language = getLanguageFromExtension(filename);
      ensureParentFolders(filename);
      setFiles((prev) => ({
        ...prev,
        [filename]: { content, language },
      }));
      setOpenTabs((prev) =>
        prev.includes(filename) ? prev : [...prev, filename],
      );
      setActiveFile(filename);
      flashSaved();
    },
    [ensureParentFolders, flashSaved],
  );

  const openFile = useCallback(
    (filename) => {
      if (!files[filename]) return;
      setOpenTabs((prev) =>
        prev.includes(filename) ? prev : [...prev, filename],
      );
      setActiveFile(filename);
    },
    [files],
  );

  const closeTab = useCallback((filename) => {
    setOpenTabs((prevTabs) => {
      const idx = prevTabs.indexOf(filename);
      const newTabs = prevTabs.filter((f) => f !== filename);

      setActiveFile((prevActive) => {
        if (prevActive === filename && newTabs.length > 0) {
          return newTabs[Math.min(idx, newTabs.length - 1)];
        }
        if (newTabs.length === 0) return '';
        return prevActive;
      });

      return newTabs;
    });
  }, []);

  /** Change the language of a file (without renaming) */
  const changeFileLanguage = useCallback(
    (filename, newLangId) => {
      setFiles((prev) => {
        if (!prev[filename]) return prev;
        return {
          ...prev,
          [filename]: { ...prev[filename], language: newLangId },
        };
      });
    },
    [],
  );

  /** Rename a file — same parent directory, new base name */
  const renameFile = useCallback(
    (oldPath, newName) => {
      const parts = oldPath.split('/');
      parts[parts.length - 1] = newName;
      const newPath = parts.join('/');
      if (newPath === oldPath) return;

      setFiles((prev) => {
        if (!prev[oldPath]) return prev;
        const next = { ...prev };
        const lang = getLanguageFromExtension(newName);
        next[newPath] = { ...next[oldPath], language: lang };
        delete next[oldPath];
        return next;
      });

      setOpenTabs((prev) =>
        prev.map((t) => (t === oldPath ? newPath : t)),
      );

      setActiveFile((prev) => (prev === oldPath ? newPath : prev));
    },
    [],
  );

  return {
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
  };
}
