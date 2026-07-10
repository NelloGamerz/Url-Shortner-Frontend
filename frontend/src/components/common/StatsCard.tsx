import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'neutral',
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        'p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow duration-200',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</span>
        <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/50 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>

      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-slate-900 dark:text-white">{value}</span>
        {change && (
          <span
            className={cn(
              'text-sm font-medium mb-1',
              changeType === 'positive' && 'text-emerald-600 dark:text-emerald-400',
              changeType === 'negative' && 'text-red-600 dark:text-red-400',
              changeType === 'neutral' && 'text-slate-500 dark:text-slate-400'
            )}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
