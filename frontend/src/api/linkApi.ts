import { AxiosInstance } from 'axios';
import {
  Link,
  CreateLinkRequest,
  CreateLinkResponse,
  UpdateLinkRequest,
  PaginatedResponse,
} from '../types';

export const createPublicLinkApi = (client: AxiosInstance) => ({
  shorten: async (url: string): Promise<CreateLinkResponse> => {
    const response = await client.post('/public/shorten', { url });
    return response.data;
  },
});

export const createLinkApi = (client: AxiosInstance) => ({
  getAll: async (page = 1, pageSize = 10): Promise<PaginatedResponse<Link>> => {
    const response = await client.get(`/links?page=${page}&pageSize=${pageSize}`);
    return response.data;
  },

  getById: async (id: string): Promise<Link> => {
    const response = await client.get(`/links/${id}`);
    return response.data;
  },

  create: async (data: CreateLinkRequest): Promise<Link> => {
    const response = await client.post('/shorten', data);
    return response.data;
  },

  update: async (id: string, data: UpdateLinkRequest): Promise<Link> => {
    const response = await client.put(`/links/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await client.delete(`/links/${id}`);
  },
});
