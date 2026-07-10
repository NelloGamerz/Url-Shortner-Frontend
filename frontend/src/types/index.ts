export interface Link {
  id: string;
  shortUrl: string;
  originalUrl: string;
  slug: string;
  clicks: number;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateLinkRequest {
  url: string;
  customAlias?: string;
}

export interface CreateLinkResponse {
  shortUrl: string;
}

export interface UpdateLinkRequest {
  originalUrl?: string;
  customAlias?: string;
}

export interface DashboardChartData {
  date: string;
  clicks: number;
}

export interface DashboardStats {
  totalLinks: number;
  totalClicks: number;
  topPerformingLink: Link | null;
  thisMonthClicks: number;
  topLinks: Link[];
  chartData: DashboardChartData[];
}

export interface AnalyticsResponse {
  totalClicks: number;

  clicksOverTime: {
    date: string;
    clicks: number;
  }[];

  deviceBreakdown: {
    device: string;
    clicks: number;
  }[];

  topReferrers: {
    source: string;
    clicks: number;
  }[];

  geographicData: {
    country: string;
    clicks: number;
  }[];

  recentClicks: {
    id: string;
    timestamp: string;
    referrer: string;
    browser: string;
    device: string;
    country: string;
  }[];
}

export interface AnalyticsData {
  date: string;
  clicks: number;
}

export interface LinkAnalytics {
  linkId: string;
  totalClicks: number;
  clicksOverTime: AnalyticsData[];
  topReferrers: ReferrerData[];
  deviceBreakdown: DeviceData[];
  geographicData: GeographicData[];
}

export interface ReferrerData {
  source: string;
  clicks: number;
}

export interface DeviceData {
  device: string;
  clicks: number;
}

export interface GeographicData {
  country: string;
  clicks: number;
}

export interface RecentClick {
  id: string;
  timestamp: string;
  referrer: string;
  device: string;
  browser: string;
  country: string;
  ip: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Subscription {
  plan: "free" | "pro";
  status: "active" | "inactive" | "cancelled";
  linksUsed: number;
  linksLimit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
