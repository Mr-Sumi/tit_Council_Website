# Frontend Folder Structure & Data Schemas

## 📁 Complete Project Structure

```
frontend/
├── 📄 Configuration Files
│   ├── .gitignore                 # Git ignore patterns
│   ├── eslint.config.js           # ESLint configuration
│   ├── index.html                 # HTML entry point
│   ├── package.json               # Dependencies and scripts
│   ├── package-lock.json          # Locked dependency versions
│   ├── postcss.config.js          # PostCSS configuration
│   ├── tailwind.config.js         # Tailwind CSS configuration
│   └── vite.config.js             # Vite build configuration
│
├── 📁 public/                     # Static assets (served directly)
│   └── vite.svg                   # Vite logo (521KB)
│
├── 📁 node_modules/               # Dependencies (generated)
│
└── 📁 src/                        # Source code
    ├── 📄 Core Files
    │   ├── App.jsx                # Main application component (2.8KB)
    │   ├── index.css              # Global styles (664B)
    │   ├── firebase.js            # Firebase configuration (641B)
    │   └── main.jsx               # Application entry point (357B)
    │
    ├── 📁 assets/                 # Static assets
    │   └── react.svg              # React logo (4.0KB)
    │
    ├── 📁 components/             # React components
    │   ├── 📄 Main Components
    │   │   ├── Header.jsx         # Navigation header (7.2KB)
    │   │   ├── Footer.jsx         # Site footer (7.3KB)
    │   │   ├── Home.jsx           # Home page wrapper (831B)
    │   │   ├── Loader.jsx         # Loading component (7.0KB)
    │   │   └── Error.jsx          # Error page (2.1KB)
    │   │
    │   ├── 📁 Home/               # Home page components
    │   │   ├── HeroSection.jsx    # Hero banner (4.8KB)
    │   │   ├── AboutSection.jsx   # About section (4.2KB)
    │   │   ├── ClubsSection.jsx   # Clubs showcase (3.2KB)
    │   │   ├── LeadershipSection.jsx # Leadership display (7.2KB)
    │   │   ├── MentorsHead.jsx    # Mentors section (3.8KB)
    │   │   ├── JoinCouncilSection.jsx # Join council CTA (2.8KB)
    │   │   ├── GetInvolved.jsx    # Get involved section (2.6KB)
    │   │   └── UpcomingEvents.jsx # Events preview (1.3KB)
    │   │
    │   ├── 📁 form/               # Form components
    │   │   ├── AuthForm.jsx       # Authentication form (3.2KB)
    │   │   ├── JoinCouncil.jsx    # Council application (14KB)
    │   │   ├── UserProfileRegistration.jsx # User registration (9.1KB)
    │   │   ├── IdeaSubmission.jsx # Idea submission (5.2KB)
    │   │   └── Suggestion.jsx     # Suggestion form (4.5KB)
    │   │
    │   ├── 📄 Feature Components
    │   │   ├── Clubs.jsx          # Clubs listing (2.6KB)
    │   │   ├── ClubDetails.jsx    # Individual club view (5.2KB)
    │   │   ├── Gallery.jsx        # Image gallery (4.9KB)
    │   │   ├── Mentors.jsx        # Mentors page (3.4KB)
    │   │   ├── OfficeBearer.jsx   # Office bearers (3.8KB)
    │   │   ├── DevelopersTeam.jsx # Development team (3.4KB)
    │   │   └── UserProfile.jsx    # User profile (4.1KB)
    │
    ├── 📁 context/                # React context providers
    │   └── AuthContext.jsx        # Authentication context (712B)
    │
    ├── 📁 hooks/                  # Custom React hooks
    │   ├── ScrollToTop.jsx        # Scroll to top hook (1.4KB)
    │   └── useHideOnScroll.js     # Hide on scroll hook (905B)
    │
    └── 📁 data/                   # JSON data files
        ├── assets.json             # Asset references (500B)
        ├── Clubs.json              # Clubs data (8.2KB)
        ├── Council-data.json       # Council information (5.2KB)
        ├── Leaders.json            # Leadership data (1.4KB)
        ├── officebearer.json       # Office bearers (4.9KB)
        ├── ClubBearerDetails.json  # Club bearer details (17KB)
        ├── DevelopersTeam.json     # Development team (3.3KB)
        ├── Mentors-Data.json       # Mentors information (2.3KB)
        └── ImageLinks.json         # Image references (45KB)
```

## 🗃️ Data Schema Documentation

### 1. 📚 Clubs Data Schema (`Clubs.json`)

```json
{
  "clubsData": [
    {
      "name": "string",           // Club name
      "img": "string",            // Cloudinary image URL
      "link": "string",           // Route path for club details
      "description": "string"     // Club description
    }
  ]
}
```

**Available Clubs:**
- Alumni Relation Committee
- Coding Club
- Cultural & Event Cell
- Cyber Cop Cell
- Dance Society
- ELITE (Discipline)
- Drone Society
- E.V. Club
- Environment Club
- Entrepreneurship Cell
- IEEE Student Chapter
- Literary Club
- Media Fusion Society
- Music Society
- NSS Unit
- Renewable Energy Club
- Robotics Club

