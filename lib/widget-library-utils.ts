import * as Icons from 'lucide-react';
import { WidgetType, Widget } from '@/types/widget';
import { widgetDefinitions } from './widget-definitions';

/**
 * Filter widgets based on search query and category
 */
export function filterWidgets(
    searchQuery: string,
    selectedCategory: string
) {
    return Object.values(widgetDefinitions).filter((widget) => {
        const matchesSearch =
            widget.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            widget.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory.toLowerCase() === 'all' ||
            selectedCategory.toLowerCase() === widget.category.toLowerCase();
        return matchesSearch && matchesCategory;
    });
}

/**
 * Get a Lucide icon component by name
 */
export function getIcon(iconName: string) {
    const Icon = (Icons as any)[iconName];
    return Icon ? Icon : null;
}

/**
 * Check if a widget type has already been added to the dashboard
 */
export function isWidgetAdded(widgetType: WidgetType, existingWidgets: Widget[]): boolean {
    return existingWidgets.some(widget => widget.type === widgetType);
}

/**
 * Calculate dimensions for widget preview based on grid size
 */
export function getPreviewDimensions(w: number, h: number) {
    const baseWidth = 70;
    const baseHeight = 100;

    return {
        width: w * baseWidth,
        height: h * baseHeight,
    };
}

/**
 * Parse size string to get columns and rows
 */
export function parseSizeString(size: string): { cols: number; rows: number } {
    const [cols, rows] = size.split('x').map(Number);
    return { cols, rows };
}

/**
 * Body scroll lock utility
 */
export function lockBodyScroll(): () => void {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Return cleanup function
    return () => {
        document.body.style.overflow = originalOverflow || 'unset';
    };
}

/**
 * Simulate async operation with delay (for UX feedback)
 */
export async function simulateDelay(ms: number = 600): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Capitalize first letter of a string
 */
export function capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

