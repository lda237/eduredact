import React from 'react';
import { BookOpen, DollarSign, Star, Clock } from 'lucide-react';
import { StatsCard } from '../../shared/StatsCard';
import { WriterStats, Project } from '../../../types/dashboard';

interface WriterOverviewProps {
  stats: WriterStats;
  activeAssignments: Project[];
  earningsHistory: { date: Date; amount: number }[];
  upcomingDeadlines: Project[];
}

export const WriterOverview: React.FC<WriterOverviewProps> = ({
  stats,
  activeAssignments,
  earningsHistory,
  upcomingDeadlines,
}) => {
  return (
    <div className="space-y-6 p-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Completed Projects"
          value={stats.completedProjects}
          icon={BookOpen}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={Clock}
        />
        <StatsCard
          title="Total Earnings"
          value={`$${stats.earnings}`}
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Rating"
          value={stats.rating.toFixed(1)}
          icon={Star}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Assignments */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Current Assignments</h2>
          <div className="space-y-4">
            {activeAssignments.map((assignment) => (
              <div key={assignment.id} className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                <div className="mt-2 flex justify-between text-sm text-gray-500">
                  <span>Deadline: {new Date(assignment.deadline).toLocaleDateString()}</span>
                  <span className={`px-2 rounded-full text-xs font-semibold
                    ${assignment.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      assignment.status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'}`}>
                    {assignment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Earnings History</h2>
          <div className="h-64">
            {/* Chart would go here - using placeholder for now */}
            <div className="h-full flex items-center justify-center text-gray-400">
              Earnings chart visualization
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Upcoming Deadlines</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirements</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {upcomingDeadlines.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(project.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${project.status === 'completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <ul className="list-disc list-inside">
                      {project.requirements.slice(0, 2).map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                      {project.requirements.length > 2 && <li>...</li>}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};