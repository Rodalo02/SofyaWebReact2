import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const RecuperarContra = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      setError(t('invalidEmail')); // Mensaje de error traducido
      return;
    }

    setError('');
    console.log('Reset password request for:', email);
    navigate('/confirmacion');
  };

  return (
    <div className="antialiased bg-slate-200 flex items-center justify-center min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key="recuperar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300"
        >
          <h1 className="text-4xl font-medium">{t('reset')}</h1>
          <form onSubmit={handleSubmit} className="my-10">
            <div className="flex flex-col space-y-5">
              <label htmlFor="email">
                <p className="font-medium text-slate-700 pb-2">{t('email')}</p>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`w-full py-3 border rounded-lg px-3 focus:outline-none hover:shadow ${
                    error ? 'border-red-500' : 'border-slate-200 focus:border-slate-500'
                  }`}
                  placeholder="fatmagul@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
              >
                <span>{t('enviarCorreo')}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RecuperarContra;
