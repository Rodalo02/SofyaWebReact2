import React, { useState } from 'react';

const renderInput = (label, name, className) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

export const AccountForm = () => {
  const [formData, setFormData] = useState({
    formaPago: '',
    descuento: '',
    tipoVenta: '',
    tipoCliente: '',
    ciiu: '',
    nombreComercial: '',
    estadoSunat: '',
    condicionSunat: '',
    lineaCredito1: '',
    lineaCredito2: '',
    lineaCredito3: '',
    extranjero: false,
    agenteRetencion: false,
    activo: false,
    mostrarDeuda: false
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form className="space-y-6">
      {/* Configuración */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Configuración</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 gap-3">
            {renderInput("Forma de Pago", "formaPago", "w-full")}
            {renderInput("Descuento", "descuento", "w-full")}
            {renderInput("Tipo de Venta", "tipoVenta", "w-full")}
            {renderInput("Tipo de Cliente", "tipoCliente", "w-full")}
            {renderInput("CIIU", "ciiu", "w-full")}
          </div>
        </div>
      </div>

      {/* Información Adicional */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Información Adicional</h3>
        <div className="grid grid-cols-1 gap-3">
          {renderInput("Nombre Comercial", "nombreComercial", "w-full")}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {renderInput("Estado SUNAT", "estadoSunat", "w-full")}
            {renderInput("Condición SUNAT", "condicionSunat", "w-full")}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {renderInput("Línea de Crédito 1", "lineaCredito1", "w-full")}
            {renderInput("Línea de Crédito 2", "lineaCredito2", "w-full")}
            {renderInput("Línea de Crédito 3", "lineaCredito3", "w-full")}
          </div>
        </div>
      </div>

      {/* Opciones */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="space-y-3">
          {[
            { label: "Cliente Extranjero", name: "extranjero" },
            { label: "Agente de Retención", name: "agenteRetencion" },
            { label: "Cliente Activo", name: "activo" },
            { label: "Mostrar Deuda al Facturar", name: "mostrarDeuda" },
          ].map((item) => (
            <label key={item.name} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={item.name}
                checked={formData[item.name]}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </form>
  );
};