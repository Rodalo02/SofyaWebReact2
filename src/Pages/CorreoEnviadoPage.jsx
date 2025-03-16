import React from 'react';
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from 'framer-motion';
import "../i18n";

const CorreoEnviado = () => {
  const { t } = useTranslation();

  return (
    <div className="antialiased bg-slate-200 flex items-center justify-center min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300"
        >
          <h1 className="text-3xl font-medium">{t('emailSent')}</h1>
          <p className="text-slate-500 my-4">{t('recoverInstructions')}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CorreoEnviado;