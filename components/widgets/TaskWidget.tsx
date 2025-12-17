import React from 'react';
import { BaseWidget } from './BaseWidget';
import { Task } from '@/lib/mock-data';
import { Clock, CheckCircle2, Eye, Calendar } from 'lucide-react';

interface TaskWidgetProps {
  title: string;
  tasks: Task[];
  onDelete?: () => void;
  type: 'in-progress' | 'completed' | 'reviewed';
}

export function TaskWidget({ title, tasks, onDelete, type }: TaskWidgetProps) {
  const getIcon = () => {
    switch (type) {
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'reviewed':
        return <Eye className="w-5 h-5 text-purple-600" />;
    }
  };

  const getStatusColor = () => {
    switch (type) {
      case 'in-progress':
        return 'border-blue-200 bg-blue-50';
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'reviewed':
        return 'border-purple-200 bg-purple-50';
    }
  };

  return (
    <BaseWidget title={title} onDelete={onDelete}>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
              {getIcon()}
            </div>
            <p className="text-sm">No tasks found</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`p-3 rounded-lg border ${getStatusColor()} hover:shadow-sm transition-all cursor-pointer`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getIcon()}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">{task.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{task.course}</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </BaseWidget>
  );
}

