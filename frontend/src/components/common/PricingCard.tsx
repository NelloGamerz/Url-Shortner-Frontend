import { Check, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
  isPopular?: boolean;
  buttonText: string;
  onButtonClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function PricingCard({
  name,
  price,
  description,
  features,
  isPopular = false,
  buttonText,
  onButtonClick,
  isLoading = false,
  disabled = false,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'relative p-8 bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300',
        isPopular
          ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-xl shadow-indigo-500/10'
          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700',
        className
      )}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{name}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm">{description}</p>
      </div>

      <div className="text-center mb-6">
        <span className="text-4xl font-bold text-slate-900 dark:text-white">{price}</span>
        {price !== 'Custom' && <span className="text-slate-500 dark:text-slate-400">/month</span>}
      </div>

      <Button
        className={cn(
          'w-full mb-8',
          isPopular
            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
        )}
        onClick={onButtonClick}
        disabled={disabled || isLoading}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {buttonText}
      </Button>

      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div
              className={cn(
                'w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                feature.included
                  ? 'bg-indigo-100 dark:bg-indigo-900/50'
                  : 'bg-slate-100 dark:bg-slate-800'
              )}
            >
              <Check
                className={cn(
                  'w-3 h-3',
                  feature.included
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-400 dark:text-slate-600'
                )}
              />
            </div>
            <span
              className={cn(
                'text-sm',
                feature.included
                  ? 'text-slate-700 dark:text-slate-300'
                  : 'text-slate-400 dark:text-slate-600'
              )}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
