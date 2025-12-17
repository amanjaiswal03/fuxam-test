import React, { Suspense } from 'react';
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
import { WidgetSkeleton, CourseCardSkeleton, TableRowSkeleton, AgendaItemSkeleton, ChatItemSkeleton } from '../WidgetSkeleton';
import { useDelayedData } from '@/hooks/useDelayedData';
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

  // Always use mockCourses - let the widget handle filtering
  const delayedCourses = useDelayedData(mockCourses, 800);
  const delayedTasks = useDelayedData(mockTasks, 800);
  const delayedAgenda = useDelayedData(mockAgenda, 800);
  const delayedChats = useDelayedData(mockChats, 800);

  // Helper to render skeleton based on widget type
  const getSkeleton = () => {
    switch (widget.type) {
      case 'course-slider':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        );
      case 'course-table':
        return (
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
            <table className="w-full">
              <tbody>
                {[...Array(3)].map((_, i) => (
                  <TableRowSkeleton key={i} />
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'agenda':
        return (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <AgendaItemSkeleton key={i} />
            ))}
          </div>
        );
      case 'recent-chats':
        return (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <ChatItemSkeleton key={i} />
            ))}
          </div>
        );
      default:
        return <WidgetSkeleton />;
    }
  };

  switch (widget.type) {
    case 'course-slider':
      return delayedCourses ? (
        <CourseSlider
          courses={delayedCourses}
          onDelete={isEditMode ? handleDelete : undefined}
          onSettings={isEditMode ? handleSettings : undefined}
          showPinnedOnly={widget.config.showPinnedOnly}
          isEditMode={isEditMode}
        />
      ) : (
        getSkeleton()
      );

    case 'todo-list':
      return delayedTasks ? (
        <TodoList tasks={getTasksByStatus('pending')} onDelete={isEditMode ? handleDelete : undefined} />
      ) : (
        getSkeleton()
      );

    case 'course-table':
      return delayedCourses ? (
        <CourseTable
          courses={delayedCourses}
          onDelete={isEditMode ? handleDelete : undefined}
          onSettings={isEditMode ? handleSettings : undefined}
          showPinnedOnly={widget.config.showPinnedOnly}
          isEditMode={isEditMode}
        />
      ) : (
        getSkeleton()
      );

    case 'in-progress-tasks':
      return delayedTasks ? (
        <TaskWidget
          title="In Progress Tasks"
          tasks={getTasksByStatus('in-progress')}
          type="in-progress"
          onDelete={isEditMode ? handleDelete : undefined}
        />
      ) : (
        getSkeleton()
      );

    case 'recently-completed-tasks':
      return delayedTasks ? (
        <TaskWidget
          title="Recently Completed"
          tasks={getTasksByStatus('completed')}
          type="completed"
          onDelete={isEditMode ? handleDelete : undefined}
        />
      ) : (
        getSkeleton()
      );

    case 'reviewed-tasks':
      return delayedTasks ? (
        <TaskWidget
          title="Reviewed Tasks"
          tasks={getTasksByStatus('reviewed')}
          type="reviewed"
          onDelete={isEditMode ? handleDelete : undefined}
        />
      ) : (
        getSkeleton()
      );

    case 'completed-task-insights':
      return delayedTasks ? (
        <TaskInsights tasks={delayedTasks} onDelete={isEditMode ? handleDelete : undefined} />
      ) : (
        getSkeleton()
      );

    case 'agenda':
      return delayedAgenda ? (
        <Agenda events={delayedAgenda} onDelete={isEditMode ? handleDelete : undefined} />
      ) : (
        getSkeleton()
      );

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
      return delayedChats ? (
        <RecentChats chats={delayedChats} onDelete={isEditMode ? handleDelete : undefined} />
      ) : (
        getSkeleton()
      );

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

