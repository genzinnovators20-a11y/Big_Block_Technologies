import { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/navigation/Header';
import { RouteFallback } from '@/components/common/RouteFallback';

/**
 * Application shell.
 *
 * The header is fixed, so `main` carries no top padding of its own: every page
 * opens with a hero that is designed to sit underneath the transparent header.
 *
 * The NEXA assistant is intentionally not mounted in V2. Its implementation
 * remains under `src/features/assistant/` — untouched and ready — but it is
 * out of scope for this release and will return as a separate phase with a
 * more capable architecture behind it. Because nothing imports it, none of it
 * reaches the bundle.
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

      {/* Restores scroll position on back/forward, and resets it on new routes. */}
      <ScrollRestoration />
    </Box>
  );
}
