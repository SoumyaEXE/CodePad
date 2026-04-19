import React, { forwardRef } from 'react';
import { Box } from '@mui/material';

const Editor = forwardRef(function Editor({ src }, ref) {
  return (
    <Box
      id="editor-area"
      sx={{
        flexGrow: 1,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <iframe
        ref={ref}
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
