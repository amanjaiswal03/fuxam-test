'use client';

export function WidgetSkeleton() {
    return (
        <div className="h-full flex flex-col">
            {/* Header Skeleton */}
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50/50">
                <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
            </div>

            {/* Content Skeleton */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
                {/* Multiple placeholder lines */}
                <div className="space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse" />
                </div>

                <div className="space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-4/5 animate-pulse" />
                </div>

                <div className="space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse" />
                </div>

                {/* Optional card-like placeholder */}
                <div className="mt-6 p-4 rounded-lg border border-gray-200">
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
                        <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
                        <div className="h-2 bg-gray-100 rounded w-2/3 animate-pulse mt-2" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function CourseCardSkeleton() {
    return (
        <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="space-y-3">
                <div className="flex items-start justify-between">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-4/5 animate-pulse" />
                </div>
                <div className="space-y-1">
                    <div className="h-2 bg-gray-200 rounded w-full animate-pulse" />
                </div>
            </div>
        </div>
    );
}

export function TableRowSkeleton() {
    return (
        <tr className="border-b border-gray-100">
            <td className="py-3 px-2">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-24 animate-pulse" />
                        <div className="h-2 bg-gray-100 rounded w-16 animate-pulse" />
                    </div>
                </div>
            </td>
            <td className="py-3 px-2">
                <div className="h-3 bg-gray-200 rounded w-28 animate-pulse" />
            </td>
            <td className="py-3 px-2 text-center">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mx-auto" />
            </td>
        </tr>
    );
}

export function AgendaItemSkeleton() {
    return (
        <div className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
            <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
            </div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse" />
                <div className="h-3 bg-gray-100 rounded w-2/3 animate-pulse" />
            </div>
        </div>
    );
}

export function ChatItemSkeleton() {
    return (
        <div className="py-3 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
                    <div className="h-3 bg-gray-100 rounded w-3/4 animate-pulse" />
                </div>
            </div>
        </div>
    );
}

