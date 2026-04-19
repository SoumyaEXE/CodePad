import { useCallback, useRef, useState } from 'react';

const STORAGE_KEY = 'codePad_code';
const DEBOUNCE_MS = 300;
const TOAST_DURATION = 1500;

export function useCodePersistence() {
  const [showSaved, setShowSaved] = useState(false);
  const debounceRef = useRef(null);
  const fadeTimerRef = useRef(null);

  const saveCode = useCallback((code) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, code);
      } catch {
        // localStorage full or unavailable — silently fail
      }

      // Show "Code auto-saved" then fade after TOAST_DURATION
      setShowSaved(true);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = setTimeout(() => setShowSaved(false), TOAST_DURATION);
    }, DEBOUNCE_MS);
  }, []);

  const loadCode = useCallback(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || '';
    } catch {
      return '';
    }
  }, []);

  return { showSaved, saveCode, loadCode };
}
