import { FIX_SYSTEM_PROMPT, DOUBT_SYSTEM_PROMPT } from './systemPrompts';

const DEFAULT_CONTEXT_LIMIT = 6000;
const DEFAULT_OUTPUT_LIMIT = 2600;

export function truncateText(value, limit = DEFAULT_CONTEXT_LIMIT) {
  if (typeof value !== 'string') return '';
  if (value.length <= limit) return value;

  return `${value.slice(0, limit)}\n\n...[truncated ${value.length - limit} characters]`;
}

export function normalizeGroqContent(content) {
  if (typeof content === 'string') {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === 'string') return item;
        if (item && typeof item === 'object' && 'text' in item && typeof item.text === 'string') {
          return item.text;
        }
        return '';
      })
      .join('')
      .trim();
  }

  return '';
}

function normalizePath(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/^[/\\]+/, '').trim();
}

function safeJsonParse(value) {
  if (typeof value !== 'string' || !value.trim()) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function labelOutputSection(title, text) {
  if (!text) return null;
  return `${title}:\n${truncateText(text, DEFAULT_OUTPUT_LIMIT)}`;
}

export function buildWorkspaceSnapshot(workspace = {}) {
  const {
    activeFile = '',
    activeLanguage = '',
    activeContent = '',
    files = {},
    folders = [],
    openTabs = [],
    output = {},
    stdin = '',
  } = workspace;

  const fileEntries = Object.entries(files);
  const visibleFiles = fileEntries.slice(0, 24);
  const fileLines = visibleFiles.length
    ? visibleFiles.map(([path, file]) => `- ${path}${file?.language ? ` (${file.language})` : ''}`)
    : ['- (no files)'];
  if (fileEntries.length > visibleFiles.length) {
    fileLines.push(`- ... and ${fileEntries.length - visibleFiles.length} more files`);
  }

  const folderLines = folders.length ? folders.map((folder) => `- ${folder}`) : ['- (no folders)'];
  const tabLines = openTabs.length ? openTabs.map((tab) => `- ${tab}`) : ['- (no open tabs)'];

  const terminalLines = [];
  if (output?.status) terminalLines.push(`status: ${output.status}`);
  if (output?.executionTime != null) terminalLines.push(`executionTime: ${output.executionTime} ms`);

  const stdoutSection = labelOutputSection('stdout', output?.stdout || '');
  const stderrSection = labelOutputSection('stderr', output?.stderr || '');
  const exceptionSection = labelOutputSection('exception', output?.exception || '');
  const errorSection = labelOutputSection('error', output?.error || '');

  if (stdoutSection) terminalLines.push(stdoutSection);
  if (stderrSection) terminalLines.push(stderrSection);
  if (exceptionSection) terminalLines.push(exceptionSection);
  if (errorSection) terminalLines.push(errorSection);
  if (terminalLines.length === 0) terminalLines.push('(no terminal output yet)');

  return [
    'Workspace snapshot:',
    `Active file: ${activeFile || '(none)'}`,
    `Active language: ${activeLanguage || '(unknown)'}`,
    '',
    'Open tabs:',
    ...tabLines,
    '',
    'Folders:',
    ...folderLines,
    '',
    'Files:',
    ...fileLines,
    '',
    'Active file content:',
    truncateText(activeContent || '(empty)') || '(empty)',
    '',
    'Terminal output:',
    ...terminalLines,
    '',
    'STDIN:',
    truncateText(stdin || '(empty)', 2000) || '(empty)',
  ].join('\n');
}

function toolSpec(name, description, properties, required) {
  return {
    type: 'function',
    function: {
      name,
      description,
      parameters: {
        type: 'object',
        additionalProperties: false,
        properties,
        required,
      },
    },
  };
}

export function buildGroqTools() {
  return [
    toolSpec(
      'propose_update_file',
      'Propose replacing the full contents of an existing file.',
      {
        path: { type: 'string', description: 'Workspace-relative path of the file to update.' },
        content: { type: 'string', description: 'The full replacement file content.' },
        summary: { type: 'string', description: 'Short summary of the change.' },
        language: { type: 'string', description: 'Optional language hint for the file.' },
      },
      ['path', 'content', 'summary'],
    ),
    toolSpec(
      'propose_create_file',
      'Propose creating a new file with content.',
      {
        path: { type: 'string', description: 'Workspace-relative path of the new file.' },
        content: { type: 'string', description: 'The full file content.' },
        summary: { type: 'string', description: 'Short summary of why the file should exist.' },
        language: { type: 'string', description: 'Optional language hint for the file.' },
      },
      ['path', 'content', 'summary'],
    ),
    toolSpec(
      'propose_create_folder',
      'Propose creating a new folder path.',
      {
        path: { type: 'string', description: 'Workspace-relative folder path.' },
        summary: { type: 'string', description: 'Short summary of the folder purpose.' },
      },
      ['path', 'summary'],
    ),
    toolSpec(
      'propose_rename_file',
      'Propose renaming or moving a file.',
      {
        fromPath: { type: 'string', description: 'Current file path.' },
        toPath: { type: 'string', description: 'New file path or file name.' },
        summary: { type: 'string', description: 'Short summary of the rename.' },
      },
      ['fromPath', 'toPath', 'summary'],
    ),
    toolSpec(
      'propose_delete_file',
      'Propose deleting a file.',
      {
        path: { type: 'string', description: 'Workspace-relative file path to delete.' },
        summary: { type: 'string', description: 'Short summary of why the file should be deleted.' },
      },
      ['path', 'summary'],
    ),
    toolSpec(
      'propose_delete_folder',
      'Propose deleting a folder and its contents.',
      {
        path: { type: 'string', description: 'Workspace-relative folder path to delete.' },
        summary: { type: 'string', description: 'Short summary of why the folder should be deleted.' },
      },
      ['path', 'summary'],
    ),
    toolSpec(
      'set_stdin',
      'Set the STDIN input that will be fed to the program when it runs. Use this when the code requires user input (e.g. input() in Python, scanf in C, etc.).',
      {
        value: { type: 'string', description: 'The stdin input string. Use newlines to separate multiple inputs.' },
        summary: { type: 'string', description: 'Brief explanation of what inputs are being provided.' },
      },
      ['value', 'summary'],
    ),
    toolSpec(
      'run_code',
      'Execute the current active file. Use this after fixing code or setting stdin to immediately show the user the result. The output panel will automatically switch to show the result.',
      {
        summary: { type: 'string', description: 'Brief explanation of why you are running the code.' },
      },
      ['summary'],
    ),
  ];
}

export function parseGroqToolCalls(toolCalls = []) {
  return toolCalls
    .map((toolCall, index) => {
      const name = toolCall?.function?.name || '';
      const argumentsObject = safeJsonParse(toolCall?.function?.arguments || '') || {};

      if (!name) return null;

      if (name === 'propose_update_file') {
        return {
          id: toolCall?.id || `${name}_${index}_${Date.now()}`,
          type: 'update_file',
          path: normalizePath(argumentsObject.path || argumentsObject.filePath || ''),
          content: typeof argumentsObject.content === 'string' ? argumentsObject.content : '',
          summary: typeof argumentsObject.summary === 'string' ? argumentsObject.summary : '',
          language: typeof argumentsObject.language === 'string' ? argumentsObject.language : '',
          toolName: name,
        };
      }

      if (name === 'propose_create_file') {
        return {
          id: toolCall?.id || `${name}_${index}_${Date.now()}`,
          type: 'create_file',
          path: normalizePath(argumentsObject.path || argumentsObject.filePath || ''),
          content: typeof argumentsObject.content === 'string' ? argumentsObject.content : '',
          summary: typeof argumentsObject.summary === 'string' ? argumentsObject.summary : '',
          language: typeof argumentsObject.language === 'string' ? argumentsObject.language : '',
          toolName: name,
        };
      }

      if (name === 'propose_create_folder') {
        return {
          id: toolCall?.id || `${name}_${index}_${Date.now()}`,
          type: 'create_folder',
          path: normalizePath(argumentsObject.path || argumentsObject.folderPath || ''),
          summary: typeof argumentsObject.summary === 'string' ? argumentsObject.summary : '',
          toolName: name,
        };
      }

      if (name === 'propose_rename_file') {
        return {
          id: toolCall?.id || `${name}_${index}_${Date.now()}`,
          type: 'rename_file',
          fromPath: normalizePath(argumentsObject.fromPath || argumentsObject.path || ''),
          toPath: normalizePath(argumentsObject.toPath || argumentsObject.newPath || argumentsObject.to || ''),
          summary: typeof argumentsObject.summary === 'string' ? argumentsObject.summary : '',
          toolName: name,
        };
      }

      if (name === 'propose_delete_file') {
        return {
          id: toolCall?.id || `${name}_${index}_${Date.now()}`,
          type: 'delete_file',
          path: normalizePath(argumentsObject.path || argumentsObject.filePath || ''),
          summary: typeof argumentsObject.summary === 'string' ? argumentsObject.summary : '',
          toolName: name,
        };
      }

      if (name === 'propose_delete_folder') {
        return {
          id: toolCall?.id || `${name}_${index}_${Date.now()}`,
          type: 'delete_folder',
          path: normalizePath(argumentsObject.path || argumentsObject.folderPath || ''),
          summary: typeof argumentsObject.summary === 'string' ? argumentsObject.summary : '',
          toolName: name,
        };
      }

      if (name === 'set_stdin') {
        return {
          id: toolCall?.id || `${name}_${index}_${Date.now()}`,
          type: 'set_stdin',
          value: typeof argumentsObject.value === 'string' ? argumentsObject.value : '',
          summary: typeof argumentsObject.summary === 'string' ? argumentsObject.summary : '',
          toolName: name,
        };
      }

      if (name === 'run_code') {
        return {
          id: toolCall?.id || `${name}_${index}_${Date.now()}`,
          type: 'run_code',
          summary: typeof argumentsObject.summary === 'string' ? argumentsObject.summary : '',
          toolName: name,
        };
      }

      return null;
    })
    .filter(Boolean);
}

export function buildSimpleDiff(beforeText = '', afterText = '') {
  const splitLines = (value) => {
    const text = String(value).replace(/\r\n/g, '\n');
    return text.length ? text.split('\n') : [];
  };

  const beforeLines = splitLines(beforeText);
  const afterLines = splitLines(afterText);

  let prefix = 0;
  while (
    prefix < beforeLines.length &&
    prefix < afterLines.length &&
    beforeLines[prefix] === afterLines[prefix]
  ) {
    prefix += 1;
  }

  let suffix = 0;
  while (
    suffix < beforeLines.length - prefix &&
    suffix < afterLines.length - prefix &&
    beforeLines[beforeLines.length - 1 - suffix] === afterLines[afterLines.length - 1 - suffix]
  ) {
    suffix += 1;
  }

  return {
    prefixLines: beforeLines.slice(0, prefix),
    removedLines: beforeLines.slice(prefix, beforeLines.length - suffix),
    addedLines: afterLines.slice(prefix, afterLines.length - suffix),
    suffixLines: beforeLines.slice(beforeLines.length - suffix),
    beforeLineCount: beforeLines.length,
    afterLineCount: afterLines.length,
  };
}

export function getProposalTargetPath(proposal = {}) {
  return proposal.path || proposal.toPath || proposal.fromPath || '';
}

export function getProposalActionLabel(proposal = {}) {
  switch (proposal.type) {
    case 'update_file':
      return 'Update file';
    case 'create_file':
      return 'Create file';
    case 'create_folder':
      return 'Create folder';
    case 'rename_file':
      return 'Rename file';
    case 'delete_file':
      return 'Delete file';
    case 'delete_folder':
      return 'Delete folder';
    default:
      return 'Proposed change';
  }
}

export function getAgentSystemPrompt() {
  return FIX_SYSTEM_PROMPT;
}

export function getDoubtSystemPrompt() {
  return DOUBT_SYSTEM_PROMPT;
}