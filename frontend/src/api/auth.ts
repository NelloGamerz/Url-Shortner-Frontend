import { createProtectedClient, publicClient } from './client';
import type { SubscriptionInfo } from '../types/subscription';

export interface AuthMeResponse {
  subscription: SubscriptionInfo;
}

export const getCurrentUser = async (
  getToken?: () => Promise<string | null> | string | null
): Promise<AuthMeResponse> => {
  const client = getToken ? createProtectedClient(getToken) : publicClient;
  const response = await client.get<AuthMeResponse>('/auth/me');
  return response.data;
};
