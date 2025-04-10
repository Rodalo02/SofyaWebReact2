import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import LoginSignupPage from './Pages/LoginSignupPage.jsx'
import MenuPage from './Pages/MenuPage.jsx'
import './i18n';
import RecuperarContra from './Pages/RecuperarContraPage.jsx'
import CorreoEnviado from './Pages/CorreoEnviadoPage.jsx'
import ListaClientesPage from './Pages/ListaClientesPage.jsx'
import { AccountForm } from './Pages/CrearClientePage.jsx'
import { MenuProvider } from './components/MenuContext.jsx'
import InicioClientesPage from './Pages/InicioClientesPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MenuProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignupPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/recuperar" element={<RecuperarContra />} />
        <Route path="/confirmacion" element={<CorreoEnviado />} />
        <Route path="/lista-clientes" element={<ListaClientesPage />} />
        <Route path="/crear-cliente" element={<AccountForm />} />
        <Route path="/buscar-cliente" element={<InicioClientesPage />} />
      </Routes>
    </Router>
    </MenuProvider>
  </StrictMode>
)
