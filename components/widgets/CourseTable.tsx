'use client';

import React, { useState } from 'react';
import { BaseWidget } from './BaseWidget';
import { Course } from '@/lib/mock-data';
import { Search, Pin } from 'lucide-react';
import { useCoursesContext } from '@/context/CoursesContext';

interface CourseTableProps {
  courses: Course[];
  onDelete?: () => void;
  onSettings?: () => void;
  showPinnedOnly?: boolean;
  isEditMode?: boolean;
}

export function CourseTable({ courses, onDelete, onSettings, showPinnedOnly = false, isEditMode = false }: CourseTableProps) {
  const { isPinned, togglePin } = useCoursesContext();
  const [localShowPinned, setLocalShowPinned] = useState(showPinnedOnly);

  // Filter courses based on pinned status
  const displayCourses = localShowPinned
    ? courses.filter((course) => isPinned(course.id))
    : courses;

  return (
    <BaseWidget title="Your Courses" onDelete={onDelete} onSettings={onSettings}>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 relative">

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          {isEditMode && (
            <label className="flex items-center gap-3 flex-shrink-0 cursor-pointer">
              <span className="text-sm text-gray-600 whitespace-nowrap">Pinned only</span>
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
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Course</th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Responsible</th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Pin</th>
              </tr>
            </thead>
            <tbody>
              {displayCourses.map((course) => (
                <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center text-white font-semibold text-xs">
                        {course.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{course.name}</p>
                        <p className="text-xs text-gray-500">{course.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-sm text-gray-600">{course.instructor}</td>
                  <td className="py-3 px-2 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePin(course.id);
                      }}
                      className="inline-flex items-center justify-center p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                      aria-label={isPinned(course.id) ? 'Unpin course' : 'Pin course'}
                    >
                      <Pin
                        className={`w-4 h-4 transition-colors ${isPinned(course.id) ? 'fill-blue-600 text-blue-600' : 'text-gray-400'
                          }`}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BaseWidget>
  );
}

