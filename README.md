# Fuxam Dashboard - Student LMS

A modern, customizable dashboard for student learning management built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

### ✨ Core Features
- **Drag-and-Drop Interface**: Fully adjustable widget positioning using react-grid-layout
- **Widget Library**: Comprehensive library of 18+ widgets organized by category
- **Customizable Widgets**: Configure widget size and settings (e.g., show pinned courses only)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Persistent State**: Dashboard layout automatically saves to localStorage
- **Modern UI**: Clean, professional design with smooth animations

### 📦 Available Widgets

#### Course Widgets
- **Course Slider**: Visual grid of course cards with progress tracking
- **Todo List**: Pending tasks with priority indicators
- **Course Table**: Searchable table view of all courses
- **In Progress Tasks**: Track actively worked on tasks
- **Recently Completed Tasks**: View completed assignments
- **Reviewed Tasks**: Tasks that have been reviewed
- **Completed Task Insights**: Analytics dashboard for task completion

#### Calendar Widgets
- **Agenda**: Upcoming events grouped by date with time and location

#### Management Widgets (Quick Links)
- **Users**: User management portal
- **Groups**: Group management
- **Terms**: Academic term management
- **Modules**: Course module management
- **Curricula**: Curriculum management
- **Study Plans**: Student study planning
- **SmartPlan**: AI-powered planning tools

#### Communication Widgets
- **Recent Chats**: View and access recent conversations

#### General Widgets
- **Image Widget**: Display custom images with configurable URL

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Build for Production

```bash
npm run build
npm start
```

## Usage

### Adding Widgets
1. Click the "Add Widget" button in the top right
2. Browse or search for widgets in the library
3. Select a widget to see its preview and configuration options
4. Choose your desired size (1×1, 2×2, 3×1, 3×2, 4×1, 4×2, 6×1, 6×2)
5. Configure settings if available (e.g., "Show pinned courses only")
6. Click "Add to Dashboard"

### Arranging Widgets
- **Move**: Click and drag the widget header (with grip icon) to reposition
- **Resize**: Drag the bottom-right corner of any widget to resize
- **Delete**: Click the trash icon in the widget header

### Resetting Dashboard
Click the "Reset" button to restore the default widget layout.

## Project Structure

```
fuxam-test/
├── app/                    # Next.js app router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage (Dashboard)
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Dashboard.tsx      # Main dashboard component
│   ├── WidgetLibrary.tsx  # Widget library modal
│   └── widgets/           # Widget components
│       ├── BaseWidget.tsx
│       ├── CourseSlider.tsx
│       ├── TodoList.tsx
│       ├── Agenda.tsx
│       └── ...
├── lib/                   # Utility functions
│   ├── mock-data.ts       # Mock data for widgets
│   ├── utils.ts           # Helper functions
│   └── widget-definitions.ts  # Widget metadata
├── types/                 # TypeScript types
│   └── widget.ts          # Widget type definitions
└── package.json
```

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Drag & Drop**: react-grid-layout
- **Icons**: Lucide React
- **State Management**: React Hooks + localStorage

## Customization

### Adding New Widgets

1. **Create the widget component** in `components/widgets/`:
```typescript
export function MyWidget({ onDelete }: { onDelete?: () => void }) {
  return (
    <BaseWidget title="My Widget" onDelete={onDelete}>
      {/* Your widget content */}
    </BaseWidget>
  );
}
```

2. **Define widget metadata** in `lib/widget-definitions.ts`:
```typescript
'my-widget': {
  type: 'my-widget',
  category: 'general',
  title: 'My Widget',
  description: 'Description of my widget',
  icon: 'Star',
  defaultSize: '2x2',
  availableSizes: ['1x1', '2x2', '3x2'],
  hasSettings: false,
}
```

3. **Add to widget renderer** in `components/widgets/WidgetRenderer.tsx`:
```typescript
case 'my-widget':
  return <MyWidget onDelete={handleDelete} />;
```

### Styling

Tailwind configuration is in `tailwind.config.ts`. The color palette uses blue as the primary color, which can be customized:

```typescript
colors: {
  primary: {
    // Your color scale
  },
}
```

## Data Integration

Currently uses mock data from `lib/mock-data.ts`. To integrate with real APIs:

1. Replace mock data imports in `components/widgets/WidgetRenderer.tsx`
2. Add API calls using fetch or your preferred data fetching library
3. Consider adding a state management solution (Redux, Zustand, etc.) for complex data flows

## License

MIT

