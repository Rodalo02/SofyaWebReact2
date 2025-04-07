import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import LoginSignupPage from './Pages/LoginSignupPage.jsx'
import MenuPage from './Pages/MenuPage.jsx'
import './i18n';
import RecuperarContra from './Pages/RecuperarContraPage.jsx'
import CorreoEnviado from './Pages/CorreoEnviadoPage.jsx'
import ClientesPage from './Pages/ClientesPage.jsx'
import { AccountForm } from './Pages/CrearClientePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignupPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/recuperar" element={<RecuperarContra />} />
        <Route path="/confirmacion" element={<CorreoEnviado />} />
        <Route path="/admin" element={<ClientesPage />} />
        <Route path="/crear-cliente" element={<AccountForm />} />
      </Routes>
    </Router>
  </StrictMode>
)
