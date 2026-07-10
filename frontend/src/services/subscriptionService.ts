import type { AxiosInstance } from 'axios';

export type SubscriptionPlanId = 'FREE' | 'PRO' | 'BUSINESS' | 'ULTIMATE';

export interface SubscriptionCreateRequest {
  planId: SubscriptionPlanId;
  totalCount: number;
}

export interface SubscriptionCreateResponse {
  subscriptionId: string;
  status: string;
}

export const createSubscription = async (
  client: AxiosInstance,
  planId: SubscriptionPlanId
): Promise<SubscriptionCreateResponse> => {
  const response = await client.post<SubscriptionCreateResponse>('/subscription/create', {
    planId,
    totalCount: 12,
  } as SubscriptionCreateRequest);

  return response.data;
};
