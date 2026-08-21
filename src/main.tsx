import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

// Fonts are self-hosted rather than fetched from a third-party CDN: one less
// origin to connect to, no external dependency at runtime, and the files are
// served by the same Nginx instance as the rest of the site.
import '@fontsource-variable/inter';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';

import { router } from './app/router';
import { theme } from './theme';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container #root was not found in the document.');
}

createRoot(container).render(
  <StrictMode>
    <ThemeProvider theme={theme} defaultMode="dark">
      <CssBaseline enableColorScheme />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
