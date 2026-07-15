import {
  BarChart3,
  Globe,
  Monitor,
  MousePointer,
  Calendar,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { AnalyticsChart } from "../../components/common/AnalyticsChart";
import { ChartSkeleton } from "../../components/common/LoadingSkeleton";
import { useAnalytics } from "../../hooks/useApi";
import { StatsCard } from "../../components/common/StatsCard";

const COLORS = ["#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe", "#e0e7ff"];

export function AnalyticsPage() {
  // const { isLoading } = useDashboard();
  // const [analyticsData] = useState(generateMockAnalytics());
  const { data: analyticsData, isLoading } = useAnalytics();

  if (isLoading || !analyticsData) {
    return (
      <div className="space-y-6">
        <ChartSkeleton />
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    );
  }

  const totalClicks = analyticsData.totalClicks;

  const mobileClicks =
    analyticsData.deviceBreakdown.find((d) => d.device === "Mobile")?.clicks ??
    0;

  const mobilePercentage =
    totalClicks > 0 ? ((mobileClicks / totalClicks) * 100).toFixed(1) : 0;

  const topCountry =
    analyticsData.geographicData.length > 0
      ? analyticsData.geographicData.reduce((max, current) =>
          current.clicks > max.clicks ? current : max,
        )
      : { country: "N/A", clicks: 0 };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Analytics
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Detailed insights into your link performance
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Calendar className="w-4 h-4" />
          Last 30 days
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        ) : (
          <>
            <StatsCard
              title="Total Clicks"
              value={analyticsData.totalClicks.toLocaleString()}
              icon={MousePointer}
              // change="+18%"
              changeType="positive"
            />
            <StatsCard
              title="Unique Visitors"
              value={Math.floor(
                analyticsData.totalClicks * 0.7,
              ).toLocaleString()}
              icon={Globe}
              // change="+14%"
              changeType="positive"
            />
            <StatsCard
              title="Mobile Traffic"
              value={`${mobilePercentage}%`}
              icon={Monitor}
              // change="+5%"
              changeType="positive"
            />
            <StatsCard
              title="Top Country"
              value={topCountry.country}
              icon={BarChart3}
              changeType="positive"
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clicks Over Time */}
        <AnalyticsChart
          data={analyticsData.clicksOverTime}
          title="Click Trend"
          type="area"
        />

        {/* Device Breakdown */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              Device Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.deviceBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="clicks"
                    nameKey="device"
                    label={({ device, percent }) =>
                      `${device} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {analyticsData.deviceBreakdown.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Referrers and Geographic Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Referrers */}
        {/* <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              Top Traffic Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topReferrers.map((referrer, index) => (
                <div key={referrer.source} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {referrer.source}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {referrer.clicks.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{
                          width: `${
                            (referrer.clicks /
                              analyticsData.topReferrers[0].clicks) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}

        {/* Geographic Data */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              Top Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData.geographicData}
                  layout="vertical"
                  margin={{ top: 0, right: 0, left: 80, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis
                    type="category"
                    dataKey="country"
                    tick={{ fontSize: 12 }}
                    width={75}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="clicks" fill="#6366f1" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Clicks */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
            Recent Clicks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Time
                  </th>
                  {/* <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Referrer
                  </th> */}
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Browser
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Country
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {analyticsData?.recentClicks.map((click) => (
                  <tr
                    key={click.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                      {new Date(click.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">
                      {click.referrer}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                      {click.device}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                      {click.browser}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                      {click.country}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AnalyticsPage;
