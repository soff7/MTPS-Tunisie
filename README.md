# MTPS-Tunisie

## Project Description
MTPS-Tunisie is a full-stack web application featuring a React frontend and an Express.js backend. The backend provides RESTful API endpoints for authentication, product management, contact management, statistics, and an admin dashboard with various management modules. The frontend is a modern React application using Material-UI, Tailwind CSS, and various charting libraries to provide a rich user interface. Real-time communication is enabled via Socket.io.

## Technologies Used
- Frontend:
  - React 18
  - Material-UI (MUI)
  - Tailwind CSS
  - React Router
  - Chart.js, Recharts, MUI X Charts
  - Socket.io-client
  - Axios
  - Styled-components
- Backend:
  - Node.js
  - Express.js 5
  - MongoDB with Mongoose
  - Passport for authentication (including Google OAuth)
  - JWT for authentication tokens
  - Socket.io for real-time communication
  - Helmet, CORS for security and cross-origin support
  - Celebrate for request validation
  - Bcrypt for password hashing
  - Multer for file uploads
  - dotenv for environment variables

## Folder Structure Overview

```
/client
  /public
    # Static assets like images, favicon, manifest, and the main HTML template (index.html).
  /src
    # Main React source code directory.
    /components
      # Reusable UI components for the application.
      /admin
        # Components specific to the admin dashboard such as header, sidebar, analytics, stats cards, and recent activity.
      /auth
        # Authentication related components like AdminRoute, AuthProvider, and ProtectedRoute.
    /pages
      # React pages representing different routes/views.
      /admin
        # Admin dashboard pages including dashboard, analytics, contacts management, products management, settings, and users management.
      /auth
        # Authentication pages like SignIn and SignUp.
    /contexts
      # React context providers, e.g., for translation management.
    /styles
      # CSS files for styling components and pages, including admin-specific styles.
    /constants
      # Constant values such as colors and themes used throughout the app.
    /services
      # Service modules for API interactions, e.g., contactService.js.
    /shared-theme
      # Shared theme configuration and utilities for consistent styling.
    /utils
      # Utility functions such as API helpers and translation utilities.
    App.js
      # Main React component that sets up routing and layout.
    index.js
      # Entry point for React application, rendering App component.
    reportWebVitals.js
      # Performance measuring utilities.
    setupTests.js
      # Test setup configuration.

  package.json
    # Frontend dependencies and scripts.

  .gitignore
    # Git ignore rules for client-side files.

  README.md
    # Frontend specific README (if any).

/server
  /config
    # Configuration files for database connection, passport strategies, keys, etc.
  /controllers
    # Route controllers handling business logic for authentication, products, contacts, and stats.
  /middleware
    # Express middleware for authentication and error handling.
  /models
    # Mongoose models defining schemas for User, Product, Contact, and Admin.
  /routes
    # API route definitions, including sub-routes for admin functionalities.
  /utils
    # Utility modules for API helpers, JWT handling, and socket communication.
  app.js
    # Express app setup and middleware registration.
  server.js
    # Main server entry point to start the backend server.
  package.json
    # Backend dependencies and scripts.

.gitignore
  # Git ignore rules for the root project.

package.json
  # Root project dependencies and scripts (if any).

README.md
  # This general project README file.
```

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=development
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```
   The React app will run on `http://localhost:3000` and proxy API requests to the backend.

## Running the Project
- Start backend server first (`npm start` in `/server`)
- Start frontend server (`npm start` in `/client`)
- Open your browser at `http://localhost:3000` to use the application.

## API Endpoints Overview
- `GET /api/test` - Test API endpoint
- `POST /api/auth` - Authentication routes (login, signup, Google OAuth)
- `GET/POST/PUT/DELETE /api/products` - Product management
- `GET/POST /api/contacts` - Contact management
- `GET /api/stats` - Statistics and analytics
- `GET/POST/PUT/DELETE /api/admin/users` - Admin user management

## Environment Variables
- `MONGO_URI` - MongoDB connection string
- `PORT` - Backend server port (default 5000)
- `NODE_ENV` - Environment mode (development or production)

## Contributing
Contributions are welcome! Please fork the repository and submit pull requests for any improvements or bug fixes.

## License
This project is licensed under the ISC License.
  # This general project README file.
 