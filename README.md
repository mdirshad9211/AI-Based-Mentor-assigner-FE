# AI Ticket Assistant - Frontend

A modern React application for managing support tickets with role-based dashboards and AI-powered features.

## Features

- 🎨 **Modern UI**: Dark theme with gradient backgrounds and responsive design
- 🔐 **Authentication**: Login/Signup with role-based access
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🎫 **Ticket Management**: Create, view, and manage support tickets
- 👨‍💼 **Admin Dashboard**: Comprehensive admin panel with analytics
- 🔍 **Search & Filter**: Real-time search functionality
- 📊 **Analytics Cards**: Visual statistics and metrics
- 🛡️ **Role-Based Access**: Different views for Users, Moderators, and Admins

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

- **Home** (`/`) - Landing page with hero section and features
- **About** (`/about`) - About page with company information
- **Contact** (`/contact`) - Contact form and information
- **Sign Up** (`/signup`) - User registration with role selection
- **Login** (`/login`) - User authentication
- **Create Ticket** (`/create-ticket`) - Ticket creation form
- **All Tickets** (`/all-tickets`) - User's personal ticket dashboard
- **Admin Dashboard** (`/admin-dashboard`) - Admin panel with all tickets
- **Ticket Detail** (`/:id`) - Individual ticket view and editing

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
- ✅ Create support tickets
- ✅ View personal tickets
- ✅ Search through personal tickets
- ✅ View ticket details

### Moderator
- ✅ All user features
- ✅ Edit and update any ticket
- ✅ View all tickets in the system

### Admin
- ✅ All moderator features
- ✅ Access to admin dashboard
- ✅ View system analytics
- ✅ Manage users and tickets
- ✅ Complete system overview

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

1. **Registration**: Users can sign up with email, password, role, and skills
2. **Login**: JWT-based authentication with role-specific redirects
3. **Protected Routes**: Automatic redirect to login for unauthorized access
4. **Role-Based Navigation**: Different menu items based on user role
5. **Logout**: Clear session and redirect to home

## State Management

The application uses React's built-in state management:

- **Local State**: Component-specific state with `useState`
- **Side Effects**: API calls and lifecycle with `useEffect`
- **Context**: User authentication state stored in localStorage
- **Navigation**: React Router for SPA routing

## API Integration

All API calls are made to the backend running on `http://localhost:5000`:

- **Authentication**: `/api/auth/*`
- **Tickets**: `/api/tickets/*`
- **Users**: `/api/auth/users` (Admin only)

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
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── NotFound.jsx
│   │   ├── TestimonialCard.jsx
│   │   ├── Testimonials.jsx
│   │   └── WhyChooseUs.jsx
│   ├── pages/             # Page components
│   │   ├── About.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AllTickets.jsx
│   │   ├── Contact.jsx
│   │   ├── CreateTicket.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   └── TicketDetail.jsx
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
