import { AxiosInstance } from 'axios';
import { UserProfile, Subscription } from '../types';

export const createUserApi = (client: AxiosInstance) => ({
  getProfile: async (): Promise<UserProfile> => {
    const response = await client.get('/profile');
    return response.data;
  },

  getSubscription: async (): Promise<Subscription> => {
    const response = await client.get('/subscription');
    return response.data;
  },
});
