import React, { useState } from 'react';
import {
  Dialog, Box, Typography, IconButton,
  Select, MenuItem, Checkbox, FormControlLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SECTIONS = [
  { key: 'typography', label: 'Typography' },
  { key: 'indentation', label: 'Indentation' },
  { key: 'wordWrap', label: 'Word Wrap' },
  { key: 'formatting', label: 'Formatting' },
  { key: 'completion', label: 'Completion' },
  { key: 'display', label: 'Cursor & Display' },
];

/* Styled select wrapper */
function SettingSelect({ value, onChange, children }) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
      fullWidth
      sx={{
        mt: 1,
        bgcolor: (t) => t.palette.mode === 'dark' ? '#1a1d28' : '#f0f0f0',
        borderRadius: '6px',
        fontSize: 13,
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
        '& .MuiSelect-select': { py: 1 },
      }}
    >
      {children}
    </Select>
  );
}

/* Styled checkbox */
function SettingCheck({ label, checked, onChange, description }) {
  return (
    <Box sx={{ mb: 2 }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            size="small"
            sx={{ p: 0.5, mr: 0.75 }}
          />
        }
        label={
          <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.5 }}>
            {description || label}
          </Typography>
        }
      />
    </Box>
  );
}

/* Section content renderers */
function TypographySection({ settings, update }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 0.5 }}>
        Font Family
      </Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1 }}>
        Controls the font family
      </Typography>
      <SettingSelect
        value={settings.fontFamily}
        onChange={(v) => update('fontFamily', v)}
      >
        <MenuItem value="'JetBrains Mono', monospace" sx={{ fontSize: 13 }}>JetBrains Mono</MenuItem>
        <MenuItem value="'Fira Code', monospace" sx={{ fontSize: 13 }}>Fira Code</MenuItem>
        <MenuItem value="'Cascadia Code', Consolas, monospace" sx={{ fontSize: 13 }}>Cascadia Code</MenuItem>
        <MenuItem value="Consolas, 'Courier New', monospace" sx={{ fontSize: 13 }}>Consolas</MenuItem>
        <MenuItem value="'Courier New', monospace" sx={{ fontSize: 13 }}>Courier New</MenuItem>
        <MenuItem value="system-ui, monospace" sx={{ fontSize: 13 }}>System Default</MenuItem>
      </SettingSelect>

      <Typography sx={{ fontSize: 16, fontWeight: 600, mt: 3, mb: 0.5 }}>
        Font Size
      </Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1 }}>
        Controls the font size in pixels
      </Typography>
      <SettingSelect
        value={settings.fontSize}
        onChange={(v) => update('fontSize', Number(v))}
      >
        {[10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24].map((s) => (
          <MenuItem key={s} value={s} sx={{ fontSize: 13 }}>{s}</MenuItem>
        ))}
      </SettingSelect>

      <Typography sx={{ fontSize: 15, fontWeight: 600, mt: 3, mb: 0.5 }}>
        Font Ligatures
      </Typography>
      <SettingCheck
        label="Enable Font Ligatures"
        checked={settings.fontLigatures}
        onChange={(v) => update('fontLigatures', v)}
        description="Enables or disables font ligatures/features."
      />
    </Box>
  );
}

function IndentationSection({ settings, update }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 1 }}>
        Auto Indent
      </Typography>
      <SettingCheck
        label="Auto Indent"
        checked={settings.autoIndent}
        onChange={(v) => update('autoIndent', v)}
        description="Controls if the editor should automatically adjust the indentation when users type, paste, move or indent lines."
      />

      <Typography sx={{ fontSize: 15, fontWeight: 600, mt: 2, mb: 0.5 }}>
        Indentation Character
      </Typography>
      <SettingSelect
        value={settings.insertSpaces ? 'spaces' : 'tabs'}
        onChange={(v) => update('insertSpaces', v === 'spaces')}
      >
        <MenuItem value="tabs" sx={{ fontSize: 13 }}>Tabs</MenuItem>
        <MenuItem value="spaces" sx={{ fontSize: 13 }}>Spaces</MenuItem>
      </SettingSelect>

      <Typography sx={{ fontSize: 15, fontWeight: 600, mt: 3, mb: 0.5 }}>
        Tab Size
      </Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 0.5 }}>
        Controls the number of spaces a tab is equal to.
      </Typography>
      <SettingSelect
        value={settings.tabSize}
        onChange={(v) => update('tabSize', Number(v))}
      >
        {[2, 4, 6, 8].map((s) => (
          <MenuItem key={s} value={s} sx={{ fontSize: 13 }}>{s}</MenuItem>
        ))}
      </SettingSelect>
    </Box>
  );
}

