# myTODO

A full-stack task management application built with React.js and Node.js, featuring user authentication and a modern, responsive interface.


## 📝 DESCRIPTION

myTODO is a comprehensive task management platform designed to help users organize and track their daily activities efficiently. The application provides a seamless experience for creating, editing, completing, and deleting tasks while maintaining user data security through robust authentication mechanisms. Built with modern web technologies, myTODO offers a clean interface with real-time updates and responsive design for optimal user experience across all devices.

## 🛠 TECHNOLOGY STACK

myTODO leverages a modern full-stack architecture with the following technologies:

### FRONTEND

- **REACT.JS :**
  React.js is a powerful JavaScript library for building dynamic user interfaces. The application utilizes React's component-based architecture to create reusable UI elements and manage application state effectively, ensuring smooth user interactions and optimal rendering performance.

- **VITE :**
  Vite serves as the build tool and development server, providing lightning-fast hot module replacement (HMR) and optimized builds. This modern bundler significantly improves development workflow and application performance.

- **TAILWIND CSS :**
  Tailwind CSS is a utility-first CSS framework that enables rapid UI development with consistent design patterns. The framework provides responsive design capabilities and ensures a clean, modern aesthetic throughout the application.

- **REACT ROUTER DOM :**
  React Router Dom handles client-side routing, enabling seamless navigation between different pages and components without full page reloads, creating a smooth single-page application experience.

- **AXIOS :**
  Axios serves as the HTTP client for making API requests to the backend server. It provides interceptors, request/response transformation, and error handling capabilities for robust client-server communication.

- **REACT TOASTIFY :**
  React Toastify delivers elegant notification messages for user feedback, providing instant visual confirmation for user actions like creating, updating, or deleting tasks.

### BACKEND

- **NODE.JS :**
  Node.js powers the server-side runtime environment, enabling JavaScript execution outside the browser. It provides the foundation for building scalable backend services with excellent performance and concurrent request handling.

- **EXPRESS.JS :**
  Express.js is a minimal and flexible Node.js web application framework that simplifies API development. It handles routing, middleware implementation, and HTTP request/response management efficiently.

- **MONGODB :**
  MongoDB serves as the NoSQL database solution, providing flexible document-based data storage. Its schema-less structure allows for easy adaptation to changing data requirements while maintaining high performance and scalability.

- **MONGOOSE :**
  Mongoose is an Object Document Mapper (ODM) for MongoDB and Node.js. It provides schema validation, type casting, query building, and business logic hooks, making database operations more intuitive and secure.

- **JWT (JSON WEB TOKENS) :**
  JSON Web Tokens handle user authentication and authorization securely. JWTs enable stateless authentication, allowing users to access protected routes while maintaining session security.

- **BCRYPT :**
  Bcrypt provides secure password hashing functionality, ensuring user credentials are stored safely in the database with industry-standard encryption algorithms.

- **NODEMAILER :**
  Nodemailer facilitates email communication for features like account verification and password reset functionality, supporting various email service providers.

## 🏗 ARCHITECTURE OVERVIEW

The application follows a modern client-server architecture with clear separation of concerns:

```
Frontend (React) ←→ API Layer (Express) ←→ Database (MongoDB)
```

The frontend communicates with the backend through RESTful API endpoints, while the backend manages data persistence and business logic.

## 🚀 API ENDPOINTS

### AUTHENTICATION

| ENDPOINT              | METHOD | API PATH                           | DESCRIPTION |
|-----------------------|--------|------------------------------------|-------------|
| USER REGISTRATION     | POST   | `/api/auth/register`               | Create new user account |
| USER LOGIN            | POST   | `/api/auth/login`                  | Authenticate user |
| EMAIL VERIFICATION    | POST   | `/api/auth/verify-email`           | Verify user email |
| RESET PASSWORD        | POST   | `/api/auth/reset-password`         | Reset user password |
| LOGOUT                | POST   | `/api/auth/logout`                 | End user session |

### TODO MANAGEMENT

| ENDPOINT              | METHOD | API PATH                           | DESCRIPTION |
|-----------------------|--------|------------------------------------|-------------|
| GET ALL TODOS         | GET    | `/api/todos`                       | Fetch user's todos |
| CREATE TODO           | POST   | `/api/todos/create`                | Create new todo |
| UPDATE TODO           | PUT    | `/api/todos/:id`                   | Update existing todo |
| DELETE TODO           | DELETE | `/api/todos/:id`                   | Delete todo |
| TOGGLE COMPLETE       | PUT    | `/api/todos/:id`                   | Toggle completion status |

