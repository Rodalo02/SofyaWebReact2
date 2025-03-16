import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import InputField from '../InputField';

const LoginSignupPage = () => {
  const { t, i18n } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('es');

  const toggleMode = () => setIsLogin(!isLogin);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'es';
    setSelectedLanguage(savedLanguage);
    i18n.changeLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage); 
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <img src="src/assets/Sofya_logo.png" alt="Logo" className="h-15 w-15" />
        <span className="text-3xl font-bold text-gray-800">sofya.pe</span>
      </div>
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
                {isLogin ? t('login') : t('signup')}
              </h1>
              <div className="space-y-4">
                {!isLogin && (
                  <InputField 
                    icon={User} 
                    placeholder={t('name')} 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                )}
                <InputField 
                  icon={Mail} 
                  placeholder={t('email')} 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <InputField 
                  icon={Lock} 
                  placeholder={t('password')} 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
              {isLogin && (
                <div className="mt-1 flex justify-start">
                  <p onClick={() => navigate('/recuperar')} className="text-blue-600 hover:underline cursor-pointer text-start mt-1">
                    {t('forgotPassword')}
                  </p>
                </div>
              )}
              <div className="mt-6">
                <button onClick={() => navigate('/menu')}
                  className={`text-white px-6 py-3 rounded-lg w-full flex items-center justify-center cursor-pointer ${isLogin ? 'bg-[#002D61]' : 'bg-[#3D75B6]'}`}
                >
                  <ArrowRight className="ml-2" size={20} />
                </button>
              </div>
              <div className="mt-6 flex justify-start space-x-4">
                <button className="p-2 bg-gray-200 rounded-full w-full flex items-center justify-center">
                  <img src="src/assets/google.png" alt="Google" className="h-6 w-6 mr-2" />
                  <span className="text-gray-700 hover:text-blue-300 cursor-pointer">
                    {t('continueWithGoogle')}
                  </span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div 
        className={`w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 ${isLogin ? 'bg-[#002D61]' : 'bg-[#3D75B6]'}`}
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            {isLogin ? t('newUser') : t('alreadyHaveAccount')}
          </h2>
          <button
            className="bg-white px-6 py-3 rounded-lg cursor-pointer"
            style={{ color: isLogin ? '#002D61' : '#3D75B6' }}
            onClick={toggleMode}
          >
            {isLogin ? t('register') : t('signin')}
          </button>
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        <select
          className="p-2 border rounded-lg bg-white text-gray-700"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="es">ES</option>
          <option value="en">US</option>
        </select>
      </div>
    </div>
  );
};

export default LoginSignupPage;