function WordWrapSection({ settings, update }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 1 }}>
        Word Wrap
      </Typography>
      <SettingCheck
        label="Word Wrap"
        checked={settings.wordWrap}
        onChange={(v) => update('wordWrap', v)}
        description="Controls if the lines should wrap in the Editor (Alt/Opt + Z)"
      />
    </Box>
  );
}

function FormattingSection({ settings, update }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 1 }}>
        Formatter
      </Typography>
      <SettingCheck
        label="Formatter"
        checked={settings.formatter}
        onChange={(v) => update('formatter', v)}
        description="Controls formatting in editor. Takes precedence over all other formatter settings."
      />

      <Typography sx={{ fontSize: 15, fontWeight: 600, mt: 1, mb: 0.5, color: settings.formatter ? 'text.primary' : 'text.disabled' }}>
        Format on Type
      </Typography>
      <SettingCheck
        label="Format on Type"
        checked={settings.formatOnType}
        onChange={(v) => update('formatOnType', v)}
        description="Controls whether the editor should automatically format the line after typing."
      />

      <Typography sx={{ fontSize: 15, fontWeight: 600, mt: 1, mb: 0.5, color: settings.formatter ? 'text.primary' : 'text.disabled' }}>
        Format on Paste
      </Typography>
      <SettingCheck
        label="Format on Paste"
        checked={settings.formatOnPaste}
        onChange={(v) => update('formatOnPaste', v)}
        description="Controls whether the editor should automatically format on paste."
      />
    </Box>
  );
}

function CodeCompletionSection({ settings, update }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 1 }}>
        Code Completion
      </Typography>
      <SettingCheck
        label="Auto Complete"
        checked={settings.autoComplete}
        onChange={(v) => update('autoComplete', v)}
        description="Controls whether the editor should show autocomplete suggestions while typing."
      />

      <Typography sx={{ fontSize: 15, fontWeight: 600, mt: 2, mb: 1 }}>
        Hover Hints
      </Typography>
      <SettingCheck
        label="Show Parameter Hints"
        checked={settings.autoComplete} // linked for simplicity
        onChange={(v) => update('autoComplete', v)}
        description="Controls whether parameter hints are shown."
      />
    </Box>
  );
}

