import React, { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import Editor from '@monaco-editor/react';
import { getMonacoLanguage } from '../utils/languages';

/* ── custom themes ───────────────────────────────── */

function defineThemes(monaco) {
  monaco.editor.defineTheme('codepad-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#1A1D27',
      'editor.foreground': '#F3F4F6',
      'editorLineNumber.foreground': '#4a4e5e',
      'editorLineNumber.activeForeground': '#9CA3AF',
      'editor.selectionBackground': '#3b3f51',
      'editor.lineHighlightBackground': '#1f2233',
      'editorCursor.foreground': '#6366F1',
      'editorIndentGuide.background': '#2D2F3E',
      'editorIndentGuide.activeBackground': '#4a4e5e',
    },
  });

  monaco.editor.defineTheme('codepad-light', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#FFFFFF',
      'editor.foreground': '#111827',
      'editorLineNumber.foreground': '#9CA3AF',
      'editorLineNumber.activeForeground': '#6B7280',
      'editor.selectionBackground': '#dbeafe',
      'editor.lineHighlightBackground': '#F9FAFB',
      'editorCursor.foreground': '#4F46E5',
      'editorIndentGuide.background': '#E5E7EB',
      'editorIndentGuide.activeBackground': '#9CA3AF',
    },
  });
}

/* ── editor ─────────────────────────────────────── */

export default function CodeEditor({
  value,
  language,
  darkMode,
  settings = {},
  onChange,
  onCursorChange,
}) {
  const monacoLang = getMonacoLanguage(language);
  const themeName = darkMode ? 'codepad-dark' : 'codepad-light';

  const handleBeforeMount = useCallback((monaco) => {
    defineThemes(monaco);

    /* Disable built-in validators so Python/other files don't get
       red underlines from the JS/TS/JSON engines. */
    monaco.languages.typescript?.javascriptDefaults?.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
    monaco.languages.typescript?.typescriptDefaults?.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
    monaco.languages.json?.jsonDefaults?.setDiagnosticsOptions({
      validate: false,
    });
  }, []);

  /** Track cursor Ln / Col for the status bar */
  const handleEditorMount = useCallback(
    (editor) => {
      if (!onCursorChange) return;

      // Fire initial position
      const pos = editor.getPosition();
      if (pos) {
        onCursorChange({ line: pos.lineNumber, column: pos.column });
      }

      editor.onDidChangeCursorPosition((e) => {
        onCursorChange({
          line: e.position.lineNumber,
          column: e.position.column,
        });
      });
    },
    [onCursorChange],
  );

  if (!language) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: darkMode ? '#1A1D27' : '#FFFFFF',
        }}
      >
        <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
          Open a file from the explorer to start coding.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      id="code-editor"
      sx={{ flexGrow: 1, overflow: 'hidden', position: 'relative', minWidth: 0 }}
    >
      <Editor
        height="100%"
        language={monacoLang}
        value={value}
        theme={themeName}
        beforeMount={handleBeforeMount}
        onMount={handleEditorMount}
        onChange={(val) => onChange(val ?? '')}
        loading={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              bgcolor: darkMode ? '#1A1D27' : '#FFFFFF',
            }}
          >
            <Typography sx={{ color: 'text.secondary' }}>
              Loading editor…
            </Typography>
          </Box>
        }
        options={{
          fontFamily: settings.fontFamily ?? "'JetBrains Mono', monospace",
          fontLigatures: settings.fontLigatures ?? false,
          fontSize: settings.fontSize ?? 14,
          fontWeight: '400',
          lineNumbers: 'on',
          minimap: { enabled: settings.minimap ?? false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 12, bottom: 12 },
          renderLineHighlight: 'all',
          cursorStyle: settings.cursorStyle ?? 'line',
          cursorBlinking: settings.cursorBlinking ?? 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: settings.smoothScrolling ?? true,
          mouseWheelZoom: settings.mouseWheelZoom ?? false,
          renderWhitespace: settings.renderWhitespace ?? 'none',
          tabSize: settings.tabSize ?? 2,
          insertSpaces: settings.insertSpaces ?? true,
          autoIndent: (settings.autoIndent ?? true) ? 'advanced' : 'none',
          wordWrap: (settings.wordWrap ?? false) ? 'on' : 'off',
          formatOnType: settings.formatOnType ?? false,
          formatOnPaste: settings.formatOnPaste ?? false,
          suggest: {
            showKeywords: settings.autoComplete ?? true,
            showSnippets: settings.autoComplete ?? true,
            showClasses: settings.autoComplete ?? true,
            showVariables: settings.autoComplete ?? true,
            showFunctions: settings.autoComplete ?? true,
            showMethods: settings.autoComplete ?? true,
          },
          quickSuggestions: settings.autoComplete ?? true,
          bracketPairColorization: { enabled: true },
          guides: { indentation: true },
          folding: true,
          glyphMargin: false,
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          overviewRulerBorder: false,
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
      />
    </Box>
  );
}
