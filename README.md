# Sweet Shop Management System
# 🍭 Sweet Shop Management System

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-blue?logo=react" />
  <img src="https://img.shields.io/badge/Node.js-18.0+-green?logo=node.js" />
  <img src="https://img.shields.io/badge/Express-5.0-black?logo=express" />
  <img src="https://img.shields.io/badge/Material--UI-5.0-blueviolet?logo=mui" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" />
</div>

<br />

## ✨ Features

- **Complete Inventory Management**
- **Real-time Search & Filter**
- **Purchase/Restock Tracking**
- **Responsive Material-UI Design**
- **TDD Implemented Backend**

## 🚀 Quick Start

### Prerequisites
- Node.js ≥18
- npm ≥8

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/sweet-shop.git
cd sweet-shop

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

# Backend .env
echo "PORT=3000" > backend/.env

# Frontend .env
echo "VITE_API_BASE_URL=http://localhost:3000/api" > frontend/.env

#Running the App
bash
# Start backend
cd backend && npm run dev

# Start frontend (in new terminal)
cd frontend && npm run dev

# Tech Stack
Frontend	         Backend
React 18	        Node.js 18
Vite 4	          Express 5
Material-UI 5	    CORS middleware
React Router 6	  Vitest (Testing)
Axios	


#API Documentation
http
GET /api/sweets
POST /api/sweets
GET /api/sweets/search?name=&category=
PUT /api/sweets/:id
DELETE /api/sweets/:id
POST /api/sweets/:id/purchase
POST /api/sweets/:id/restock

<div align="center"> Made with ❤️ and 🍬 by Urvih </div>
