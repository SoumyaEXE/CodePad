import { useState, useCallback } from 'react';
import { getLangById } from '../utils/languages';

const OC_API_URL = '/api/onecompiler/v1/run';
const API_KEY = import.meta.env.VITE_OC_API_KEY || '';

export function useCodeExecution() {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState({
    stdout: '',
    stderr: '',
    exception: null,
    status: null,       // 'success' | 'failed' | null
    executionTime: null,
    error: null,
  });

  const execute = useCallback(async (code, language, stdin = '') => {
    setIsRunning(true);
    setOutput({
      stdout: '',
      stderr: '',
      exception: null,
      status: null,
      executionTime: null,
      error: null,
    });

    const langConfig = getLangById(language);
    const ocLang = langConfig?.ocLang;

    if (!ocLang) {
      const result = {
        stdout: '',
        stderr: `Unsupported language: ${language}`,
        exception: null,
        status: 'failed',
        executionTime: null,
        error: `Unsupported language: ${language}`,
      };
      setOutput(result);
      setIsRunning(false);
      return { success: false };
    }

    if (!API_KEY) {
      const result = {
        stdout: '',
        stderr: 'API key missing. Add VITE_OC_API_KEY to your .env file.',
        exception: null,
        status: 'failed',
        executionTime: null,
        error: 'API key missing',
      };
      setOutput(result);
      setIsRunning(false);
      return { success: false };
    }

    try {
      const fileName = langConfig.defaultFile || 'main.txt';

      const res = await fetch(OC_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY,
        },
        body: JSON.stringify({
          language: ocLang,
          stdin: stdin || '',
          files: [{ name: fileName, content: code }],
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      // OneCompiler returns: { stdout, stderr, exception, status, executionTime, ... }
      const result = {
        stdout: data.stdout || '',
        stderr: data.stderr || '',
        exception: data.exception || null,
        status: data.status || 'failed',
        executionTime: data.executionTime ?? null,
        error: data.error || null,
      };

      setOutput(result);
      setIsRunning(false);
      return { success: data.status === 'success' && !data.exception && !data.error };
    } catch (err) {
      const result = {
        stdout: '',
        stderr: err.message || 'Execution failed',
        exception: null,
        status: 'failed',
        executionTime: null,
        error: err.message,
      };
      setOutput(result);
      setIsRunning(false);
      return { success: false };
    }
  }, []);

  const clearOutput = useCallback(() => {
    setOutput({
      stdout: '',
      stderr: '',
      exception: null,
      status: null,
      executionTime: null,
      error: null,
    });
  }, []);

  return { execute, isRunning, output, clearOutput };
}
