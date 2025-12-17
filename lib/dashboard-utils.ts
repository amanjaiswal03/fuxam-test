import { Layout as RGLLayout } from 'react-grid-layout';
import { Widget, WidgetType, WidgetSize, WidgetConfig } from '@/types/widget';
import { generateId, sizeToGrid } from './utils';

// Constants
export const DASHBOARD_STORAGE_KEYS = {
    WIDGETS: 'dashboard-widgets',
    LAYOUTS: 'dashboard-layouts',
} as const;

export const GRID_CONFIG = {
    COLUMNS: 12,
    ROW_HEIGHT: 150,
    MARGIN: [16, 16] as [number, number],
    BREAKPOINTS: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    COLS: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
} as const;

// Default widgets configuration
export function getDefaultWidgets(): Widget[] {
    return [
        {
            id: generateId(),
            type: 'course-slider',
            title: 'Course Slider',
            size: '6x2',
            config: { showPinnedOnly: true },
        },
        {
            id: generateId(),
            type: 'agenda',
            title: 'Agenda',
            size: '3x2',
            config: {},
        },
        {
            id: generateId(),
            type: 'todo-list',
            title: 'Todo List',
            size: '3x2',
            config: {},
        },
        {
            id: generateId(),
            type: 'course-table',
            title: 'Course Table',
            size: '6x2',
            config: { showPinnedOnly: false },
        },
    ];
}

// Default layouts configuration
export function getDefaultLayouts(widgets: Widget[]): RGLLayout[] {
    return [
        { i: widgets[0].id, x: 0, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
        { i: widgets[1].id, x: 6, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
        { i: widgets[2].id, x: 9, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
        { i: widgets[3].id, x: 0, y: 2, w: 6, h: 2, minW: 4, minH: 2 },
    ];
}

// Initialize default widgets and layouts together
export function initializeDefaultDashboard(): { widgets: Widget[]; layouts: RGLLayout[] } {
    const widgets = getDefaultWidgets();
    const layouts = getDefaultLayouts(widgets);
    return { widgets, layouts };
}

// Create a new widget with layout
export function createWidget(type: WidgetType, size: WidgetSize, config: WidgetConfig): { widget: Widget; layout: RGLLayout } {
    const widget: Widget = {
        id: generateId(),
        type,
        title: type,
        size,
        config,
    };

    const { w, h } = sizeToGrid(size);
    const layout: RGLLayout = {
        i: widget.id,
        x: 0,
        y: Infinity, // Puts it at the bottom
        w,
        h,
        minW: 1,
        minH: 1,
    };

    return { widget, layout };
}

// Bound layout to grid boundaries
export function boundLayoutToGrid(layout: RGLLayout[], columns: number = GRID_CONFIG.COLUMNS): RGLLayout[] {
    return layout.map((item) => {
        const maxX = columns - item.w;
        return {
            ...item,
            x: Math.max(0, Math.min(item.x, maxX)),
        };
    });
}

// Auto-layout widgets (arrange in a grid pattern)
export function autoLayoutWidgets(layouts: RGLLayout[], columns: number = GRID_CONFIG.COLUMNS): RGLLayout[] {
    // Sort widgets by current position (top-to-bottom, left-to-right)
    const sortedLayouts = [...layouts].sort((a, b) => {
        if (a.y !== b.y) return a.y - b.y;
        return a.x - b.x;
    });

    // Reposition widgets, filling left to right, top to bottom
    let currentY = 0;
    let currentX = 0;
    let currentRowHeight = 0;
    const newLayouts: RGLLayout[] = [];

    sortedLayouts.forEach((layout) => {
        // Check if adding this widget would exceed column width
        if (currentX + layout.w > columns) {
            // Move to next row
            currentX = 0;
            currentY += currentRowHeight;
            currentRowHeight = 0;
        }

        // Add widget to current position
        newLayouts.push({
            ...layout,
            x: currentX,
            y: currentY,
        });

        // Update tracking variables
        currentX += layout.w;
        currentRowHeight = Math.max(currentRowHeight, layout.h);
    });

    return newLayouts;
}

// Local storage operations
export function saveDashboardToStorage(widgets: Widget[], layouts: { lg: RGLLayout[] }): void {
    try {
        localStorage.setItem(DASHBOARD_STORAGE_KEYS.WIDGETS, JSON.stringify(widgets));
        localStorage.setItem(DASHBOARD_STORAGE_KEYS.LAYOUTS, JSON.stringify(layouts));
    } catch (error) {
        console.error('Failed to save dashboard to localStorage:', error);
    }
}

export function loadDashboardFromStorage(): { widgets: Widget[]; layouts: { lg: RGLLayout[] } } | null {
    try {
        const savedWidgets = localStorage.getItem(DASHBOARD_STORAGE_KEYS.WIDGETS);
        const savedLayouts = localStorage.getItem(DASHBOARD_STORAGE_KEYS.LAYOUTS);

        if (savedWidgets && savedLayouts) {
            return {
                widgets: JSON.parse(savedWidgets),
                layouts: JSON.parse(savedLayouts),
            };
        }
    } catch (error) {
        console.error('Failed to load dashboard from localStorage:', error);
    }
    return null;
}

export function clearDashboardStorage(): void {
    localStorage.removeItem(DASHBOARD_STORAGE_KEYS.WIDGETS);
    localStorage.removeItem(DASHBOARD_STORAGE_KEYS.LAYOUTS);
}

// Deep copy state (for backup)
export function deepCopyState<T>(state: T): T {
    return JSON.parse(JSON.stringify(state));
}

// Remove widget by id
export function removeWidget(widgets: Widget[], layouts: { lg: RGLLayout[] }, widgetId: string): { widgets: Widget[]; layouts: { lg: RGLLayout[] } } {
    return {
        widgets: widgets.filter((widget) => widget.id !== widgetId),
        layouts: {
            lg: layouts.lg.filter((layout) => layout.i !== widgetId),
        },
    };
}

