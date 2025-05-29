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
        } min-h-screen bg-gradient-to-b from-blue-800 to-sky-900 p-5 relative duration-300`}
      >
        <div
          className={`absolute cursor-pointer -right-3 top-9 w-7 h-7 bg-white
           border-2 border-sky-500 rounded-full flex items-center justify-center ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        >
          <img
            src="./src/assets/control.png"
            className="w-4 h-4"
            alt="control"
          />
        </div>
        
        <div className="flex items-center gap-x-4 border-b border-sky-700/50 pb-4">
          <img
            src="./src/assets/Sofya_logo_mini.png"
            className="w-10 h-10 object-contain"
            alt="Logo"
          />
          <h1
            className={`text-xl font-bold text-sky-100 origin-left duration-300 ${
              !open && "scale-0"
            }`}
          >
            Sofya
          </h1>
        </div>

        <ul className="pt-6 space-y-2">
          {Menus.map((menu, index) => (
            <li
              key={index}
              onClick={() => menu.path && navigate(menu.path)}
              className={`
                flex items-center gap-x-4 cursor-pointer
                p-3 text-sm rounded-lg
                transition-all duration-200
                hover:bg-white/10
                ${menu.gap ? "mt-6" : "mt-1"}
                ${index === 0 ? "bg-sky-800/40 text-white" : "text-sky-100"}
              `}
            >
              <span className={`min-w-[24px] transition-colors duration-200 ${index === 0 ? "text-sky-300" : ""}`}>
                {menu.icon}
              </span>
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 whitespace-nowrap`}
              >
                {menu.title}
              </span>
              
              {!open && (
                <div className="
                  absolute left-full rounded-md px-2 py-1 ml-6
                  bg-sky-800 text-sky-100 text-sm
                  invisible opacity-20 -translate-x-3 transition-all
                  group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                  shadow-lg shadow-black/20
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