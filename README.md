
# Horizon Homes 🏡

Horizon Homes is a full-stack Real Estate Listing Web Application built with React.js and Flask. It allows property owners to list their properties, and consumers to explore, filter, and inquire about homes. The system includes user authentication, role-based dashboards, email integration, and interactive features.

---

## 🌐 Live Demo

Coming soon...

---

## 📌 Features

### 🧑‍💼 User Roles
- **Owner**: Can create, edit, and delete property listings.
- **Consumer**: Can browse listings and send inquiries.

### 🏠 Property Management
- Add/Edit/Delete properties (title, image, price, bedrooms, size, location, etc.)
- View property details with image, features, and contact option.

### 📬 Contact System
- Contact property owners via **EmailJS**.
- Auto-prefilled email form with property name, location, and user's info.

### 🔐 Authentication
- Signup/Login with role selection.
- Session management using Flask session and `check_session` route.

### 🎨 UI/UX
- Fully responsive design using **Bootstrap**.
- Light/Dark mode toggle.
- Animation with **Animate.css**.
- Search and filter properties by location, type, and budget.

---

## 🛠 Tech Stack

| Frontend | Backend | Database | Tools |
|----------|---------|----------|-------|
| React    | Flask   | SQLite   |  EmailJS, SweetAlert2, Toast |

---

## 📁 Project Structure
```
Horizon-Homes/
├── client/ # React Frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ └── App.jsx
│ └── public/
├── server/ # Flask Backend
│ ├── models/
│ ├── routes/
│ ├── config.py
│ └── app.py
└── README.md

```

---

## 🧪 API Endpoints (Flask)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/signup` | POST | Register a user |
| `/login` | POST | Log in |
| `/logout` | DELETE | Log out |
| `/check_session` | GET | Check current user session |
| `/properties` | GET/POST | List all or add new property |
| `/properties/<id>` | GET/DELETE | Retrieve or delete a property |
| `/users/<user_id>/properties` | GET | Get properties by owner |

---

