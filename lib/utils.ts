import { WidgetSize } from '@/types/widget';
import clsx, { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export function sizeToGrid(size: WidgetSize): { w: number; h: number } {
    const sizeMap: Record<WidgetSize, { w: number; h: number }> = {
        '1x1': { w: 1, h: 1 },
        '2x2': { w: 2, h: 2 },
        '3x1': { w: 3, h: 1 },
        '3x2': { w: 3, h: 2 },
        '4x1': { w: 4, h: 1 },
        '4x2': { w: 4, h: 2 },
        '6x1': { w: 6, h: 1 },
        '6x2': { w: 6, h: 2 },
    };
    return sizeMap[size] || { w: 2, h: 2 };
}

export function gridToSize(w: number, h: number): WidgetSize {
    const key = `${w}x${h}` as WidgetSize;
    return key;
}

export function generateId(): string {
    return `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

