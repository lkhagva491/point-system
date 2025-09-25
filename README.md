# Point System

A comprehensive point management system built with NestJS backend and Next.js frontends.

## Features

- **User Management**: Register, login, and profile management
- **Admin Dashboard**: Complete admin panel for managing users, admins, transactions, and rewards
- **Point System**: Earn and redeem points for rewards
- **Transaction Management**: Deposit and withdrawal requests with admin approval
- **Rewards System**: Create and manage rewards for point redemption
- **Internationalization**: Support for English and Mongolian languages
- **Toast Notifications**: Modern notification system
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Backend
- **NestJS**: Node.js framework
- **MongoDB**: Database with Mongoose ODM
- **JWT**: Authentication
- **Swagger**: API documentation
- **bcrypt**: Password hashing

### Frontend
- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Heroicons**: Icons
- **Axios**: HTTP client

## Project Structure

```
point-system/
├── apps/
│   ├── backend/          # NestJS API server
│   ├── admin/            # Admin dashboard (Next.js)
│   └── user/             # User application (Next.js)
├── packages/
│   └── shared/           # Shared types and DTOs
└── package.json          # Root package.json
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lkhagva491/point-system.git
cd point-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy .env.example to .env in apps/backend/
cp apps/backend/.env.example apps/backend/.env
```

4. Update the `.env` file with your MongoDB Atlas connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/point?retryWrites=true&w=majority
JWT_SECRET=your-jwt-secret
```

5. Build the project:
```bash
npm run build
```

6. Start the development servers:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start all applications in development mode
- `npm run build` - Build all applications for production
- `npm run dev:backend` - Start only the backend server
- `npm run dev:admin` - Start only the admin dashboard
- `npm run dev:user` - Start only the user application

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Admins
- `GET /admins` - Get all admins
- `POST /admins` - Create new admin
- `PATCH /admins/:id` - Update admin
- `DELETE /admins/:id` - Delete admin

### Points
- `GET /points/user/:userId` - Get user points
- `POST /points/transaction-request` - Request transaction

### Transactions
- `GET /transactions` - Get all transactions
- `PATCH /transactions/:id/status` - Update transaction status

### Rewards
- `GET /rewards` - Get all rewards
- `POST /rewards` - Create reward
- `POST /rewards/redeem` - Redeem reward

## API Documentation

Once the backend is running, visit `http://localhost:3001/api/docs` for interactive API documentation.

## Applications

- **Backend**: http://localhost:3001
- **Admin Dashboard**: http://localhost:3002
- **User Application**: http://localhost:3004

## Features Overview

### User Features
- Register and login
- View point balance and transaction history
- Request deposits and withdrawals
- Redeem rewards
- Edit profile
- Language switching (English/Mongolian)

### Admin Features
- Manage users and admins
- Approve/decline transactions
- Create and manage rewards
- View system statistics
- Language switching (English/Mongolian)

## Deployment

### Frontend (Vercel)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
# Deploy user app
cd apps/user
vercel

# Deploy admin app
cd apps/admin
vercel
```

4. **Environment Variables (Vercel Dashboard):**
```
NEXT_PUBLIC_API_URL=https://point-system-backend.onrender.com
NEXT_PUBLIC_APP_NAME=Point System
```

### Backend (Render - Free Alternative)

1. **Create Render Account:**
```bash
# Visit https://render.com
# Sign up with GitHub
```

2. **Create New Web Service:**
```bash
# Connect your GitHub repository
# Select "Web Service"
# Choose your repository
```

3. **Configure Build Settings:**
```bash
# Build Command: chmod +x build.sh && ./build.sh
# Start Command: npm start
# Environment: Node
# Root Directory: (leave empty)
```

4. **Set Environment Variables:**
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/point
JWT_SECRET=your-jwt-secret
NODE_ENV=production
```

5. **Deploy:**
```bash
# Automatic deployment from GitHub
# Push to main branch triggers deployment
```

### Production URLs

- **Backend API**: https://point-system-backend.onrender.com
- **Admin Dashboard**: https://point-system-admin.vercel.app
- **User Application**: https://point-system-user.vercel.app

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Push to the branch
6. Create a Pull Request

## License

This project is licensed under the MIT License.