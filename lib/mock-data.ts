export interface Course {
    id: string;
    name: string;
    code: string;
    instructor: string;
    image?: string;
    isPinned: boolean;
    progress?: number;
}

export interface Task {
    id: string;
    title: string;
    course: string;
    dueDate: string;
    status: 'pending' | 'in-progress' | 'completed' | 'reviewed';
    priority: 'low' | 'medium' | 'high';
}

export interface AgendaEvent {
    id: string;
    title: string;
    time: string;
    date: string;
    type: 'class' | 'exam' | 'meeting' | 'other';
    location?: string;
}

export interface Chat {
    id: string;
    name: string;
    lastMessage: string;
    timestamp: string;
    unread: number;
    avatar?: string;
}

export const mockCourses: Course[] = [
    {
        id: '1',
        name: 'Business Analytics',
        code: 'BA 101',
        instructor: 'Dr. Smith',
        isPinned: true,
        progress: 65,
    },
    {
        id: '2',
        name: 'Fortgeschrittene Geschäftsstrategie',
        code: 'GS 301',
        instructor: 'Prof. Mueller',
        isPinned: true,
        progress: 45,
    },
    {
        id: '3',
        name: 'Geschäftsprozessmanagement',
        code: 'GPM 202',
        instructor: 'Dr. Weber',
        isPinned: true,
        progress: 80,
    },
    {
        id: '4',
        name: 'Risikomanagement',
        code: 'RM 204',
        instructor: 'Prof. Fischer',
        isPinned: true,
        progress: 55,
    },
    {
        id: '5',
        name: 'Data Science Fundamentals',
        code: 'DS 150',
        instructor: 'Dr. Anderson',
        isPinned: false,
        progress: 30,
    },
    {
        id: '6',
        name: 'Advanced Economics',
        code: 'EC 401',
        instructor: 'Prof. Johnson',
        isPinned: false,
        progress: 70,
    },
];

export const mockTasks: Task[] = [
    {
        id: '1',
        title: 'Complete Data Analysis Assignment',
        course: 'Business Analytics',
        dueDate: '2025-12-20',
        status: 'in-progress',
        priority: 'high',
    },
    {
        id: '2',
        title: 'Read Chapter 5: Strategic Planning',
        course: 'Fortgeschrittene Geschäftsstrategie',
        dueDate: '2025-12-18',
        status: 'pending',
        priority: 'medium',
    },
    {
        id: '3',
        title: 'Submit Business Process Model',
        course: 'Geschäftsprozessmanagement',
        dueDate: '2025-12-22',
        status: 'in-progress',
        priority: 'high',
    },
    {
        id: '4',
        title: 'Risk Assessment Report',
        course: 'Risikomanagement',
        dueDate: '2025-12-19',
        status: 'completed',
        priority: 'medium',
    },
    {
        id: '5',
        title: 'Quiz: Python Basics',
        course: 'Data Science Fundamentals',
        dueDate: '2025-12-17',
        status: 'reviewed',
        priority: 'low',
    },
    {
        id: '6',
        title: 'Economics Essay Draft',
        course: 'Advanced Economics',
        dueDate: '2025-12-21',
        status: 'pending',
        priority: 'medium',
    },
    {
        id: '7',
        title: 'Team Presentation Slides',
        course: 'Business Analytics',
        dueDate: '2025-12-23',
        status: 'in-progress',
        priority: 'high',
    },
    {
        id: '8',
        title: 'Financial Analysis Case Study',
        course: 'Advanced Economics',
        dueDate: '2025-12-15',
        status: 'completed',
        priority: 'high',
    },
];

export const mockAgenda: AgendaEvent[] = [
    {
        id: '1',
        title: 'Business Analytics',
        time: '05:30 - 08:00',
        date: '2025-12-17',
        type: 'class',
    },
    {
        id: '2',
        title: 'Economics Exam',
        time: '09:50 - 10:30',
        date: '2025-12-17',
        type: 'exam',
    },
    {
        id: '3',
        title: 'Prüfungsvorbereitung',
        time: '11:00 - 12:00',
        date: '2025-12-17',
        type: 'meeting',
        location: 'zoom.us',
    },
    {
        id: '4',
        title: 'Study Group',
        time: '05:30 - 08:00',
        date: '2025-12-18',
        type: 'other',
    },
    {
        id: '5',
        title: 'Economics Lecture',
        time: '09:50 - 10:30',
        date: '2025-12-18',
        type: 'class',
    },
    {
        id: '6',
        title: 'Project Meeting',
        time: '11:00 - 12:00',
        date: '2025-12-18',
        type: 'meeting',
        location: 'zoom.us',
    },
];

export const mockChats: Chat[] = [
    {
        id: '1',
        name: 'Study Group - BA 101',
        lastMessage: 'Can someone share the notes from today?',
        timestamp: '10 minutes ago',
        unread: 3,
    },
    {
        id: '2',
        name: 'Prof. Mueller',
        lastMessage: 'Your assignment has been graded',
        timestamp: '1 hour ago',
        unread: 1,
    },
    {
        id: '3',
        name: 'Project Team Alpha',
        lastMessage: 'Meeting tomorrow at 3 PM',
        timestamp: '3 hours ago',
        unread: 0,
    },
    {
        id: '4',
        name: 'Academic Advisor',
        lastMessage: 'Let me know when you are available',
        timestamp: 'Yesterday',
        unread: 0,
    },
];

export function getTasksByStatus(status: Task['status']): Task[] {
    return mockTasks.filter((task) => task.status === status);
}

export function getPinnedCourses(): Course[] {
    return mockCourses.filter((course) => course.isPinned);
}

export function getTodayAgenda(): AgendaEvent[] {
    const today = '2025-12-17';
    return mockAgenda.filter((event) => event.date === today);
}

export function getUpcomingAgenda(): AgendaEvent[] {
    return mockAgenda;
}

