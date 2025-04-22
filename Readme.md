# 📚 Book Marketplace — Full Stack Application

A complete full stack application book marketplace where users can explore, purchase, and manage books. It features REST and GraphQL APIs, JWT-based authentication, SMS notifications, and an integrated book recommendation system. The project includes a responsive frontend, a fully containerized backend, and is deployed to Azure with CI/CD pipelines.

---

## 🚀 Features

- 🔐 JWT Authentication with Role-Based Access (Admin/User)
- 📦 RESTful APIs and GraphQL endpoint (`/graphql`)
- 🧠 Book Recommendation System (based on order history)
- 💬 SMS Notifications using Twilio
- 📚 OpenLibrary API Integration for Book Metadata
- 📈 Admin Dashboard to manage books, users, and orders
- 🧪 Unit & Integration Tests with Jest and Supertest
- 🐳 Dockerized backend with Azure Deployment
- 📘 Swagger Docs available at `/api-docs`

---

## 🧰 Tech Stack

| Category       | Technology                     |
|----------------|---------------------------------|
| Backend        | Node.js, Express.js             |
| API            | REST, GraphQL (Apollo Server)   |
| Frontend       | React (Vite)                    |
| Database       | MongoDB                         |
| External APIs  | OpenLibrary, Twilio             |
| CI/CD          | GitHub Actions                  |
| Deployment     | Azure App Service + Static Web Apps |
| Docs           | Swagger (OpenAPI 3.0)           |

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Dasaradh09/gildedpage.git
cd book-marketplace
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory

Start the backend server:

```bash
npm start
```

Swagger Docs will be available at:

```
http://localhost:5001/api-docs
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory

Start the frontend development server:

```bash
npm run dev
```

Visit the app at:

```
http://localhost:5173
```

### 4. Run Tests

Inside the `backend` directory:

```bash
npm test
```

### 5. Docker (Optional)

```bash
docker build -t book-marketplace .
docker run -p 5001:5001 book-marketplace
```

---

## 📂 Folder Structure

```
📦 backend
 ┣ 📂graphql
 ┣ 📂routes
 ┣ 📂controllers
 ┣ 📂models
 ┣ 📂tests
 ┗ app.js
📦 frontend
 ┣ 📂components
 ┣ 📂pages
 ┗ main.jsx
```

---

## 💡 Future Enhancements

- Real-time order tracking with WebSockets
- Stripe payment integration 
- Email notifications (e.g., order summary)
- Machine learning-based recommendations
- Admin analytics with charts and export features


## Git Hub Links 


Backend - https://github.com/Dasaradh09/gildedpage.git
Frontend - https://github.com/Dasaradh09/book-marketplace-frontend.git
Azure Cloud Deployed - https://kind-moss-06ab0cf0f.6.azurestaticapps.net