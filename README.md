
# Horizon Homes 🏡

Horizon Homes is a full-stack Real Estate Listing Web Application built with React.js and Flask. It allows property owners to list their properties, and consumers to explore, filter, and inquire about homes. The system includes user authentication, role-based dashboards, email integration, and interactive features.

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
```
|------------|------------------------------------------------------------------------------|
| Frontend   | React, Vite, Bootstrap, Font Awesome, React Router DOM, SweetAlert2         |
| Backend    | Flask, Flask-Restful, SQLAlchemy, Flask-CORS, bcrypt           |
| Database   | SQLite (development)                        |
| Dev Tools  | Postman (API Testing), Git & GitHub                    |
```

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

## API Endpoints (Flask)

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


## ⚙️ Setup Instructions

### Clone the repo:
   ```bash 
   git clone https://github.com/Larr-y1/Horizon-Homes.git
   cd Horizon-Homes
   ```
 ## Backend(Flask)

### 1.Create and activate virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate    # macOS/Linux
venv\Scripts\activate    # Windows
```

### 2.Install dependencies using Pipenv (recommended):
```bash
pip install pipenv
pipenv install
```

### 3.Set environment variables
```bash
export FLASK_APP=app.py
export FLASK_ENV=development
```

### 4.Run migratios and seed the database
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
python seed.py
```

### 5.Start the server
```bash
cd server
flask run
```

## Frontend(React)
```bash
cd client
npm install
```
---

## 👨‍💻 Team Members
This project was collaboratively built by:

- Joshua Gichuhi– Njugunaa
- Lewis Dickson – @lewisdicksonn@gmail.com
- Brendah Edward – @b-edward28
- Michael Ouma - @OumaMichael
- Jeannette Derek – @Gnett
- Larry  – @Larr-y1

---

# 📄 License
This project is licensed under the MIT License.

---

# 🙌 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to open an issue or submit a pull request.

---



