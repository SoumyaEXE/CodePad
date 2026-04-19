import { useState, useCallback } from 'react';

const DEFAULTS = {
  fontSize: 14,
  fontFamily: "'JetBrains Mono', monospace",
  fontLigatures: false,
  tabSize: 2,
  insertSpaces: true,       // false = tabs
  autoIndent: true,
  wordWrap: false,
  formatOnType: false,
  formatOnPaste: false,
  formatter: false,
  autoComplete: true,
  minimap: false,
  cursorStyle: 'line',
  cursorBlinking: 'smooth',
  renderWhitespace: 'none',
  mouseWheelZoom: false,
  smoothScrolling: true,
};

const KEY = 'codePad_editorSettings';

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : { ...DEFAULTS };
  } catch {
    return { ...DEFAULTS };
  }
}

export function useEditorSettings() {
  const [settings, setSettings] = useState(load);

  const update = useCallback((key, value) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  return { settings, update };
}
