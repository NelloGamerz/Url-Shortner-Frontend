import { useMemo } from 'react';
import { useSubscriptionStore } from '../store/subscriptionStore';
import type { SubscriptionFeatureKey } from '../types/subscription';

export function useSubscription() {
  const subscription = useSubscriptionStore((state) => state.subscription);
  const loading = useSubscriptionStore((state) => state.loading);
  const error = useSubscriptionStore((state) => state.error);
  const fetchSubscription = useSubscriptionStore((state) => state.fetchSubscription);
  const clearSubscription = useSubscriptionStore((state) => state.clearSubscription);

  const hasFeature = (feature: SubscriptionFeatureKey) => {
    if (!subscription) {
      return false;
    }

    return subscription[feature];
  };

  const hasPlan = (planId: string) => subscription?.plan === planId;

  return useMemo(
    () => ({
      subscription,
      loading,
      error,
      fetchSubscription,
      clearSubscription,
      hasFeature,
      hasPlan,
    }),
    [subscription, loading, error, fetchSubscription, clearSubscription]
  );
}
