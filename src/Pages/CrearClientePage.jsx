import MenuPage from "./MenuPage";
import MenuCliente from "./MenuCliente";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const AccountForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apPaterno: "",
    apMaterno: "",
    nombres1: "",
    nombres2: "",
    tipoDocumento: "",
    numeroDocumento: "",
    correo1: "",
    correo2: "",
    correo3: "",
    direccion: "",
    pais: "",
    departamento: "",
    provincia: "",
    distrito: "",
    telefono1: "",
    telefono2: "",
    ubigeo: "",
    longitud: "",
    latitud: "",
    contacto1: "",
    contacto2: "",
    cargo1: "",
    cargo2: "",
    formaPago: "",
    descuento: "",
    tipoVenta: "",
    tipoCliente: "",
    ciiu: "",
    lineaCredito1: "",
    lineaCredito2: "",
    lineaCredito3: "",
    nombreComercial: "",
    estadoSunat: "",
    condicionSunat: "",
    extranjero: false,
    agenteRetencion: false,
    activo: false,
    mostrarDeuda: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      alert("Error en campos.");
      return;
    }
  
    const dataToSend = {
      ...formData,
      ctpcli: formData.extranjero ? 'E' : 'N',
      sreten: formData.agenteRetencion ? 'S' : 'N',
      sclien: formData.activo ? 'A' : 'I',
      sdeuda: formData.mostrarDeuda ? 'S' : 'N',
    };
  
    try {
      await axios.post("http://localhost:3000/api/clientes", dataToSend);
      alert("Cliente guardado correctamente");
      navigate("/crear-cliente");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar el cliente");
    }
  };

  const validateForm = () => {
    const newErrors = {};
  
    if (!formData.nombre || formData.nombre.length > 250) {
      newErrors.nombre = "Nombre es obligatorio y debe tener máximo 250 caracteres.";
    }
  
    if (!formData.tipoDocumento || formData.tipoDocumento.length !== 2) {
      newErrors.tipoDocumento = "Tipo de documento debe tener 2 caracteres.";
    }
  
    if (!formData.pais || formData.pais.length !== 2) {
      newErrors.pais = "País debe tener 2 caracteres.";
    }
  
    if (!formData.tipoVenta || formData.tipoVenta.length !== 1) {
      newErrors.tipoVenta = "Tipo de venta debe tener 1 carácter.";
    }
  
    const max30Fields = [
      "apPaterno", "apMaterno", "nombres1", "nombres2", "numeroDocumento", "correo1",
      "correo2", "correo3", "direccion", "departamento", "provincia", "distrito",
      "telefono1", "telefono2", "ubigeo", "longitud", "latitud", "contacto1", "contacto2",
      "cargo1", "cargo2", "formaPago", "descuento", "tipoCliente", "ciiu",
      "lineaCredito1", "lineaCredito2", "lineaCredito3", "nombreComercial",
      "estadoSunat", "condicionSunat"
    ];
  
    max30Fields.forEach((field) => {
      if (formData[field] && formData[field].length > 30) {
        newErrors[field] = `Máximo 30 caracteres permitidos.`;
      }
    });
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderInput = (label, name, width = "lg:w-4/12") => (
    <div className={`w-full ${width} px-3 mb-4`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        className={`w-full px-4 py-2.5 rounded-lg bg-gray-50 border
          ${errors[name] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"}
          focus:border-transparent focus:outline-none focus:ring-2 transition-all duration-200
          text-gray-900 text-sm placeholder-gray-400`}
      />
      {errors[name] && (
        <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <MenuPage />
      <div className="flex-1 overflow-y-auto">
        <MenuCliente />
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-900 to-slate-900">
                <h2 className="text-xl font-semibold text-white">Nuevo Cliente</h2>
              </div>
              
              <form onSubmit={handleSave} className="p-6">
                <div className="space-y-8">
                  {/* Información Principal */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">Información Principal</h3>
                    <div className="grid grid-cols-1 gap-6">
                      {renderInput("Nombre / Razón Social", "nombre", "w-full")}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {renderInput("Apellido Paterno", "apPaterno", "w-full")}
                        {renderInput("Apellido Materno", "apMaterno", "w-full")}
                        {renderInput("Primer Nombre", "nombres1", "w-full")}
                        {renderInput("Segundo Nombre", "nombres2", "w-full")}
                      </div>
                    </div>
                  </div>

                  {/* Documentos e Identidad */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">Documentos e Identidad</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {renderInput("Tipo Documento", "tipoDocumento", "w-full")}
                      {renderInput("Número Documento", "numeroDocumento", "w-full")}
                    </div>
                  </div>

                  {/* Contacto */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">Información de Contacto</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {renderInput("Correo Principal", "correo1", "w-full")}
                      {renderInput("Correo Secundario", "correo2", "w-full")}
                      {renderInput("Correo Adicional", "correo3", "w-full")}
                    </div>
                  </div>

                  {/* Ubicación */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">Ubicación</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {renderInput("Dirección", "direccion", "w-full")}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {renderInput("País", "pais", "w-full")}
                        {renderInput("Departamento", "departamento", "w-full")}
                        {renderInput("Provincia", "provincia", "w-full")}
                        {renderInput("Distrito", "distrito", "w-full")}
                      </div>
                    </div>
                  </div>

                  {/* Configuración */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">Configuración</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="grid grid-cols-1 gap-4">
                          {renderInput("Forma de Pago", "formaPago", "w-full")}
                          {renderInput("Descuento", "descuento", "w-full")}
                          {renderInput("Tipo de Venta", "tipoVenta", "w-full")}
                          {renderInput("Tipo de Cliente", "tipoCliente", "w-full")}
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h4 className="font-medium text-gray-900 mb-4">Opciones Adicionales</h4>
                        <div className="space-y-3">
                          {[
                            { label: "Cliente Extranjero", name: "extranjero" },
                            { label: "Agente de Retención", name: "agenteRetencion" },
                            { label: "Cliente Activo", name: "activo" },
                            { label: "Mostrar Deuda al Facturar", name: "mostrarDeuda" },
                          ].map((item) => (
                            <label key={item.name} className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                name={item.name}
                                checked={formData[item.name]}
                                onChange={handleChange}
                                className="form-checkbox h-5 w-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                              />
                              <span className="text-gray-700">{item.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate("/crear-cliente")}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium rounded-lg hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105"
                  >
                    Guardar Cliente
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};