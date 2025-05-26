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
    <div className={`w-full ${width} px-2`}>
      <label className="block uppercase text-blueGray-600 text-[10px] font-bold mb-1 p-1">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        className={`border-1 px-2 py-2 text-xs bg-white rounded shadow focus:outline-none focus:ring w-full ${
          errors[name] ? "border-red-500" : "border-zinc-400"
        }`}
      />
      {errors[name] && (
        <p className="text-red-500 text-[10px] mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <MenuPage />
      <div className="flex-1 overflow-y-auto">
        <MenuCliente />
        <section className="py-6 px-4 bg-blueGray-50">
          <div className="w-full lg:w-11/12 mx-auto">
            <div className="bg-gray-100 shadow-lg rounded-lg border-0">
              <div className="px-4 py-4 border-b">
                <h6 className="text-blueGray-700 text-sm font-bold">Nuevo Cliente</h6>
              </div>
              <div className="px-4 py-6">
                <form onSubmit={handleSave}>
                  <div className="flex flex-col">
                    {/* Campo izquierdo: Inputs */}
                    <div>
                      {/* Línea 1 */}
                      <div className="flex-1">{renderInput("dclien", "nombre", "lg:w-full")}</div>

                      {/* Línea 2 */}
                      <div className="flex border-b pb-5">
                        {renderInput("dappat", "apPaterno", "lg:w-3/12")}
                        {renderInput("dapmat", "apMaterno", "lg:w-3/12")}
                        {renderInput("dnombr1", "nombres1", "lg:w-3/12")}
                        {renderInput("dnombr2", "nombres2", "lg:w-3/12")}
                      </div>

                      {/* Línea 3 */}
                      <div className="flex flex-wrap">
                        {renderInput("ctpdci", "tipoDocumento", "lg:w-2/10")}
                        {renderInput("ndcide", "numeroDocumento", "lg:w-8/10")}
                      </div>

                      {/* Línea 4 */}
                      <div className="flex flex-wrap border-b pb-5">
                        {renderInput("demail", "correo1")}
                        {renderInput("demail2", "correo2")}
                        {renderInput("demail3", "correo3")}
                      </div>

                      {/* Línea 5 */}
                      <div className="flex flex-wrap">{renderInput("ddrcli", "direccion", "lg:w-full")}</div>

                      {/* Línea 6 */}
                      <div className="flex flex-wrap">
                        {renderInput("cpaise", "pais", "lg:w-1/4")}
                        {renderInput("cdepard", "departamento", "lg:w-1/4")}
                        {renderInput("cprovid", "provincia", "lg:w-1/4")}
                        {renderInput("cdistrd", "distrito", "lg:w-1/4")}
                      </div>

                      {/* Línea 7 */}
                      <div className="flex flex-wrap">
                        {renderInput("ntfcli", "telefono1", "lg:w-1/2")}
                        {renderInput("ntfcli2", "telefono2", "lg:w-1/2")}
                        {renderInput("dubigeo", "ubigeo")}
                        {renderInput("dlongitud", "longitud")}
                        {renderInput("dlatitud", "latitud")}
                      </div>

                      {/* Línea 8 */}
                      <div className="flex flex-wrap p-3 m-4 rounded-lg bg-gray-200 border">
                        <h5 className="lg:w-full mb-3 ml-2 font-bold">Clientes</h5>
                        <div className="flex-col flex-1/2">
                        {renderInput("drefer1", "contacto1", "lg:w-full")}
                        {renderInput("", "contacto2", "lg:w-full")}
                        </div>
                        <div className="flex-col flex-1/2 lg:w-full">
                        {renderInput("dcargo1", "cargo1", "lg:w-full")}
                        {renderInput("", "cargo2", "lg:w-full")}
                        </div>
                      </div>

                      {/* Campo derecho: Checkboxes y Linea 9 */}
                    <div className="flex flex-wrap">
                      <div className="flex flex-col flex-1">
                      <div className="flex flex-2">
                      {renderInput("ctppag", "formaPago", "lg:w-1/2")}
                      {renderInput("pdscto", "descuento", "lg:w-1/2")}
                      </div>
                      <div className="flex flex-1">
                      {renderInput("ctpvta", "tipoVenta")}
                      {renderInput("ctpven", "tipoCliente")}
                      {renderInput("cociiu", "ciiu")}
                      </div>
                      <div className="flex flex-1">
                        {renderInput("cmonli", "lineaCredito1")}
                        {renderInput("ilinea", "lineaCredito2")}
                        {renderInput("dlinea", "lineaCredito3")}
                      </div>
                      </div>
                    <div className="w-full lg:w-3/12 px-4 mt-4">
                      <div className="bg-gray-200 border rounded-lg p-4">
                        {[
                          { label: "Extranjero", name: "extranjero" },
                          { label: "Agente Retención", name: "agenteRetencion" },
                          { label: "Activo", name: "activo" },
                          { label: "Mostrar Deuda al Facturar", name: "mostrarDeuda" },
                        ].map((item) => (
                          <div key={item.name} className="mb-0.5 mt-0.5 p-1">
                            <label className="inline-flex items-center text-xs">
                              <input
                                type="checkbox"
                                name={item.name}
                                checked={formData[item.name]}
                                onChange={handleChange}
                                className="form-checkbox h-4 w-4 text-blue-600"
                              />
                              <span className="ml-2">{item.label}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    </div>
                  </div>

                      {/* Línea 13 */}
                      <div className="flex flex-wrap">{renderInput("dcomer", "nombreComercial", "lg:w-full")}</div>

                      {/* Línea 14 */}
                      <div className="flex flex-wrap">
                        {renderInput("ssunat", "estadoSunat", "lg:w-1/2")}
                        {renderInput("scondi", "condicionSunat", "lg:w-1/2")}
                      </div>
                    </div>

                  {/* Botones */}
                  <div className="flex justify-end mt-6">
                    <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 m-1 rounded shadow hover:bg-blue-600">
                      Guardar
                    </button>
                    <button
                      type="button"
                      className="bg-black text-white font-bold py-2 px-4 m-1 rounded shadow hover:bg-black"
                      onClick={() => navigate("/crear-cliente")}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};