# Saarthi AI 🤖 🚀

Saarthi AI is a comprehensive AI-powered career assistant designed to help professionals and students excel in their career paths. From generating optimized resumes to providing industry insights and interview preparation, Saarthi is your reliable "Charioteer" (Saarthi) in the professional world.

## ✨ Key Features

- **AI Resume Builder**: Create professional resumes with AI-enhanced content recommendations.
- **Cover Letter Generator**: Generate tailored cover letters for specific job roles and companies.
- **Industry Insights**: Stay ahead with real-time insights and trends in your field (powered by Gemini AI).
- **Interview Preparation**: Practice with AI-generated technical quizzes and assessments.
- **Clerk Authentication**: Secure and seamless sign-in/sign-up experience.
- **Responsive Dashboard**: Track your career progress with a modern, user-friendly interface.

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**
- **Tailwind CSS** (Radix UI, Lucide Icons)
- **Clerk** (Authentication)
- **Zod** (Form Validation)
- **Recharts** (Data Visualization)

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose** (Database)
- **Google Gemini AI SDK** (AI Features)
- **Inngest** (Background Jobs & Workflows)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account
- Clerk Account
- Google AI Studio API Key

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SHUBHAMKUMAR1407/Saarthi.git
   cd Saarthi
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   # Create a .env file based on the environment variables section below
   npm run dev
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   # Create a .env file based on the environment variables section below
   npm run dev
   ```

## 🔐 Environment Variables

### Backend (`backend/.env`)
- `PORT`=5000
- `DATABASE_URL`=your_mongodb_atlas_url
- `CLERK_SECRET_KEY`=your_clerk_secret_key
- `CLERK_WEBHOOK_SECRET`=your_clerk_webhook_secret
- `GEMINI_API_KEY`=your_google_gemini_api_key

### Frontend (`frontend/.env`)
- `VITE_CLERK_PUBLISHABLE_KEY`=your_clerk_publishable_key
- `VITE_API_URL`=http://localhost:5000/api

## 📄 License

This project is licensed under the ISC License.

---
Built with ❤️ by [SHUBHAM KUMAR](https://github.com/SHUBHAMKUMAR1407)
