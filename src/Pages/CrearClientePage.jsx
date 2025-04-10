import ClientesPage from "./ListaClientesPage";
import MenuPage from "./MenuPage";
import { useNavigate } from "react-router-dom";
import MenuCliente from "./MenuCliente";

export const AccountForm = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <MenuPage />
      <div className="flex-1 overflow-y-auto">
        {/* Header fijo */}
        <MenuCliente/>

        {/* Contenido del formulario */}
        <section className="py-6 px-4 bg-blueGray-50">
          <div className="w-full lg:w-8/12 mx-auto">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-4 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t bg-white px-4 py-4">
                <div className="text-center flex justify-between">
                  <h6 className="text-blueGray-700 text-sm font-bold">Nuevo Cliente</h6>
                </div>
              </div>
              <div className="flex-auto px-4 py-6 pt-0">
                            <form>
                                <div className="flex flex-wrap">
                                    {["Nombre", "Apellido Paterno", "Apellido Materno"].map((label, index) => (
                                        <div className="w-full lg:w-4/12 px-2" key={index}>
                                            <div className="relative w-full mb-2">
                                                <label className="block uppercase text-blueGray-600 text-[10px] font-bold mb-1">{label}</label>
                                                <input type="text" className="border-0 px-2 py-2 text-xs bg-white rounded shadow focus:outline-none focus:ring w-full" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-2">
                                        <div className="relative w-full mb-2">
                                            <label className="block uppercase text-blueGray-600 text-[10px] font-bold mb-1">Tipo de Documento</label>
                                            <select className="border-0 px-2 py-2 text-xs bg-white rounded shadow focus:outline-none focus:ring w-full">
                                                <option>DNI</option>
                                                <option>RUC</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-2">
                                        <div className="relative w-full mb-2">
                                            <label className="block uppercase text-blueGray-600 text-[10px] font-bold mb-1">Número de Documento</label>
                                            <input type="text" className="border-0 px-2 py-2 text-xs bg-white rounded shadow focus:outline-none focus:ring w-full" />
                                        </div>
                                    </div>
                                </div>
                                {["Correo", "Correo 2", "Correo 3"].map((label, index) => (
                                    <div className="w-full lg:w-4/12 px-2" key={index}>
                                        <div className="relative w-full mb-2">
                                            <label className="block uppercase text-blueGray-600 text-[10px] font-bold mb-1">{label}</label>
                                            <input type="email" className="border-0 px-2 py-2 text-xs bg-white rounded shadow focus:outline-none focus:ring w-full" />
                                        </div>
                                    </div>
                                ))}
                                <div className="w-full px-2">
                                    <div className="relative w-full mb-2">
                                        <label className="block uppercase text-blueGray-600 text-[10px] font-bold mb-1">Dirección</label>
                                        <input type="text" className="border-0 px-2 py-2 text-xs bg-white rounded shadow focus:outline-none focus:ring w-full" />
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    {["País", "Departamento", "Provincia", "Distrito"].map((label, index) => (
                                        <div className="w-full lg:w-3/12 px-2" key={index}>
                                            <div className="relative w-full mb-2">
                                                <label className="block uppercase text-blueGray-600 text-[10px] font-bold mb-1">{label}</label>
                                                <input type="text" className="border-0 px-2 py-2 text-xs bg-white rounded shadow focus:outline-none focus:ring w-full" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-wrap">
                                    {["Teléfono 1", "Teléfono 2", "CIU"].map((label, index) => (
                                        <div className="w-full lg:w-4/12 px-2" key={index}>
                                            <div className="relative w-full mb-2">
                                                <label className="block uppercase text-blueGray-600 text-[10px] font-bold mb-1">{label}</label>
                                                <input type="text" className="border-0 px-2 py-2 text-xs bg-white rounded shadow focus:outline-none focus:ring w-full" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-wrap">
                                    {["Estado Sunat", "Condición Sunat"].map((label, index) => (
                                        <div className="w-full lg:w-6/12 px-2" key={index}>
                                            <div className="relative w-full mb-2">
                                                <label className="block uppercase text-blueGray-600 text-[10px] font-bold mb-1">{label}</label>
                                                <input type="text" className="border-0 px-2 py-2 text-xs bg-white rounded shadow focus:outline-none focus:ring w-full" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button className="bg-blue-500 text-white font-bold py-2 px-4 m-1 rounded shadow hover:bg-blue-600">Grabar</button>
                                    <button type="button" className="bg-black text-white font-bold py-2 px-4 m-1 rounded shadow hover:bg-black" onClick={() => navigate("/clientes")}>Cancelar</button>
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