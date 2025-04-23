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
          <div className="flex space-x-3 items-start bg-white p-1 rounded-xl shadow-md">
            {/* Botón grande "Nuevo" con texto */}
            <div
              onClick={() => navigate('/crear-cliente')}
              className="cursor-pointer hover:scale-110 transition flex flex-col items-center"
              title="Nuevo Cliente"
            >
              <Plus className="w-16 h-16 text-blue-700" />
              <span className="text-sm text-gray-700 font-bold mt-1">Nuevo</span>
            </div>

            {/* Botones pequeños en vertical */}
            <div className="flex flex-col space-y-4 mt-2">
              {/* Buscar */}
              <div
                onClick={() => navigate('/buscar-cliente')}
                className="cursor-pointer hover:scale-110 transition flex justify-center"
                title="Buscar"
              >
                <Search className="w-4.5 h-4.5 text-gray-700" />
              </div>

              {/* Editar */}
              <div
                onClick={() => navigate('/buscar-cliente')}
                className="cursor-pointer hover:scale-110 transition flex justify-center"
                title="Editar"
              >
                <Pencil className="w-4.5 h-4.5 text-gray-700" />
              </div>

              {/* Eliminar */}
              <div
                onClick={() => navigate('/buscar-cliente')}
                className="cursor-pointer hover:scale-110 transition flex justify-center"
                title="Eliminar"
              >
                <X className="w-4.5 h-4.5 text-gray-700" />
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
