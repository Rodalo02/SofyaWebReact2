import MenuPage from "./MenuPage";
import MenuCliente from "./MenuCliente";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Save, X } from "lucide-react";

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

  const renderInput = (label, name, width = "lg:w-4/12", required = false) => (
    <div className={`flex items-center ${width} px-3 mb-4`}>
      <label className="w-1/3 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="w-2/3">
        <input
          type="text"
          name={name}
          value={formData[name] || ""}
          onChange={handleChange}
          className={`w-full px-3 py-2 bg-white rounded-lg border ${
            errors[name] 
              ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          } shadow-sm transition duration-150 ease-in-out text-sm`}
        />
        {errors[name] && (
          <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
        )}
      </div>
    </div>
  );

  const renderSection = (title, children) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <MenuPage />
      <div className="flex-1 overflow-y-auto">
        <MenuCliente />
        <div className="py-6 px-8">
          <div className="max-w-7xl mx-auto">
            <form onSubmit={handleSave} className="space-y-6">
              {renderSection("Información Principal", (
                <>
                  <div className="mb-6">
                    {renderInput("Nombre o Razón Social", "nombre", "lg:w-full", true)}
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {renderInput("Apellido Paterno", "apPaterno", "lg:w-full")}
                    {renderInput("Apellido Materno", "apMaterno", "lg:w-full")}
                    {renderInput("Primer Nombre", "nombres1", "lg:w-full")}
                    {renderInput("Segundo Nombre", "nombres2", "lg:w-full")}
                  </div>
                </>
              ))}

              {renderSection("Documentación", (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {renderInput("Tipo Doc.", "tipoDocumento", "lg:w-full", true)}
                  {renderInput("Número de Documento", "numeroDocumento", "lg:w-full", true)}
                </div>
              ))}

              {renderSection("Contacto", (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {renderInput("Correo Principal", "correo1", "lg:w-full")}
                  {renderInput("Correo Secundario", "correo2", "lg:w-full")}
                  {renderInput("Correo Adicional", "correo3", "lg:w-full")}
                </div>
              ))}

              {renderSection("Ubicación", (
                <>
                  <div className="mb-4">
                    {renderInput("Dirección", "direccion", "lg:w-full")}
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {renderInput("País", "pais", "lg:w-full", true)}
                    {renderInput("Departamento", "departamento", "lg:w-full")}
                    {renderInput("Provincia", "provincia", "lg:w-full")}
                    {renderInput("Distrito", "distrito", "lg:w-full")}
                  </div>
                </>
              ))}

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  {renderSection("Información Comercial", (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {renderInput("Forma de Pago", "formaPago", "lg:w-full")}
                        {renderInput("Descuento", "descuento", "lg:w-full")}
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {renderInput("Tipo de Venta", "tipoVenta", "lg:w-full", true)}
                        {renderInput("Tipo de Cliente", "tipoCliente", "lg:w-full")}
                        {renderInput("CIIU", "ciiu", "lg:w-full")}
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {renderInput("Línea de Crédito 1", "lineaCredito1", "lg:w-full")}
                        {renderInput("Línea de Crédito 2", "lineaCredito2", "lg:w-full")}
                        {renderInput("Línea de Crédito 3", "lineaCredito3", "lg:w-full")}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-1">
                  {renderSection("Configuración", (
                    <div className="space-y-3">
                      {[
                        { label: "Extranjero", name: "extranjero" },
                        { label: "Agente Retención", name: "agenteRetencion" },
                        { label: "Activo", name: "activo" },
                        { label: "Mostrar Deuda al Facturar", name: "mostrarDeuda" },
                      ].map((item) => (
                        <label key={item.name} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                          <input
                            type="checkbox"
                            name={item.name}
                            checked={formData[item.name]}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {renderSection("Información SUNAT", (
                <>
                  <div className="mb-4">
                    {renderInput("Nombre Comercial", "nombreComercial", "lg:w-full")}
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {renderInput("Estado SUNAT", "estadoSunat", "lg:w-full")}
                    {renderInput("Condición SUNAT", "condicionSunat", "lg:w-full")}
                  </div>
                </>
              ))}

              <div className="flex justify-end space-x-4 sticky bottom-0 bg-white p-4 border-t shadow-lg">
                <button
                  type="button"
                  onClick={() => navigate("/crear-cliente")}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};