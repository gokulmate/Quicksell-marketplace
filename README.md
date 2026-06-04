# 🛒 QuickCell Marketplace (MVC Architecture)

QuickCell Marketplace is a backend application built using **Node.js**, **Express.js**, and **MongoDB** following the **MVC architecture pattern**. It includes authentication, product management, category system, and nested sub-routes for scalable e-commerce APIs.

---

## 🚀 Features

* MVC Architecture (Model - View - Controller)
* User Authentication (Register/Login)
* Product CRUD Operations
* Category Management
* Sub-category / Nested Routes (Category → Products)
* Middleware System (Auth, Logger, Error handling)
* RESTful API Design
* Scalable folder structure

---

## 🏗️ Project Structure

```
quickcell-marketplace/
│
├── src/
│   ├── config/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Category.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── categoryController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── index.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── loggerMiddleware.js
│   │
│   └── app.js
│
├── server.js
├── package.json
└── .env
```

---

## 🔗 API Endpoints

### Auth Routes

* POST `/api/auth/register` → Register user
* POST `/api/auth/login` → Login user

---

### Product Routes

* GET `/api/products` → Get all products
* GET `/api/products/:id` → Get product by ID
* POST `/api/products` → Create product
* PUT `/api/products/:id` → Update product
* DELETE `/api/products/:id` → Delete product

---

### Category Routes

* GET `/api/categories` → Get all categories
* GET `/api/categories/:id` → Get category by ID
* POST `/api/categories` → Create category

#### 🔥 Sub-route (Important)

* GET `/api/categories/:id/products` → Get all products under a category

---

## 🧠 Architecture Flow

```
Client (Postman / Frontend)
        ↓
Routes Layer
        ↓
Controller Layer
        ↓
Model Layer
        ↓
MongoDB Database
```

---

## 🛡️ Middleware

* Authentication Middleware (JWT / Token check)
* Error Handling Middleware
* Logger Middleware

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

---

## 📦 Installation

```bash
git clone <repo-url>
cd quickcell-marketplace
npm install
```

---

## ▶️ Run Project

```bash
npm start
```

or

```bash
nodemon server.js
```

Server runs on:

```
http://localhost:5000
```

---

## 🎯 Learning Outcomes

* MVC Architecture understanding
* REST API development
* Authentication flow
* Middleware usage
* Scalable backend design

---

## 🚀 Future Improvements

* Cart & Checkout system
* Payment gateway integration
* Admin dashboard
* Role-based authentication
* Frontend (React) integration

---

## 👨‍💻 Author

Built as part of a full-stack development learning journey using Express.js and MongoDB.
