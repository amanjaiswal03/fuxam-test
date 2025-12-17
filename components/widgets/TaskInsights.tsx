import React from 'react';
import { BaseWidget } from './BaseWidget';
import { Task } from '@/lib/mock-data';
import { TrendingUp, Target, Award, BarChart3 } from 'lucide-react';

interface TaskInsightsProps {
  tasks: Task[];
  onDelete?: () => void;
}

export function TaskInsights({ tasks, onDelete }: TaskInsightsProps) {
  const completedTasks = tasks.filter((task) => task.status === 'completed');
  const highPriorityCompleted = completedTasks.filter((task) => task.priority === 'high').length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  const stats = [
    {
      label: 'Completed',
      value: completedTasks.length,
      icon: Award,
      color: 'text-green-600 bg-green-100',
    },
    {
      label: 'High Priority',
      value: highPriorityCompleted,
      icon: Target,
      color: 'text-red-600 bg-red-100',
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-100',
    },
  ];

  return (
    <BaseWidget title="Task Insights" onDelete={onDelete}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900 text-sm">This Week</h4>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Tasks Completed</span>
                <span className="font-semibold text-gray-900">{completedTasks.length}/{totalTasks}</span>
              </div>
              <div className="w-full bg-white rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseWidget>
  );
}

