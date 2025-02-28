import { StatsCard } from '../../shared';
import { Activity, Clock, DollarSign } from 'lucide-react';

const stats = [
  { icon: Activity, title: 'Total Orders', value: 120, description: 'This month' },
  { icon: Clock, title: 'Pending Orders', value: 15, description: 'Awaiting approval' },
  { icon: DollarSign, title: 'Total Revenue', value: '$12,000', description: 'This month' },
];

export const PlatformMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};