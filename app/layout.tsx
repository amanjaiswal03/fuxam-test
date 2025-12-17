import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CoursesProvider } from '@/context/CoursesContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Fuxam Dashboard - Student LMS',
    description: 'Student Learning Management System Dashboard',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning>
                <CoursesProvider>{children}</CoursesProvider>
            </body>
        </html>
    )
}

