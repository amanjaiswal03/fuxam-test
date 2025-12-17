import React from 'react';
import { BaseWidget } from './BaseWidget';
import { AgendaEvent } from '@/lib/mock-data';
import { Calendar, Clock, MapPin, BookOpen, FileText, Users, Sparkles } from 'lucide-react';

interface AgendaProps {
    events: AgendaEvent[];
    onDelete?: () => void;
}

export function Agenda({ events, onDelete }: AgendaProps) {
    const getEventIcon = (type: AgendaEvent['type']) => {
        switch (type) {
            case 'class':
                return <BookOpen className="w-4 h-4" />;
            case 'exam':
                return <FileText className="w-4 h-4" />;
            case 'meeting':
                return <Users className="w-4 h-4" />;
            default:
                return <Sparkles className="w-4 h-4" />;
        }
    };

    const getEventColor = (type: AgendaEvent['type']) => {
        switch (type) {
            case 'class':
                return 'border-blue-200 bg-blue-50 text-blue-700';
            case 'exam':
                return 'border-red-200 bg-red-50 text-red-700';
            case 'meeting':
                return 'border-purple-200 bg-purple-50 text-purple-700';
            default:
                return 'border-gray-200 bg-gray-50 text-gray-700';
        }
    };

    // Group events by date
    const groupedEvents = events.reduce((acc, event) => {
        const date = event.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(event);
        return acc;
    }, {} as Record<string, AgendaEvent[]>);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
        }
    };

    return (
        <BaseWidget title="Agenda" onDelete={onDelete}>
            <div className="space-y-4">
                {Object.entries(groupedEvents).map(([date, dayEvents]) => (
                    <div key={date}>
                        <div className="flex items-center gap-2 mb-3">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <h4 className="font-semibold text-gray-900 text-sm">{formatDate(date)}</h4>
                        </div>
                        <div className="space-y-2">
                            {dayEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className={`p-3 rounded-lg border-l-4 ${getEventColor(event.type)} hover:shadow-sm transition-all cursor-pointer`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5">{getEventIcon(event.type)}</div>
                                        <div className="flex-1 min-w-0">
                                            <h5 className="font-medium text-gray-900 text-sm mb-1">{event.title}</h5>
                                            <div className="flex items-center gap-3 text-xs text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {event.time}
                                                </span>
                                                {event.location && (
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {event.location}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </BaseWidget>
    );
}