## 📊 DATABASE SCHEMA

### USER MODEL

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  verifyOtp: String,
  verifyOtpExpireAt: Number,
  isAccountVerified: Boolean (default: false),
  resetOtp: String,
  resetOtpExpireAt: Number
}
```

### TODO MODEL

```javascript
{
  userId: ObjectId (ref: User, required),
  title: String (required, min: 3 characters),
  description: String (optional),
  completed: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## ✨ CORE FEATURES

The myTODO application provides comprehensive task management functionality:

### USER AUTHENTICATION & SECURITY
- **Secure Registration & Login:** Users can create accounts and authenticate using email and password
- **Email Verification:** Account verification through OTP-based email confirmation
- **Password Reset:** Secure password recovery mechanism with OTP verification
- **JWT-based Sessions:** Stateless authentication ensuring secure API access
- **Password Encryption:** Industry-standard bcrypt hashing for password security

### TASK MANAGEMENT
- **Create Tasks:** Add new todos with title and optional description
- **Edit Tasks:** Update existing task details including title, description, and completion status
- **Delete Tasks:** Remove unwanted tasks with confirmation prompts
- **Mark Complete:** Toggle task completion status with visual feedback
- **Real-time Updates:** Instant UI updates reflecting task changes

### USER EXPERIENCE
- **Responsive Design:** Mobile-first approach ensuring optimal experience across devices
- **Interactive UI:** Smooth animations and transitions for enhanced user engagement
- **Toast Notifications:** Immediate feedback for user actions and system responses
- **Form Validation:** Client-side and server-side validation for data integrity
- **Loading States:** Visual indicators during API operations

### DATA PERSISTENCE
- **User Isolation:** Each user's tasks are private and secure
- **Persistent Storage:** Tasks are saved permanently in MongoDB
- **Data Validation:** Server-side validation ensures data consistency
- **Error Handling:** Comprehensive error management with user-friendly messages

## 🎨 FRONTEND ARCHITECTURE

The React frontend is organized with the following structure:

### COMPONENTS
- **Navbar:** Navigation component with user authentication status
- **TodoForm:** Reusable form for creating and editing tasks
- **TodoList:** Display component for task listing with actions
- **Authentication Pages:** Login, registration, email verification, and password reset

### CONTEXT MANAGEMENT
- **AppContext:** Global state management for backend URL and application settings
- **Authentication State:** User session management and route protection

### ROUTING
- **Protected Routes:** Authenticated access to todo functionality
- **Public Routes:** Open access to authentication pages
- **Navigation Guards:** Automatic redirection based on authentication status

## 🔒 SECURITY FEATURES

myTODO implements multiple security layers:

1. **Authentication:** JWT-based stateless authentication
2. **Authorization:** User-specific data access controls
3. **Input Validation:** Comprehensive validation on both client and server
4. **Password Security:** Bcrypt hashing with salt rounds
5. **CORS Configuration:** Cross-origin resource sharing controls
6. **Cookie Security:** HTTP-only cookies for token storage

## 🌐 DEPLOYMENT

The application is deployed using modern cloud platforms:

- **Frontend:** Deployed on Vercel for optimal performance and global CDN
- **Backend:** Can be deployed on platforms like Heroku, Railway, or DigitalOcean
- **Database:** MongoDB Atlas for cloud database hosting
- **Environment Variables:** Secure configuration management

## 🚀 GETTING STARTED

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Navnit-07/myTODO.git
   cd myTODO
   ```

2. **Setup Backend:**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Configure environment variables
   npm start
   ```

3. **Setup Frontend:**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Environment Configuration:**
   ```env
   # Backend (.env)
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   ```

## 👨‍💻 DEVELOPER

**Navnit Kumar**
- GitHub: [Navnit-07](https://github.com/Navnit-07)
- Project Repository: [myTODO](https://github.com/Navnit-07/myTODO)
- Live Demo: [my-todo-five-lilac.vercel.app](https://my-todo-five-lilac.vercel.app)

## 🤝 CONTRIBUTING

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 LICENSE

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 ACKNOWLEDGMENTS

- Thanks to the React community for comprehensive documentation and resources
- Express.js team for the robust backend framework
- MongoDB team for the flexible database solution
- All open-source contributors who made the dependencies possible

## 📞 SUPPORT

For support, email navnit07@example.com or create an issue in the GitHub repository.

---

**Built with ❤️ by Navnit Kumar**