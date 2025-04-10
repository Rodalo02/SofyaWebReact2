import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenuCliente = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full text-start p-10 py-8 bg-gray-100">
      <h1 className="text-4xl font-semibold text-gray-800">Clientes</h1>
      <div className="flex space-x-6 items-center mt-4">
        <button
          onClick={() => navigate('/crear-cliente')}
          className="text-blue-600 hover:underline"
        >
          Nuevo Cliente
        </button>
        <button
          onClick={() => navigate('/buscar-cliente')}
          className="text-blue-600 hover:underline"
        >
          Buscar Cliente
        </button>
        <button
          onClick={() => console.log("Eliminar Cliente")}
          className="text-blue-600 hover:underline"
        >
          Eliminar Cliente
        </button>
      </div>
    </div>
  );
};

export default MenuCliente;
