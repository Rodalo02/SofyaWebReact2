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
          open ? "w-64" : "w-20"
        } min-h-screen bg-gradient-to-b from-[#1a1f37] to-[#2c3154] relative duration-300`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 bg-white
           rounded-full border-2 border-[#1a1f37] ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        
        <div className="flex items-center gap-x-4 px-6 py-5 border-b border-gray-700/50">
          <img
            src="./src/assets/Sofya_logo_mini.png"
            className={`w-10 h-10 transition-all duration-500 ${open && "rotate-[360deg]"}`}
            alt="Logo"
          />
          <h1
            className={`text-xl font-bold text-white origin-left duration-300 ${
              !open && "scale-0"
            }`}
          >
            Sofya
          </h1>
        </div>

        <ul className="pt-6 px-4">
          {Menus.map((menu, index) => (
            <li
              key={index}
              onClick={() => menu.path && navigate(menu.path)}
              className={`
                group flex items-center gap-x-4 cursor-pointer
                p-4 text-sm text-gray-300 rounded-xl
                transition-all duration-200 ease-in-out
                hover:bg-white/10 hover:text-white
                ${menu.gap ? "mt-9" : "mt-2"}
                ${index === 0 && "bg-white/10 text-white"}
              `}
            >
              <span className="min-w-[24px]">{menu.icon}</span>
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
                  bg-gray-900 text-white text-sm
                  invisible opacity-20 -translate-x-3 transition-all
                  group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
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