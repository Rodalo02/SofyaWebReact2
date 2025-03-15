import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import LoginSignupPage from './Pages/LoginSignupPage.jsx'
import MenuPage from './Pages/MenuPage.jsx'
import './i18n';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignupPage />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </Router>
  </StrictMode>
)
