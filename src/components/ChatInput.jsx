import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

export default function ChatInput({ onSend, isLoading }) {
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef(null);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  /* auto-resize textarea */
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = '0';
    el.style.height = Math.min(el.scrollHeight, 100) + 'px';
  }, [value]);

  const submitValue = async () => {
    if (!value.trim() || isLoading || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSend(value);
      setValue('');
    } catch {
      /* error handled upstream */
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void submitValue();
    }
  };

  const canSend = value.trim() && !isLoading && !isSubmitting;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 0.75,
        px: 1.5,
        py: 1,
        borderTop: '1px solid',
        borderColor: 'divider',
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-end',
          borderRadius: '10px',
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          px: 1.25,
          py: 0.5,
          transition: 'border-color 150ms ease',
          '&:focus-within': {
            borderColor: isDark ? '#a78bfa' : '#7c3aed',
          },
        }}
      >
        <style>{`
            .ai-chat-input::placeholder {
              color: ${isDark ? '#52525b' : '#a1a1aa'};
              opacity: 1;
            }
          `}</style>
        <textarea
          ref={textareaRef}
          className="ai-chat-input"
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about your code..."
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            resize: 'none',
            background: 'transparent',
            color: isDark ? '#e4e4e7' : '#27272a',
            fontSize: 12,
            lineHeight: '1.5',
            fontFamily: "'Inter', sans-serif",
            padding: '4px 0',
            maxHeight: 100,
          }}
        />
      </Box>

      <IconButton
        onClick={() => void submitValue()}
        disabled={!canSend}
        size="small"
        sx={{
          width: 32,
          height: 32,
          mb: 0.1,
          borderRadius: '8px',
          color: canSend ? '#fff' : 'action.disabled',
          bgcolor: canSend
            ? (isDark ? '#7c3aed' : '#6d28d9')
            : 'transparent',
          transition: 'all 150ms ease',
          '&:hover': {
            bgcolor: canSend
              ? (isDark ? '#6d28d9' : '#5b21b6')
              : 'transparent',
          },
          '&.Mui-disabled': {
            color: 'action.disabled',
            bgcolor: 'transparent',
          },
        }}
      >
        <SendRoundedIcon sx={{ fontSize: 15 }} />
      </IconButton>
    </Box>
  );
}
