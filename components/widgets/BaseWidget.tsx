import React from 'react';
import { Settings, Trash2, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BaseWidgetProps {
  title: string;
  children: React.ReactNode;
  onDelete?: () => void;
  onSettings?: () => void;
  className?: string;
}

export function BaseWidget({ title, children, onDelete, onSettings, className }: BaseWidgetProps) {
  const hasActions = onDelete || onSettings;
  const isEditMode = hasActions;

  return (
    <div className={cn('bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col', isEditMode ? 'overflow-visible' : 'overflow-hidden', className)}>
      <div className={cn(
        'flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50',
        isEditMode && 'cursor-move'
      )}>
        <div className="flex items-center gap-2 flex-1 min-w-0 pointer-events-none">
          {isEditMode && <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />}
          <h3 className="font-semibold text-gray-900 text-sm truncate">{title}</h3>
        </div>
        {hasActions && (
          <div
            className="flex items-center gap-1 flex-shrink-0 ml-2"
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            {onSettings && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onSettings();
                }}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                aria-label="Widget settings"
                type="button"
              >
                <Settings className="w-4 h-4 text-gray-600" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onDelete();
                }}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors -mr-1 cursor-pointer"
                aria-label="Delete widget"
                type="button"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            )}
          </div>
        )}
      </div>
      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
    </div>
  );
}

