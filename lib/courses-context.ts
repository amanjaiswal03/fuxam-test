import { Course } from './mock-data';

// In-memory storage for pinned courses
let pinnedCoursesState = new Set<string>();

export function initializePinnedCourses(courses: Course[]) {
    pinnedCoursesState.clear();
    courses.forEach((course) => {
        if (course.isPinned) {
            pinnedCoursesState.add(course.id);
        }
    });
    // Save to localStorage
    localStorage.setItem('pinned-courses', JSON.stringify(Array.from(pinnedCoursesState)));
}

export function loadPinnedCourses() {
    const saved = localStorage.getItem('pinned-courses');
    if (saved) {
        try {
            pinnedCoursesState = new Set(JSON.parse(saved));
        } catch (e) {
            console.error('Failed to load pinned courses:', e);
        }
    }
}

export function togglePinCourse(courseId: string) {
    if (pinnedCoursesState.has(courseId)) {
        pinnedCoursesState.delete(courseId);
    } else {
        pinnedCoursesState.add(courseId);
    }
    // Save to localStorage
    localStorage.setItem('pinned-courses', JSON.stringify(Array.from(pinnedCoursesState)));
}

export function isPinned(courseId: string): boolean {
    return pinnedCoursesState.has(courseId);
}

export function getPinnedCoursesSet(): Set<string> {
    return new Set(pinnedCoursesState);
}

