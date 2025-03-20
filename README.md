# Billing Management System

## 📌 Project Overview
A full-stack billing management system that allows users to manage customers and bills efficiently. It includes a **React frontend** and a **Flask backend** with a **MySQL database**.

## 📂 Project Structure
```
Billing-Management-System/
│── client/            # Frontend (React)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── README.md
│── server/            # Backend (Flask)
│   ├── app.py
│   ├── database.py
│   ├── requirements.txt
│   ├── .env           # Environment variables (Not uploaded)
│── README.md          # Project documentation
│── .gitignore
```

## 🖥️ Setup Instructions

### 🔹 Backend Setup (Flask)
1. **Navigate to the server folder:**
   ```bash

   cd server
   ```
2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Set up the database:**
   - Create a MySQL database named `billing_db`
   - Update `.env` with database credentials
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=billing_db
   ```
5. **Run the Flask server:**
   ```bash
   python app.py
   ```

### 🔹 Frontend Setup (React)
1. **Navigate to the client folder:**
   ```bash
   cd client
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the React app:**
   ```bash
   npm start
   ```

---

## 🔗 API Endpoints (Backend)
| Method | Endpoint            | Description |
|--------|---------------------|-------------|
| GET    | `/api/customers`    | Get all customers |
| POST   | `/api/customers`    | Add a new customer |
| GET    | `/api/bills`        | Get all bills |
| POST   | `/api/bills`        | Create a new bill |
| PUT    | `/api/bills/:id`    | Update a bill |
| DELETE | `/api/bills/:id`    | Delete a bill |

---

## 🛠 Tech Stack
- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** Flask, Python
- **Database:** MySQL
- **Styling:** Tailwind CSS / Bootstrap
- **Version Control:** Git & GitHub

---

## 🚀 Features
✅ Add, update, and delete customers & bills  
✅ Responsive UI for ease of access  
✅ Secure MySQL database integration  
✅ RESTful API for data handling  
✅ CRUD operations for bills and customers  

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