function DisplaySection({ settings, update }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 0.5 }}>
        Cursor Style
      </Typography>
      <SettingSelect
        value={settings.cursorStyle}
        onChange={(v) => update('cursorStyle', v)}
      >
        <MenuItem value="line" sx={{ fontSize: 13 }}>Line</MenuItem>
        <MenuItem value="block" sx={{ fontSize: 13 }}>Block</MenuItem>
        <MenuItem value="underline" sx={{ fontSize: 13 }}>Underline</MenuItem>
        <MenuItem value="line-thin" sx={{ fontSize: 13 }}>Line thin</MenuItem>
        <MenuItem value="block-outline" sx={{ fontSize: 13 }}>Block outline</MenuItem>
        <MenuItem value="underline-thin" sx={{ fontSize: 13 }}>Underline thin</MenuItem>
      </SettingSelect>

      <Typography sx={{ fontSize: 16, fontWeight: 600, mt: 2, mb: 0.5 }}>
        Cursor Blinking
      </Typography>
      <SettingSelect
        value={settings.cursorBlinking}
        onChange={(v) => update('cursorBlinking', v)}
      >
        <MenuItem value="blink" sx={{ fontSize: 13 }}>Blink</MenuItem>
        <MenuItem value="smooth" sx={{ fontSize: 13 }}>Smooth</MenuItem>
        <MenuItem value="phase" sx={{ fontSize: 13 }}>Phase</MenuItem>
        <MenuItem value="expand" sx={{ fontSize: 13 }}>Expand</MenuItem>
        <MenuItem value="solid" sx={{ fontSize: 13 }}>Solid</MenuItem>
      </SettingSelect>

      <Typography sx={{ fontSize: 16, fontWeight: 600, mt: 2, mb: 0.5 }}>
        Render Whitespace
      </Typography>
      <SettingSelect
        value={settings.renderWhitespace}
        onChange={(v) => update('renderWhitespace', v)}
      >
        <MenuItem value="none" sx={{ fontSize: 13 }}>None</MenuItem>
        <MenuItem value="boundary" sx={{ fontSize: 13 }}>Boundary</MenuItem>
        <MenuItem value="selection" sx={{ fontSize: 13 }}>Selection</MenuItem>
        <MenuItem value="all" sx={{ fontSize: 13 }}>All</MenuItem>
      </SettingSelect>

      <Typography sx={{ fontSize: 16, fontWeight: 600, mt: 3, mb: 1 }}>
        Minimap
      </Typography>
      <SettingCheck
        label="Show Minimap"
        checked={settings.minimap}
        onChange={(v) => update('minimap', v)}
        description="Controls whether the minimap is displayed on the right side of the editor."
      />

      <Typography sx={{ fontSize: 16, fontWeight: 600, mt: 2, mb: 1 }}>
        Mouse Wheel Zoom
      </Typography>
      <SettingCheck
        label="Mouse Wheel Zoom"
        checked={settings.mouseWheelZoom}
        onChange={(v) => update('mouseWheelZoom', v)}
        description="Zoom the font of the editor when using mouse wheel and holding Ctrl."
      />

      <Typography sx={{ fontSize: 16, fontWeight: 600, mt: 2, mb: 1 }}>
        Smooth Scrolling
      </Typography>
      <SettingCheck
        label="Smooth Scrolling"
        checked={settings.smoothScrolling}
        onChange={(v) => update('smoothScrolling', v)}
        description="Enable that the editor animates scrolling to a position."
      />
    </Box>
  );
}

const SECTION_MAP = {
  typography: TypographySection,
  indentation: IndentationSection,
  wordWrap: WordWrapSection,
  formatting: FormattingSection,
  completion: CodeCompletionSection,
  display: DisplaySection,
};

/* ═══════════════════════════════════════════════════ */
/*  SETTINGS MODAL                                    */
/* ═══════════════════════════════════════════════════ */

export default function SettingsModal({ open, onClose, settings, onUpdateSetting }) {
  const [activeSection, setActiveSection] = useState('typography');
  const SectionComponent = SECTION_MAP[activeSection];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          backgroundImage: 'none',
          borderRadius: '12px',
          height: 460, // Set fixed height to prevent jumping on tab switch
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* ── Header ── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
          Playground Settings
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* ── Body: sidebar + content ── */}
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: 200,
            borderRight: '1px solid',
            borderColor: 'divider',
            py: 2,
            px: 1.5,
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              mb: 1,
              px: 1,
              letterSpacing: '0.02em',
            }}
          >
            Editor Settings
          </Typography>
          {SECTIONS.map((s) => (
            <Box
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              sx={{
                px: 1.5,
                py: 0.75,
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: activeSection === s.key ? 500 : 400,
                color: activeSection === s.key ? '#818cf8' : 'text.secondary',
                bgcolor: activeSection === s.key ? 'rgba(129, 140, 248, 0.1)' : 'transparent',
                mb: 0.25,
                border: activeSection === s.key ? '1px solid rgba(129, 140, 248, 0.2)' : '1px solid transparent',
                '&:hover': { 
                  color: activeSection === s.key ? '#818cf8' : 'text.primary', 
                  bgcolor: activeSection === s.key ? 'rgba(129, 140, 248, 0.1)' : 'action.hover' 
                },
              }}
            >
              {s.label}
            </Box>
          ))}
        </Box>

        {/* Content */}
        <Box
          sx={{
            flexGrow: 1,
            px: 3,
            py: 2.5,
            overflowY: 'auto',
            '&::-webkit-scrollbar': { width: 5 },
            '&::-webkit-scrollbar-thumb': { bgcolor: 'action.disabled', borderRadius: 3 },
          }}
        >
          {SectionComponent && (
            <SectionComponent settings={settings} update={onUpdateSetting} />
          )}
        </Box>
      </Box>
    </Dialog>
  );
}
