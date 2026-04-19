import React, { useState, useMemo } from 'react';
import { Dialog, Box, Typography, IconButton, InputBase, Collapse } from '@mui/material';
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

function ProjectCard({ template, onClick }) {
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
        bgcolor: '#151515', // dark card bg
        border: '1px solid transparent',
        transition: 'all 150ms ease',
        '&:hover': {
          bgcolor: '#1c1c1c',
          borderColor: '#333',
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
          // fallback icon if devicon fails
          e.target.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/devicon/devicon-original.svg';
        }}
      />
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          lineHeight: 1.2,
          color: '#e0e0e0',
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

function CategorySection({ categoryId, templates, searchQuery, onSelect }) {
  const [expanded, setExpanded] = useState(false);
  const meta = CATEGORY_META[categoryId];

  // If there's a search query, we show all matching and ignore the limit/expansion
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
          <ProjectCard key={t.id} template={t} onClick={onSelect} />
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
            color: '#888',
            '&:hover': { color: '#ccc' }
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

  const handleSelect = (template) => {
    onCreateProject(template);
    onClose();
    // reset search on close
    setTimeout(() => setQuery(''), 300);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setQuery(''), 300);
  };

  // Group languages by category
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
          bgcolor: '#0a0a0a', // very dark background matching screenshot
          backgroundImage: 'none',
          borderRadius: '16px',
          border: '1px solid #222',
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
        <IconButton onClick={handleClose} size="small" sx={{ color: '#888', position: 'absolute', right: 16, top: 16 }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Search Bar */}
      <Box sx={{ px: 4, pb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#1a1a1a',
            borderRadius: '24px',
            px: 2,
            py: 0.5,
            border: '1px solid #333',
            transition: 'border-color 0.2s',
            '&:focus-within': {
              borderColor: '#555'
            }
          }}
        >
          <SearchIcon sx={{ color: '#888', mr: 1, fontSize: 20 }} />
          <InputBase
            placeholder="Search languages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            sx={{ 
              color: '#fff', 
              fontSize: 15,
              '& input::placeholder': { color: '#666', opacity: 1 }
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
          '&::-webkit-scrollbar-thumb': { bgcolor: '#333', borderRadius: 3 },
        }}
      >
        {grouped.programming.length === 0 && grouped.web.length === 0 && grouped.database.length === 0 ? (
          <Typography sx={{ color: '#888', textAlign: 'center', mt: 4 }}>
            No languages found matching "{query}"
          </Typography>
        ) : (
          <>
            <CategorySection categoryId="programming" templates={grouped.programming} searchQuery={query} onSelect={handleSelect} />
            <CategorySection categoryId="web" templates={grouped.web} searchQuery={query} onSelect={handleSelect} />
            <CategorySection categoryId="database" templates={grouped.database} searchQuery={query} onSelect={handleSelect} />
          </>
        )}
      </Box>
    </Dialog>
  );
}
