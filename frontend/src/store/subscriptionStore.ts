import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCurrentUser } from '../api/auth';
import type { SubscriptionInfo, SubscriptionState } from '../types/subscription';

let subscriptionRequestPromise: Promise<void> | null = null;
let authTokenProvider: (() => Promise<string | null> | string | null) | null = null;

export const setSubscriptionAuthTokenProvider = (
  provider: (() => Promise<string | null> | string | null) | null
) => {
  authTokenProvider = provider;
};

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      subscription: null,
      loading: false,
      error: null,
      fetchSubscription: async () => {
        if (subscriptionRequestPromise) {
          return subscriptionRequestPromise;
        }

        set({ loading: true, error: null });

        subscriptionRequestPromise = getCurrentUser(async () => {
          if (!authTokenProvider) {
            return null;
          }

          return authTokenProvider();
        })
          .then((response) => {
            const subscription = {
              ...response.subscription,
              plan: response.subscription.plan ?? response.subscription.planId ?? 'FREE',
            };

            set({
              subscription,
              loading: false,
              error: null,
            });
          })
          .catch((error) => {
            const message = error instanceof Error ? error.message : 'Failed to load subscription information.';
            set({
              subscription: null,
              loading: false,
              error: message,
            });
          })
          .finally(() => {
            subscriptionRequestPromise = null;
          });

        return subscriptionRequestPromise;
      },
      clearSubscription: () => {
        set({ subscription: null, loading: false, error: null });
      },
    }),
    {
      name: 'subscription-storage',
      partialize: (state) => ({
        subscription: state.subscription,
      }),
    }
  )
);

export const getStoredSubscription = (): SubscriptionInfo | null =>
  useSubscriptionStore.getState().subscription;
