'use client';

import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider, Layout as RGLLayout } from 'react-grid-layout';
import { Plus, LayoutGrid, Search, X } from 'lucide-react';
import { Widget, WidgetType, WidgetSize, WidgetConfig } from '@/types/widget';
import { WidgetRenderer } from './widgets/WidgetRenderer';
import { WidgetLibrary } from './WidgetLibrary';
import { ConfirmationDialog } from './ConfirmationDialog';
import {
    initializeDefaultDashboard,
    createWidget,
    boundLayoutToGrid,
    autoLayoutWidgets,
    saveDashboardToStorage,
    loadDashboardFromStorage,
    clearDashboardStorage,
    deepCopyState,
    removeWidget,
    GRID_CONFIG,
} from '@/lib/dashboard-utils';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export function Dashboard() {
    const [widgets, setWidgets] = useState<Widget[]>([]);
    const [layouts, setLayouts] = useState<{ lg: RGLLayout[] }>({ lg: [] });
    const [isLibraryOpen, setIsLibraryOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState<{ isOpen: boolean; type: 'delete' | 'reset' | 'cancel' | null; widgetId?: string }>({
        isOpen: false,
        type: null,
    });
    // Backup state for reverting changes
    const [savedWidgets, setSavedWidgets] = useState<Widget[]>([]);
    const [savedLayouts, setSavedLayouts] = useState<{ lg: RGLLayout[] }>({ lg: [] });

    // Load saved dashboard state from localStorage
    useEffect(() => {
        setMounted(true);
        const savedData = loadDashboardFromStorage();

        if (savedData) {
            setWidgets(savedData.widgets);
            setLayouts(savedData.layouts);
        } else {
            // Initialize with default widgets
            const { widgets: defaultWidgets, layouts: defaultLayouts } = initializeDefaultDashboard();
            setWidgets(defaultWidgets);
            setLayouts({ lg: defaultLayouts });
        }
    }, []);

    // Only save to localStorage when not in edit mode (i.e., after Save is clicked)
    useEffect(() => {
        if (mounted && !isEditMode) {
            saveDashboardToStorage(widgets, layouts);
        }
    }, [widgets, layouts, mounted, isEditMode]);

    // Enter edit mode and save current state as backup
    const handleEnterEditMode = () => {
        setSavedWidgets(deepCopyState(widgets));
        setSavedLayouts(deepCopyState(layouts));
        setIsEditMode(true);
    };

    // Exit edit mode when opening widget library
    const handleOpenLibrary = () => {
        if (!isEditMode) {
            handleEnterEditMode();
        }
        setIsLibraryOpen(true);
    };

    const handleAddWidget = (type: WidgetType, size: WidgetSize, config: WidgetConfig) => {
        const { widget: newWidget, layout: newLayout } = createWidget(type, size, config);
        setWidgets([...widgets, newWidget]);
        setLayouts({
            lg: [...layouts.lg, newLayout],
        });
    };

    const handleDeleteWidget = (id: string) => {
        setConfirmDialog({
            isOpen: true,
            type: 'delete',
            widgetId: id,
        });
    };

    const confirmDeleteWidget = () => {
        if (confirmDialog.widgetId) {
            const { widgets: updatedWidgets, layouts: updatedLayouts } = removeWidget(widgets, layouts, confirmDialog.widgetId);
            setWidgets(updatedWidgets);
            setLayouts(updatedLayouts);
        }
        setConfirmDialog({ isOpen: false, type: null });
    };

    const handleLayoutChange = (layout: RGLLayout[], allLayouts: any) => {
        const boundedLayout = boundLayoutToGrid(layout, GRID_CONFIG.COLUMNS);
        setLayouts({ lg: boundedLayout });
    };

    const confirmResetDashboard = () => {
        clearDashboardStorage();
        const { widgets: defaultWidgets, layouts: defaultLayouts } = initializeDefaultDashboard();
        setWidgets(defaultWidgets);
        setLayouts({ lg: defaultLayouts });
        setConfirmDialog({ isOpen: false, type: null });
    };

    const handleSaveAndExitEdit = () => {
        // Exit edit mode, which will trigger localStorage save
        setIsEditMode(false);
    };

    const handleCancelEdit = () => {
        setConfirmDialog({
            isOpen: true,
            type: 'cancel',
        });
    };

    const confirmCancelEdit = () => {
        // Revert to saved state FIRST, then exit edit mode
        // This ensures the restored state is what gets saved to localStorage
        setWidgets([...savedWidgets]);
        setLayouts({ lg: [...savedLayouts.lg] });

        // Use setTimeout to ensure state updates before exiting edit mode
        setTimeout(() => {
            setIsEditMode(false);
            setConfirmDialog({ isOpen: false, type: null });
        }, 0);
    };

    const handleAutoLayout = () => {
        const newLayouts = autoLayoutWidgets(layouts.lg, GRID_CONFIG.COLUMNS);
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
                        {isEditMode ? (
                            <div className="px-3 sm:px-4 py-2 rounded-lg border border-blue-300 bg-blue-50 w-full sm:w-auto">
                                <p className="text-xs sm:text-sm text-blue-800 font-medium">
                                    ✏️ Edit mode • Add / Remove widget(s) • Rearrange widget(s) by resizing or dragging
                                </p>
                            </div>
                        ) : (
                            <div className="relative w-full sm:w-auto min-w-[150px] sm:min-w-[600px]">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Search widgets, courses, or tasks..."
                                    className="w-full pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                                />
                            </div>
                        )}
                        {/* Dashboard Action Buttons - Sticky */}
                        <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
                            <div className="mb-2 sm:mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                <div className={`flex ${!isEditMode ? 'justify-end w-full' : 'justify-end gap-2 sm:gap-3'} gap-2 sm:gap-3 flex-wrap`}>
                                    {!isEditMode ? (
                                        <button
                                            onClick={handleEnterEditMode}
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
                                            <button
                                                onClick={handleCancelEdit}
                                                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 sm:gap-2"
                                            >
                                                <X className="w-3 h-3 sm:w-4 sm:h-4" />
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <nav className="flex gap-3 sm:gap-8 mt-3 sm:mt-4 border-b border-gray-200 -mb-px overflow-x-auto">
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

                {!isEditMode && widgets.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LayoutGrid className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Widgets Yet</h3>
                        <p className="text-gray-600 mb-6">Click Edit Dashboard to start adding widgets</p>
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
                        breakpoints={GRID_CONFIG.BREAKPOINTS}
                        cols={GRID_CONFIG.COLS}
                        rowHeight={GRID_CONFIG.ROW_HEIGHT}
                        onLayoutChange={handleLayoutChange}
                        draggableHandle=".cursor-move"
                        isDraggable={isEditMode}
                        isResizable={isEditMode}
                        compactType="vertical"
                        preventCollision={false}
                        margin={GRID_CONFIG.MARGIN}
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

            <ConfirmationDialog
                isOpen={confirmDialog.isOpen && confirmDialog.type === 'cancel'}
                title="Discard Changes"
                message="Are you sure you want to cancel? All unsaved changes will be lost."
                confirmText="Discard"
                cancelText="Keep Editing"
                isDangerous={true}
                onConfirm={confirmCancelEdit}
                onCancel={() => setConfirmDialog({ isOpen: false, type: null })}
            />
        </div>
    );
}

