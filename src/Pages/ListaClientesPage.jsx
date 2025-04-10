import React from "react";
import { useNavigate } from "react-router-dom";
import MenuPage from "./MenuPage";
import { motion, AnimatePresence } from "framer-motion";
import MenuCliente from "./MenuCliente";

function ListaClientesPage() {
  const navigate = useNavigate();

  const files = [
    { ruc: "20601239010", cName: "Juan", sharedBy: "Cliente1", size: "Peru", members: "Fa", date: "Activo" },
    { ruc: "23809902343", cName: "Juan2", sharedBy: "Cliente2", size: "Peru", members: "Tm", date: "Activo" },
    { ruc: "23980434908", cName: "Juan3", sharedBy: "Cliente3", size: "China", members: "Ag", date: "Activo" },
    { ruc: "27807401922", cName: "Juan4", sharedBy: "Cliente4", size: "Peru", members: "Ul", date: "Inactivo" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <MenuPage />
      <div className="flex-1 overflow-y-auto">
        <MenuCliente/>

      <AnimatePresence mode="wait">
        <motion.div
          key="clientes"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.3 }}
          className="xl:w-3/4 2xl:w-4/5 w-full"
        >
          <div className="px-4 md:px-10 py-4 md:py-7 flex justify-between items-center">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Clientes</p>
          </div>
          <div className="bg-white px-4 md:px-10 pb-5">
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap border border-gray-300">
                <thead>
                  <tr className="text-sm font-bold text-gray-800 border-b border-gray-300 h-12 bg-gray-200">
                    <th className="text-left pl-2">RUC</th>
                    <th className="text-left pl-16">Nombre</th>
                    <th className="text-left pl-16">País</th>
                    <th className="text-left pl-16">Fatmagul</th>
                    <th className="text-left pl-16">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, index) => (
                    <tr key={index} className={`text-sm leading-none text-gray-600 h-16 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                      <td className="pl-2">{file.ruc}</td>
                      <td className="pl-16">{file.cName}</td>
                      <td className="pl-16">{file.size}</td>
                      <td className="pl-16">{file.members}</td>
                      <td className="pl-16">{file.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </motion.div>
      </AnimatePresence>
    </div>
    </div>
  );
}

export default ListaClientesPage;
