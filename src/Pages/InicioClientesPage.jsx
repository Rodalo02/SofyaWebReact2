import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CirclePlus } from 'lucide-react';
import MenuPage from "./MenuPage"; // Este es tu menú lateral
import { useMenu } from "../components/MenuContext"; // importar el contexto
import { useNavigate } from "react-router-dom";
import MenuCliente from "./MenuCliente";

const categorias = [
  "Nombre",
  "Apellido",
  "Tipo de documento",
  "Correo",
  "Dirección",
  "País",
  "Departamento",
  "Provincia",
  "Distrito",
  "Teléfono",
  "Estado Sunat",
  "RUC",
  "Número de doc"
];

const SearchBar = ({ index, value, category, onChange, onCategoryChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const { open } = useMenu(); // acceder al estado del menú


  const handleSelect = (option) => {
    onCategoryChange(index, option);
    setDropdownOpen(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="flex relative mt-4 items-center"
    >
      <button
        type="button"
        onClick={toggleDropdown}
        className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600"
      >
        {category}
        <svg
          className="w-2.5 h-2.5 ms-2.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {dropdownOpen && (
        <div className="absolute top-12 left-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {categorias.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => handleSelect(cat)}
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="relative w-full">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(index, e.target.value)}
          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:text-white"
          placeholder={`Buscar por ${category.toLowerCase()}...`}
        />
      </div>
    </motion.div>
  );
};

const InicioClientesPage = () => {
  const [searchBars, setSearchBars] = useState([
    { value: "", category: "Nombre" },
  ]);

  const handleInputChange = (index, newValue) => {
    const updatedBars = [...searchBars];
    updatedBars[index].value = newValue;
    setSearchBars(updatedBars);
  };

  const handleCategoryChange = (index, newCategory) => {
    const updatedBars = [...searchBars];
    updatedBars[index].category = newCategory;
    setSearchBars(updatedBars);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = searchBars.filter((bar) => bar.value.trim() !== "");
    console.log("Buscar con filtros:", filters);
  };

  const handleAddSearchBar = () => {
    setSearchBars([...searchBars, { value: "", category: "Nombre" }]);
  };

  const navigate = useNavigate();

  return (
    <div className="flex">
  <MenuPage />  
  <div className={`flex-1 transition-all duration-300`}>
  <MenuCliente/>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-6">
          <AnimatePresence>
            {searchBars.map((bar, index) => (
              <SearchBar
                key={index}
                index={index}
                value={bar.value}
                category={bar.category}
                onChange={handleInputChange}
                onCategoryChange={handleCategoryChange}
              />
            ))}
          </AnimatePresence>

          <div className="flex justify-between mt-4 w-full">
            <button
            onClick={() => navigate('/lista-clientes')}
              type="submit"
              className="w-full mb-3 text-sm font-medium text-white bg-blue-700 rounded-lg py-2 px-6 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Buscar
            </button>

            <button
              type="button"
              onClick={handleAddSearchBar}
              className="w-10 h-10 mb-3 bg-green-500 text-white rounded-lg flex justify-center items-center text-lg ml-1"
            >
              <CirclePlus />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InicioClientesPage;
