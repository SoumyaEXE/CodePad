import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import FileProposalCard from './FileProposalCard';
import { groqClient, MODEL } from '../lib/groq';
import { aiLimiter } from '../utils/rateLimit';
import {
  buildWorkspaceSnapshot,
  buildGroqTools,
  parseGroqToolCalls,
  normalizeGroqContent,
  getAgentSystemPrompt,
  getProposalTargetPath,
} from '../lib/agent';

/* ── helpers ─────────────────────────────────────── */

function createMessage(role, content) {
  return {
    id: `${role}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
  };
}

function toConversationMessages(messages) {
  return messages.map((m) => ({ role: m.role, content: m.content }));
}

function getParentFolder(path) {
  const i = path.lastIndexOf('/');
  return i >= 0 ? path.slice(0, i) : '';
}

function getFileName(path) {
  const i = path.lastIndexOf('/');
  return i >= 0 ? path.slice(i + 1) : path;
}

/* ── quick-action chips shown when chat is empty ─── */

const QUICK_ACTIONS = [
  { label: '🐛 Fix my code', prompt: 'Find and fix the bugs in my current code.' },
  { label: '💡 Explain this', prompt: 'Explain what my current code does, step by step.' },
  { label: '⚡ Optimize', prompt: 'Suggest performance improvements for my code.' },
  { label: '📝 Add comments', prompt: 'Add clear, helpful comments to my code.' },
];

/* ── typing dots animation ───────────────────────── */

function ThinkingIndicator() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1.5 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          px: 1.5,
          py: 0.85,
          borderRadius: '10px 10px 10px 2px',
        }}
      >
        {/* spinning sparkle */}
        <Box
          sx={{
            width: 16,
            height: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'sparkle-spin 2s linear infinite',
            '@keyframes sparkle-spin': {
              '0%': { transform: 'rotate(0deg) scale(1)', opacity: 0.7 },
              '50%': { transform: 'rotate(180deg) scale(1.15)', opacity: 1 },
              '100%': { transform: 'rotate(360deg) scale(1)', opacity: 0.7 },
            },
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#818CF8' }}>
            <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z" />
            <path d="M19 14l.7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14z" opacity="0.6" />
          </svg>
        </Box>
        {/* shimmer text */}
        <Typography
          sx={{
            fontSize: 11.5,
            fontWeight: 500,
            background: 'linear-gradient(90deg, #818CF8 0%, #A5B4FC 40%, #818CF8 80%)',
            backgroundSize: '200% 100%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 1.8s ease-in-out infinite',
            '@keyframes shimmer': {
              '0%': { backgroundPosition: '200% 0' },
              '100%': { backgroundPosition: '-200% 0' },
            },
          }}
        >
          Thinking...
        </Typography>
        {/* trailing dots */}
        <Box sx={{ display: 'flex', gap: 0.4, ml: -0.5 }}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                bgcolor: '#818CF8',
                animation: 'dot-bounce 1.4s infinite ease-in-out',
                animationDelay: `${i * 0.15}s`,
                '@keyframes dot-bounce': {
                  '0%, 80%, 100%': { opacity: 0.25, transform: 'scale(0.8)' },
                  '40%': { opacity: 0.8, transform: 'scale(1)' },
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

/* ── sparkle SVG for header ──────────────────────── */

function SparkleIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
      <path d="M18 14l.7 2.3L21 17l-2.3.7L18 20l-.7-2.3L15 17l2.3-.7L18 14z" opacity="0.6" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════ */
/*  AI SIDEBAR  (unified single-thread chat)          */
/* ═══════════════════════════════════════════════════ */

export default function AISidebar({
  activeContent = '',
  onApplyFix,
  workspace = {},
  actions = {},
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [messages, setMessages] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef(null);

  /* workspace snapshot used as hidden context */
  const ws = {
    activeFile: workspace.activeFile || '',
    activeLanguage: workspace.activeLanguage || workspace.language || '',
    activeContent: workspace.activeContent ?? activeContent ?? '',
    files: workspace.files || {},
    folders: workspace.folders || [],
    openTabs: workspace.openTabs || [],
    output: workspace.output || workspace.consoleOutput || {},
    stdin: workspace.stdin || '',
  };

  /* auto-scroll on new content */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, proposals, isLoading]);

  /* ── proposal helpers ───────────────────────────── */

  const markProposalStatus = useCallback((id, status) => {
    setProposals((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  }, []);

  const applyProposal = useCallback((proposal) => {
    const path = getProposalTargetPath(proposal);
    const sourceFile = proposal.fromPath ? ws.files[proposal.fromPath] : null;
    const targetFile = path ? ws.files[path] : null;

    try {
      switch (proposal.type) {
        case 'update_file':
        case 'create_file': {
          if (!path) break;
          if (typeof actions.createFile === 'function' && !targetFile) actions.createFile(path);
          if (typeof actions.updateFileContent === 'function') actions.updateFileContent(path, proposal.content || '');
          else if (typeof onApplyFix === 'function') onApplyFix(proposal.content || '');
          if (typeof actions.openFile === 'function') actions.openFile(path);
          else if (typeof actions.setActiveFile === 'function') actions.setActiveFile(path);
          break;
        }
        case 'create_folder': {
          if (path && typeof actions.createFolder === 'function') actions.createFolder(path);
          break;
        }
        case 'rename_file': {
          const from = proposal.fromPath || '';
          const to = proposal.toPath || '';
          if (!from || !to) break;
          if (getParentFolder(from) === getParentFolder(to) && typeof actions.renameFile === 'function') {
            actions.renameFile(from, getFileName(to));
          } else if (sourceFile) {
            if (typeof actions.createFile === 'function') actions.createFile(to);
            if (typeof actions.updateFileContent === 'function') actions.updateFileContent(to, sourceFile.content || '');
            if (typeof actions.deleteFile === 'function') actions.deleteFile(from);
            if (typeof actions.openFile === 'function') actions.openFile(to);
            else if (typeof actions.setActiveFile === 'function') actions.setActiveFile(to);
          }
          break;
        }
        case 'delete_file': {
          if (path && typeof actions.deleteFile === 'function') actions.deleteFile(path);
          break;
        }
        case 'delete_folder': {
          if (path && typeof actions.deleteFolder === 'function') actions.deleteFolder(path);
          break;
        }
        default: break;
      }
      markProposalStatus(proposal.id, 'applied');
      if (typeof actions.setActiveFile === 'function' && path && proposal.type !== 'delete_file' && proposal.type !== 'delete_folder') {
        actions.setActiveFile(path);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply change.');
    }
  }, [actions, markProposalStatus, onApplyFix, ws.files]);

  const rejectProposal = useCallback((id) => {
    setProposals((prev) => prev.filter((p) => p.id !== id));
  }, []);

  /* ── send message ───────────────────────────────── */

  const handleSend = useCallback(async (text) => {
    const prompt = text.trim();
    if (!prompt) return;

    /* Rate limit check */
    const { allowed, retryAfterMs } = aiLimiter.canCall();
    if (!allowed) {
      setError(`Rate limited — try again in ${Math.ceil(retryAfterMs / 1000)}s`);
      return;
    }
    aiLimiter.record();

    const userMsg = createMessage('user', prompt);
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setError('');

    try {
      if (!import.meta.env.VITE_GROQ_API_KEY) {
        throw new Error('Set VITE_GROQ_API_KEY in your .env to enable the AI agent.');
      }

      const systemPrompt = getAgentSystemPrompt();
      const hiddenCtx = buildWorkspaceSnapshot(ws);

      const conversation = [
        { role: 'system', content: systemPrompt },
        { role: 'system', content: hiddenCtx },
        ...toConversationMessages(messages),
        { role: 'user', content: prompt },
      ];

      const response = await groqClient.chat.completions.create({
        model: MODEL,
        messages: conversation,
        temperature: 0.25,
        tools: buildGroqTools(),
        tool_choice: 'auto',
      });

      const choice = response?.choices?.[0];
      const assistantMsg = choice?.message || {};
      const assistantText = normalizeGroqContent(assistantMsg.content);
      const parsed = parseGroqToolCalls(assistantMsg.tool_calls || []).map((p) => ({
        ...p,
        status: 'pending',
      }));

      /* Auto-execute immediate actions (stdin / run) */
      const fileProposals = [];
      const autoActions = [];
      for (const p of parsed) {
        if (p.type === 'set_stdin') {
          if (typeof actions.setStdin === 'function') {
            actions.setStdin(p.value || '');
            autoActions.push(`Set stdin: ${p.summary || p.value}`);
          }
        } else if (p.type === 'run_code') {
          if (typeof actions.runCode === 'function') {
            // Small delay so stdin can be applied first
            setTimeout(() => actions.runCode(), 150);
            autoActions.push(`Running code: ${p.summary}`);
          }
        } else {
          fileProposals.push(p);
        }
      }

      /* Build response text */
      let responseText = assistantText || '';
      if (!responseText && fileProposals.length > 0) {
        responseText = `I've prepared ${fileProposals.length} file change${fileProposals.length === 1 ? '' : 's'} for you.`;
      }
      if (autoActions.length > 0 && !responseText) {
        responseText = autoActions.join('\n');
      }

      if (responseText) {
        setMessages((prev) => [...prev, createMessage('assistant', responseText)]);
      }
      if (fileProposals.length > 0) {
        setProposals((prev) => [...prev, ...fileProposals]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get a response.');
    } finally {
      setIsLoading(false);
    }
  }, [messages, ws]);

  /* ── clear chat ─────────────────────────────────── */

  const clearChat = useCallback(() => {
    setMessages([]);
    setProposals([]);
    setError('');
  }, []);

  /* ── empty state ────────────────────────────────── */

  const isEmpty = messages.length === 0 && proposals.length === 0;

  /* ═══════════════════════════════════════════════════ */
  /*  RENDER                                            */
  /* ═══════════════════════════════════════════════════ */

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      {/* ── Header ──────────────────────────────────── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1.5,
          py: 0.75,
          borderBottom: '1px solid',
          borderColor: 'divider',
          flexShrink: 0,
          minHeight: 36,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box sx={{ color: isDark ? '#818CF8' : '#4F46E5', display: 'flex' }}>
            <SparkleIcon size={14} />
          </Box>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: 'text.primary',
              letterSpacing: '0.02em',
            }}
          >
            CodePad Agent
          </Typography>
        </Box>

        {messages.length > 0 && (
          <IconButton
            size="small"
            onClick={clearChat}
            sx={{
              color: 'text.disabled',
              p: 0.5,
              '&:hover': { color: 'error.main', bgcolor: isDark ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.06)' },
            }}
          >
            <DeleteOutlineRoundedIcon sx={{ fontSize: 15 }} />
          </IconButton>
        )}
      </Box>

      {/* ── Chat area ───────────────────────────────── */}
      <Box
        ref={scrollRef}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          p: 1.5,
          display: 'flex',
          flexDirection: 'column',
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-thumb': { bgcolor: 'action.disabled', borderRadius: 2 },
        }}
      >
        {/* Empty state */}
        {isEmpty && !isLoading && (
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              py: 4,
              opacity: 0.85,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: isDark ? 'rgba(99,102,241,0.1)' : 'rgba(79,70,229,0.08)',
                color: isDark ? '#818CF8' : '#4F46E5',
              }}
            >
              <SparkleIcon size={22} />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                How can I help?
              </Typography>
              <Typography sx={{ fontSize: 11, color: 'text.secondary', maxWidth: 220, lineHeight: 1.5 }}>
                Ask anything about your code — I can fix bugs, explain logic, write tests, or refactor.
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.75,
                justifyContent: 'center',
                maxWidth: 280,
                mt: 0.5,
              }}
            >
              {QUICK_ACTIONS.map((action) => (
                <Box
                  key={action.label}
                  onClick={() => handleSend(action.prompt)}
                  sx={{
                    px: 1.25,
                    py: 0.5,
                    fontSize: 11,
                    fontWeight: 500,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: 'divider',
                    color: 'text.secondary',
                    bgcolor: 'background.paper',
                    transition: 'all 120ms ease',
                    '&:hover': {
                      borderColor: isDark ? '#818CF8' : '#4F46E5',
                      color: isDark ? '#818CF8' : '#4F46E5',
                      bgcolor: isDark ? 'rgba(99,102,241,0.06)' : 'rgba(79,70,229,0.04)',
                    },
                  }}
                >
                  {action.label}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Messages */}
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            role={msg.role}
            content={msg.content}
            canApplyFix={msg.role === 'assistant'}
            onApplyFix={onApplyFix}
          />
        ))}

        {/* File proposals */}
        {proposals.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 0.5 }}>
            {proposals.map((proposal) => {
              const currentContent =
                proposal.type === 'rename_file'
                  ? ws.files[proposal.fromPath]?.content || ''
                  : ws.files[getProposalTargetPath(proposal)]?.content || '';
              return (
                <FileProposalCard
                  key={proposal.id}
                  proposal={proposal}
                  currentContent={currentContent}
                  onApply={() => applyProposal(proposal)}
                  onReject={() => rejectProposal(proposal.id)}
                />
              );
            })}
          </Box>
        )}

        {/* Typing indicator */}
        {isLoading && <ThinkingIndicator />}
      </Box>

      {/* Error bar */}
      {error && (
        <Box sx={{ px: 1.5, pb: 0.75 }}>
          <Typography
            sx={{
              fontSize: 11,
              color: 'error.main',
              whiteSpace: 'pre-wrap',
              bgcolor: isDark ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.06)',
              px: 1,
              py: 0.5,
              borderRadius: '6px',
            }}
          >
            {error}
          </Typography>
        </Box>
      )}

      {/* Input */}
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </Box>
  );
}