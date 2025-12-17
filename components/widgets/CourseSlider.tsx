'use client';

import React, { useState } from 'react';
import { BaseWidget } from './BaseWidget';
import { Course } from '@/lib/mock-data';
import { BookOpen, TrendingUp, Pin } from 'lucide-react';
import { useCoursesContext } from '@/context/CoursesContext';

interface CourseSliderProps {
  courses: Course[];
  onDelete?: () => void;
  onSettings?: () => void;
  showPinnedOnly?: boolean;
  isEditMode?: boolean;
}

export function CourseSlider({ courses, onDelete, onSettings, showPinnedOnly = false, isEditMode = false }: CourseSliderProps) {
  const { isPinned, togglePin } = useCoursesContext();
  const [localShowPinned, setLocalShowPinned] = useState(showPinnedOnly);

  // Filter courses based on pinned status
  const displayCourses = localShowPinned
    ? courses.filter((course) => isPinned(course.id))
    : courses;

  return (
    <BaseWidget title="Your Courses (Slider)" onDelete={onDelete} onSettings={onSettings}>
      {isEditMode && (
        <label className="mb-4 flex items-center gap-3 cursor-pointer">
          <span className="text-sm text-gray-600">Pinned only</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              setLocalShowPinned(!localShowPinned);
            }}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${localShowPinned ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            aria-label="Toggle pinned courses"
            type="button"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform pointer-events-none ${localShowPinned ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
          </button>
        </label>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayCourses.map((course) => (
          <div
            key={course.id}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 hover:shadow-md transition-shadow border border-blue-100 relative flex flex-col h-full"
          >
            <div className="flex items-start justify-between mb-3 flex-shrink-0">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePin(course.id);
                }}
                className="p-1 hover:bg-blue-200 rounded-lg transition-colors flex-shrink-0 ml-2"
                aria-label={isPinned(course.id) ? 'Unpin course' : 'Pin course'}
              >
                <Pin
                  className={`w-4 h-4 transition-colors ${isPinned(course.id) ? 'fill-blue-600 text-blue-600' : 'text-gray-400'
                    }`}
                />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 mb-1 text-sm line-clamp-2 break-words">{course.name}</h4>
              <p className="text-xs text-gray-600 mb-3 line-clamp-1 break-words">{course.instructor}</p>
            </div>
            {course.progress !== undefined && (
              <div className="flex-shrink-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600 flex items-center gap-1 min-w-0">
                    <TrendingUp className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">Progress</span>
                  </span>
                  <span className="text-xs font-semibold text-gray-900 ml-1 flex-shrink-0">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </BaseWidget>
  );
}

