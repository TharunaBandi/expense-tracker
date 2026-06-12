# 💸 Expense Tracker

A full-stack web application to track personal expenses with secure user authentication, built with **React**, **Spring Boot**, and **MySQL**.

> 🖥️ Runs locally — see setup instructions below.

---

## 📸 Screenshots

> _Add screenshots of your login page, dashboard, and expense list here._

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure register/login with token-based auth; each user sees only their own data
- ➕ **Add Expenses** — Log expenses with amount, category, date, and description
- ✏️ **Inline Edit** — Edit any expense directly in the list without page reload
- 🗑️ **Delete Expense** — Remove individual expense entries
- 📅 **Filter by Month/Year** — View expenses for a specific time period
- 💰 **Total Calculation** — Auto-calculates total expenses shown at the bottom
- 👁️ **Show/Hide Password** — Toggle password visibility on login/register
- ❌ **Delete Account** — Permanently delete account and all associated data
- 📱 **Responsive UI** — Works on both desktop and mobile

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | React, JavaScript, CSS, HTML         |
| Backend    | Java, Spring Boot, REST APIs         |
| Database   | MySQL, Spring Data JPA, Hibernate    |
| Auth       | JWT (jjwt 0.11.5), Spring Security   |
| Tools      | Maven, Git, GitHub, Postman          |

---

## 🏗️ Project Architecture

```
expense-tracker/
├── src/                        # Spring Boot Backend
│   └── main/java/
│       ├── controller/         # REST API Controllers
│       ├── service/            # Business Logic
│       ├── repository/         # Spring Data JPA Repositories
│       └── model/              # Entity Classes (User, Expense)
└── expense-tracker-frontend/   # React Frontend
    └── src/
        ├── components/         # React Components
        └── App.js
```

---

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8+
- Maven

### 1. Clone the Repository

```bash
git clone https://github.com/TharunaBandi/expense-tracker.git
cd expense-tracker
```

### 2. Set Up the Database

Open MySQL and run:

```sql
CREATE DATABASE expense_tracker;
```

### 3. Configure Backend

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update
jwt.secret=your_jwt_secret_key
```

### 4. Run the Backend

```bash
./mvnw spring-boot:run
```

Backend starts at `http://localhost:8080`

### 5. Run the Frontend

```bash
cd expense-tracker-frontend
npm install
npm start
```

Frontend starts at `http://localhost:3000`

---

## 🔌 API Endpoints

| Method | Endpoint                  | Description              | Auth Required |
|--------|---------------------------|--------------------------|---------------|
| POST   | `/api/auth/register`      | Register a new user      | No            |
| POST   | `/api/auth/login`         | Login and receive JWT    | No            |
| GET    | `/api/expenses`           | Get all user expenses    | Yes           |
| POST   | `/api/expenses`           | Add a new expense        | Yes           |
| PUT    | `/api/expenses/{id}`      | Update an expense        | Yes           |
| DELETE | `/api/expenses/{id}`      | Delete an expense        | Yes           |
| DELETE | `/api/auth/delete-account`| Delete user account      | Yes           |

---

## 👩‍💻 Author

**Bandi Tharuna Sri**
- GitHub: [@TharunaBandi](https://github.com/TharunaBandi)
- Email: banditharuna@gmail.com
