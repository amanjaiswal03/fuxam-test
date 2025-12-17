'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Check } from 'lucide-react';
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
    useEffect(() => {
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

    const handleQuickAddWidget = async (type: WidgetType) => {
        const definition = widgetDefinitions[type];
        const isAdded = isWidgetAdded(type);

        if (!isAdded) {
            setIsAddingWidget(true);
            await new Promise(resolve => setTimeout(resolve, 600));
            onAddWidget(type, definition.defaultSize, {});
            setIsAddingWidget(false);
        }
    };

    const handleAddWidget = async () => {
        if (selectedWidget && !isSelectedWidgetAdded) {
            setIsAddingWidget(true);
            // Simulate a brief delay for better UX feedback
            await new Promise(resolve => setTimeout(resolve, 600));
            onAddWidget(selectedWidget, selectedSize, config);
            setIsAddingWidget(false);
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
                className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[85vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Main Content Area */}
                <div className="flex-1 overflow-hidden flex">
                    {/* Left Column - Categories and Widgets Grid */}
                    <div className="w-full sm:w-[500px] sm:border-r border-gray-200 flex flex-col overflow-hidden">
                        {/* Search Bar */}
                        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex-shrink-0">
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
                        <div className="px-4 sm:px-6 py-2 sm:py-3 border-b border-gray-200 flex-shrink-0 overflow-x-auto">
                            <div className="flex gap-2">
                                {/* All Category */}
                                <button
                                    onClick={() => setSelectedCategory('All')}
                                    className={cn(
                                        'px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0',
                                        selectedCategory.toLowerCase() === 'all'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    )}
                                >
                                    All
                                </button>

                                {/* Category Pills */}
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={cn(
                                            'px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0',
                                            selectedCategory.toLowerCase() === category.toLowerCase()
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        )}
                                    >
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Widgets Grid - 2x2 */}
                        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4">
                            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Available widgets</h3>
                            {filteredWidgets.length > 0 ? (
                                <div className="grid grid-cols-2 gap-2">
                                    {filteredWidgets.map((widget) => {
                                        const isAdded = isWidgetAdded(widget.type);
                                        return (
                                            <div key={widget.type} className="relative">
                                                {/* Desktop: Clickable card for selection */}
                                                <button
                                                    onClick={() => handleSelectWidget(widget.type)}
                                                    className={cn(
                                                        'w-full p-3 rounded-lg border-2 transition-all text-left flex flex-col items-start',
                                                        'hidden sm:flex',
                                                        selectedWidget === widget.type
                                                            ? 'border-blue-600 bg-blue-50'
                                                            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                                                    )}
                                                >
                                                    <div className="flex items-start justify-between w-full mb-1.5">
                                                        <div className="text-blue-600 flex-shrink-0">
                                                            {getIcon(widget.icon)}
                                                        </div>
                                                        {isAdded && (
                                                            <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs font-semibold text-gray-900 line-clamp-1">{widget.title}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{widget.description}</p>
                                                </button>

                                                {/* Mobile: Card with Add button */}
                                                <div
                                                    className={cn(
                                                        'sm:hidden p-3 rounded-lg border-2 transition-all flex flex-col items-start',
                                                        isAdded
                                                            ? 'border-green-200 bg-green-50'
                                                            : 'border-gray-200 bg-white'
                                                    )}
                                                >
                                                    <div className="flex items-start justify-between w-full mb-1.5">
                                                        <div className="text-blue-600 flex-shrink-0">
                                                            {getIcon(widget.icon)}
                                                        </div>
                                                        {isAdded && (
                                                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs font-semibold text-gray-900 line-clamp-1 mb-1">{widget.title}</p>
                                                    <p className="text-xs text-gray-500 mb-2 line-clamp-1">{widget.description}</p>
                                                    <button
                                                        onClick={() => handleQuickAddWidget(widget.type)}
                                                        disabled={isAdded || isAddingWidget}
                                                        className={cn(
                                                            'w-full px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                                                            isAdded
                                                                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                                        )}
                                                    >
                                                        {isAdded ? 'Added' : 'Add'}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <Search className="w-6 h-6 mx-auto mb-2 text-gray-300" />
                                    <p className="text-xs">No widgets found</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Preview and Configuration (Desktop Only) */}
                    <div className="hidden sm:flex flex-1 flex-col overflow-y-auto p-6">
                        {selectedDefinition ? (
                            <div className="space-y-4">
                                {/* Preview Card - Fixed Size */}
                                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6 border border-gray-300 h-[280px]">
                                    <p className="text-xs font-medium text-gray-600 mb-3 text-center">Preview ({selectedSize})</p>
                                    <div className="flex items-center justify-center h-[calc(100%-2.5rem)]">
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
                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                    <h4 className="text-base font-semibold text-gray-900 mb-3">{selectedDefinition.title}</h4>

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
                                <div className="mt-6 pt-4 border-t border-gray-200">
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
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                                    <Search className="w-6 h-6 text-gray-400" />
                                </div>
                                <p className="text-sm font-medium">Select a widget</p>
                                <p className="text-xs text-gray-400 mt-1">to preview and configure</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end bg-gray-50 flex-shrink-0">
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
