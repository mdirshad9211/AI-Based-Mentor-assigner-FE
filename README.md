# AI Ticket Assistant - Frontend

A modern React application for intelligent support ticket management with AI-powered automatic assignment, role-based dashboards, and comprehensive ticket tracking system.

## 🚀 Features

- 🎨 **Modern UI**: Dark theme with gradient backgrounds and responsive design
- 🔐 **Role-Based Authentication**: Login/Signup with User, Moderator, and Admin roles
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🎫 **Advanced Ticket Management**: Create, view, manage, and track support tickets
- 🤖 **AI-Powered Assignment**: Automatic ticket assignment based on moderator skills
- 💬 **Ticket Replies**: Threaded reply system for ticket communication
- ⭐ **User Feedback**: Rating and feedback system for completed tickets
- 👨‍💼 **Admin Dashboard**: Comprehensive admin panel with analytics
- 🔍 **Search & Filter**: Real-time search functionality across all tickets
- 📊 **Analytics Cards**: Visual statistics and metrics
- 🛡️ **Role-Based Access**: Different views and permissions for each role
- 📄 **Detailed Ticket Views**: Individual ticket pages with full conversation history
- 🎯 **Skills Management**: Mandatory skills for moderators enabling smart assignment

## 🆕 Latest Features

### Automatic Ticket Assignment
- **AI-Powered Matching**: Tickets automatically assigned to best-suited moderators based on skill matching
- **Flexible Skill Matching**: Intelligent string matching with normalization and similarity algorithms
- **Workload Balancing**: Even distribution of tickets among qualified moderators
- **Manual Override**: Admins can still manually assign tickets when needed

### Enhanced Ticket System
- **Ticket Replies**: Full conversation threads within tickets
- **User Feedback**: 5-star rating system with comments for completed tickets
- **Status Tracking**: Complete lifecycle management (TODO → IN_PROGRESS → COMPLETED → REOPENED)
- **Skills Integration**: Tickets tagged with relevant skills for better matching

### Improved User Experience
- **Professional Content**: Project-specific messaging throughout the application
- **Delhi Contact Details**: Localized contact information for Delhi, India office
- **Comprehensive About Page**: Detailed information about AI-powered ticket management
- **Enhanced Navigation**: Proper alignment and role-based menu visibility

## Tech Stack

- **Framework**: React 18
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Fetch API
- **Icons**: Emoji-based icons

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-ticket-assistant/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   The frontend is configured to work with the backend running on `http://localhost:5000`. No additional environment variables are required for development.

4. **Start the development server**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Application Structure

### Pages

- **Home** (`/`) - Landing page with project-specific hero section and features
- **About** (`/about`) - Comprehensive about page with AI ticket management details
- **Contact** (`/contact`) - Contact form with Delhi, India office information
- **Sign Up** (`/signup`) - User registration with role selection and skills validation
- **Login** (`/login`) - User authentication with role-based redirects
- **Create Ticket** (`/create-ticket`) - Advanced ticket creation with skills tagging
- **All Tickets** (`/all-tickets`) - User's personal ticket dashboard with search
- **Moderator Dashboard** (`/moderator-dashboard`) - Assigned tickets for moderators
- **Admin Dashboard** (`/admin-dashboard`) - Complete admin panel with system analytics
- **Ticket Details** (`/tickets/:id`) - Individual ticket view with replies and feedback

### Components

- **Navbar** - Navigation with role-based menu items
- **Hero** - Landing page hero section
- **Contact** - Contact form component
- **CTA** - Call-to-action section
- **Testimonials** - Customer testimonials
- **TestimonialCard** - Individual testimonial component
- **WhyChooseUs** - Features section
- **Footer** - Site footer
- **NotFound** - 404 error page

## Features by Role

### User
- ✅ Create support tickets with automatic skill detection
- ✅ View personal tickets with detailed status tracking
- ✅ Search through personal tickets with real-time filtering
- ✅ View ticket details with full conversation history
- ✅ Add replies to ongoing tickets
- ✅ Provide feedback and ratings for completed tickets
- ✅ Track ticket progress through all status stages

### Moderator
- ✅ All user features
- ✅ Receive automatically assigned tickets based on skills
- ✅ View all assigned tickets in dedicated dashboard
- ✅ Update ticket status (TODO → IN_PROGRESS → COMPLETED)
- ✅ Reply to tickets and communicate with users
- ✅ Skills-based workload distribution
- ✅ Access to moderator-specific navigation

### Admin
- ✅ All moderator and user features
- ✅ Access to comprehensive admin dashboard
- ✅ View system-wide analytics and metrics
- ✅ Manage all users and tickets in the system
- ✅ Manual ticket assignment override capabilities
- ✅ Test and configure skill matching algorithms
- ✅ Complete system overview and control
- ✅ User management and role administration

## UI/UX Features

