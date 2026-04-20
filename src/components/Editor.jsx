import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Box, Fade, CircularProgress } from '@mui/material';
import { useConfetti } from '../hooks/useConfetti';

// Pure JS universal formatter — no API, no packages
const universalFormat = (code, lang) => {
  const INDENT = ["python"].includes(lang) ? "    " : "  ";
  const lines = code.split("\n");
  const result = [];
  let indentLevel = 0;

  // C-style languages: c, cpp, java, javascript, typescript, nodejs
  const cStyle = ["c", "cpp", "java", "javascript", "typescript", "nodejs", "cs"];

  if (cStyle.includes(lang)) {
    for (let line of lines) {
      let trimmed = line.trim();
      if (!trimmed) {
        result.push("");
        continue;
      }

      // Decrease indent BEFORE printing if line starts with closing brace
      if (trimmed.startsWith("}") || trimmed.startsWith("]") || trimmed.startsWith(")")) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      result.push(INDENT.repeat(indentLevel) + trimmed);

      // Increase indent AFTER printing if line ends with opening brace
      const openCount = (trimmed.match(/[{[(]/g) || []).length;
      const closeCount = (trimmed.match(/[}\])]/g) || []).length;
      indentLevel = Math.max(0, indentLevel + openCount - closeCount);
    }
  }
  // Python style
  else if (lang === "python") {
    for (let line of lines) {
      let trimmed = line.trim();
      if (!trimmed) {
        result.push("");
        continue;
      }

      // Decrease indent for these keywords
      if (
        trimmed.startsWith("else:") ||
        trimmed.startsWith("elif ") ||
        trimmed.startsWith("except") ||
        trimmed.startsWith("finally:") ||
        trimmed.startsWith("except:")
      ) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      result.push(INDENT.repeat(indentLevel) + trimmed);

      // Increase indent after block-opening lines
      if (
        trimmed.endsWith(":") &&
        (trimmed.startsWith("if ") ||
          trimmed.startsWith("elif ") ||
          trimmed.startsWith("else:") ||
          trimmed.startsWith("for ") ||
          trimmed.startsWith("while ") ||
          trimmed.startsWith("def ") ||
          trimmed.startsWith("class ") ||
          trimmed.startsWith("try:") ||
          trimmed.startsWith("except") ||
          trimmed.startsWith("finally:") ||
          trimmed.startsWith("with "))
      ) {
        indentLevel++;
      }
    }
  }
  // Any other language — basic cleanup only
  else {
    for (let line of lines) {
      result.push(line.replace(/\t/g, "    ").trimEnd());
    }
  }

  // Post-processing: max 2 blank lines, trim trailing whitespace
  return result
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd() + "\n";
};

const Editor = forwardRef(function Editor({ language, code, fileName, darkMode, onChange, formatRef, runRef }, ref) {
  const iframeRef = useRef(null);
  const saveTimeoutRef = useRef(null);
  const lastCodeRef = useRef(code);
  const codeVersionRef = useRef(0);
  const pollRequestRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState('');
  const fireConfetti = useConfetti();

  // Expose formatCode & runCode to parent
  useEffect(() => {
    if (formatRef) {
      formatRef.current = {
        formatCode: () => {
          const currentCode = lastCodeRef.current || code || localStorage.getItem("codePad_code");
          if (!currentCode) return;

          const lang = (language || localStorage.getItem("codePad_language") || "python").toLowerCase();

          let formatted = currentCode;
          try {
            formatted = universalFormat(currentCode, lang);
          } catch (err) {
            console.warn("Format failed:", err);
            formatted = currentCode;
          }

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
    if (runRef) {
      runRef.current = {
        runCode: () => {
          if (iframeRef.current && iframeRef.current.contentWindow) {
            console.log('Triggering run from Navbar...');
            iframeRef.current.contentWindow.postMessage({
              eventType: 'triggerRun'
            }, '*');
          }
        }
      };
    }
  }, [formatRef, runRef, code, language, fileName, onChange]);

  // Update lastCodeRef when the 'code' prop changes from external sources
  useEffect(() => {
    if (code !== lastCodeRef.current) {
      codeVersionRef.current += 1;
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
          const isCodeChangeEvent = data.eventType === 'codeChange' || data.action === 'codeChange';
          const hasCodePayload = data.files && Array.isArray(data.files);
          const isCodeUpdate = isCodeChangeEvent || hasCodePayload;

          if (isCodeUpdate) {
            const newCode = data.files?.[0]?.content || data.content;
            const pendingPoll = pollRequestRef.current;
            const isStalePollResponse =
              hasCodePayload &&
              !isCodeChangeEvent &&
              pendingPoll &&
              pendingPoll.versionAtRequest !== codeVersionRef.current &&
              newCode === pendingPoll.codeAtRequest;

            if (isStalePollResponse) {
              return;
            }

            if (newCode !== undefined && newCode !== lastCodeRef.current) {
              codeVersionRef.current += 1;
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

            if (hasCodePayload) {
              pollRequestRef.current = null;
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
    const newSrc = `https://onecompiler.com/embed/${language}?theme=${theme}&hideTitle=true&hideRun=true&listenToEvents=true&codeChangeEvent=true`;

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
  }, [loading, code, language, fileName]);

  // Polling for code changes
  useEffect(() => {
    const pollInterval = setInterval(() => {
      if (iframeRef.current && iframeRef.current.contentWindow && !loading) {
        pollRequestRef.current = {
          versionAtRequest: codeVersionRef.current,
          codeAtRequest: lastCodeRef.current,
        };
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
