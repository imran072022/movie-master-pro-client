import { useContext } from "react";
import { ThemeContext } from "../Providers/ThemeProvider";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full  hover:bg-gray-500 dark:hover:bg-gray-300
       cursor-pointer transition-colors text-white dark:text-black"
    >
      {theme === "dark" ? <FiMoon size={20} /> : <FiSun size={20} />}
    </button>
  );
};

export default ThemeToggle;
