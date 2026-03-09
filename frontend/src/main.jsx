import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import './index.css'

import RootLayout from './RootLayout';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import Resume from './pages/Resume';
import CoverLetterList from './pages/CoverLetterList';
import NewCoverLetter from './pages/NewCoverLetter';
import CoverLetterView from './pages/CoverLetterView';
import Interview from './pages/Interview';
import InterviewMock from './pages/InterviewMock';

// Protected Route wrapper — redirects to sign-in if not logged in
const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut><RedirectToSignIn /></SignedOut>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
          <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />

          {/* Protected Routes */}
          <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/resume" element={<ProtectedRoute><Resume /></ProtectedRoute>} />
          <Route path="/ai-cover-letter" element={<ProtectedRoute><CoverLetterList /></ProtectedRoute>} />
          <Route path="/ai-cover-letter/new" element={<ProtectedRoute><NewCoverLetter /></ProtectedRoute>} />
          <Route path="/ai-cover-letter/:id" element={<ProtectedRoute><CoverLetterView /></ProtectedRoute>} />
          <Route path="/interview" element={<ProtectedRoute><Interview /></ProtectedRoute>} />
          <Route path="/interview/mock" element={<ProtectedRoute><InterviewMock /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
