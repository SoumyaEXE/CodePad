import React from 'react';
import { Dialog, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DEVICON_CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const PROJECT_TEMPLATES = [
  { id: 'python', label: 'Python', icon: `${DEVICON_CDN}/python/python-original.svg`, file: 'main.py', code: '# Python project\n\nprint("Hello, World!")\n' },
  { id: 'java', label: 'Java', icon: `${DEVICON_CDN}/java/java-original.svg`, file: 'Main.java', code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n' },
  { id: 'cpp', label: 'C++', icon: `${DEVICON_CDN}/cplusplus/cplusplus-original.svg`, file: 'main.cpp', code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}\n' },
  { id: 'c', label: 'C', icon: `${DEVICON_CDN}/c/c-original.svg`, file: 'main.c', code: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}\n' },
  { id: 'html', label: 'HTML', icon: `${DEVICON_CDN}/html5/html5-original.svg`, file: 'index.html', code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My Page</title>\n  <style>\n    body {\n      font-family: system-ui, sans-serif;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      min-height: 100vh;\n      margin: 0;\n      background: #1a1a2e;\n      color: #eee;\n    }\n    h1 { color: #6c63ff; }\n  </style>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n</body>\n</html>\n' },
  { id: 'react', label: 'React', icon: `${DEVICON_CDN}/react/react-original.svg`, file: 'App.jsx', code: 'function App() {\n  return (\n    <div style={{ textAlign: "center", padding: "2rem" }}>\n      <h1>Hello from React!</h1>\n    </div>\n  );\n}\n' },
  { id: 'javascript', label: 'JavaScript', icon: `${DEVICON_CDN}/javascript/javascript-original.svg`, file: 'index.js', code: '// JavaScript project\n\nconsole.log("Hello, World!");\n' },
  { id: 'go', label: 'Go', icon: `${DEVICON_CDN}/go/go-original.svg`, file: 'main.go', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}\n' },
  { id: 'rust', label: 'Rust', icon: `${DEVICON_CDN}/rust/rust-original.svg`, file: 'main.rs', code: 'fn main() {\n    println!("Hello, World!");\n}\n' },
  { id: 'typescript', label: 'TypeScript', icon: `${DEVICON_CDN}/typescript/typescript-original.svg`, file: 'index.ts', code: '// TypeScript project\n\nconst greeting: string = "Hello, World!";\nconsole.log(greeting);\n' },
];

function ProjectCard({ template, onClick }) {
  return (
    <Box
      onClick={() => onClick(template)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.75,
        p: 1.5,
        borderRadius: '10px',
        cursor: 'pointer',
        bgcolor: (t) => t.palette.mode === 'dark' ? '#1a1d28' : '#f5f5f5',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 150ms ease',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: (t) => t.palette.mode === 'dark' ? '#1e2233' : '#eef',
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        minWidth: 80,
      }}
    >
      <img
        src={template.icon}
        alt={template.label}
        width={36}
        height={36}
        style={{ objectFit: 'contain' }}
        loading="lazy"
      />
      <Typography
        sx={{
          fontSize: 11.5,
          fontWeight: 500,
          color: 'text.primary',
          textAlign: 'center',
        }}
      >
        {template.label}
      </Typography>
    </Box>
  );
}

export default function NewProjectModal({ open, onClose, onCreateProject }) {
  const handleSelect = (template) => {
    onCreateProject(template);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          backgroundImage: 'none',
          borderRadius: '12px',
          border: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
          pt: 2,
          pb: 1.5,
        }}
      >
        <Typography sx={{ fontSize: 17, fontWeight: 600 }}>
          Create new playground
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box
        sx={{
          px: 2.5,
          pb: 2.5,
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 1,
        }}
      >
        {PROJECT_TEMPLATES.map((t) => (
          <ProjectCard key={t.id} template={t} onClick={handleSelect} />
        ))}
      </Box>
    </Dialog>
  );
}
