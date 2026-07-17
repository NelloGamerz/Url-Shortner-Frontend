import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { NotFound } from '../components/common/NotFound';
import { useSubscription } from '../hooks/useSubscription';

const LandingPage = lazy(() => import('../pages/LandingPage'));
const PricingPage = lazy(() => import('../pages/PricingPage'));
const SignInPage = lazy(() => import('../pages/SignInPage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage'));
const FreeUrlShortenerPage = lazy(() => import('../pages/seo/FreeUrlShortenerPage'));
const UrlAnalyticsPage = lazy(() => import('../pages/seo/UrlAnalyticsPage'));
const CustomLinksPage = lazy(() => import('../pages/seo/CustomLinksPage'));
const QrCodeGeneratorPage = lazy(() => import('../pages/seo/QrCodeGeneratorPage'));
const BlogPage = lazy(() => import('../pages/seo/BlogPage'));
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage'));
const MyLinksPage = lazy(() => import('../pages/dashboard/MyLinksPage'));
const AnalyticsPage = lazy(() => import('../pages/dashboard/AnalyticsPage'));
const ProfilePage = lazy(() => import('../pages/dashboard/ProfilePage'));
const BillingPage = lazy(() => import('../pages/dashboard/BillingPage'));
const SettingsPage = lazy(() => import('../pages/dashboard/SettingsPage'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

function AnalyticsRouteGuard() {
  const { subscription, loading } = useSubscription();

  if (loading) {
    return <LoadingFallback />;
  }

  if (subscription?.plan === 'FREE') {
    return <Navigate to="/dashboard" replace />;
  }

  return <AnalyticsPage />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <LandingPage />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: '/pricing',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <PricingPage />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: '/sign-in',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SignInPage />
      </Suspense>
    ),
  },
  {
    path: '/sign-up',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SignUpPage />
      </Suspense>
    ),
  },
  {
    path: '/free-url-shortener',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <FreeUrlShortenerPage />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: '/url-shortener-with-analytics',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <UrlAnalyticsPage />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: '/custom-short-links',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <CustomLinksPage />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: '/qr-code-generator',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <QrCodeGeneratorPage />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: '/blog',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <BlogPage />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'links',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <MyLinksPage />
          </Suspense>
        ),
      },
      {
        path: 'analytics',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AnalyticsRouteGuard />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: 'billing',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <BillingPage />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SettingsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
