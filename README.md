# Student Learning Management System - Dashboard MVP

A modern, interactive dashboard for a student learning management system built with **Next.js**, **React**, and **TypeScript**.

## 🚀 Features

### Dashboard
- **Customizable Widgets**: Drag-and-drop widgets to arrange your dashboard
- **Edit/View Modes**: Switch between edit mode (modify layout) and view mode (read-only)
- **Persistent Layout**: Dashboard layout is automatically saved to localStorage
- **Loading Skeletons**: Beautiful loading animations for each widget
- **Responsive Design**: Works seamlessly on desktop and tablet devices

### Widgets Available

**Course Management**
- **Course Slider**: Browse courses with progress tracking and pinning
- **Course Table**: View courses in table format with pinning capabilities
- **Pinned Courses**: Quick access to your favorite courses

**Tasks & Planning**
- **Todo List**: Manage pending tasks
- **In Progress Tasks**: Track currently active tasks
- **Recently Completed Tasks**: View recently finished items
- **Reviewed Tasks**: See tasks that have been reviewed
- **Task Insights**: Analytics on completed tasks

**Calendar & Communication**
- **Agenda**: View upcoming events and deadlines
- **Recent Chats**: Quick access to recent conversations

**Management Links**
- Users, Groups, Terms, Modules, Curricula, Study Plans, SmartPlan

**Customization**
- **Image Widget**: Add custom images to your dashboard

### Advanced Features
- **Pin Courses**: Pin/unpin courses for quick access
- **Widget Configuration**: Customize widget settings (e.g., show pinned courses only)
- **Confirmation Dialogs**: Professional dialogs for destructive actions
- **Widget Library**: Browse and add widgets from a modal library
- **All Categories View**: See all available widgets at once

## 📋 Prerequisites

- **Node.js**: Version 18.17 or later
- **npm** or **yarn**: Package manager

## 🛠️ Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd /Users/amanjaiswal/Desktop/Projects/fuxam-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

## 🚀 Starting the Application

### Development Server

Run the development server:

```bash
npm run dev
# or
yarn dev
```

The application will start at **http://localhost:3000**

Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

### Production Build

Build for production:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm start
# or
yarn start
```

## 📖 How to Use

### Viewing the Dashboard
1. Open the app at `http://localhost:3000`
2. Browse your widgets and information in **View Mode** (default)

### Editing the Dashboard

1. **Enter Edit Mode**: Click the **"Edit Dashboard"** button in the top-right
2. **Rearrange Widgets**: Click and drag widgets to reposition them
3. **Resize Widgets**: Use the blue resize handle in the bottom-right corner of widgets
4. **Delete Widgets**: Click the trash icon in the widget header
5. **Add Widgets**: Click **"Add Widget"** to open the widget library
6. **Exit Edit Mode**: Click **"Save & Exit"** to save changes and return to view mode

### Widget Library

1. Click **"Add Widget"** in edit mode
2. **Browse Categories**: Select from Course, Calendar, Management, Chat, General, or **All**
3. **Search Widgets**: Use the search bar to find specific widgets
4. **Configure Widget**: 
   - Select desired size
   - Configure settings (if available)
5. **Add to Dashboard**: Click **"Add to Dashboard"** button
6. **Close Modal**: Click outside the modal or the backdrop

### Pinning Courses

1. In **Course Slider** or **Course Table** widgets, click the pin icon on any course
2. Pinned courses appear in the **Pinned Courses** widget
3. Use the **"Pinned only"** toggle in edit mode to filter widgets

### Resetting the Dashboard

1. Enter **Edit Mode**
2. Click **"Reset"** button
3. Confirm the action in the dialog
4. Dashboard returns to default widgets

## 🎨 Customization

### Widget Settings

Some widgets offer configuration options:

- **Course Widgets**: Toggle "Show pinned courses only" setting
- **Image Widget**: Add custom image URL



## 📁 Project Structure

```
fuxam-test/
├── app/
│   ├── globals.css          # Global styles and react-grid-layout customizations
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Main page component
│   └── page.tsx             # Page component
├── components/
│   ├── Dashboard.tsx        # Main dashboard component
│   ├── WidgetLibrary.tsx    # Widget selection modal
│   ├── WidgetLoader.tsx     # Loading indicator
│   ├── WidgetSkeleton.tsx   # Loading skeletons for each widget type
│   ├── ConfirmationDialog.tsx # Reusable confirmation dialog
│   └── widgets/             # Individual widget components
│       ├── BaseWidget.tsx   # Wrapper for all widgets
│       ├── CourseSlider.tsx
│       ├── CourseTable.tsx
│       └── ... (other widgets)
├── hooks/
│   └── useDelayedData.ts    # Custom hook for delayed data loading
├── context/
│   └── CoursesContext.tsx   # Global context for course pinning
├── lib/
│   ├── mock-data.ts         # Mock data for all widgets
│   ├── widget-definitions.ts # Widget metadata and configuration
│   └── utils.ts             # Utility functions
└── types/
    └── widget.ts            # TypeScript type definitions
```

## 🔧 Technologies Used

- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **react-grid-layout**: Drag-and-drop grid layout
- **lucide-react**: Beautiful SVG icons
- **LocalStorage API**: Persist dashboard layout

## 💾 Data Persistence

- **Dashboard Layout**: Saved to localStorage
- **Widget Configuration**: Saved with layout
- **Pinned Courses**: Stored in CoursesContext and localStorage
- **All data is restored on page reload**

## ⚙️ Available Scripts

In the project directory, you can run:

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint






