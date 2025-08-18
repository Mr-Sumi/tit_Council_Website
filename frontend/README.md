# Student Council Frontend

A modern, responsive React-based frontend application for the Student Council website, built with cutting-edge technologies and best practices.

## 🚀 Project Overview

The Student Council Frontend is a comprehensive web application that serves as the digital platform for student council activities, club management, event coordination, and student engagement. Built with React 19 and modern web technologies, it provides an intuitive and engaging user experience.

## ✨ Features

### 🏠 Home Page
- **Hero Section**: Animated landing section with compelling call-to-action buttons
- **About Section**: Information about the student council and its mission
- **Clubs Section**: Showcase of available student clubs and organizations
- **Leadership Section**: Display of current council members and office bearers
- **Mentors Section**: Faculty mentors and advisors information
- **Upcoming Events**: Calendar of upcoming council events and activities
- **Get Involved**: Call-to-action for student participation

### 👥 User Management
- **Authentication**: Google OAuth integration with Firebase
- **User Profiles**: Comprehensive user profile management
- **Registration Forms**: Multiple registration options for different purposes

### 🎯 Club Management
- **Club Directory**: Complete listing of all student clubs
- **Club Details**: Detailed information about each club
- **Club Gallery**: Visual showcase of club activities and events

### 📅 Events & Activities
- **Event Calendar**: Upcoming and past events
- **Event Details**: Comprehensive event information
- **Event Registration**: Student participation tracking

### 📝 Forms & Submissions
- **Join Council Form**: Application process for council membership
- **Idea Submission**: Platform for student suggestions and ideas
- **Suggestion Form**: Feedback and improvement suggestions
- **User Profile Registration**: Complete user onboarding

### 🖼️ Media & Gallery
- **Image Gallery**: Visual content management
- **Responsive Design**: Optimized for all device sizes
- **Image Cropping**: Built-in image editing capabilities

## 🛠️ Technology Stack

### Core Technologies
- **React 19.1.1**: Latest React with concurrent features
- **Vite 7.1.2**: Fast build tool and development server
- **TypeScript Support**: Full TypeScript compatibility

### UI & Styling
- **Tailwind CSS 4.1.12**: Utility-first CSS framework
- **DaisyUI 5.0.50**: Component library built on Tailwind
- **Styled Components 6.1.19**: CSS-in-JS styling solution
- **Material-UI 7.3.1**: React component library
- **Emotion 11.14.0**: CSS-in-JS library

### Animation & Interactions
- **Framer Motion 12.23.12**: Production-ready motion library
- **GSAP 3.13.0**: Professional-grade animation library
- **Lucide React 0.539.0**: Beautiful & consistent icon toolkit

### Forms & Validation
- **React Hook Form 7.62.0**: Performant forms with minimal re-renders
- **React Dropzone 14.3.8**: Drag & drop file uploads
- **React Cropper 2.3.3**: Image cropping functionality

### Backend Integration
- **Axios 1.11.0**: HTTP client for API communication
- **Firebase 12.1.0**: Authentication and backend services

### Development Tools
- **ESLint 9.33.0**: Code linting and quality assurance
- **PostCSS 8.5.6**: CSS processing and optimization
- **Autoprefixer 10.4.21**: CSS vendor prefixing

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
│   └── vite.svg           # Council logo
├── src/
│   ├── assets/            # Static assets (images, icons)
│   ├── components/        # React components
│   │   ├── form/         # Form components
│   │   └── Home/         # Home page components
│   ├── context/          # React context providers
│   ├── data/             # JSON data files
│   ├── hooks/            # Custom React hooks
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── .gitignore            # Git ignore rules
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.js        # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher
- **Git**: For version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Council_Website/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the frontend directory with the following variables:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## 📜 Available Scripts

- **`npm run dev`**: Start development server with hot reload
- **`npm run build`**: Build the application for production
- **`npm run lint`**: Run ESLint to check code quality
- **`npm run preview`**: Preview the production build locally

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (#6366f1)
- **Secondary**: White (#ffffff)
- **Accent**: Indigo variations
- **Text**: Gray scale (#1f2937 to #9ca3af)
- **Background**: Dark theme with transparency

### Typography
- **Primary Font**: Gilroy (Custom font family)
- **Secondary Font**: System fonts fallback
- **Heading Sizes**: 7xl to lg (responsive)
- **Body Text**: Base to lg sizes

### Components
- **Buttons**: Rounded, with hover effects and animations
- **Cards**: Glassmorphism design with backdrop blur
- **Forms**: Clean, accessible form components
- **Navigation**: Responsive navigation with mobile menu

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: 320px to 767px

### Breakpoint Strategy
- **Mobile First**: Base styles for mobile devices
- **Progressive Enhancement**: Additional styles for larger screens
- **Flexible Layouts**: CSS Grid and Flexbox for adaptive layouts

## 🔧 Configuration Files

### Tailwind CSS
```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Custom theme extensions
    }
  },
  plugins: []
}
```

### PostCSS
```javascript
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### ESLint
```javascript
// eslint.config.js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    // Additional configuration...
  },
])
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag the `dist` folder to Netlify
3. Configure build settings if needed

## 🧪 Testing

### Manual Testing Checklist
- [ ] Responsive design on all devices
- [ ] Cross-browser compatibility
- [ ] Form validation and submission
- [ ] Authentication flow
- [ ] Navigation and routing
- [ ] Image loading and optimization
- [ ] Performance on slow connections

### Performance Optimization
- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Component lazy loading
- **Image Optimization**: WebP format support
- **Bundle Analysis**: Regular bundle size monitoring

## 🔒 Security Considerations

- **Environment Variables**: Sensitive data stored in `.env` files
- **Input Validation**: Client-side and server-side validation
- **XSS Prevention**: Sanitized user inputs
- **CSP Headers**: Content Security Policy implementation
- **HTTPS Only**: Secure communication protocols

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm run lint`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

### Code Standards
- **ESLint**: Follow the configured ESLint rules
- **Prettier**: Consistent code formatting
- **Component Structure**: Follow established component patterns
- **Naming Conventions**: Use descriptive names for variables and functions

## 📚 Documentation

### Component Documentation
Each component includes:
- **Purpose**: What the component does
- **Props**: Input parameters and their types
- **Usage**: Example usage patterns
- **Styling**: CSS classes and customization options

### API Documentation
- **Endpoints**: Available API endpoints
- **Authentication**: Required headers and tokens
- **Error Handling**: Common error responses and solutions

## 🐛 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Development Server Issues
```bash
# Check if port is in use
lsof -i :5173
# Kill process if needed
kill -9 <PID>
```

#### Dependency Issues
```bash
# Clear npm cache
npm cache clean --force
# Reinstall dependencies
npm install
```

## 📞 Support

For technical support or questions:
- **Issues**: Create an issue in the GitHub repository
- **Documentation**: Check this README and inline code comments
- **Community**: Reach out to the development team

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React Team**: For the amazing React framework
- **Vite Team**: For the fast build tool
- **Tailwind CSS**: For the utility-first CSS framework
- **Framer Motion**: For the animation library
- **Student Council Members**: For feedback and testing

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainer**: Development Team
