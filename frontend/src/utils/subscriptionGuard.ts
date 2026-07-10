import { useSubscriptionStore } from '../store/subscriptionStore';

export const canCreateLink = () => {
  const subscription = useSubscriptionStore.getState().subscription;
  return (subscription?.maxLinks ?? 0) > 0;
};

export const canUseAnalytics = () => {
  const subscription = useSubscriptionStore.getState().subscription;
  return Boolean(subscription?.advancedAnalytics);
};

export const canUseCustomDomain = () => {
  const subscription = useSubscriptionStore.getState().subscription;
  return Boolean(subscription?.customDomains);
};
