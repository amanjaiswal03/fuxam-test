import { WidgetDefinition, WidgetType } from '@/types/widget';

export const widgetDefinitions: Record<WidgetType, WidgetDefinition> = {
    // Course widgets
    'course-slider': {
        type: 'course-slider',
        category: 'course',
        title: 'Course Slider',
        description: 'Display your courses in a horizontal slider',
        icon: 'LayoutGrid',
        defaultSize: '6x2',
        availableSizes: ['3x2', '4x2', '6x2'],
        hasSettings: true,
        settingsConfig: {
            showPinnedOnly: true,
        },
    },
    'todo-list': {
        type: 'todo-list',
        category: 'course',
        title: 'Todo List',
        description: 'View and manage your pending tasks',
        icon: 'CheckSquare',
        defaultSize: '3x2',
        availableSizes: ['2x2', '3x2', '3x1', '4x2'],
        hasSettings: false,
    },
    'course-table': {
        type: 'course-table',
        category: 'course',
        title: 'Course Table',
        description: 'Tabular view of all your courses',
        icon: 'Table',
        defaultSize: '6x2',
        availableSizes: ['4x2', '6x2'],
        hasSettings: true,
        settingsConfig: {
            showPinnedOnly: true,
        },
    },
    'in-progress-tasks': {
        type: 'in-progress-tasks',
        category: 'course',
        title: 'In Progress Tasks',
        description: 'Tasks you are currently working on',
        icon: 'Clock',
        defaultSize: '3x2',
        availableSizes: ['2x2', '3x2', '4x1', '4x2'],
        hasSettings: false,
    },
    'recently-completed-tasks': {
        type: 'recently-completed-tasks',
        category: 'course',
        title: 'Recently Completed Tasks',
        description: 'Your recently finished tasks',
        icon: 'CheckCircle2',
        defaultSize: '3x2',
        availableSizes: ['2x2', '3x2', '4x1', '4x2'],
        hasSettings: false,
    },
    'reviewed-tasks': {
        type: 'reviewed-tasks',
        category: 'course',
        title: 'Reviewed Tasks',
        description: 'Tasks that have been reviewed',
        icon: 'Eye',
        defaultSize: '3x2',
        availableSizes: ['2x2', '3x2', '4x1', '4x2'],
        hasSettings: false,
    },
    'completed-task-insights': {
        type: 'completed-task-insights',
        category: 'course',
        title: 'Completed Tasks Insights',
        description: 'Analytics on your completed tasks',
        icon: 'BarChart3',
        defaultSize: '3x2',
        availableSizes: ['2x2', '3x2', '4x2'],
        hasSettings: false,
    },

    // Calendar widgets
    'agenda': {
        type: 'agenda',
        category: 'calendar',
        title: 'Agenda',
        description: 'Your upcoming schedule and events',
        icon: 'Calendar',
        defaultSize: '3x2',
        availableSizes: ['2x2', '3x2', '4x2'],
        hasSettings: false,
    },

    // Management widgets
    'link-users': {
        type: 'link-users',
        category: 'management',
        title: 'Link: Users',
        description: 'Quick link to user management',
        icon: 'Users',
        defaultSize: '2x2',
        availableSizes: ['1x1', '2x2'],
        hasSettings: false,
    },
    'link-groups': {
        type: 'link-groups',
        category: 'management',
        title: 'Link: Groups',
        description: 'Quick link to group management',
        icon: 'Users2',
        defaultSize: '2x2',
        availableSizes: ['1x1', '2x2'],
        hasSettings: false,
    },
    'link-terms': {
        type: 'link-terms',
        category: 'management',
        title: 'Link: Terms',
        description: 'Quick link to term management',
        icon: 'CalendarRange',
        defaultSize: '2x2',
        availableSizes: ['1x1', '2x2'],
        hasSettings: false,
    },
    'link-modules': {
        type: 'link-modules',
        category: 'management',
        title: 'Link: Modules',
        description: 'Quick link to module management',
        icon: 'BookOpen',
        defaultSize: '2x2',
        availableSizes: ['1x1', '2x2'],
        hasSettings: false,
    },
    'link-curricula': {
        type: 'link-curricula',
        category: 'management',
        title: 'Link: Curricula',
        description: 'Quick link to curricula management',
        icon: 'Library',
        defaultSize: '2x2',
        availableSizes: ['1x1', '2x2'],
        hasSettings: false,
    },
    'link-study-plans': {
        type: 'link-study-plans',
        category: 'management',
        title: 'Link: Study Plans',
        description: 'Quick link to study plans',
        icon: 'ClipboardList',
        defaultSize: '2x2',
        availableSizes: ['1x1', '2x2'],
        hasSettings: false,
    },
    'link-smartplan': {
        type: 'link-smartplan',
        category: 'management',
        title: 'Link: SmartPlan',
        description: 'Quick link to smart planning',
        icon: 'Lightbulb',
        defaultSize: '2x2',
        availableSizes: ['1x1', '2x2'],
        hasSettings: false,
    },

    // Chat widgets
    'recent-chats': {
        type: 'recent-chats',
        category: 'chat',
        title: 'Recent Chats',
        description: 'Your recent conversations',
        icon: 'MessageCircle',
        defaultSize: '3x2',
        availableSizes: ['2x2', '3x2', '4x2'],
        hasSettings: false,
    },

    // General widgets
    'image-widget': {
        type: 'image-widget',
        category: 'general',
        title: 'Image Widget',
        description: 'Display a custom image',
        icon: 'Image',
        defaultSize: '2x2',
        availableSizes: ['1x1', '2x2', '3x2', '4x2'],
        hasSettings: true,
        settingsConfig: {
            imageUrl: true,
        },
    },
};

export function getWidgetsByCategory(category: string) {
    return Object.values(widgetDefinitions).filter((widget) => widget.category === category);
}

export function getAllCategories(): string[] {
    const categories = new Set(Object.values(widgetDefinitions).map((widget) => widget.category));
    return Array.from(categories);
}

