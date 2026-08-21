import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './RootLayout';
import { RouteError } from './RouteError';
import { RouteFallback } from '@/components/common/RouteFallback';
import Home from '@/pages/Home';

/**
 * Route table.
 *
 * Home ships in the initial bundle because it is the overwhelmingly common
 * entry point. Every other page is loaded on demand, so a visitor who only
 * reads the homepage never downloads the careers or case-study code.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteError />,
    // Rendered while a lazily-loaded route module resolves on a cold entry —
    // landing directly on /services, for example, rather than navigating there.
    HydrateFallback: RouteFallback,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'about',
        lazy: async () => ({ Component: (await import('@/pages/About')).default }),
      },
      {
        path: 'services',
        lazy: async () => ({ Component: (await import('@/pages/Services')).default }),
      },
      {
        path: 'solutions',
        lazy: async () => ({ Component: (await import('@/pages/Solutions')).default }),
      },
      {
        path: 'industries',
        lazy: async () => ({ Component: (await import('@/pages/Industries')).default }),
      },
      {
        path: 'case-studies',
        lazy: async () => ({ Component: (await import('@/pages/CaseStudies')).default }),
      },
      {
        path: 'case-studies/:slug',
        lazy: async () => ({ Component: (await import('@/pages/CaseStudyDetail')).default }),
      },
      {
        path: 'careers',
        lazy: async () => ({ Component: (await import('@/pages/Careers')).default }),
      },
      {
        path: 'blog',
        lazy: async () => ({ Component: (await import('@/pages/Blog')).default }),
      },
      {
        path: 'blog/:slug',
        lazy: async () => ({ Component: (await import('@/pages/BlogPost')).default }),
      },
      {
        path: 'contact',
        lazy: async () => ({ Component: (await import('@/pages/Contact')).default }),
      },
      {
        path: '*',
        lazy: async () => ({ Component: (await import('@/pages/NotFound')).default }),
      },
    ],
  },
]);
