import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
        "login": "Login",
        "signup": "Sign Up",
        "email": "Email",
        "password": "Password",
        "forgotPassword": "Forgot your password?",
        "newUser": "New User?",
        "alreadyHaveAccount": "Already have an account?",
        "register": "Register",
        "signin": "Sign in",
        "continueWithGoogle": "Continue with Google",
        "recent": "Recent",
        "search": "Search",
        "admin": "Administration",
        "accounting": "Accounting",
        "hr": "HR",
        "fatmagul": "Fatmagul",
        "settings": "Settings",
        "logout": "Logout",
        "home": "Home",
        "name": "Name",
        "home": "Home",
        "reset": "Reset Password",
        "enviarCorreo": "Send confirmation email",
        "emailSent": "Confirmation email sent",
        "recoverInstructions": "Follow the instructions sent to your provided email address to recover your password.",
        "invalidEmail": "Invalid Email",

        
    }
  },
  es: {
    translation: {
        "login": "Iniciar sesión",
        "signup": "Crear cuenta",
        "email": "Correo Electrónico",
        "password": "Contraseña",
        "forgotPassword": "¿Olvidaste tu contraseña?",
        "newUser": "¿Nuevo Usuario?",
        "alreadyHaveAccount": "¿Ya tienes una cuenta?",
        "register": "Regístrate",
        "signin": "Inicia sesión",
        "continueWithGoogle": "Continuar con Google",
        "recent": "Recientes",
        "search": "Buscar",
        "admin": "Administración",
        "accounting": "Contabilidad",
        "hr": "RRHH",
        "fatmagul": "Fatmagul",
        "settings": "Configuración",
        "logout": "Salir",
        "home": "Inicio",
        "name": "Nombre",
        "home": "Inicio",
        "reset": "Recuperar contraseña",
        "enviarCorreo": "Enviar Correo de Confirmación",
        "emailSent": "Correo de Confirmación enviado",
        "recoverInstructions": "Siga las instrucciones enviadas a su dirección de correo electrónico proporcionado para recuperar su contraseña.",
        "invalidEmail": "Correo inválido",
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'es', // Guardar idioma en localStorage
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
});

export default i18n;
