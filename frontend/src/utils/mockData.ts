import { Link, DashboardStats, LinkAnalytics, RecentClick } from '../types';

export const mockLinks: Link[] = [
  {
    id: '1',
    shortUrl: 'https://short.ly/abc123',
    originalUrl: 'https://github.com/example/project',
    slug: 'abc123',
    clicks: 1247,
    createdAt: '2025-06-15T10:30:00Z',
  },
  {
    id: '2',
    shortUrl: 'https://short.ly/xyz789',
    originalUrl: 'https://docs.google.com/document/d/example',
    slug: 'xyz789',
    clicks: 892,
    createdAt: '2025-06-20T14:15:00Z',
  },
  {
    id: '3',
    shortUrl: 'https://short.ly/promo24',
    originalUrl: 'https://mysaas.com/summer-sale-2025',
    slug: 'promo24',
    clicks: 3421,
    createdAt: '2025-07-01T08:00:00Z',
  },
  {
    id: '4',
    shortUrl: 'https://short.ly/demo',
    originalUrl: 'https://example.com/product-demo-video',
    slug: 'demo',
    clicks: 567,
    createdAt: '2025-07-02T16:45:00Z',
  },
  {
    id: '5',
    shortUrl: 'https://short.ly/startup',
    originalUrl: 'https://techcrunch.com/article/startup-funding-round',
    slug: 'startup',
    clicks: 2154,
    createdAt: '2025-07-03T11:20:00Z',
  },
];

export const mockDashboardStats: DashboardStats = {
  totalLinks: 5,
  totalClicks: 8981,
  topPerformingLink: mockLinks[2],
  thisMonthClicks: 6386,
  topLinks: mockLinks.slice(0, 3),
  chartData: []
};

export const generateMockAnalytics = (): LinkAnalytics => ({
  linkId: '3',
  totalClicks: 3421,
  clicksOverTime: [
    { date: '2025-06-28', clicks: 45 },
    { date: '2025-06-29', clicks: 89 },
    { date: '2025-06-30', clicks: 120 },
    { date: '2025-07-01', clicks: 567 },
    { date: '2025-07-02', clicks: 423 },
    { date: '2025-07-03', clicks: 678 },
    { date: '2025-07-04', clicks: 512 },
    { date: '2025-07-05', clicks: 389 },
    { date: '2025-07-06', clicks: 598 },
  ],
  topReferrers: [
    { source: 'twitter.com', clicks: 892 },
    { source: 'linkedin.com', clicks: 654 },
    { source: 'facebook.com', clicks: 421 },
    { source: 'google.com', clicks: 312 },
    { source: 'direct', clicks: 1142 },
  ],
  deviceBreakdown: [
    { device: 'Mobile', clicks: 1456 },
    { device: 'Desktop', clicks: 1643 },
    { device: 'Tablet', clicks: 322 },
  ],
  geographicData: [
    { country: 'United States', clicks: 1423 },
    { country: 'United Kingdom', clicks: 543 },
    { country: 'Germany', clicks: 321 },
    { country: 'Canada', clicks: 287 },
    { country: 'India', clicks: 245 },
  ],
});

export const mockRecentClicks: RecentClick[] = [
  {
    id: '1',
    timestamp: '2025-07-06T14:25:32Z',
    referrer: 'twitter.com',
    device: 'Mobile',
    browser: 'Chrome',
    country: 'United States',
    ip: '192.168.1.xxx',
  },
  {
    id: '2',
    timestamp: '2025-07-06T14:18:45Z',
    referrer: 'linkedin.com',
    device: 'Desktop',
    browser: 'Firefox',
    country: 'United Kingdom',
    ip: '10.0.0.xxx',
  },
  {
    id: '3',
    timestamp: '2025-07-06T14:15:21Z',
    referrer: 'direct',
    device: 'Mobile',
    browser: 'Safari',
    country: 'Canada',
    ip: '172.16.0.xxx',
  },
  {
    id: '4',
    timestamp: '2025-07-06T14:10:08Z',
    referrer: 'google.com',
    device: 'Desktop',
    browser: 'Chrome',
    country: 'Germany',
    ip: '192.168.2.xxx',
  },
  {
    id: '5',
    timestamp: '2025-07-06T14:05:33Z',
    referrer: 'facebook.com',
    device: 'Tablet',
    browser: 'Safari',
    country: 'India',
    ip: '10.1.1.xxx',
  },
];

export const generateDashboardChart = () => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      clicks: Math.floor(Math.random() * 500) + 100,
    });
  }
  return data;
};
