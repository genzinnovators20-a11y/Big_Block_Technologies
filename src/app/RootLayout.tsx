import { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/navigation/Header';
import { RouteFallback } from '@/components/common/RouteFallback';
import { NexaAssistant } from '@/features/assistant/NexaAssistant';

/**
 * Application shell.
 *
 * The header is fixed, so `main` carries no top padding of its own: every page
 * opens with a hero that is designed to sit underneath the transparent header.
 */
export function RootLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <Header />

      <Box component="main" id="main" sx={{ flex: 1 }}>
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </Box>

      <Footer />
      <NexaAssistant />

      {/* Restores scroll position on back/forward, and resets it on new routes. */}
      <ScrollRestoration />
    </Box>
  );
}
