'use client';

import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider, Layout as RGLLayout } from 'react-grid-layout';
import { Plus, LayoutGrid, User, Bell, Search } from 'lucide-react';
import { Widget, WidgetLayout, WidgetType, WidgetSize, WidgetConfig } from '@/types/widget';
import { WidgetRenderer } from './widgets/WidgetRenderer';
import { WidgetLibrary } from './WidgetLibrary';
import { ConfirmationDialog } from './ConfirmationDialog';
import { generateId, sizeToGrid } from '@/lib/utils';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export function Dashboard() {
    const [widgets, setWidgets] = useState<Widget[]>([]);
    const [layouts, setLayouts] = useState<{ lg: RGLLayout[] }>({ lg: [] });
    const [isLibraryOpen, setIsLibraryOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState<{ isOpen: boolean; type: 'delete' | 'reset' | null; widgetId?: string }>({
        isOpen: false,
        type: null,
    });

    // Load saved dashboard state from localStorage
    useEffect(() => {
        setMounted(true);
        const savedWidgets = localStorage.getItem('dashboard-widgets');
        const savedLayouts = localStorage.getItem('dashboard-layouts');

        if (savedWidgets && savedLayouts) {
            try {
                setWidgets(JSON.parse(savedWidgets));
                setLayouts(JSON.parse(savedLayouts));
            } catch (e) {
                console.error('Failed to load dashboard state:', e);
            }
        } else {
            // Initialize with default widgets
            initializeDefaultWidgets();
        }
    }, []);

    // Save dashboard state to localStorage whenever it changes
    useEffect(() => {
        if (mounted) {
            localStorage.setItem('dashboard-widgets', JSON.stringify(widgets));
            localStorage.setItem('dashboard-layouts', JSON.stringify(layouts));
        }
    }, [widgets, layouts, mounted]);

    // Exit edit mode when opening widget library
    const handleOpenLibrary = () => {
        setIsEditMode(true);
        setIsLibraryOpen(true);
    };

    const initializeDefaultWidgets = () => {
        const defaultWidgets: Widget[] = [
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

        const defaultLayouts: RGLLayout[] = [
            { i: defaultWidgets[0].id, x: 0, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
            { i: defaultWidgets[1].id, x: 6, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
            { i: defaultWidgets[2].id, x: 9, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
            { i: defaultWidgets[3].id, x: 0, y: 2, w: 6, h: 2, minW: 4, minH: 2 },
        ];

        setWidgets(defaultWidgets);
        setLayouts({ lg: defaultLayouts });
    };

    const handleAddWidget = (type: WidgetType, size: WidgetSize, config: WidgetConfig) => {
        const newWidget: Widget = {
            id: generateId(),
            type,
            title: type,
            size,
            config,
        };

        const { w, h } = sizeToGrid(size);
        const newLayout: RGLLayout = {
            i: newWidget.id,
            x: 0,
            y: Infinity, // Puts it at the bottom
            w,
            h,
            minW: 1,
            minH: 1,
        };

        setWidgets([...widgets, newWidget]);
        setLayouts({
            lg: [...layouts.lg, newLayout],
        });
    };

    const handleDeleteWidget = (id: string) => {
        console.log('Delete clicked for widget:', id);
        setConfirmDialog({
            isOpen: true,
            type: 'delete',
            widgetId: id,
        });
    };

    const confirmDeleteWidget = () => {
        if (confirmDialog.widgetId) {
            setWidgets(widgets.filter((widget) => widget.id !== confirmDialog.widgetId));
            setLayouts({
                lg: layouts.lg.filter((layout) => layout.i !== confirmDialog.widgetId),
            });
        }
        setConfirmDialog({ isOpen: false, type: null });
    };

    const handleLayoutChange = (layout: RGLLayout[], allLayouts: any) => {
        // Ensure widgets don't go beyond grid boundaries
        const boundedLayout = layout.map((item) => {
            const maxX = 12 - item.w; // 12 is the column count
            return {
                ...item,
                x: Math.max(0, Math.min(item.x, maxX)),
            };
        });
        setLayouts({ lg: boundedLayout });
    };

    const handleResetDashboard = () => {
        setConfirmDialog({
            isOpen: true,
            type: 'reset',
        });
    };

    const confirmResetDashboard = () => {
        localStorage.removeItem('dashboard-widgets');
        localStorage.removeItem('dashboard-layouts');
        initializeDefaultWidgets();
        setConfirmDialog({ isOpen: false, type: null });
    };

    const handleSaveAndExitEdit = () => {
        setIsEditMode(false);
    };

    const handleAutoLayout = () => {
        // Sort widgets by current position (top-to-bottom, left-to-right)
        const sortedLayouts = [...layouts.lg].sort((a, b) => {
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
            if (currentX + layout.w > 12) {
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

        setLayouts({ lg: newLayouts });
    };

    if (!mounted) {
        return null; // Avoid hydration mismatch
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="px-4 sm:px-6 pt-6 sm:pt-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Good Morning, Leo</h1>
                            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">Welcome back to your dashboard</p>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="relative hidden md:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-64"
                                />
                            </div>
                            <button
                                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Notifications"
                            >
                                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Profile">
                                <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <nav className="flex gap-3 sm:gap-6 mt-3 sm:mt-4 border-b border-gray-200 -mb-px overflow-x-auto">
                        {['Dashboard', 'My Curriculum', 'Documents', 'Attendance', 'Invoices', 'Availability'].map((tab) => (
                            <button
                                key={tab}
                                className={`pb-2 sm:pb-3 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap ${tab === 'Dashboard'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
            </header>



            {/* Dashboard Grid */}
            <div className="px-4 sm:px-6 py-4 sm:py-6 overflow-x-hidden">
                {/* Dashboard Action Buttons */}
                <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    {isEditMode && (
                        <div className="px-3 sm:px-4 py-2 rounded-lg border border-blue-300 bg-blue-50 w-full sm:w-auto">
                            <p className="text-xs sm:text-sm text-blue-800 font-medium">
                                ✏️ Edit mode enabled • Drag to reposition • Resize • Delete
                            </p>
                        </div>
                    )}
                    <div className={`flex ${!isEditMode ? 'justify-end w-full' : 'justify-end gap-2 sm:gap-3'} gap-2 sm:gap-3 flex-wrap`}>
                        {!isEditMode ? (
                            <button
                                onClick={() => setIsEditMode(true)}
                                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                            >
                                Edit Dashboard
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleAutoLayout}
                                    className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
                                >
                                    Auto Layout
                                </button>
                                <button
                                    onClick={handleOpenLibrary}
                                    className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1 sm:gap-2 whitespace-nowrap"
                                >
                                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                    Add Widget
                                </button>
                                <button
                                    onClick={handleSaveAndExitEdit}
                                    className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors whitespace-nowrap"
                                >
                                    Save
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {!isEditMode && widgets.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LayoutGrid className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Widgets Yet</h3>
                        <p className="text-gray-600 mb-6">Click "Edit Dashboard" to start adding widgets</p>
                    </div>
                ) : widgets.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LayoutGrid className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Widgets Yet</h3>
                        <p className="text-gray-600 mb-6">Start building your dashboard by adding widgets</p>
                        <button
                            onClick={handleOpenLibrary}
                            className="px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors inline-flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add Your First Widget
                        </button>
                    </div>
                ) : (
                    <ResponsiveGridLayout
                        className={`layout ${isEditMode ? 'edit-mode' : ''}`}
                        layouts={layouts}
                        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                        rowHeight={150}
                        onLayoutChange={handleLayoutChange}
                        draggableHandle=".cursor-move"
                        isDraggable={isEditMode}
                        isResizable={isEditMode}
                        compactType="vertical"
                        preventCollision={false}
                        margin={[16, 16]}
                        isBounded={true}
                        allowOverlap={false}
                    >
                        {widgets.map((widget) => (
                            <div key={widget.id} className="widget-container">
                                <WidgetRenderer
                                    widget={widget}
                                    onDelete={isEditMode ? handleDeleteWidget : undefined}
                                    isEditMode={isEditMode}
                                />
                            </div>
                        ))}
                    </ResponsiveGridLayout>
                )}
            </div>

            {/* Widget Library Modal */}
            <WidgetLibrary
                isOpen={isLibraryOpen}
                onClose={() => setIsLibraryOpen(false)}
                onAddWidget={handleAddWidget}
                existingWidgets={widgets}
            />

            {/* Confirmation Dialogs */}
            <ConfirmationDialog
                isOpen={confirmDialog.isOpen && confirmDialog.type === 'delete'}
                title="Remove Widget"
                message="Are you sure you want to remove this widget? This action cannot be undone."
                confirmText="Remove"
                cancelText="Cancel"
                isDangerous={true}
                onConfirm={confirmDeleteWidget}
                onCancel={() => setConfirmDialog({ isOpen: false, type: null })}
            />

            <ConfirmationDialog
                isOpen={confirmDialog.isOpen && confirmDialog.type === 'reset'}
                title="Reset Dashboard"
                message="Are you sure you want to reset the dashboard to default? All your customizations will be lost."
                confirmText="Reset"
                cancelText="Cancel"
                isDangerous={true}
                onConfirm={confirmResetDashboard}
                onCancel={() => setConfirmDialog({ isOpen: false, type: null })}
            />
        </div>
    );
}

