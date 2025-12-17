import React from 'react';
import { BaseWidget } from './BaseWidget';
import { LucideIcon, ExternalLink } from 'lucide-react';

interface LinkWidgetProps {
  title: string;
  icon: LucideIcon;
  href: string;
  onDelete?: () => void;
  description?: string;
}

export function LinkWidget({ title, icon: Icon, href, onDelete, description }: LinkWidgetProps) {
  return (
    <BaseWidget title={title} onDelete={onDelete}>
      <a
        href={href}
        className="block h-full"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <div className="h-full flex flex-col items-center justify-center text-center hover:bg-gray-50 rounded-lg transition-colors cursor-pointer p-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
          {description && <p className="text-xs text-gray-600 mb-3">{description}</p>}
          <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
            <span>Open</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </a>
    </BaseWidget>
  );
}

