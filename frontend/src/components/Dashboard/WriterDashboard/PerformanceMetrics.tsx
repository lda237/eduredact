import { StatsCard } from '../shared';
import { Activity, Clock, DollarSign } from 'lucide-react';

const stats = [
  { icon: Activity, title: 'Completed Orders', value: 8, description: 'This month' },
  { icon: Clock, title: 'Pending Orders', value: 2, description: 'In progress' },
  { icon: DollarSign, title: 'Earnings', value: '$800', description: 'This month' },
];

export const PerformanceMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};