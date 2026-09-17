
# 🔗 Shrinkit.io

### Shorten Your Links. Simplify Your World. 🚀

Shrinkit.io is a modern URL shortener that helps users convert long URLs into short, easy-to-share links. Users can manage their shortened URLs and access their link history through a simple and user-friendly interface.

## 🌐 Live Demo

🚀 **[Visit Shrinkit.io](https://shrinkit-eight.vercel.app/)**

---

## 📸 About the Project

Shrinkit.io is a full-stack web application developed to make URL sharing simple, fast, and convenient.

The project includes URL shortening, user authentication, and personal link history. It is built using modern web technologies with a focus on a responsive and user-friendly experience.

---

## ✨ Features

- 🔗 Shorten long URLs into short links
- 🔐 User registration and login
- 👤 User authentication and authorization
- 📋 Personal URL history
- 🔒 User-specific link management
- 📱 Responsive design for mobile and desktop
- ⚡ Fast and simple user interface
- ☁️ Deployed frontend application

---

## 🛠️ Technologies Used

### Frontend

- Next.js
- React.js
- Tailwind CSS
- JavaScript
- NextAuth.js

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt.js

### Tools & Deployment

- Git
- GitHub
- Visual Studio Code
- Vercel
- Render
- MongoDB

---

## 📂 Project Structure

```text
projet_URL/
│
├── Backend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd projet_URL
```

---

## 🚀 Backend Setup

### Navigate to the Backend

```bash
cd Backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file inside the Backend folder:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:3000
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

### Start the Backend Server

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:8000
```

---

## 💻 Frontend Setup

Open a new terminal and navigate to the Frontend folder:

```bash
cd Frontend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_FETCH_URI=http://localhost:8000/api/v1/url
```

### Start the Frontend

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

---

## 🔑 Authentication

Shrinkit.io uses authentication to protect user data and provide personalized link history.

Authentication features include:

- User registration
- User login
- JWT-based authentication
- Access and refresh tokens
- Protected routes
- User-specific URL history
- GitHub OAuth integration

---

## 🎯 Project Goals

The main goals of Shrinkit.io are:

- Make URL shortening easy and accessible
- Provide a clean and responsive user interface
- Protect users' personal URL history
- Practice full-stack web development
- Implement secure user authentication
- Deploy a complete web application

---

## 🔮 Future Improvements

- QR code generation and downloading
- Advanced link analytics
- Custom short URLs
- Link expiration
- Improved dashboard
- Additional OAuth providers

---

## 👨‍💻 Developer

**Naveen Negi**

B.Tech Computer Science Student

Interested in:

- Web Development
- Full-Stack Development
- Data Structures and Algorithms
- Problem Solving

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.

---

### 🔗 Live Project

[https://shrinkit-eight.vercel.app/](https://shrinkit-eight.vercel.app/)
