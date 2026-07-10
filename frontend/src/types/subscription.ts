export interface SubscriptionInfo {
  plan?: string;
  planId?: string;
  maxLinks: number;
  maxRedirects?: number;
  advancedAnalytics: boolean;
  customDomains: boolean;
  status: string;
}

export interface SubscriptionState {
  subscription: SubscriptionInfo | null;
  loading: boolean;
  error: string | null;

  fetchSubscription: () => Promise<void>;
  clearSubscription: () => void;
}

export type SubscriptionFeatureKey = 'advancedAnalytics' | 'customDomains';
