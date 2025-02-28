import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight} from 'lucide-react';
import InputField from './InputField';

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const formVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <img src="src\assets\Sofya_logo.png" alt="Logo" className="h-15 w-15" />
        <span className="text-3xl font-bold  text-gray-800">sofya.pe</span>
      </div>
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={formVariants}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
                {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
              </h1>
              <div className="space-y-4">
                {!isLogin && (
                  <InputField 
                    icon={User} 
                    placeholder="Nombre" 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                )}
                <InputField 
                  icon={Mail} 
                  placeholder="Correo Electrónico" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <InputField 
                  icon={Lock} 
                  placeholder="Contraseña" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
              {isLogin && (
              <div className="mt-1 flex justify-start space-x-4\">
              <p className="text-blue-600 hover:underline cursor-pointer text-start justify-start mt-1">
                ¿Olvidaste tu contraseña?
              </p>
          </div>
)}
              <div className="mt-6">
                <button
                  className={`text-white px-6 py-3 rounded-lg w-full flex items-center justify-center ${isLogin ? 'bg-[#002D61]' : 'bg-[#3D75B6]'}`}
                >
                  {isLogin ? '' : ''} <ArrowRight className="ml-2" size={20} />
                </button>
              </div>
                {isLogin ? '' : ''}
              <div className="mt-6 flex justify-start space-x-4">
                <button className="p-2 bg-gray-200 rounded-full w-full flex items-center justify-center">
                  <img src="src/assets/google.png" alt="Google" className="h-6 w-6 mr-2" />
                  <span className="text-gray-700 hover:text-blue-300">Continuar con Google</span>
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
        {isLogin ? 'Nuevo Usuario?' : 'Ya tienes una cuenta?'}
      </h2>
      <button
        className="bg-white px-6 py-3 rounded-lg"
        style={{ color: isLogin ? '#002D61' : '#3D75B6' }}
        onClick={toggleMode}
      >
        {isLogin ? 'Regístrate' : 'Inicia sesión'}
      </button>
    </div>
  </div>
  </div>
  );
};

export default LoginSignupPage;
