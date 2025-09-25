# Point System Monorepo

A modern full-stack web application built with NestJS, NextJS, and MongoDB.

## 🚀 Features

- **Backend**: NestJS with MongoDB integration
- **Admin Panel**: NextJS admin interface
- **User Interface**: NextJS user-facing application
- **Authentication**: JWT-based authentication with role-based access
- **Database**: MongoDB Atlas (online)
- **UI**: Tailwind CSS with responsive design
- **TypeScript**: Full TypeScript support across all applications
- **Monorepo**: Workspace-based monorepo structure
- **Internationalization**: Multi-language support (English/Mongolian)
- **Shared Components**: Reusable UI component library

## 📁 Project Structure

```
├── apps/
│   ├── backend/          # NestJS API server
│   ├── admin/            # NextJS admin panel
│   └── user/             # NextJS user interface
├── packages/
│   ├── shared/           # Shared utilities and types
│   └── ui/               # Shared UI components
└── package.json          # Root package.json with workspace config
```

## 🛠️ Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **Swagger** - API documentation
- **TypeScript** - Type-safe JavaScript
- **bcryptjs** - Password hashing

### Frontend
- **NextJS** - React framework for production
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Data fetching and caching
- **TypeScript** - Type-safe JavaScript
- **i18next** - Internationalization
- **Heroicons** - Icon library

### Development
- **Monorepo** - Workspace-based project structure
- **Concurrently** - Run multiple commands simultaneously
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB Atlas account

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/lkhagva491/point-system.git
   cd point-system
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Copy environment files
   cp apps/backend/env.example apps/backend/.env
   ```

3. **Configure MongoDB:**
   - Create a MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Update `apps/backend/.env` with your MongoDB URI

4. **Start development servers:**
   ```bash
   npm run dev
   ```

This will start all three applications:
- **Backend API**: http://localhost:3001
- **Admin Web**: http://localhost:3002
- **User Web**: http://localhost:3004

## 📚 API Documentation

Once the backend is running, access the Swagger API documentation at:
**http://localhost:3001/api/docs**

## 🔐 Authentication

The application uses JWT-based authentication with role-based access control:

- **Admin Role**: Full access to admin panel and user management
- **User Role**: Access to user dashboard and basic features

### Creating an Admin User

```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Admin",
    "lastName": "User",
    "username": "admin",
    "email": "admin@example.com",
    "password": "password123",
    "role": "admin"
  }'
```

## 🎯 Available Scripts

### Root Level
- `npm run dev` - Start all applications in development mode
- `npm run build` - Build all applications
- `npm run start` - Start backend in production mode
- `npm run start:admin` - Start admin app in production mode
- `npm run start:user` - Start user app in production mode
- `npm run lint` - Lint all applications
- `npm run test` - Run tests for all applications

### Individual Applications
- `npm run dev:backend` - Start only backend
- `npm run dev:admin` - Start only admin web
- `npm run dev:user` - Start only user web
- `npm run build:backend` - Build only backend
- `npm run build:admin` - Build only admin web
- `npm run build:user` - Build only user web

## 🌐 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/point-db
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3002,http://localhost:3004
```

### Frontend (Environment Variables)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Point System
```

## 🏗️ Development

### Adding New Features

1. **Backend**: Add new modules in `apps/backend/src/`
2. **Frontend**: Add new pages/components in respective apps
3. **Shared**: Add shared utilities in `packages/shared/`
4. **UI**: Add shared components in `packages/ui/`

### Code Style

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use meaningful commit messages
- Write tests for new features

## 🚀 Deployment

### Backend (Render)
- Deploy to Render.com
- Set production environment variables
- Ensure MongoDB Atlas is accessible
- Build Command: `npm install && npm run build`
- Start Command: `npm start`

### Environment Variables (Production)
```env
NEXT_PUBLIC_API_URL=https://point-system-1oqw.onrender.com
NEXT_PUBLIC_APP_NAME=Point System
```

## 🌍 Internationalization

The application supports multiple languages:
- **English** (default)
- **Mongolian** (Монгол)

Language switching is available in both admin and user interfaces.

## 🎨 UI Components

Shared UI components are available in `packages/ui/`:
- **Button** - Customizable button component
- **Input** - Form input component
- **Card** - Content card component
- **Modal** - Modal dialog component
- **Badge** - Status badge component
- **LoadingSpinner** - Loading indicator

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the API documentation at `/api/docs`
- Open an issue for bugs or feature requests