### Design System
- **Color Scheme**: Dark theme with indigo/purple gradients
- **Typography**: Clean, modern fonts with proper hierarchy
- **Layout**: Responsive grid system
- **Cards**: Modern card design with hover effects
- **Forms**: Consistent form styling with validation feedback

### Interactive Elements
- **Status Badges**: Color-coded ticket status indicators
- **Search Bar**: Real-time search with sticky positioning
- **Loading States**: Loading indicators for async operations
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Clear success notifications

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Proper tablet layouts
- **Desktop Enhanced**: Rich desktop experience
- **Grid System**: Responsive grid layouts

## Authentication Flow

1. **Registration**: Users sign up with email, password, role selection, and mandatory skills for moderators
2. **Role Validation**: Skills are required for moderator role during signup
3. **Login**: JWT-based authentication with role-specific redirects and dashboard access
4. **Protected Routes**: Automatic redirect to login for unauthorized access attempts
5. **Role-Based Navigation**: Dynamic menu items and access controls based on user role
6. **Session Management**: Secure session handling with automatic logout functionality

## State Management

The application uses React's built-in state management:

- **Local State**: Component-specific state with `useState`
- **Side Effects**: API calls and lifecycle with `useEffect`
- **Context**: User authentication state stored in localStorage
- **Navigation**: React Router for SPA routing

## API Integration

All API calls are made to the backend running on `http://localhost:5000`:

- **Authentication**: `/api/auth/*` - User registration, login, and management
- **Tickets**: `/api/tickets/*` - Ticket CRUD operations, status updates
- **Ticket Replies**: `/api/tickets/:id/replies` - Reply management and conversations
- **User Feedback**: `/api/tickets/:id/feedback` - Rating and feedback submission
- **Auto Assignment**: `/api/tickets/auto-assign` - AI-powered skill matching
- **Skill Testing**: `/api/tickets/test-skill-matching` - Algorithm testing endpoints
- **Users Management**: `/api/auth/users` - Admin-only user management

### Error Handling
- Network errors are caught and displayed to users
- HTTP errors are parsed and shown with appropriate messages
- Loading states prevent multiple submissions

## Development Workflow

1. **Start Backend**: Ensure backend is running on port 5000
2. **Start Frontend**: Run `npm run dev` to start Vite dev server
3. **Hot Reload**: Changes are automatically reflected
4. **Development Tools**: React DevTools for debugging

## File Structure

```
frontend/
├── public/                 # Static assets
│   └── vite.svg           # Favicon
├── src/
│   ├── components/        # Reusable components
│   │   ├── Contact.jsx
│   │   ├── CTA.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx      # Updated with AI-powered messaging
│   │   ├── Navbar.jsx    # Enhanced with role-based navigation
│   │   ├── NotFound.jsx
│   │   ├── TestimonialCard.jsx
│   │   ├── Testimonials.jsx
│   │   └── WhyChooseUs.jsx # Updated with project features
│   ├── pages/             # Page components
│   │   ├── About.jsx     # Comprehensive AI project details
│   │   ├── AdminDashboard.jsx # Enhanced admin panel
│   │   ├── AllTickets.jsx
│   │   ├── Contact.jsx   # Delhi, India contact details
│   │   ├── CreateTicket.jsx
│   │   ├── Home.jsx      # Updated hero and content
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx    # Role validation and skills
│   │   ├── TicketDetails.jsx # NEW: Full ticket conversation
│   │   └── ModeratorDashboard.jsx # NEW: Moderator-specific view
│   ├── assets/            # Static assets
│   │   └── react.svg
│   ├── App.jsx            # Main application component
│   ├── App.css           # Global styles
│   ├── main.jsx          # Application entry point
│   └── index.css         # Tailwind imports
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
└── eslint.config.js      # ESLint configuration
```

## Styling Guide

### Tailwind Classes Used
- **Backgrounds**: `bg-gradient-to-br`, `from-[#232946]`, `via-[#161b22]`
- **Text**: `text-white`, `text-gray-400`, `text-indigo-300`
- **Spacing**: `py-12`, `px-4`, `mb-8`, `gap-6`
- **Layout**: `flex`, `grid`, `items-center`, `justify-between`
- **Interactive**: `hover:`, `focus:`, `transition`

### Custom Colors
- Primary: `#232946` (Dark blue)
- Secondary: `#181c2a` (Darker blue)
- Accent: `#6366f1` (Indigo)
- Success: Green variants
- Warning: Yellow variants
- Error: Red variants

## Performance Optimizations

- **Code Splitting**: React Router handles route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Proper image sizing and formats
- **Bundle Size**: Optimized build with Vite

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **JavaScript**: ES6+ features used
- **CSS**: Modern CSS features with Tailwind

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Follow the existing code style
5. Test your changes thoroughly
6. Submit a pull request

## Deployment

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

## License

This project is licensed under the MIT License.
