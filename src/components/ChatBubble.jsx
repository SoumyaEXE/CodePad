import React, { useState } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CheckIcon from '@mui/icons-material/Check';

// Define the "Apply Fix" button specifically for AI code blocks if enabled
function CodeBlock({ inline, className, children, canApplyFix, onApplyFix, isDark, ...props }) {
  const [applied, setApplied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const codeContent = String(children).replace(/\n$/, '');

  const handleApply = () => {
    onApplyFix(codeContent);
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  if (!inline && match) {
    return (
      <Box sx={{ my: 1, position: 'relative' }}>
        <Box sx={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
          <SyntaxHighlighter
            style={isDark ? atomOneDark : atomOneLight}
            language={match[1]}
            PreTag="div"
            customStyle={{
              margin: 0,
              padding: '12px',
              fontSize: '12px',
              fontFamily: "'JetBrains Mono', monospace",
              background: 'transparent',
            }}
            {...props}
          >
            {codeContent}
          </SyntaxHighlighter>
        </Box>
        {canApplyFix && (
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleApply}
              startIcon={applied ? <CheckIcon fontSize="small"/> : null}
              color={applied ? "success" : "inherit"}
              sx={{
                fontSize: 11,
                textTransform: 'none',
                py: 0.25,
                borderColor: applied ? 'success.main' : 'divider',
                color: applied ? 'success.main' : 'text.secondary',
              }}
            >
              {applied ? 'Applied' : 'Apply Fix'}
            </Button>
          </Box>
        )}
      </Box>
    );
  }
  
  // Inline code styling
  return (
    <code className={className} {...props} style={{
      background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      padding: '2px 4px',
      borderRadius: '4px',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '12px'
    }}>
      {children}
    </code>
  );
}

export default function ChatBubble({ role, content, canApplyFix, onApplyFix }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isUser = role === 'user';

  if (isUser) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1.5 }}>
        <Box
          sx={{
            maxWidth: '85%',
            bgcolor: isDark ? '#7c3aed' : '#6d28d9',
            color: '#fff',
            px: 1.5,
            py: 1,
            borderRadius: '10px 10px 2px 10px',
            fontSize: 12,
            lineHeight: 1.55,
            fontFamily: "'Inter', sans-serif",
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {content}
        </Box>
      </Box>
    );
  }

  // AI bubble
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1.5 }}>
      <Box
        sx={{
          maxWidth: '90%',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          px: 1.5,
          py: 1,
          borderRadius: '10px 10px 10px 2px',
          fontSize: 12,
          lineHeight: 1.55,
          fontFamily: "'Inter', sans-serif",
          color: 'text.primary',
          wordBreak: 'break-word',
        }}
      >
        <Box sx={{ 
            '& p': { mt: 0, mb: 0.75, '&:last-child': { mb: 0 } },
            '& pre': { m: 0 }
          }}>
            <ReactMarkdown
              components={{
                code(props) {
                  return <CodeBlock {...props} isDark={isDark} canApplyFix={canApplyFix} onApplyFix={onApplyFix} />;
                }
              }}
            >
              {content}
            </ReactMarkdown>
          </Box>
      </Box>
    </Box>
  );
}
