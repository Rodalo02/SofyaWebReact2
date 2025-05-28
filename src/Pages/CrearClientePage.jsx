import MenuPage from "./MenuPage";
import MenuCliente from "./MenuCliente";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Save, X } from 'lucide-react';
import { useMenu } from "../components/MenuContext";

export const AccountForm = () => {
  const navigate = useNavigate();
  const { open } = useMenu();
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
    <div className={`w-full ${width} px-2 mb-3`}>
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        className={`w-full px-3 py-1.5 rounded-md bg-gray-50 border text-sm
          ${errors[name] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}
          focus:border-transparent focus:outline-none focus:ring-1 transition-all duration-200
          text-gray-900 placeholder-gray-400`}
      />
      {errors[name] && (
        <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <MenuPage />
      <div className="flex-1 overflow-hidden flex flex-col">
        <MenuCliente />
        <div className="flex-1 overflow-y-auto pb-16">
          <div className="p-4">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-900 to-sky-800">
                  <h2 className="text-lg font-medium text-white">Nuevo Cliente</h2>
                </div>
                
                <form onSubmit={handleSave} className="p-4">
                  <div className="space-y-4">
                    {/* Información Principal */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Información Principal</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {renderInput("Nombre / Razón Social", "nombre", "w-full")}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                          {renderInput("Apellido Paterno", "apPaterno", "w-full")}
                          {renderInput("Apellido Materno", "apMaterno", "w-full")}
                          {renderInput("Primer Nombre", "nombres1", "w-full")}
                          {renderInput("Segundo Nombre", "nombres2", "w-full")}
                        </div>
                      </div>
                    </div>

                    {/* Documentos e Identidad */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Documentos e Identidad</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {renderInput("Tipo Documento", "tipoDocumento", "w-full")}
                        {renderInput("Número Documento", "numeroDocumento", "w-full")}
                      </div>
                    </div>

                    {/* Contacto */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Información de Contacto</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {renderInput("Correo Principal", "correo1", "w-full")}
                        {renderInput("Correo Secundario", "correo2", "w-full")}
                        {renderInput("Correo Adicional", "correo3", "w-full")}
                      </div>
                    </div>

                    {/* Ubicación */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Ubicación</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {renderInput("Dirección", "direccion", "w-full")}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                          {renderInput("País", "pais", "w-full")}
                          {renderInput("Departamento", "departamento", "w-full")}
                          {renderInput("Provincia", "provincia", "w-full")}
                          {renderInput("Distrito", "distrito", "w-full")}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {renderInput("Ubigeo", "ubigeo", "w-full")}
                          {renderInput("Longitud", "longitud", "w-full")}
                          {renderInput("Latitud", "latitud", "w-full")}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {renderInput("Teléfono 1", "telefono1", "w-full")}
                          {renderInput("Teléfono 2", "telefono2", "w-full")}
                        </div>
                      </div>
                    </div>

                    {/* Contactos */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Contactos</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          {renderInput("Contacto 1", "contacto1", "w-full")}
                          {renderInput("Cargo 1", "cargo1", "w-full")}
                        </div>
                        <div>
                          {renderInput("Contacto 2", "contacto2", "w-full")}
                          {renderInput("Cargo 2", "cargo2", "w-full")}
                        </div>
                      </div>
                    </div>

                    {/* Configuración */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Configuración</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="grid grid-cols-1 gap-3">
                            {renderInput("Forma de Pago", "formaPago", "w-full")}
                            {renderInput("Descuento", "descuento", "w-full")}
                            {renderInput("Tipo de Venta", "tipoVenta", "w-full")}
                            {renderInput("Tipo de Cliente", "tipoCliente", "w-full")}
                            {renderInput("CIIU", "ciiu", "w-full")}
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-sm">
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Opciones Adicionales</h4>
                          <div className="space-y-2">
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
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Botones fijos en la parte inferior */}
        <div className="fixed bottom-0 right-0 left-0 bg-white border-t border-gray-200 p-3 flex justify-end space-x-3" style={{ marginLeft: open ? "18rem" : "5rem" }}>
          <button
            type="button"
            onClick={() => navigate("/crear-cliente")}
            className="px-3 py-1.5 flex items-center space-x-2 text-xs border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
          >
            <X size={14} />
            <span>Cancelar</span>
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1.5 flex items-center space-x-2 text-xs bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            <Save size={14} />
            <span>Guardar</span>
          </button>
        </div>
      </div>
    </div>
  );
};