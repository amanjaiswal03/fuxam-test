'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { mockCourses } from '@/lib/mock-data';

interface CoursesContextType {
  pinnedCourseIds: Set<string>;
  togglePin: (courseId: string) => void;
  isPinned: (courseId: string) => boolean;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export function CoursesProvider({ children }: { children: React.ReactNode }) {
  const [pinnedCourseIds, setPinnedCourseIds] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pinned-courses');
    if (saved) {
      try {
        setPinnedCourseIds(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error('Failed to load pinned courses:', e);
        // Initialize with defaults
        const defaultPinned = mockCourses
          .filter((course) => course.isPinned)
          .map((course) => course.id);
        setPinnedCourseIds(new Set(defaultPinned));
      }
    } else {
      // Initialize with defaults
      const defaultPinned = mockCourses
        .filter((course) => course.isPinned)
        .map((course) => course.id);
      setPinnedCourseIds(new Set(defaultPinned));
    }
    setMounted(true);
  }, []);

  // Save to localStorage whenever pinned courses change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('pinned-courses', JSON.stringify(Array.from(pinnedCourseIds)));
    }
  }, [pinnedCourseIds, mounted]);

  const togglePin = useCallback((courseId: string) => {
    setPinnedCourseIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  }, []);

  const isPinned = useCallback((courseId: string) => {
    return pinnedCourseIds.has(courseId);
  }, [pinnedCourseIds]);

  return (
    <CoursesContext.Provider value={{ pinnedCourseIds, togglePin, isPinned }}>
      {children}
    </CoursesContext.Provider>
  );
}

export function useCoursesContext() {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error('useCoursesContext must be used within CoursesProvider');
  }
  return context;
}

