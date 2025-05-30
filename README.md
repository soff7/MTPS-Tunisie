# MTPS-Tunisie

## Project Description
MTPS-Tunisie is a full-stack web application featuring a React frontend and an Express.js backend. The backend provides RESTful API endpoints for authentication, product management, contact management, and statistics. The frontend is a modern React application using Material-UI, Tailwind CSS, and various charting libraries to provide a rich user interface. Real-time communication is enabled via Socket.io.

## Technologies Used
- Frontend:
  - React
  - Material-UI (MUI)
  - Tailwind CSS
  - React Router
  - Chart.js, Recharts, MUI X Charts
  - Socket.io-client
  - OAuth with Google
- Backend:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - Passport.js (including Google OAuth)
  - JWT for authentication
  - Socket.io for real-time communication
  - Helmet, CORS for security and cross-origin support
  - Celebrate for request validation
  - Bcrypt for password hashing
  - dotenv for environment variables

## Folder Structure Overview
```
/client          # React frontend application
  /public       # Static assets and HTML template
  /src          # React source code (components, pages, hooks, styles, utils)
    /components/admin  # Admin dashboard components (header, sidebar, analytics, stats, recent activity)
    /pages/admin       # Admin dashboard pages (dashboard, analytics, contacts management, products management, settings, users management)
  package.json  # Frontend dependencies and scripts

/server          # Express backend application
  /config       # Configuration files (database, passport, keys)
  /controllers  # Route controllers for auth, products, contacts, stats
  /middleware   # Express middleware (auth, error handling)
  /models       # Mongoose models (User, Product, Contact)
  /routes       # API route definitions
  /utils        # Utility functions (API helpers, JWT, socket)
  package.json  # Backend dependencies and scripts
  server.js     # Main server entry point
```
## Folder Structure Overview

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

## Environment Variables
- `MONGO_URI` - MongoDB connection string
- `PORT` - Backend server port (default 5000)
- `NODE_ENV` - Environment mode (development or production)

## Contributing
Contributions are welcome! Please fork the repository and submit pull requests for any improvements or bug fixes.

## License
This project is licensed under the ISC License.
