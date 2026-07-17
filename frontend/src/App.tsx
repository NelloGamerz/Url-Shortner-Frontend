import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { router } from './routes/router';
import { setSubscriptionAuthTokenProvider, useSubscriptionStore } from './store/subscriptionStore';
import { SpeedInsights } from "@vercel/speed-insights/react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function SubscriptionInitializer() {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const fetchSubscription = useSubscriptionStore((state) => state.fetchSubscription);
  const clearSubscription = useSubscriptionStore((state) => state.clearSubscription);

  useEffect(() => {
    setSubscriptionAuthTokenProvider(async () => {
      if (!isSignedIn) {
        return null;
      }

      return getToken();
    });

    if (!isLoaded) {
      return;
    }

    if (isSignedIn) {
      void fetchSubscription();
      return;
    }

    clearSubscription();
  }, [clearSubscription, fetchSubscription, getToken, isLoaded, isSignedIn]);

  return null;
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <SubscriptionInitializer />
        <RouterProvider router={router} />
        <Toaster />
        <SpeedInsights />
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default App;
