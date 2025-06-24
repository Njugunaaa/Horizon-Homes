# Property Listings Application

A full-stack property listings application with Flask backend and Next.js frontend.

## Features

- **User Authentication**: Sign up, login, logout with role-based access (Property Owner/Property Seeker)
- **Property Listings**: View, create, edit, and delete property listings
- **Search & Filter**: Search properties by title, location, or type
- **Bookmarks**: Save favorite properties for later viewing
- **Features Management**: Add amenities and features to properties
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Backend (Flask)
- Flask with Flask-RESTful for API endpoints
- SQLAlchemy for database ORM
- Flask-Bcrypt for password hashing
- Flask-CORS for cross-origin requests
- SQLite database

### Frontend (Next.js)
- Next.js 14 with TypeScript
- Tailwind CSS for styling
- shadcn/ui components
- Context API for state management

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
\`\`\`bash
cd server
\`\`\`

2. Create a virtual environment:
\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
\`\`\`

3. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. Initialize the database:
\`\`\`bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
\`\`\`

5. Seed the database with sample data:
\`\`\`bash
python seed.py
\`\`\`

6. Run the Flask server:
\`\`\`bash
python app.py
\`\`\`

The backend will be available at `http://localhost:5555`

### Frontend Setup

1. Navigate to the frontend directory:
\`\`\`bash
cd frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /signup` - Register a new user
- `POST /login` - Login user
- `GET /check_session` - Check if user is logged in
- `DELETE /logout` - Logout user

### Property Listings
- `GET /listings` - Get all listings
- `POST /listings` - Create new listing (owners only)
- `GET /listings/<id>` - Get specific listing
- `PATCH /listings/<id>` - Update listing (owner only)
- `DELETE /listings/<id>` - Delete listing (owner only)

### Features
- `POST /listings/<listing_id>/features` - Add feature to listing

### Bookmarks
- `GET /bookmarks` - Get user's bookmarks
- `POST /bookmarks` - Bookmark a listing
- `DELETE /bookmarks/<id>` - Remove bookmark

## Sample Users

The seed script creates these test users:

- **Property Owner**: owner@example.com / password123
- **Property Seeker**: user@example.com / userpass456
- **Property Agent**: agent@example.com / agentpass789
- **Viewer**: viewer@example.com / viewpass321



## Usage

1. Start both the backend and frontend servers
2. Visit `http://localhost:3000` to access the application
3. Sign up as either a Property Owner or Property Seeker
4. Property Owners can add, edit, and delete listings
5. All users can view listings, search, and bookmark properties
6. Use the bookmarks page to view saved properties

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
