import React, { forwardRef, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useConfetti } from '../hooks/useConfetti';

const Editor = forwardRef(function Editor({ language, code, fileName, darkMode }, ref) {
  const iframeRef = useRef(null);
  const fireConfetti = useConfetti();

  useEffect(() => {
    const handleMessage = (event) => {
      // Log all messages received by the window for debugging
      if (event.origin.includes('onecompiler.com')) {
        console.log('OneCompiler Message:', event.data);

        if (event.data) {
          const data = event.data;
          // OneCompiler sends action: 'runComplete' when execution is finished
          // We check if it was successful
          const isSuccess = (data.action === 'runComplete' || data.eventType === 'runFinished') && 
                            data.result && 
                            data.result.success === true;
          
          if (isSuccess) {
            console.log('Execution successful! Firing confetti...');
            fireConfetti();
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [fireConfetti]);

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
    const timer = setTimeout(sendCode, 800); // Increased delay slightly
    return () => clearTimeout(timer);
  }, [language, code, fileName]);

  const theme = darkMode ? 'dark' : 'light';
  const src = `https://onecompiler.com/embed/${language}?theme=${theme}&hideTitle=true&listenToEvents=true&codeChangeEvent=true`;

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
