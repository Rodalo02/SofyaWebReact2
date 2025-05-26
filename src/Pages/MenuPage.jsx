import { ChartLine, Dog, Handshake, Search, SquareActivity, Cog, LogOut, Users, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMenu } from "../components/MenuContext";
import "../i18n";

const MenuPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { open, setOpen } = useMenu();

  const Menus = [
    { 
      title: t("recent"), 
      icon: <SquareActivity className="w-5 h-5" />,
      color: "from-purple-500 to-purple-600" 
    },
    { 
      title: t("search"), 
      icon: <Search className="w-5 h-5" />,
      color: "from-blue-500 to-blue-600"
    },
    { 
      title: t("client"), 
      icon: <Users className="w-5 h-5" />, 
      path: "/buscar-cliente",
      color: "from-green-500 to-green-600",
      gap: true 
    },
    { 
      title: t("accounting"), 
      icon: <ChartLine className="w-5 h-5" />,
      color: "from-yellow-500 to-yellow-600"
    },
    { 
      title: t("hr"), 
      icon: <Handshake className="w-5 h-5" />,
      color: "from-pink-500 to-pink-600"
    },
    { 
      title: t("fatmagul"), 
      icon: <Dog className="w-5 h-5" />,
      color: "from-indigo-500 to-indigo-600"
    },
    { 
      title: t("settings"), 
      icon: <Cog className="w-5 h-5" />,
      color: "from-gray-600 to-gray-700",
      gap: true 
    },
    { 
      title: t("logout"), 
      icon: <LogOut className="w-5 h-5" />, 
      path: "/",
      color: "from-red-500 to-red-600"
    },
  ];

  return (
    <div className="flex">
      <div 
        className={`${
          open ? "w-64" : "w-20"
        } min-h-screen bg-white relative duration-300 shadow-xl border-r`}
      >
        <button
          onClick={() => setOpen(!open)}
          className={`absolute -right-3 top-9 bg-white border shadow-md rounded-full p-1.5 
          transform transition-transform duration-300 ${!open && "rotate-180"}`}
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>

        <div className="flex items-center gap-x-4 p-4 border-b">
          <img
            src="./src/assets/Sofya_logo_mini.png"
            className={`w-10 h-10 transition-transform duration-500 ${open && "rotate-[360deg]"}`}
            alt="Logo"
          />
          <h1 
            className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent
            origin-left duration-300 ${!open && "scale-0"}`}
          >
            Sofya
          </h1>
        </div>

        <nav className="p-4">
          {Menus.map((menu, index) => (
            <div key={index} className={`${menu.gap ? "mt-9" : "mt-2"}`}>
              <div
                onClick={() => menu.path && navigate(menu.path)}
                className={`
                  group flex items-center gap-x-4 p-3 text-sm rounded-lg cursor-pointer
                  transition-all duration-200 ease-in-out
                  hover:bg-gradient-to-r hover:${menu.color} hover:text-white
                  ${index === 0 ? 'bg-gradient-to-r ' + menu.color + ' text-white' : 'text-gray-600'}
                `}
              >
                <span className={`transition-colors duration-200`}>
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
                  <div className={`
                    absolute left-full rounded-md px-2 py-1 ml-6
                    bg-gradient-to-r ${menu.color} text-white text-sm
                    invisible opacity-20 -translate-x-3 transition-all
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                  `}>
                    {menu.title}
                  </div>
                )}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MenuPage;