import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * Shown while a lazily-loaded route chunk is fetched.
 *
 * Sized to roughly a viewport height so the footer does not jump up and then
 * back down as the page arrives.
 */
export function RouteFallback() {
  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <CircularProgress size={26} aria-label="Loading page" />
    </Box>
  );
}
