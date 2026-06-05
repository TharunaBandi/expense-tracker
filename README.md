# Expense Tracker

A full-stack Expense Tracker web application where users can register, login, and manage their personal expenses. Each user has their own separate data.

## Tech Stack

- **Frontend:** React, JavaScript, HTML, CSS
- **Backend:** Java, Spring Boot, REST API
- **Database:** MySQL
- **Tools:** Maven, Git, GitHub, Postman

## Features

- User Registration and Login with password show/hide
- Each user sees only their own expenses (data separation)
- Add expenses with title, category, amount and date
- Edit expenses inline
- Delete individual expenses
- Filter expenses by month and year
- Total expense calculation after filtering
- Delete account (removes all user data permanently)
- Responsive UI

## Architecture

Follows layered architecture pattern:
- **Controller** — handles HTTP requests
- **Service** — contains business logic
- **Repository** — database operations
- **Model** — data structure

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| DELETE | /api/auth/delete/{userId} | Delete account |
| GET | /api/expenses?userId={id} | Get all expenses |
| POST | /api/expenses | Add expense |
| PUT | /api/expenses/{id} | Edit expense |
| DELETE | /api/expenses/{id} | Delete expense |

## How to Run

### Backend
```bash
cd expense-tracker
mvn clean spring-boot:run
```

### Frontend
```bash
cd expense-tracker-frontend
npm install
npm start
```

### Prerequisites
- Java 21+
- Node.js
- MySQL (create database `expense_db`)

### Database Setup
```sql
CREATE DATABASE expense_db;
```

Update `src/main/resources/application.properties` with your MySQL credentials.

## Screenshots

> Register → Login → Dashboard with expenses → Filter by month
