# Saarthi: Your Ultimate Career Charioteer 🏹 🤖

[![Deploy to Render](https://img.shields.io/badge/Deploy%20to-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://saarthi-pc0q.onrender.com)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

**Saarthi** is a state-of-the-art career assistance platform designed to empower professionals and job seekers. Leveraging the power of **Google Gemini AI**, it provides intelligent solutions for resume building, cover letter generation, and real-time industry insights.

---

## 🌟 Key Features

### 📝 AI-Powered Resume Builder
- Dynamic content improvement using Gemini AI.
- Professional formatting and real-time previews.
- Tailored suggestions based on industry standards.

### ✉️ Intelligent Cover Letter Generator
- Generate personalized cover letters in seconds.
- Context-aware generation based on job descriptions and company profiles.

### 📊 Industry Insights & Trends
- Real-time data visualization of industry trends.
- AI-generated career advice and skill gap analysis.

### 🎯 Interview Preparation
- Customized technical quizzes for specific job categories.
- Detailed performance assessments and improvement tips.

---

## 🏗️ System Architecture

```mermaid
graph TD
    User((User)) -->|Interacts| Frontend[React + Vite Frontend]
    Frontend -->|Auth via Clerk| Auth[Clerk Auth Service]
    Frontend -->|API Requests| Backend[Express.js Backend]
    Backend -->|Data Persistence| DB[(MongoDB Atlas)]
    Backend -->|AI Analysis| Gemini[Google Gemini AI]
    Backend -->|Background Jobs| Inngest[Inngest Workflow Engine]
```

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons, Recharts |
| **Backend** | Node.js, Express.js, MongoDB + Mongoose |
| **AI Layer** | Google Gemini 1.5 Flash API |
| **Auth** | Clerk (JWT based) |
| **Jobs** | Inngest (Serverless queues) |

---

## 🚀 Installation & Setup

### 1. Clone & Install
```bash
git clone https://github.com/SHUBHAMKUMAR1407/Saarthi.git
cd Saarthi
```

### 2. Backend Configuration
Navigate to `backend/` and create a `.env`:
```env
PORT=5000
DATABASE_URL=mongodb+srv://...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
GEMINI_API_KEY=AIzaSy...
```
```bash
npm install
npm run start
```

### 3. Frontend Configuration
Navigate to `frontend/` and create a `.env`:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=https://your-backend-url/api
```
```bash
npm install
npm run dev
```

---

## 🔐 Security Information

We take security seriously. 
- All sensitive environment variables are managed via `.env` (strictly ignored by Git).
- Authentication is handled by **Clerk** using secure JWT tokens.
- Cross-Origin Resource Sharing (CORS) is configured for secure communication.

---

## 👨‍💻 Developer

**Shubham Kumar**
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SHUBHAMKUMAR1407)

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---
*Built with passion to help you find your professional north star.* 🌟
