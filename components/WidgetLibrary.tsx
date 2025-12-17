'use client';

import React, { useState } from 'react';
import { X, Search, Plus, Check } from 'lucide-react';
import * as Icons from 'lucide-react';
import { WidgetType, WidgetSize, WidgetConfig, Widget } from '@/types/widget';
import { widgetDefinitions, getAllCategories } from '@/lib/widget-definitions';
import { cn } from '@/lib/utils';

interface WidgetLibraryProps {
    isOpen: boolean;
    onClose: () => void;
    onAddWidget: (type: WidgetType, size: WidgetSize, config: WidgetConfig) => void;
    existingWidgets: Widget[];
}

export function WidgetLibrary({ isOpen, onClose, onAddWidget, existingWidgets }: WidgetLibraryProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('Course');
    const [selectedWidget, setSelectedWidget] = useState<WidgetType | null>(null);
    const [selectedSize, setSelectedSize] = useState<WidgetSize>('1x1');
    const [config, setConfig] = useState<WidgetConfig>({});
    const [isAddingWidget, setIsAddingWidget] = useState(false);

    const categories = getAllCategories();

    // Prevent body scroll when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const filteredWidgets = Object.values(widgetDefinitions).filter((widget) => {
        const matchesSearch =
            widget.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            widget.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory.toLowerCase() === 'all' || selectedCategory.toLowerCase() === widget.category.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    const handleSelectWidget = (type: WidgetType) => {
        const definition = widgetDefinitions[type];
        setSelectedWidget(type);
        setSelectedSize(definition.defaultSize);
        setConfig({});
    };

    const handleAddWidget = async () => {
        if (selectedWidget && !isSelectedWidgetAdded) {
            setIsAddingWidget(true);
            // Simulate a brief delay for better UX feedback
            await new Promise(resolve => setTimeout(resolve, 600));
            onAddWidget(selectedWidget, selectedSize, config);
            setIsAddingWidget(false);
            // Keep widget selected, button will update to show "Already Added"
            // Don't reset selection or config
        }
    };

    const getIcon = (iconName: string) => {
        const Icon = (Icons as any)[iconName];
        return Icon ? <Icon className="w-5 h-5" /> : null;
    };

    if (!isOpen) return null;

    const selectedDefinition = selectedWidget ? widgetDefinitions[selectedWidget] : null;

    // Check if widget type already exists in dashboard
    const isWidgetAdded = (widgetType: WidgetType) => {
        return existingWidgets.some(widget => widget.type === widgetType);
    };

    const isSelectedWidgetAdded = selectedWidget ? isWidgetAdded(selectedWidget) : false;

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Content */}
                <div className="flex-1 overflow-hidden flex">
                    {/* Left Sidebar - Categories and Widget List */}
                    <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
                        {/* Search Bar */}
                        <div className="p-4 border-b border-gray-200">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search Widgets..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>
                        </div>

                        {/* Category Tabs */}
                        <div className="border-b border-gray-200 flex-shrink-0">
                            <div className="flex flex-col">
                                {/* All Widgets Button */}
                                <button
                                    onClick={() => setSelectedCategory('All')}
                                    className={cn(
                                        'px-4 py-3 text-sm font-medium transition-colors text-left border-l-4 flex items-center justify-between',
                                        selectedCategory.toLowerCase() === 'all'
                                            ? 'bg-blue-50 text-blue-700 border-blue-600'
                                            : 'border-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                    )}
                                >
                                    <span>All</span>
                                    <span className={cn(
                                        'text-xs px-2 py-0.5 rounded-full',
                                        selectedCategory.toLowerCase() === 'all'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-gray-100 text-gray-600'
                                    )}>
                                        {Object.values(widgetDefinitions).length}
                                    </span>
                                </button>

                                {categories.map((category) => {
                                    const categoryWidgets = Object.values(widgetDefinitions).filter(
                                        (w) => w.category.toLowerCase() === category.toLowerCase()
                                    );
                                    return (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={cn(
                                                'px-4 py-3 text-sm font-medium transition-colors text-left border-l-4 flex items-center justify-between',
                                                selectedCategory.toLowerCase() === category.toLowerCase()
                                                    ? 'bg-blue-50 text-blue-700 border-blue-600'
                                                    : 'border-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                            )}
                                        >
                                            <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                                            <span className={cn(
                                                'text-xs px-2 py-0.5 rounded-full',
                                                selectedCategory.toLowerCase() === category.toLowerCase()
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-gray-100 text-gray-600'
                                            )}>
                                                {categoryWidgets.length}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Widget List */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Available widgets</h3>
                            <div className="space-y-2">
                                {filteredWidgets.map((widget) => {
                                    const isAdded = isWidgetAdded(widget.type);
                                    return (
                                        <button
                                            key={widget.type}
                                            onClick={() => handleSelectWidget(widget.type)}
                                            className={cn(
                                                'w-full text-left p-3 rounded-lg transition-all flex items-center gap-3',
                                                selectedWidget === widget.type
                                                    ? 'bg-blue-100 text-blue-900'
                                                    : 'hover:bg-gray-100'
                                            )}
                                        >
                                            <div className="flex-shrink-0">
                                                {getIcon(widget.icon)}
                                            </div>
                                            <span className="text-sm font-medium flex-1">{widget.title}</span>
                                            {isAdded && (
                                                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                            {filteredWidgets.length === 0 && (
                                <div className="text-center py-12 text-gray-500">
                                    <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                    <p className="text-xs">No widgets found</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Content - Preview and Configuration */}
                    <div className="flex-1 overflow-y-auto p-6 bg-gray-50 pt-4">
                        {selectedDefinition ? (
                            <div className="max-w-2xl mx-auto space-y-4">
                                {/* Preview Card - Fixed Size */}
                                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 border border-gray-300 h-80">
                                    <p className="text-xs font-medium text-gray-600 mb-4 text-center">Preview ({selectedSize})</p>
                                    <div className="flex items-center justify-center h-56">
                                        {(() => {
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
                                            const { w, h } = sizeMap[selectedSize];
                                            const baseWidth = 70;
                                            const baseHeight = 100;

                                            return (
                                                <div
                                                    className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-200"
                                                    style={{
                                                        width: `${w * baseWidth}px`,
                                                        height: `${h * baseHeight}px`,
                                                    }}
                                                >
                                                    {/* Widget Header */}
                                                    <div className="bg-gray-50 px-2 py-1.5 border-b border-gray-200 flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-sm"></div>
                                                        <div className="flex-1">
                                                            <div className="h-1.5 bg-gray-300 rounded w-16"></div>
                                                        </div>
                                                    </div>

                                                    {/* Widget Content */}
                                                    <div className="p-2 flex flex-col items-center justify-center" style={{ height: 'calc(100% - 28px)' }}>
                                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-1.5">
                                                            <div className="text-blue-600 scale-[0.6]">
                                                                {getIcon(selectedDefinition.icon)}
                                                            </div>
                                                        </div>
                                                        <div className="text-center space-y-1 w-full px-1">
                                                            <div className="h-1.5 bg-gray-200 rounded w-full max-w-[80%] mx-auto"></div>
                                                            <div className="h-1.5 bg-gray-200 rounded w-full max-w-[60%] mx-auto"></div>
                                                            {h > 1 && (
                                                                <>
                                                                    <div className="h-1 bg-gray-100 rounded w-full max-w-[70%] mx-auto mt-1.5"></div>
                                                                    <div className="h-1 bg-gray-100 rounded w-full max-w-[50%] mx-auto"></div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                    <p className="text-xs text-gray-600 text-center mt-2">
                                        {selectedDefinition.title} • {selectedSize.split('x')[0]} cols × {selectedSize.split('x')[1]} rows
                                    </p>
                                </div>

                                {/* Configuration */}
                                <div className="bg-white rounded-lg p-6 border border-gray-200">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">{selectedDefinition.title}</h4>

                                    {/* Size Selection */}
                                    <div className="mb-6">
                                        <label className={cn(
                                            'block text-sm font-semibold mb-3',
                                            isSelectedWidgetAdded ? 'text-gray-500' : 'text-gray-900'
                                        )}>Select Size</label>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedDefinition.availableSizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => !isSelectedWidgetAdded && setSelectedSize(size)}
                                                    disabled={isSelectedWidgetAdded}
                                                    className={cn(
                                                        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                                                        isSelectedWidgetAdded
                                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                            : selectedSize === size
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    )}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Settings */}
                                    {selectedDefinition.hasSettings && (
                                        <div className={cn(isSelectedWidgetAdded && 'opacity-50 pointer-events-none')}>
                                            <label className={cn(
                                                'block text-sm font-semibold mb-3',
                                                isSelectedWidgetAdded ? 'text-gray-500' : 'text-gray-900'
                                            )}>Settings</label>
                                            <div className="space-y-3">
                                                {selectedDefinition.settingsConfig?.showPinnedOnly && (
                                                    <label className={cn(
                                                        'flex items-center gap-3',
                                                        isSelectedWidgetAdded ? 'cursor-not-allowed' : 'cursor-pointer'
                                                    )}>
                                                        <input
                                                            type="checkbox"
                                                            checked={config.showPinnedOnly || false}
                                                            onChange={(e) => !isSelectedWidgetAdded && setConfig({ ...config, showPinnedOnly: e.target.checked })}
                                                            disabled={isSelectedWidgetAdded}
                                                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0 disabled:cursor-not-allowed"
                                                        />
                                                        <div>
                                                            <p className={cn(
                                                                'text-sm font-medium',
                                                                isSelectedWidgetAdded ? 'text-gray-500' : 'text-gray-900'
                                                            )}>Show pinned courses only</p>
                                                            <p className="text-xs text-gray-500 mt-0.5">Display only courses you have pinned</p>
                                                        </div>
                                                    </label>
                                                )}
                                                {selectedDefinition.settingsConfig?.imageUrl && (
                                                    <div>
                                                        <label className={cn(
                                                            'block text-sm font-medium mb-2',
                                                            isSelectedWidgetAdded ? 'text-gray-500' : 'text-gray-700'
                                                        )}>Image URL</label>
                                                        <input
                                                            type="text"
                                                            value={config.imageUrl || ''}
                                                            onChange={(e) => !isSelectedWidgetAdded && setConfig({ ...config, imageUrl: e.target.value })}
                                                            disabled={isSelectedWidgetAdded}
                                                            placeholder="https://example.com/image.jpg"
                                                            className={cn(
                                                                'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500'
                                                            )}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Add to Dashboard Button */}
                                <button
                                    onClick={handleAddWidget}
                                    disabled={isSelectedWidgetAdded || isAddingWidget}
                                    className={cn(
                                        "w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2",
                                        isSelectedWidgetAdded
                                            ? "bg-green-100 text-green-700 cursor-not-allowed"
                                            : isAddingWidget
                                                ? "bg-blue-600 text-white cursor-wait opacity-75"
                                                : "bg-blue-600 text-white hover:bg-blue-700"
                                    )}
                                >
                                    {isSelectedWidgetAdded ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Added
                                        </>
                                    ) : isAddingWidget ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-4 h-4" />
                                            Add to Dashboard
                                        </>
                                    )}
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <p className="text-sm">Select a widget to preview and configure</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
