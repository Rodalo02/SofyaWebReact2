import { ChartLine, Dog, Handshake, MonitorCog, Search, SquareActivity, Cog, LogOut, Users } from "lucide-react";
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
        } min-h-screen bg-gradient-to-b from-blue-800 to-blue-600 p-5 pt-8 relative duration-300 shadow-xl`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 bg-white
           border-2 rounded-full shadow-md ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/Sofya_logo_mini.png"
            className={`cursor-pointer duration-500 ${open && "rotate-[10deg]"}`}
          />
          <h1 className={`text-white origin-left font-bold text-xl duration-200 ${!open && "scale-0"}`}>
            Sofya
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-lg p-3 cursor-pointer hover:bg-blue-700/50 text-white text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} 
              ${index === 0 && "bg-blue-700/30"}
              transition-all duration-200 ease-in-out`}
              onClick={() => Menu.path && navigate(Menu.path)}
            >
              {Menu.icon}
              <span className={`${!open && "hidden"} origin-left duration-200 font-medium`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuPage;