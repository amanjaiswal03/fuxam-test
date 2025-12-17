export type WidgetSize = '1x1' | '2x2' | '3x1' | '3x2' | '4x1' | '4x2' | '6x1' | '6x2';

export interface WidgetConfig {
  showPinnedOnly?: boolean;
  imageUrl?: string;
  [key: string]: any;
}

export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  size: WidgetSize;
  config: WidgetConfig;
}

export interface WidgetLayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}

export type WidgetCategory = 'course' | 'calendar' | 'management' | 'chat' | 'general';

export type WidgetType =
  // Course widgets
  | 'course-slider'
  | 'todo-list'
  | 'course-table'
  | 'in-progress-tasks'
  | 'recently-completed-tasks'
  | 'reviewed-tasks'
  | 'completed-task-insights'
  // Calendar widgets
  | 'agenda'
  // Management widgets
  | 'link-users'
  | 'link-groups'
  | 'link-terms'
  | 'link-modules'
  | 'link-curricula'
  | 'link-study-plans'
  | 'link-smartplan'
  // Chat widgets
  | 'recent-chats'
  // General widgets
  | 'image-widget';

export interface WidgetDefinition {
  type: WidgetType;
  category: WidgetCategory;
  title: string;
  description: string;
  icon: string;
  defaultSize: WidgetSize;
  availableSizes: WidgetSize[];
  hasSettings: boolean;
  settingsConfig?: {
    showPinnedOnly?: boolean;
    imageUrl?: boolean;
    [key: string]: any;
  };
}

export interface DashboardState {
  widgets: Widget[];
  layouts: WidgetLayout[];
}

