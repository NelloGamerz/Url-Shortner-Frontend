import { useCallback, useMemo, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useMutation } from '@tanstack/react-query';
import { useProtectedApiClient } from '../api/client';
import { createSubscription, type SubscriptionPlanId } from '../services/subscriptionService';
import { loadRazorpayScript, type RazorpayOptions } from '../lib/razorpay';
import { useToast } from './use-toast';
import { useSubscriptionStore } from '../store/subscriptionStore';
import type { SubscriptionFeatureKey } from '../types/subscription';

export function useSubscription() {
  const { toast } = useToast();
  const client = useProtectedApiClient();
  const { isSignedIn } = useAuth();
  const [activePlan, setActivePlan] = useState<SubscriptionPlanId | null>(null);

  const subscription = useSubscriptionStore((state) => state.subscription);
  const loading = useSubscriptionStore((state) => state.loading);
  const error = useSubscriptionStore((state) => state.error);
  const fetchSubscription = useSubscriptionStore((state) => state.fetchSubscription);
  const clearSubscription = useSubscriptionStore((state) => state.clearSubscription);

  const mutation = useMutation({
    mutationFn: async (planId: SubscriptionPlanId) => {
      const response = await createSubscription(client, planId);
      await loadRazorpayScript();

      const key = import.meta.env.VITE_RAZORPAY_KEY;
      if (!key) {
        throw new Error('Razorpay key is not configured.');
      }

      const options: RazorpayOptions = {
        key,
        subscription_id: response.subscriptionId,
        name: 'URL Shortener',
        description: 'Premium Subscription',
        theme: {
          color: '#4f46e5',
        },
        handler: () => {
          toast({
            title: 'Subscription created successfully.',
            description: 'Your subscription is being processed by the backend.',
          });

          window.location.href = "/pricing?payment=success";
        },
        modal: {
          ondismiss: () => {
            toast({
              title: 'Checkout cancelled',
              description: 'The subscription checkout was cancelled.',
              variant: 'destructive',
            });
          },
        },
      };

      const Razorpay = window.Razorpay;
      if (!Razorpay) {
        throw new Error('Razorpay is not available.');
      }

      const razorpay = new Razorpay(options);
      razorpay.on('payment.failed', (response: unknown) => {
        const paymentResponse = response as { error?: { description?: string } };
        toast({
          title: 'Payment failed',
          description: paymentResponse.error?.description || 'The payment could not be completed.',
          variant: 'destructive',
        });
      });

      razorpay.open();
      return response;
    },
    onMutate: async (planId) => {
      setActivePlan(planId);
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : 'Unable to start subscription checkout.';

      toast({
        title: 'Subscription failed',
        description: message,
        variant: 'destructive',
      });
    },
    onSettled: () => {
      setActivePlan(null);
    },
  });

  const subscribe = useCallback(
    async (planId: SubscriptionPlanId) => {
      if (!isSignedIn) {
        toast({
          title: 'Sign in required',
          description: 'Please sign in to continue with your subscription.',
          variant: 'destructive',
        });
        return;
      }

      await mutation.mutateAsync(planId);
    },
    [isSignedIn, mutation, toast]
  );

  const hasFeature = (feature: SubscriptionFeatureKey) => Boolean(subscription?.[feature]);
  const hasPlan = (planId: string) => subscription?.plan === planId || subscription?.planId === planId;

  return useMemo(
    () => ({
      subscription,
      loading,
      error,
      fetchSubscription,
      clearSubscription,
      hasFeature,
      hasPlan,
      subscribe,
      isLoading: mutation.isPending,
      activePlan,
    }),
    [subscription, loading, error, fetchSubscription, clearSubscription, subscribe, mutation.isPending, activePlan]
  );
}
