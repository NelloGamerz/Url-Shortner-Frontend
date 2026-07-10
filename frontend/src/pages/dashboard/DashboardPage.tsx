import { Link2, MousePointer, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';
import { AnalyticsChart } from '../../components/common/AnalyticsChart';
import { mockDashboardStats } from '../../utils/mockData';
import { useDashboard } from '../../hooks/useApi';
import { StatsCardSkeleton, ChartSkeleton } from '../../components/common/LoadingSkeleton';
import { useSubscription } from '../../hooks/useSubscription';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';

export function DashboardPage() {
  const { data: dashboardData, isLoading } = useDashboard();
  const { subscription } = useSubscription();
  const chartData = dashboardData?.chartData ?? [];

  const stats = dashboardData || mockDashboardStats;
  const topLinks = dashboardData?.topLinks ?? [];

  const isFreePlan =
    (subscription?.planId ?? subscription?.plan ?? 'FREE').toUpperCase() === 'FREE';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Welcome back! Here's an overview of your links.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          <>
            <StatsCard
              title="Total Links"
              value={stats.totalLinks}
              icon={Link2}
              changeType="positive"
            />

            <StatsCard
              title="Total Clicks"
              value={stats.totalClicks.toLocaleString()}
              icon={MousePointer}
              changeType="positive"
            />

            {!isFreePlan ? (
              <>
                <StatsCard
                  title="Top Performing Link"
                  value={stats.topPerformingLink?.shortUrl || 'N/A'}
                  icon={TrendingUp}
                  change={`${stats.topPerformingLink?.clicks.toLocaleString() || 0} clicks`}
                  changeType="neutral"
                />

                <StatsCard
                  title="This Month Clicks"
                  value={stats.thisMonthClicks.toLocaleString()}
                  icon={Calendar}
                  // change="+23%"
                  changeType="positive"
                />
              </>
            ) : (
              <>
                <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 opacity-70 blur-[2px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Top Performing Link
                    </span>
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-slate-400">
                    Hidden
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 opacity-70 blur-[2px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      This Month Clicks
                    </span>
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-slate-400">
                    Hidden
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Charts */}
      {isFreePlan ? (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Advanced Analytics
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Upgrade your account to unlock full analytics, performance trends,
                and deeper insights.
              </p>
            </div>

            <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Link to="/pricing">
                Upgrade Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <AnalyticsChart
                data={chartData}
                title="Clicks Over Time"
                type="area"
              />

              <AnalyticsChart
                data={chartData.slice(-7)}
                title="Weekly Performance"
                type="line"
              />
            </>
          )}
        </div>
      )}

      {/* Recent Links */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Recent Links
        </h2>

        <div className="space-y-3">
          {isLoading ? (
            <p className="text-sm text-slate-500">
              Loading links...
            </p>
          ) : topLinks.length === 0 ? (
            <p className="text-sm text-slate-500">
              No links found.
            </p>
          ) : (
            topLinks.slice(0, 3).map((link) => (
              <a
                key={link.id}
                href={link.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                    <Link2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>

                  <div>
                    <p className="font-medium text-indigo-600 dark:text-indigo-400 group-hover:underline">
                      {link.shortUrl.replace('https://', '')}
                    </p>

                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-md">
                      {link.originalUrl}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {link.clicks.toLocaleString()}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    clicks
                  </p>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;