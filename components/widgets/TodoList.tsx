import React from 'react';
import { BaseWidget } from './BaseWidget';
import { Task } from '@/lib/mock-data';
import { Circle, CheckCircle2, AlertCircle } from 'lucide-react';

interface TodoListProps {
  tasks: Task[];
  onDelete?: () => void;
}

export function TodoList({ tasks, onDelete }: TodoListProps) {
  const pendingTasks = tasks.filter((task) => task.status === 'pending');

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  return (
    <BaseWidget title="Todo List" onDelete={onDelete}>
      <div className="space-y-3">
        {pendingTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-green-500" />
            <p className="text-sm">All caught up!</p>
          </div>
        ) : (
          pendingTasks.map((task) => (
            <div
              key={task.id}
              className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <Circle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">{task.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{task.course}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
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

