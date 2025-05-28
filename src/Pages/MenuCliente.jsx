import React from 'react';
import { useNavigate } from 'react-router-dom';
import personas from '../assets/personas.png';
import { Search, Pencil, X, Plus } from 'lucide-react';

const MenuCliente = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gray-100">
      <div className="flex justify-between items-start">
        {/* Título */}
        <div className="text-start p-6 pt-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Clientes</h1>

          {/* Menú tipo Word */}
          <div className="flex space-x-3 items-start bg-white p-3 rounded-xl shadow-sm">
            <div className="flex space-x-2">
              {/* Todos los botones del mismo tamaño */}
              <div className="flex flex-col items-center space-y-1">
                <button
                  onClick={() => navigate('/crear-cliente')}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
                  title="Nuevo Cliente"
                >
                  <Plus className="w-5 h-5 text-blue-600" />
                </button>
                <span className="text-xs text-gray-600 font-medium">Nuevo</span>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <button
                  onClick={() => navigate('/buscar-cliente')}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  title="Buscar"
                >
                  <Search className="w-5 h-5 text-gray-600" />
                </button>
                <span className="text-xs text-gray-600 font-medium">Buscar</span>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <button
                  onClick={() => navigate('/buscar-cliente')}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  title="Editar"
                >
                  <Pencil className="w-5 h-5 text-gray-600" />
                </button>
                <span className="text-xs text-gray-600 font-medium">Editar</span>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <button
                  onClick={() => navigate('/buscar-cliente')}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  title="Eliminar"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
                <span className="text-xs text-gray-600 font-medium">Eliminar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Imagen sin animación */}
        <img
          src={personas}
          alt="Persona"
          className="w-40 h-32 mr-2 object-cover self-end"
        />
      </div>
    </div>
  );
};

export default MenuCliente;