### 2. 👑 Leadership Data Schema (`Leaders.json`)

```json
{
  "LEADERS": [
    {
      "role": "string",           // Leadership position
      "name": "string",           // Leader's name
      "img": "string",            // Profile image URL
      "msg": "string",            // Personal message
      "socials": {
        "linkedin": "string",     // LinkedIn profile
        "instagram": "string",    // Instagram profile
        "email": "string",        // Email address
        "twitter": "string",      // Twitter profile
        "facebook": "string",     // Facebook profile
        "github": "string"        // GitHub profile
      }
    }
  ]
}
```

**Current Leadership:**
- **Vice President**: Pratul Kumar
- **Secretary**: Vedant Singh

### 3. 🛠️ Development Team Schema (`DevelopersTeam.json`)

```json
{
  "developers": [
    {
      "name": "string",           // Developer name
      "role": "string",           // Role and expertise
      "quote": "string",          // Personal quote
      "img": "string",            // Profile image path
      "social": {
        "twitter": "string",      // Twitter profile
        "instagram": "string",    // Instagram profile
        "github": "string",       // GitHub profile
        "linkedin": "string",     // LinkedIn profile
        "portfolio": "string"     // Portfolio website
      }
    }
  ]
}
```

**Development Team:**
- **Rishabh Tomar**: Frontend Developer & Team Lead
- **Adarsh Raj**: Backend Developer & Database Expert
- **Krishna Jadhav**: Full Stack Developer & Database Expert
- **Samiksha Suryawanshi**: Full Stack Developer & Design Lead
- **Pratul Kumar**: Designer & Data Manager
- **Palak Bhargav**: Frontend Developer & UX Designer

### 4. 🎓 Mentors Data Schema (`Mentors-Data.json`)

```json
{
  "mentorsHeads": [
    {
      "img": "string",            // Profile image URL
      "name": "string",           // Mentor's name
      "role": "string",           // Role/title
      "quote": "string"           // Personal quote
    }
  ],
  "subMentors": [
    {
      "img": "string",            // Profile image URL
      "name": "string"            // Mentor's name
    }
  ]
}
```

**Mentor Heads:**
- **Prof.(Dr.) Shashi K. Jain**: Council Head
- **Dr. Kavita Burse**: Professional Development Mentor
- **Prof. Pankaj Patel**: Council Supervisor
- **Dr. Vivek Sharma**: Council Mentor
- **Dr. Anula Khare**: Council Advisor
- **Dr. Sumit Vashishtha**: Faculty Committee Head

**Sub Mentors:**
- Prof. Divyank Mishra
- Prof. Himanshu Shroti
- Prof. Pragya Tripathi
- Prof. Kuldeep Pahihar

### 5. 🏛️ Office Bearers Schema (`officebearer.json`)

```json
{
  "teamMembers": [
    {
      "name": "string",           // Member's name
      "role": "string",           // Official role
      "quote": "string",          // Personal quote
      "img": "string",            // Profile image URL
      "social": {
        "twitter": "string",      // Twitter profile
        "linkedin": "string",     // LinkedIn profile
        "instagram": "string",    // Instagram profile
        "github": "string"        // GitHub profile
      }
    }
  ]
}
```

**Office Bearers:**
- **Prabhat Kumar**: Club Mentor
- **Sahil Kumar**: Club Advisor
- **Shubham Raj**: Chief Committee Officer
- **Suryansh Shukla**: Academic Council Officer
- **Abhishek Modi**: Asst. Academic Council Officer
- **Ujjwal Mishra**: Inter College Relationship Officer
- **Namrata Khapre**: Public Relationship Officer
- **Shivam Choubey**: Club Editor
- **Dipal Turkar**: Treasurer
- **Abhinandan Kumar**: Joint Secretary Pharmacy
- **Komal Kumari**: Asst. Joint Secretary Pharmacy

### 6. 🖼️ Image Links Schema (`ImageLinks.json`)

```json
{
  "category": "string",           // Image category
  "images": [
    {
      "id": "string",             // Unique identifier
      "url": "string",            // Cloudinary image URL
      "alt": "string",            // Alt text for accessibility
      "caption": "string"         // Image caption
    }
  ]
}
```

**Image Categories:**
- Club activities
- Events and celebrations
- Team photos
- Campus life
- Academic activities

### 7. 🏛️ Council Data Schema (`Council-data.json`)

```json
{
  "councilInfo": {
    "name": "string",             // Council name
    "description": "string",      // Council description
    "mission": "string",          // Mission statement
    "vision": "string",           // Vision statement
    "values": ["string"],         // Core values
    "achievements": ["string"]    // Notable achievements
  }
}
```

### 8. 🎯 Club Bearer Details Schema (`ClubBearerDetails.json`)

