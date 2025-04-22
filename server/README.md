# Backend - User Authentication System

This is the backend part of the User Authentication System, built with Node.js, Express, TypeScript, and Prisma.

## Technologies Used

- Node.js with Express
- TypeScript for type safety
- Prisma ORM for database management
- SQLite as the database (for simplicity)
- Bcrypt for password hashing
- Zod for request validation

## Project Structure

- `/src/controllers` - Business logic for endpoints
- `/src/routes` - API route definitions
- `/src/middleware` - Express middleware
- `/src/utils` - Utility functions and classes
- `/prisma` - Prisma schema and migrations

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

2. Create a `.env` file in the root directory with the following content:
   \`\`\`
   DATABASE_URL="file:./dev.db"
   \`\`\`

3. Generate Prisma client and run migrations:
   \`\`\`
   npm run prisma:generate
   npm run prisma:migrate
   \`\`\`

4. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`

## Available Scripts

- `npm run dev` - Start the development server with hot-reloading
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio to view and edit data

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
  - Request body: `{ email: string, password: string }`
  - Response: `{ success: boolean, user?: { email: string } }`

- `POST /api/auth/register` - User registration
  - Request body: `{ email: string, password: string }`
  - Response: `{ success: boolean, user?: { email: string } }`

## Database Schema

The database schema is defined in `prisma/schema.prisma` and includes:

### User Model
- `id` - Unique identifier (UUID)
- `email` - User's email (unique)
- `password` - Hashed password
- `createdAt` - Timestamp of user creation
- `updatedAt` - Timestamp of last update

## Error Handling

The application implements robust error handling with:
- Custom error classes
- Error middleware for consistent error responses
- Validation using Zod
