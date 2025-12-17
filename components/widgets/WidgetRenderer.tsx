import React from 'react';
import { Widget, WidgetType } from '@/types/widget';
import { CourseSlider } from './CourseSlider';
import { TodoList } from './TodoList';
import { CourseTable } from './CourseTable';
import { TaskWidget } from './TaskWidget';
import { TaskInsights } from './TaskInsights';
import { Agenda } from './Agenda';
import { LinkWidget } from './LinkWidget';
import { RecentChats } from './RecentChats';
import { ImageWidget } from './ImageWidget';
import {
  mockCourses,
  mockTasks,
  mockAgenda,
  mockChats,
  getPinnedCourses,
  getTasksByStatus,
  getUpcomingAgenda,
} from '@/lib/mock-data';
import {
  Users,
  Users2,
  CalendarRange,
  BookOpen,
  Library,
  ClipboardList,
  Lightbulb,
} from 'lucide-react';

interface WidgetRendererProps {
  widget: Widget;
  onDelete?: (id: string) => void;
  onSettings?: (id: string) => void;
  isEditMode?: boolean;
}

export function WidgetRenderer({ widget, onDelete, onSettings, isEditMode = false }: WidgetRendererProps) {
  const handleDelete = onDelete ? () => onDelete(widget.id) : undefined;
  const handleSettings = onSettings ? () => onSettings(widget.id) : undefined;

  const courses = widget.config.showPinnedOnly ? getPinnedCourses() : mockCourses;

  switch (widget.type) {
    case 'course-slider':
      return (
        <CourseSlider
          courses={courses}
          onDelete={isEditMode ? handleDelete : undefined}
          onSettings={isEditMode ? handleSettings : undefined}
          showPinnedOnly={widget.config.showPinnedOnly}
          isEditMode={isEditMode}
        />
      );

    case 'todo-list':
      return <TodoList tasks={getTasksByStatus('pending')} onDelete={isEditMode ? handleDelete : undefined} />;

    case 'course-table':
      return (
        <CourseTable
          courses={courses}
          onDelete={isEditMode ? handleDelete : undefined}
          onSettings={isEditMode ? handleSettings : undefined}
          showPinnedOnly={widget.config.showPinnedOnly}
          isEditMode={isEditMode}
        />
      );

    case 'in-progress-tasks':
      return (
        <TaskWidget
          title="In Progress Tasks"
          tasks={getTasksByStatus('in-progress')}
          type="in-progress"
          onDelete={isEditMode ? handleDelete : undefined}
        />
      );

    case 'recently-completed-tasks':
      return (
        <TaskWidget
          title="Recently Completed"
          tasks={getTasksByStatus('completed')}
          type="completed"
          onDelete={isEditMode ? handleDelete : undefined}
        />
      );

    case 'reviewed-tasks':
      return (
        <TaskWidget
          title="Reviewed Tasks"
          tasks={getTasksByStatus('reviewed')}
          type="reviewed"
          onDelete={isEditMode ? handleDelete : undefined}
        />
      );

    case 'completed-task-insights':
      return <TaskInsights tasks={mockTasks} onDelete={isEditMode ? handleDelete : undefined} />;

    case 'agenda':
      return <Agenda events={getUpcomingAgenda()} onDelete={isEditMode ? handleDelete : undefined} />;

    case 'link-users':
      return (
        <LinkWidget
          title="Users"
          icon={Users}
          href="/management/users"
          onDelete={isEditMode ? handleDelete : undefined}
          description="Manage system users"
        />
      );

    case 'link-groups':
      return (
        <LinkWidget
          title="Groups"
          icon={Users2}
          href="/management/groups"
          onDelete={isEditMode ? handleDelete : undefined}
          description="Manage user groups"
        />
      );

    case 'link-terms':
      return (
        <LinkWidget
          title="Terms"
          icon={CalendarRange}
          href="/management/terms"
          onDelete={isEditMode ? handleDelete : undefined}
          description="Academic terms"
        />
      );

    case 'link-modules':
      return (
        <LinkWidget
          title="Modules"
          icon={BookOpen}
          href="/management/modules"
          onDelete={isEditMode ? handleDelete : undefined}
          description="Course modules"
        />
      );

    case 'link-curricula':
      return (
        <LinkWidget
          title="Curricula"
          icon={Library}
          href="/management/curricula"
          onDelete={isEditMode ? handleDelete : undefined}
          description="Curriculum management"
        />
      );

    case 'link-study-plans':
      return (
        <LinkWidget
          title="Study Plans"
          icon={ClipboardList}
          href="/management/study-plans"
          onDelete={isEditMode ? handleDelete : undefined}
          description="Student study plans"
        />
      );

    case 'link-smartplan':
      return (
        <LinkWidget
          title="SmartPlan"
          icon={Lightbulb}
          href="/management/smartplan"
          onDelete={isEditMode ? handleDelete : undefined}
          description="AI-powered planning"
        />
      );

    case 'recent-chats':
      return <RecentChats chats={mockChats} onDelete={isEditMode ? handleDelete : undefined} />;

    case 'image-widget':
      return (
        <ImageWidget
          imageUrl={widget.config.imageUrl}
          onDelete={isEditMode ? handleDelete : undefined}
          onSettings={isEditMode ? handleSettings : undefined}
        />
      );

    default:
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex items-center justify-center">
          <p className="text-gray-500">Unknown widget type</p>
        </div>
      );
  }
}

