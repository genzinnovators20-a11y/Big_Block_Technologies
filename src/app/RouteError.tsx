import { Link as RouterLink, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Logo } from '@/components/common/Logo';

/**
 * Router-level error boundary.
 *
 * Reports what actually failed rather than a generic apology, and always
 * offers a way back into the site.
 */
export function RouteError() {
  const error = useRouteError();

  const status = isRouteErrorResponse(error) ? error.status : undefined;
  const heading = status === 404 ? 'Page not found' : 'Something went wrong';
  const detail =
    status === 404
      ? 'The page you requested does not exist, or has been moved.'
      : 'The page failed to load. Reloading usually resolves it.';

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        py: 10,
      }}
    >
      <Container>
        <Logo height={30} />
        <Typography variant="label" component="p" sx={{ color: 'accentText', mt: 8, mb: 2 }}>
          {status ? `Error ${status}` : 'Error'}
        </Typography>
        <Typography variant="h1" sx={{ maxWidth: '18ch' }}>
          {heading}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 3, color: 'text.secondary', maxWidth: '52ch' }}>
          {detail}
        </Typography>

        <Box sx={{ mt: 5, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Button component={RouterLink} to="/" size="large">
            Back to home
          </Button>
          <Button variant="outlined" size="large" onClick={() => window.location.reload()}>
            Reload page
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
