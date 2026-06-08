# Expense Tracker

A full-stack Expense Tracker web application built using React, Spring Boot, and MySQL. The application allows users to register, login, and manage personal expenses securely. Each user can access and manage only their own expenses through JWT-based authentication and user-specific data management.

---

# Tech Stack

## Frontend

* React
* JavaScript
* HTML
* CSS

## Backend

* Java
* Spring Boot
* REST APIs
* JWT Authentication

## Database

* MySQL
* Spring Data JPA
* Hibernate

## Tools

* Maven
* Git
* GitHub
* Postman

---

# Features

## Authentication & Security

* User Registration
* User Login
* JWT-Based Authentication
* Protected API Endpoints
* Logout Functionality
* Delete Account Feature
* Password Show/Hide Toggle

## Expense Management

* Add Expense
* View Expenses
* Edit Expenses
* Delete Expenses
* User-Specific Expense Tracking

## Expense Analysis

* Filter Expenses by Month
* Filter Expenses by Year
* Monthly Expense Calculation

## User Experience

* Responsive User Interface
* Inline Expense Editing
* Real-Time Updates After CRUD Operations

---

# Architecture

The application follows a layered architecture pattern:

### Controller Layer

Handles incoming HTTP requests and sends responses.

### Service Layer

Contains business logic and application processing.

### Repository Layer

Handles database operations using Spring Data JPA.

### Model Layer

Represents application entities and database tables.

### Application Flow

React Frontend

↓

REST API Requests

↓

Controller Layer

↓

Service Layer

↓

Repository Layer

↓

MySQL Database

---

# JWT Authentication Flow

1. User enters username and password.
2. Backend validates user credentials.
3. JWT token is generated upon successful login.
4. Token is returned to the frontend.
5. Frontend stores the token in localStorage.
6. Token is sent in the Authorization header for protected API requests.
7. JwtFilter validates the token before granting access to secured endpoints.

---

# API Endpoints

| Method | Endpoint                  | Description                 |
| ------ | ------------------------- | --------------------------- |
| POST   | /api/auth/register        | Register a new user         |
| POST   | /api/auth/login           | Login and receive JWT token |
| DELETE | /api/auth/delete/{userId} | Delete user account         |
| GET    | /api/expenses?userId={id} | Get all expenses            |
| POST   | /api/expenses             | Add expense                 |
| PUT    | /api/expenses/{id}        | Update expense              |
| DELETE | /api/expenses/{id}        | Delete expense              |

---

# Project Structure

expense-tracker

├── expense-tracker-frontend

│   ├── src

│   │   ├── App.js

│   │   ├── App.css

│   │   └── components

│   │       ├── Login.js

│   │       ├── Register.js

│   │       └── Dashboard.js

│

└── src/main/java/com/expensetracker

```
├── controller

├── service

├── repository

├── model

└── config
```

---

# How to Run

## Clone Repository

```bash
git clone https://github.com/TharunaBandi/expense-tracker.git
cd expense-tracker
```

## Backend Setup

```bash
mvn clean spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

## Frontend Setup

```bash
cd expense-tracker-frontend
npm install
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

# Prerequisites

* Java 21+
* MySQL
* Maven
* Node.js and npm

---

# Database Setup

Create a database:

```sql
CREATE DATABASE expense_db;
```

Update:

```text
src/main/resources/application.properties
```

with your MySQL credentials.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/expense_db
spring.datasource.username=root
spring.datasource.password=your_password
```

---

# Key Concepts Demonstrated

* Full-Stack Development
* REST API Development
* JWT Authentication
* CRUD Operations
* Spring Boot Layered Architecture
* Spring Data JPA
* Database Integration
* React State Management
* Client-Server Architecture
* Git Version Control

---

# Screenshots

Register → Login → Dashboard → Add Expense → Filter Expenses → Edit Expense → Delete Expense

---

# Author

Bandi Tharuna Sri

GitHub:
https://github.com/TharunaBandi
