import React, { forwardRef, useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const Editor = forwardRef(function Editor({ language, code, fileName, darkMode }, ref) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleMessage = (event) => {
      // Handle messages from OneCompiler if needed
      // e.g., code change events
      if (event.data && event.data.eventType === 'codeChange') {
        // console.log('Code changed in OneCompiler:', event.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    const sendCode = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
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

    // Give it a small delay to ensure iframe is ready
    const timer = setTimeout(sendCode, 500);
    return () => clearTimeout(timer);
  }, [language, code, fileName]);

  const theme = darkMode ? 'dark' : 'light';
  const src = `https://onecompiler.com/embed/${language}?theme=${theme}&hideTitle=true&listenToEvents=true`;

  return (
    <Box
      id="editor-area"
      sx={{
        flexGrow: 1,
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
        width: '100%',
      }}
    >
      <iframe
        ref={(el) => {
          iframeRef.current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
        }}
        src={src}
        title="OneCompiler Editor"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
        allow="clipboard-read; clipboard-write"
      />
    </Box>
  );
});

export default Editor;
