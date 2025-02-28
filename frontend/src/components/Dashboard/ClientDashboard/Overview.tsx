import { StatsCard, Timeline } from '../../shared';
import { Activity, Clock, DollarSign } from 'lucide-react';

const stats = [
  { icon: Activity, title: 'Active Orders', value: 12, description: 'In progress' },
  { icon: Clock, title: 'Pending Orders', value: 3, description: 'Awaiting approval' },
  { icon: DollarSign, title: 'Total Spent', value: '$1,200', description: 'This month' },
];

const activities = [
  { id: '1', title: 'Order #123 Completed', description: 'Your order has been delivered.', date: '2 hours ago' },
  { id: '2', title: 'Order #124 Submitted', description: 'Your order is being processed.', date: '5 hours ago' },
];

export const Overview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Timeline items={activities} />
      </div>
    </div>
  );
};