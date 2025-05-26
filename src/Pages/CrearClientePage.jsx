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
    <div className={`w-full ${width} px-2 mb-4`}>
      <label className="block text-gray-700 text-sm font-semibold mb-2">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200
          ${errors[name] ? "border-red-500 ring-red-200" : "border-gray-300"}`}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
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
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">Nuevo Cliente</h2>
              </div>
              <form onSubmit={handleSave} className="p-6">
                <div className="space-y-6">
                  {/* Nombre completo */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-4">{renderInput("Nombre", "nombre", "lg:w-full")}</div>
                    <div className="flex flex-wrap -mx-2">
                      {renderInput("Apellido Paterno", "apPaterno", "lg:w-3/12")}
                      {renderInput("Apellido Materno", "apMaterno", "lg:w-3/12")}
                      {renderInput("Primer Nombre", "nombres1", "lg:w-3/12")}
                      {renderInput("Segundo Nombre", "nombres2", "lg:w-3/12")}
                    </div>
                  </div>

                  {/* Documentos */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex flex-wrap -mx-2">
                      {renderInput("Tipo Documento", "tipoDocumento", "lg:w-2/12")}
                      {renderInput("Número Documento", "numeroDocumento", "lg:w-10/12")}
                    </div>
                  </div>

                  {/* Contacto */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex flex-wrap -mx-2">
                      {renderInput("Correo Principal", "correo1", "lg:w-4/12")}
                      {renderInput("Correo Secundario", "correo2", "lg:w-4/12")}
                      {renderInput("Correo Adicional", "correo3", "lg:w-4/12")}
                    </div>
                  </div>

                  {/* Ubicación */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-4">{renderInput("Dirección", "direccion", "lg:w-full")}</div>
                    <div className="flex flex-wrap -mx-2">
                      {renderInput("País", "pais", "lg:w-3/12")}
                      {renderInput("Departamento", "departamento", "lg:w-3/12")}
                      {renderInput("Provincia", "provincia", "lg:w-3/12")}
                      {renderInput("Distrito", "distrito", "lg:w-3/12")}
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex flex-wrap -mx-2">
                      {renderInput("Teléfono 1", "telefono1", "lg:w-3/12")}
                      {renderInput("Teléfono 2", "telefono2", "lg:w-3/12")}
                      {renderInput("Ubigeo", "ubigeo", "lg:w-2/12")}
                      {renderInput("Longitud", "longitud", "lg:w-2/12")}
                      {renderInput("Latitud", "latitud", "lg:w-2/12")}
                    </div>
                  </div>

                  {/* Contactos */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Contactos</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        {renderInput("Contacto 1", "contacto1", "w-full")}
                        {renderInput("Contacto 2", "contacto2", "w-full")}
                      </div>
                      <div>
                        {renderInput("Cargo 1", "cargo1", "w-full")}
                        {renderInput("Cargo 2", "cargo2", "w-full")}
                      </div>
                    </div>
                  </div>

                  {/* Información comercial */}
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-9/12">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex flex-wrap -mx-2">
                          {renderInput("Forma de Pago", "formaPago", "lg:w-6/12")}
                          {renderInput("Descuento", "descuento", "lg:w-6/12")}
                        </div>
                        <div className="flex flex-wrap -mx-2">
                          {renderInput("Tipo de Venta", "tipoVenta", "lg:w-4/12")}
                          {renderInput("Tipo de Cliente", "tipoCliente", "lg:w-4/12")}
                          {renderInput("CIIU", "ciiu", "lg:w-4/12")}
                        </div>
                        <div className="flex flex-wrap -mx-2">
                          {renderInput("Línea de Crédito 1", "lineaCredito1", "lg:w-4/12")}
                          {renderInput("Línea de Crédito 2", "lineaCredito2", "lg:w-4/12")}
                          {renderInput("Línea de Crédito 3", "lineaCredito3", "lg:w-4/12")}
                        </div>
                      </div>
                    </div>

                    <div className="w-full lg:w-3/12 pl-4">
                      <div className="bg-gray-50 p-4 rounded-lg h-full">
                        <h3 className="text-sm font-semibold mb-4 text-gray-700">Configuración</h3>
                        {[
                          { label: "Extranjero", name: "extranjero" },
                          { label: "Agente Retención", name: "agenteRetencion" },
                          { label: "Activo", name: "activo" },
                          { label: "Mostrar Deuda al Facturar", name: "mostrarDeuda" },
                        ].map((item) => (
                          <div key={item.name} className="mb-3">
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                name={item.name}
                                checked={formData[item.name]}
                                onChange={handleChange}
                                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                              />
                              <span className="ml-2 text-sm text-gray-700">{item.label}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Información SUNAT */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-4">{renderInput("Nombre Comercial", "nombreComercial", "lg:w-full")}</div>
                    <div className="flex flex-wrap -mx-2">
                      {renderInput("Estado SUNAT", "estadoSunat", "lg:w-6/12")}
                      {renderInput("Condición SUNAT", "condicionSunat", "lg:w-6/12")}
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex justify-end space-x-4 mt-8">
                  <button
                    type="button"
                    onClick={() => navigate("/crear-cliente")}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Guardar
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