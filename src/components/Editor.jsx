import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Box, Fade, CircularProgress } from '@mui/material';
import { useConfetti } from '../hooks/useConfetti';
import jsbeautify from 'js-beautify';

const Editor = forwardRef(function Editor({ language, code, fileName, darkMode, onChange, formatRef }, ref) {
  const iframeRef = useRef(null);
  const saveTimeoutRef = useRef(null);
  const lastCodeRef = useRef(code);
  const [loading, setLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState('');
  const fireConfetti = useConfetti();

  // Expose formatCode to parent via formatRef
  useEffect(() => {
    if (formatRef) {
      formatRef.current = {
        formatCode: () => {
          const currentCode = lastCodeRef.current || code;
          if (!currentCode) return;

          const formatted = jsbeautify(currentCode, {
            indent_size: 4,
            space_in_empty_paren: true,
            preserve_newlines: true,
            max_preserve_newlines: 2,
            end_with_newline: true,
          });

          // Update local state and parent
          lastCodeRef.current = formatted;
          if (onChange) onChange(formatted);
          localStorage.setItem("codePad_code", formatted);

          // Push to iframe
          if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage({
              eventType: 'populateCode',
              language: language,
              files: [
                {
                  name: fileName || 'main',
                  content: formatted
                }
              ]
            }, '*');
          }
        }
      };
    }
  }, [formatRef, code, language, fileName, onChange]);

  // Update lastCodeRef when the 'code' prop changes from external sources
  useEffect(() => {
    if (code !== lastCodeRef.current) {
      lastCodeRef.current = code;
      localStorage.setItem("codePad_code", code);
    }
  }, [code]);

  // Handle messages from OneCompiler
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin.includes('onecompiler.com')) {
        if (event.data) {
          const data = event.data;

          // Confetti logic
          const isSuccess = (data.action === 'runComplete' || data.eventType === 'runFinished') &&
            data.result &&
            data.result.success === true;

          if (isSuccess) {
            console.log('Execution successful! Firing confetti...');
            fireConfetti();
          }

          // Handle code changes for auto-save
          const isCodeUpdate = (data.eventType === 'codeChange' || data.action === 'codeChange' || (data.files && Array.isArray(data.files)));

          if (isCodeUpdate) {
            const newCode = data.files?.[0]?.content || data.content;
            if (newCode !== undefined && newCode !== lastCodeRef.current) {
              lastCodeRef.current = newCode;
              localStorage.setItem("codePad_code", newCode);

              if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
              saveTimeoutRef.current = setTimeout(() => {
                if (onChange) {
                  console.log('Auto-saving code change...');
                  onChange(newCode);
                }
              }, 100);
            }
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [fireConfetti, onChange]);

  // Handle theme/language/src changes
  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    const newSrc = `https://onecompiler.com/embed/${language}?theme=${theme}&hideTitle=true&listenToEvents=true&codeChangeEvent=true`;

    if (newSrc !== currentSrc) {
      setLoading(true);
      setCurrentSrc(newSrc);
    }
  }, [language, darkMode, currentSrc]);

  // Send code to OneCompiler
  useEffect(() => {
    const sendCode = () => {
      if (iframeRef.current && iframeRef.current.contentWindow && !loading) {
        iframeRef.current.contentWindow.postMessage({
          eventType: 'populateCode',
          language: language,
          files: [
            {
              name: fileName || 'main',
              content: code
            }
          ]
        }, '*');
      }
    };

    if (!loading) {
      const timer = setTimeout(sendCode, 300);
      return () => clearTimeout(timer);
    }
  }, [loading, language, fileName]);

  // Polling for code changes
  useEffect(() => {
    const pollInterval = setInterval(() => {
      if (iframeRef.current && iframeRef.current.contentWindow && !loading) {
        iframeRef.current.contentWindow.postMessage({
          eventType: 'getCode'
        }, '*');
      }
    }, 500);

    return () => clearInterval(pollInterval);
  }, [loading]);

  const handleIframeLoad = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <Box
      id="editor-area"
      sx={{
        flexGrow: 1,
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
        width: '100%',
        bgcolor: darkMode ? '#1A1D27' : '#FFFFFF',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Fade in={loading}>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: darkMode ? 'rgba(26, 29, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(4px)',
            transition: 'background-color 0.3s ease',
          }}
        >
          <CircularProgress size={30} sx={{ color: darkMode ? '#818CF8' : '#4F46E5' }} />
        </Box>
      </Fade>

      <iframe
        ref={(el) => {
          iframeRef.current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
        }}
        src={currentSrc}
        title="OneCompiler Editor"
        onLoad={handleIframeLoad}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
        allow="clipboard-read; clipboard-write"
      />
    </Box>
  );
});

export default Editor;
