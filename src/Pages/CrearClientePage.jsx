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

  const renderField = (label, name, type = "text", width = "w-full") => (
    <div className={`mb-4 ${width}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
          errors[name] ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {errors[name] && (
        <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <MenuPage />
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <MenuCliente />
        <div className="p-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Nuevo Cliente</h2>
            </div>
            <form onSubmit={handleSave} className="p-6">
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Información Principal</h3>
                  {renderField("Nombre", "nombre")}
                  <div className="grid grid-cols-2 gap-4">
                    {renderField("Apellido Paterno", "apPaterno", "text", "w-full")}
                    {renderField("Apellido Materno", "apMaterno", "text", "w-full")}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {renderField("Primer Nombre", "nombres1", "text", "w-full")}
                    {renderField("Segundo Nombre", "nombres2", "text", "w-full")}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Documentación</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {renderField("Tipo Documento", "tipoDocumento", "text", "w-full")}
                    {renderField("Número Documento", "numeroDocumento", "text", "w-full")}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Contacto</h3>
                  {renderField("Correo Principal", "correo1")}
                  {renderField("Correo Secundario", "correo2")}
                  {renderField("Correo Adicional", "correo3")}
                  {renderField("Dirección", "direccion")}
                  <div className="grid grid-cols-2 gap-4">
                    {renderField("País", "pais", "text", "w-full")}
                    {renderField("Departamento", "departamento", "text", "w-full")}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {renderField("Provincia", "provincia", "text", "w-full")}
                    {renderField("Distrito", "distrito", "text", "w-full")}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {renderField("Teléfono 1", "telefono1", "text", "w-full")}
                    {renderField("Teléfono 2", "telefono2", "text", "w-full")}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Ubicación</h3>
                  {renderField("Ubigeo", "ubigeo")}
                  <div className="grid grid-cols-2 gap-4">
                    {renderField("Longitud", "longitud", "text", "w-full")}
                    {renderField("Latitud", "latitud", "text", "w-full")}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Información Comercial</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {renderField("Contacto 1", "contacto1", "text", "w-full")}
                    {renderField("Cargo 1", "cargo1", "text", "w-full")}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {renderField("Contacto 2", "contacto2", "text", "w-full")}
                    {renderField("Cargo 2", "cargo2", "text", "w-full")}
                  </div>
                  {renderField("Forma de Pago", "formaPago")}
                  {renderField("Descuento", "descuento")}
                  {renderField("Tipo de Venta", "tipoVenta")}
                  {renderField("Tipo de Cliente", "tipoCliente")}
                  {renderField("CIIU", "ciiu")}
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Líneas de Crédito</h3>
                  {renderField("Línea de Crédito 1", "lineaCredito1")}
                  {renderField("Línea de Crédito 2", "lineaCredito2")}
                  {renderField("Línea de Crédito 3", "lineaCredito3")}
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Información Adicional</h3>
                  {renderField("Nombre Comercial", "nombreComercial")}
                  {renderField("Estado SUNAT", "estadoSunat")}
                  {renderField("Condición SUNAT", "condicionSunat")}
                  
                  <div className="mt-4 space-y-2">
                    {[
                      { label: "Extranjero", name: "extranjero" },
                      { label: "Agente Retención", name: "agenteRetencion" },
                      { label: "Activo", name: "activo" },
                      { label: "Mostrar Deuda al Facturar", name: "mostrarDeuda" },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center">
                        <input
                          type="checkbox"
                          name={item.name}
                          checked={formData[item.name]}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-700">{item.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => navigate("/crear-cliente")}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};