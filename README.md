# TicketGo - Event Booking System

TicketGo is a modern web application for managing event tickets, built with React, Node.js, and MongoDB.

## Features

- 🎫 Event ticket management
- 🔐 User authentication and authorization
- 👤 User and admin roles
- 📱 Responsive design
- 🎨 Modern UI with Material Tailwind
- 🔄 Real-time updates with React Query

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/MosabXR/ATC_01004401437
cd ATC_01004401437
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create a config.env file in the server directory
touch config.env
```

Add the following to your `config.env` file:

```env
PORT=8000
MONGODB_URI=mongodb+srv://mosabelkalyouby:<PASSWORD>@booking-app.doogid4.mongodb.net/booking
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=90d
```

### 3. Frontend Setup

```bash
cd ../client

# Install dependencies
npm install

```

### 4. Start the Development Servers

#### Start the Backend Server

```bash
cd ../server
npm run dev
```

#### Start the Frontend Server

```bash
cd ../client
npm run dev
```

The application should now be running at:

- Frontend: http://localhost:5173
- Backend: http://localhost:8000

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. Protected routes are implemented using the `ProtectedRoute` component.

### User Roles

- **User**: Can view and purchase tickets
- **Admin**: Can manage events and view all tickets

## API Endpoints

### Authentication

- `POST /api/v1/users/signup` - Register a new user
- `POST /api/v1/users/signin` - Login user

### Events

- `GET /api/v1/events` - Get all events
- `POST /api/v1/events` - Create new event (Admin only)
- `GET /api/v1/events/:id` - Get event details
- `PUT /api/v1/events/:id` - Update event (Admin only)
- `DELETE /api/v1/events/:id` - Delete event (Admin only)

### Tickets

- `GET /api/v1/tickets` - Get user's tickets
- `POST /api/v1/tickets` - Purchase ticket
- `GET /api/v1/tickets/:id` - Get ticket details

## Technologies Used

### Frontend

- React
- React Router
- Material Tailwind
- React Query
- Axios
- React Hot Toast

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Bcrypt
