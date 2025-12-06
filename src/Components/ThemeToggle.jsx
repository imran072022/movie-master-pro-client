import { useContext } from "react";
import { ThemeContext } from "../Providers/ThemeProvider";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full dark:bg-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500 cursor-pointer transition-colors"
    >
      {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
};

export default ThemeToggle;
