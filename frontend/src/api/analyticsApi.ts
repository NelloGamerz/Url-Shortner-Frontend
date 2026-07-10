import { AxiosInstance } from "axios";
import { AnalyticsResponse, DashboardStats, LinkAnalytics, RecentClick } from "../types";

export const createAnalyticsApi = (client: AxiosInstance) => ({
  getDashboard: async (): Promise<DashboardStats> => {
    const response = await client.get("/dashboard");
    return response.data;
  },

  getAnalytics: async (): Promise<AnalyticsResponse> => {
    const response = await client.get("/analytics");
    return response.data;
  },

  getLinkAnalytics: async (linkId: string): Promise<LinkAnalytics> => {
    const response = await client.get(`/links/${linkId}/analytics`);
    return response.data;
  },

  getRecentClicks: async (
    linkId: string,
    limit = 10,
  ): Promise<RecentClick[]> => {
    const response = await client.get(`/links/${linkId}/clicks?limit=${limit}`);
    return response.data;
  },
});
