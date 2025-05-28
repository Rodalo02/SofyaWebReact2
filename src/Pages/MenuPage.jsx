import { ChartLine, Dog, Handshake, Search, SquareActivity, Cog, LogOut, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMenu } from "../components/MenuContext";
import "../i18n";

const MenuPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { open, setOpen } = useMenu();

  const Menus = [
    { title: t("recent"), icon: <SquareActivity className="w-5 h-5" /> },
    { title: t("search"), icon: <Search className="w-5 h-5" /> },
    { title: t("client"), gap: true, icon: <Users className="w-5 h-5" />, path: "/buscar-cliente" },
    { title: t("accounting"), icon: <ChartLine className="w-5 h-5" /> },
    { title: t("hr"), icon: <Handshake className="w-5 h-5" /> },
    { title: t("fatmagul"), icon: <Dog className="w-5 h-5" /> },
    { title: t("settings"), gap: true, icon: <Cog className="w-5 h-5" /> },
    { title: t("logout"), icon: <LogOut className="w-5 h-5" />, path: "/" },
  ];

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } min-h-screen bg-gradient-to-br from-sky-900 via-blue-800 to-sky-900 relative duration-300 shadow-2xl`}
      >
        <div
          className={`absolute cursor-pointer -right-3 top-9 w-7 h-7 bg-white
           rounded-full border-2 border-blue-500 flex items-center justify-center hover:scale-110 transition-transform duration-200 ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        >
          <img
            src="./src/assets/control.png"
            className="w-4 h-4"
            alt="control"
          />
        </div>
        
        <div className="flex items-center gap-x-4 px-6 py-5 border-b border-blue-500/30">
          <div className={`min-w-[48px] flex items-center justify-center ${!open && 'w-8 h-8'}`}>
            <img
              src="./src/assets/Sofya_logo_mini.png"
              className={`object-contain transition-all duration-500 ${open ? 'w-12 h-12' : 'w-8 h-8'}`}
              alt="Logo"
            />
          </div>
          <h1
            className={`text-2xl font-bold bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent origin-left duration-300 ${
              !open && "scale-0"
            }`}
          >
            Sofya
          </h1>
        </div>

        <ul className="pt-8 px-4">
          {Menus.map((menu, index) => (
            <li
              key={index}
              onClick={() => menu.path && navigate(menu.path)}
              className={`
                group flex items-center gap-x-4 cursor-pointer
                p-4 text-sm rounded-xl
                transition-all duration-300 ease-in-out
                hover:bg-white/10 hover:translate-x-2
                ${menu.gap ? "mt-9" : "mt-2"}
                ${index === 0 ? "bg-gradient-to-r from-blue-500/20 to-transparent text-white" : "text-gray-300"}
              `}
            >
              <span className={`min-w-[24px] transition-colors duration-300 ${index === 0 ? "text-blue-400" : "group-hover:text-blue-400"}`}>
                {menu.icon}
              </span>
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 whitespace-nowrap font-medium`}
              >
                {menu.title}
              </span>
              
              {!open && (
                <div className="
                  absolute left-full rounded-md px-3 py-2 ml-6
                  bg-sky-900 text-white text-sm
                  invisible opacity-20 -translate-x-3 transition-all
                  group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                  backdrop-blur-sm bg-opacity-90 shadow-lg shadow-blue-500/20
                ">
                  {menu.title}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuPage;