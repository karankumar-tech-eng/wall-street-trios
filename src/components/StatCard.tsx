import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'positive' | 'negative' | 'neutral';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend = 'neutral',
}) => {
  const getTrendColor = () => {
    if (trend === 'positive') return 'text-trade-win';
    if (trend === 'negative') return 'text-trade-loss';
    return 'text-white';
  };

  return (
    <div className="bg-dark-card border border-dark-border p-5 rounded-xl flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-dark-muted text-xs font-semibold uppercase tracking-wider">
          {title}
        </span>
        <div className="w-8 h-8 rounded-lg bg-dark-border/50 flex items-center justify-center text-dark-muted">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3">
        <p className={`text-2xl font-extrabold tracking-tight ${getTrendColor()}`}>
          {value}
        </p>
        {subtitle && (
          <p className="text-dark-muted text-xs font-medium mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
};