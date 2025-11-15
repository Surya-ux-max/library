# 📚 Library Management System

A modern, full-stack Library Management System built with React.js, Flask, and MySQL. Features a responsive UI with sliding navigation, real-time dashboard, and complete CRUD operations for books, members, and transactions.

![Library Management System](https://img.shields.io/badge/React-18.2.0-blue) ![Flask](https://img.shields.io/badge/Flask-2.3.3-green) ![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based admin login
- 📖 **Book Management** - Add, edit, delete, and search books
- 👥 **Member Management** - Complete member lifecycle management
- 🔄 **Transaction System** - Issue/return books with automatic fine calculation
- 📊 **Real-time Dashboard** - Animated statistics and quick actions
- 📱 **Responsive Design** - Mobile-friendly interface with sliding sidebar
- 🎨 **Modern UI** - Bootstrap 5 with custom animations and gradients

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - Modern React with Hooks
- **React Router** - Client-side routing
- **Bootstrap 5** - Responsive UI framework
- **FontAwesome** - Icon library
- **Custom CSS** - Animations and modern styling

### Backend
- **Flask** - Python web framework
- **SQLAlchemy** - ORM for database operations
- **Flask-JWT-Extended** - JWT authentication
- **Flask-CORS** - Cross-origin resource sharing
- **PyMySQL** - MySQL database connector

### Database
- **MySQL** - Relational database
- **4 Tables** - Books, Members, Transactions, Admin
- **Sample Data** - Pre-loaded for testing

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- MySQL 8.0+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/library-management-system.git
   cd library-management-system
   ```

2. **Setup MySQL Database**
   ```sql
   CREATE DATABASE library_db;
   ```
   
   Or run the setup script:
   ```bash
   mysql -u root -p < mysql_schema.sql
   ```

3. **Backend Setup**
   ```bash
   cd backend
   
   # Create virtual environment
   python -m venv venv
   
   # Activate virtual environment
   # Windows:
   venv\Scripts\activate
   # Linux/Mac:
   source venv/bin/activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Update database credentials in .env file
   # DATABASE_URL=mysql+pymysql://root:yourpassword@localhost/library_db
   
   # Start backend server
   python app.py
   ```

4. **Frontend Setup**
   ```bash
   cd frontend
   
   # Install dependencies
   npm install
   
   # Start development server
   npm start
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - **Login**: admin / admin123

## 📁 Project Structure

```
library-management-system/
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── requirements.txt       # Python dependencies
│   ├── .env                  # Environment variables
│   └── database_setup.sql    # Database schema
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── BookList.jsx
│   │   │   ├── Login.jsx
│   │   │   └── ...
│   │   ├── App.js           # Main App component
│   │   └── index.js         # React entry point
│   ├── public/
│   │   └── index.html       # HTML template
│   └── package.json         # Node.js dependencies
├── mysql_schema.sql          # Complete database setup
└── README.md
```

## 🗄️ Database Schema

### Tables
- **books** - Store book information (title, author, category, availability)
- **members** - Store member details (name, email, phone, status)
- **transactions** - Track book issues/returns with fines
- **admin** - Store admin credentials

### Sample Data Included
- 10+ sample books across different categories
- 5+ sample members
- Admin user (admin/admin123)

## 🎯 API Endpoints

### Authentication
- `POST /api/login` - Admin login
- `GET /api/health` - Health check

### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Add new book
- `PUT /api/books/{id}` - Update book
- `DELETE /api/books/{id}` - Delete book

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Add new member
- `PUT /api/members/{id}` - Update member
- `DELETE /api/members/{id}` - Delete member

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions/issue` - Issue book
- `PUT /api/transactions/return/{id}` - Return book

### Dashboard
- `GET /api/dashboard` - Get statistics

## 🎨 UI Features

- **Sliding Sidebar Navigation** - Smooth animations with submenus
- **Animated Dashboard** - Real-time counters and progress bars
- **Responsive Tables** - Mobile-friendly data display
- **Modern Cards** - Hover effects and gradients
- **Loading States** - Professional loading indicators
- **Form Validation** - Client-side validation with error handling

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
DATABASE_URL=mysql+pymysql://root:password@localhost/library_db
JWT_SECRET_KEY=your-secret-key
FLASK_ENV=development
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
python test_app.py
```

### API Testing
```bash
python test_login.py
python test_connection.py
```

## 🚀 Deployment

### Frontend (Vercel)
1. Build the project: `npm run build`
2. Deploy to Vercel
3. Update API URL in environment variables

### Backend (Railway/Render)
1. Push to GitHub
2. Connect to Railway/Render
3. Set environment variables
4. Deploy

### Database (PlanetScale/Railway)
1. Create MySQL instance
2. Update connection string
3. Run database migrations

## 📝 Usage

1. **Login** with admin credentials
2. **Dashboard** - View system statistics
3. **Books** - Add, edit, search, and manage books
4. **Members** - Register and manage library members
5. **Issue Books** - Assign books to members
6. **Transactions** - Track and return books with fine calculation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Flask community for the lightweight backend
- Bootstrap team for the responsive UI components
- FontAwesome for the beautiful icons

---

⭐ **Star this repository if you found it helpful!**
