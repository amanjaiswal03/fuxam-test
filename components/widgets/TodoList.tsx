import React, { useState } from 'react';
import { BaseWidget } from './BaseWidget';
import { Task } from '@/lib/mock-data';
import { Square, CheckSquare, CheckCircle2 } from 'lucide-react';

interface TodoListProps {
  tasks: Task[];
  onDelete?: () => void;
}

export function TodoList({ tasks, onDelete }: TodoListProps) {
  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());
  const pendingTasks = tasks.filter((task) => task.status === 'pending');

  const toggleTask = (taskId: string) => {
    setCheckedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const isTaskChecked = (taskId: string) => checkedTasks.has(taskId);

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
          pendingTasks.map((task) => {
            const isChecked = isTaskChecked(task.id);
            return (
              <div
                key={task.id}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${isChecked
                  ? 'bg-gray-100 border-gray-300 opacity-60'
                  : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                  }`}
                onClick={() => toggleTask(task.id)}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTask(task.id);
                    }}
                    className="mt-0.5 flex-shrink-0"
                    aria-label={isChecked ? 'Uncheck task' : 'Check task'}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-medium text-sm mb-1 transition-all ${isChecked
                        ? 'text-gray-500 line-through'
                        : 'text-gray-900'
                        }`}
                    >
                      {task.title}
                    </h4>
                    <p
                      className={`text-xs mb-2 transition-all ${isChecked ? 'text-gray-400 line-through' : 'text-gray-600'
                        }`}
                    >
                      {task.course}
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(
                          task.priority
                        )} ${isChecked ? 'opacity-50' : ''}`}
                      >
                        {task.priority}
                      </span>
                      <span
                        className={`text-xs transition-all ${isChecked ? 'text-gray-400 line-through' : 'text-gray-500'
                          }`}
                      >
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </BaseWidget>
  );
}

