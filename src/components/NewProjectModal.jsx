import React, { useState, useMemo } from 'react';
import { Dialog, Box, Typography, IconButton, InputBase, Collapse, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { LANGUAGE_TEMPLATES } from '../utils/languageTemplates';

const CATEGORY_META = {
  programming: { label: 'Programming Languages', color: '#4da6ff' },
  web: { label: 'Web Languages', color: '#4da6ff' },
  database: { label: 'Databases', color: '#4da6ff' },
};

function ProjectCard({ template, onClick, isDark }) {
  return (
    <Box
      onClick={() => onClick(template)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.25,
        p: 1.5,
        pb: 1.75,
        borderRadius: '12px',
        cursor: 'pointer',
        bgcolor: isDark ? '#151515' : '#f9f9f9',
        border: '1px solid',
        borderColor: isDark ? 'transparent' : '#eee',
        transition: 'all 150ms ease',
        '&:hover': {
          bgcolor: isDark ? '#1c1c1c' : '#f1f1f1',
          borderColor: isDark ? '#333' : '#ddd',
          transform: 'translateY(-2px)',
          boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.05)',
        },
        minWidth: 0,
        height: 96,
      }}
    >
      <img
        src={template.icon}
        alt={template.label}
        width={32}
        height={32}
        style={{ objectFit: 'contain' }}
        loading="lazy"
        onError={(e) => {
          e.target.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/devicon/devicon-original.svg';
        }}
      />
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          lineHeight: 1.2,
          color: isDark ? '#e0e0e0' : '#333',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
          pt: 0.5
        }}
      >
        {template.label}
      </Typography>
    </Box>
  );
}

function CategorySection({ categoryId, templates, searchQuery, onSelect, isDark }) {
  const [expanded, setExpanded] = useState(false);
  const meta = CATEGORY_META[categoryId];

  const isSearching = searchQuery.trim().length > 0;
  const visibleTemplates = isSearching ? templates : (expanded ? templates : templates.slice(0, 12));
  const hiddenCount = templates.length - visibleTemplates.length;

  if (templates.length === 0) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography sx={{ color: meta.color, fontSize: 14, fontWeight: 600, mb: 2 }}>
        {meta.label}
      </Typography>
      
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(6, 1fr)' },
          gap: 1.5,
        }}
      >
        {visibleTemplates.map((t) => (
          <ProjectCard key={t.id} template={t} onClick={onSelect} isDark={isDark} />
        ))}
      </Box>

      {!isSearching && hiddenCount > 0 && (
        <Box 
          onClick={() => setExpanded(!expanded)}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 0.5,
            mt: 2, 
            cursor: 'pointer',
            color: isDark ? '#888' : '#666',
            '&:hover': { color: isDark ? '#ccc' : '#333' }
          }}
        >
          {expanded ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
            {expanded ? 'Show Less' : `Show ${hiddenCount} More`}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default function NewProjectModal({ open, onClose, onCreateProject }) {
  const [query, setQuery] = useState('');
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const handleSelect = (template) => {
    onCreateProject(template);
    onClose();
    setTimeout(() => setQuery(''), 300);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setQuery(''), 300);
  };

  const grouped = useMemo(() => {
    const q = query.toLowerCase().trim();
    const result = { programming: [], web: [], database: [] };
    
    LANGUAGE_TEMPLATES.forEach(t => {
      if (!q || t.label.toLowerCase().includes(q) || t.id.toLowerCase().includes(q)) {
        if (result[t.category]) {
          result[t.category].push(t);
        }
      }
    });
    return result;
  }, [query]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: isDark ? '#0a0a0a' : '#ffffff',
          backgroundImage: 'none',
          borderRadius: '16px',
          border: '1px solid',
          borderColor: isDark ? '#222' : '#eee',
          height: '85vh',
          display: 'flex',
          flexDirection: 'column'
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          pt: 3,
          pb: 2,
        }}
      >
        <Typography sx={{ fontSize: 22, fontWeight: 600, color: '#4da6ff', mx: 'auto' }}>
          Choose a Language to Get Started
        </Typography>
        <IconButton onClick={handleClose} size="small" sx={{ color: isDark ? '#888' : '#999', position: 'absolute', right: 16, top: 16 }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Search Bar */}
      <Box sx={{ px: 4, pb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: isDark ? '#1a1a1a' : '#f5f5f5',
            borderRadius: '24px',
            px: 2,
            py: 0.5,
            border: '1px solid',
            borderColor: isDark ? '#333' : '#e0e0e0',
            transition: 'all 0.2s',
            '&:focus-within': {
              borderColor: isDark ? '#555' : '#4da6ff',
              bgcolor: isDark ? '#1a1a1a' : '#fff',
              boxShadow: isDark ? 'none' : '0 0 0 2px rgba(77, 166, 255, 0.1)'
            }
          }}
        >
          <SearchIcon sx={{ color: isDark ? '#888' : '#999', mr: 1, fontSize: 20 }} />
          <InputBase
            placeholder="Search languages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            sx={{ 
              color: isDark ? '#fff' : '#333', 
              fontSize: 15,
              '& input::placeholder': { color: isDark ? '#666' : '#999', opacity: 1 }
            }}
          />
        </Box>
      </Box>

      {/* Categories Content */}
      <Box
        sx={{
          px: 4,
          pb: 4,
          overflowY: 'auto',
          flexGrow: 1,
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-thumb': { bgcolor: isDark ? '#333' : '#ddd', borderRadius: 3 },
        }}
      >
        {grouped.programming.length === 0 && grouped.web.length === 0 && grouped.database.length === 0 ? (
          <Typography sx={{ color: isDark ? '#888' : '#999', textAlign: 'center', mt: 4 }}>
            No languages found matching "{query}"
          </Typography>
        ) : (
          <>
            <CategorySection categoryId="programming" templates={grouped.programming} searchQuery={query} onSelect={handleSelect} isDark={isDark} />
            <CategorySection categoryId="web" templates={grouped.web} searchQuery={query} onSelect={handleSelect} isDark={isDark} />
            <CategorySection categoryId="database" templates={grouped.database} searchQuery={query} onSelect={handleSelect} isDark={isDark} />
          </>
        )}
      </Box>
    </Dialog>
  );
}