```json
{
  "clubName": "string",           // Club name
  "bearers": [
    {
      "name": "string",           // Bearer's name
      "position": "string",       // Position in club
      "img": "string",            // Profile image
      "contact": {
        "email": "string",        // Email address
        "phone": "string"         // Phone number
      },
      "social": {
        "linkedin": "string",     // LinkedIn profile
        "instagram": "string"     // Instagram profile
      }
    }
  ]
}
```

## 🔧 Component Architecture

### Component Hierarchy

```
App.jsx
├── Header.jsx
├── Router
│   ├── Home.jsx
│   │   ├── HeroSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── ClubsSection.jsx
│   │   ├── LeadershipSection.jsx
│   │   ├── MentorsHead.jsx
│   │   ├── JoinCouncilSection.jsx
│   │   ├── GetInvolved.jsx
│   │   └── UpcomingEvents.jsx
│   ├── Clubs.jsx
│   ├── ClubDetails.jsx
│   ├── Gallery.jsx
│   ├── Mentors.jsx
│   ├── OfficeBearer.jsx
│   ├── DevelopersTeam.jsx
│   ├── UserProfile.jsx
│   └── Form Components
│       ├── AuthForm.jsx
│       ├── JoinCouncil.jsx
│       ├── UserProfileRegistration.jsx
│       ├── IdeaSubmission.jsx
│       └── Suggestion.jsx
└── Footer.jsx
```

### Component Categories

#### 🎯 **Page Components**
- **Home.jsx**: Main home page wrapper
- **Clubs.jsx**: Clubs listing page
- **ClubDetails.jsx**: Individual club view
- **Gallery.jsx**: Image gallery page
- **Mentors.jsx**: Mentors page
- **OfficeBearer.jsx**: Office bearers page
- **DevelopersTeam.jsx**: Development team page
- **UserProfile.jsx**: User profile page

#### 🏠 **Home Page Components**
- **HeroSection.jsx**: Landing hero section
- **AboutSection.jsx**: About council section
- **ClubsSection.jsx**: Clubs preview section
- **LeadershipSection.jsx**: Leadership showcase
- **MentorsHead.jsx**: Mentors introduction
- **JoinCouncilSection.jsx**: Join council CTA
- **GetInvolved.jsx**: Student engagement section
- **UpcomingEvents.jsx**: Events preview

#### 📝 **Form Components**
- **AuthForm.jsx**: Authentication forms
- **JoinCouncil.jsx**: Council application form
- **UserProfileRegistration.jsx**: User registration
- **IdeaSubmission.jsx**: Idea submission form
- **Suggestion.jsx**: Suggestion form

#### 🧩 **Utility Components**
- **Header.jsx**: Navigation header
- **Footer.jsx**: Site footer
- **Loader.jsx**: Loading states
- **Error.jsx**: Error handling

## 🎨 Styling Architecture

### CSS Organization
```
src/
├── index.css              # Global styles
├── components/            # Component-specific styles
│   ├── Header.css        # Header component styles
│   ├── Footer.css        # Footer component styles
│   └── Home/             # Home page component styles
│       ├── HeroSection.css
│       ├── AboutSection.css
│       └── ...
└── stylesheets/          # Additional stylesheets
    ├── club.css
    ├── gallery.css
    ├── navbaar.css
    └── ...
```

### Tailwind CSS Classes
- **Responsive Design**: `sm:`, `md:`, `lg:`, `xl:` prefixes
- **Spacing**: `p-`, `m-`, `gap-`, `space-` utilities
- **Colors**: Custom color palette with indigo theme
- **Typography**: Font sizes, weights, and families
- **Layout**: Flexbox, Grid, and positioning utilities

## 🚀 Performance Considerations

### Code Splitting
- Route-based code splitting
- Component lazy loading
- Dynamic imports for heavy components

### Image Optimization
- Cloudinary CDN integration
- WebP format support
- Lazy loading for images
- Responsive image sizing

### Bundle Optimization
- Tree shaking for unused code
- Minification and compression
- Vendor chunk separation
- Modern JavaScript features

## 🔒 Security Features

### Authentication
- Firebase OAuth integration
- Protected routes
- Session management
- Secure token handling

### Data Validation
- Client-side form validation
- Input sanitization
- XSS prevention
- CSRF protection

### Environment Variables
- Sensitive data in `.env` files
- Build-time variable injection
- Runtime configuration

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement
- Touch-friendly interactions
- Optimized navigation

## 🧪 Testing Strategy

### Manual Testing
- Cross-browser compatibility
- Device testing (mobile, tablet, desktop)
- Performance testing
- Accessibility testing

### Automated Testing
- ESLint for code quality
- Component testing
- Integration testing
- E2E testing

## 📊 Build & Deployment

### Development
```bash
npm run dev          # Start development server
npm run lint         # Run ESLint
npm run build        # Build for production
npm run preview      # Preview production build
```

### Production
- Optimized bundle
- Minified assets
- Gzip compression
- CDN integration
- Environment-specific builds

---

**Last Updated**: December 2024  
**Documentation Version**: 1.0.0  
**Maintainer**: Development Team
