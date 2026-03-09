# 🧠 Saarthi AI — Your AI Career Coach

> An intelligent career companion powered by Google Gemini AI — helping you build resumes, write cover letters, and ace interviews.

![Tech Stack](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![Node](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=flat&logo=clerk)
![Gemini](https://img.shields.io/badge/AI-Gemini-4285F4?style=flat&logo=google)

---

## ✨ Features

- 🔐 **Authentication** — Secure sign-in/sign-up via Clerk
- 📄 **AI Resume Builder** — Generate and download professional resumes
- 💌 **AI Cover Letter Generator** — Tailored cover letters in seconds
- 🎯 **Interview Prep** — Practice with AI-generated mock interviews
- 📊 **Dashboard** — Track your career progress
- 🌙 **Dark Mode** — Fully dark-themed UI

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React 19 + Vite | UI Framework |
| Tailwind CSS | Styling |
| Clerk | Authentication |
| React Router v7 | Routing |
| Recharts | Data visualization |
| Sonner | Toast notifications |

### Backend
| Tech | Purpose |
|------|---------|
| Node.js + Express | REST API Server |
| MongoDB + Mongoose | Database |
| Google Gemini AI | AI responses |
| Inngest | Background jobs |
| Svix | Webhook verification |

---

## 📁 Project Structure

```
Saarthi/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── pages/     # Route pages
│   │   ├── components/# Reusable components
│   │   ├── hooks/     # Custom React hooks
│   │   └── lib/       # Utility functions
│   └── .env           # Frontend environment variables
│
└── backend/           # Node.js + Express backend
    ├── controllers/   # Route controllers
    ├── models/        # Mongoose models
    ├── routes/        # API routes
    ├── lib/           # DB & Inngest config
    └── .env           # Backend environment variables
```

---

## ⚙️ Setup & Installation

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/saarthi.git
cd saarthi
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in `/backend`:
```env
PORT=5000
DATABASE_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/saarthi
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxx
CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
GEMINI_API_KEY=AIzaxxxxxxxxxxxxxxxx
```

```bash
node server.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file in `/frontend`:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
VITE_CLERK_SIGN_IN_URL=/sign-in
VITE_CLERK_SIGN_UP_URL=/sign-up
VITE_CLERK_AFTER_SIGN_IN_URL=/onboarding
VITE_CLERK_AFTER_SIGN_UP_URL=/onboarding
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/webhook/clerk` | Clerk user sync |
| GET | `/api/user/:id` | Get user data |
| POST | `/api/resume` | Generate resume |
| POST | `/api/cover-letter` | Generate cover letter |
| GET | `/api/interview` | Get interview questions |

---

## 🚀 Deployment

- **Frontend** → [Vercel](https://vercel.com)
- **Backend** → [Render](https://render.com) / [Railway](https://railway.app)
- **Database** → [MongoDB Atlas](https://mongodb.com/atlas)

---

## 👨‍💻 Author

**Shubham Kumar**  
Made with 💗 | [GitHub](https://github.com/YOUR_USERNAME)

---

## 📄 License

MIT License — feel free to use and modify!
