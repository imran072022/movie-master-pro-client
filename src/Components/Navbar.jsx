import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X, UserCircle } from "lucide-react";
import { AuthContext } from "../Providers/AuthProvider";
import { motion } from "framer-motion";
import ThemeToggle from "../Components/ThemeToggle";
const MotionLink = motion(Link);
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navItems = [
    { name: "Home", to: "/" },
    { name: "All Movies", to: "/movies" },
  ];

  const privateNavItems = user
    ? [
        { name: "My Collection", to: "/movies/my-collection" },
        { name: "Watchlist", to: "movies/watchlist" },
        { name: "Add Movie", to: "/movies/add" },
      ]
    : [];

  return (
    <div className=" text-white dark:text-black w-full z-50 shadow-sm fixed top-0 bg-black dark:bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold tracking-wide roboto">
          <span>MovieMaster</span>
          <span className="text-[#d65aff]"> Pro</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {[...navItems, ...privateNavItems].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/movies"}
              className={({ isActive }) =>
                `text-lg hover:text-[#d65aff]  transition ${
                  isActive ? "text-[#d65aff] " : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Theme toggle */}
          <ThemeToggle />

          {/* If user is logged in */}
          {user ? (
            <div className="flex items-center gap-4">
              {/* Profile Icon */}
              <div className="w-10 h-10 rounded-full overflow-hidden border border-cyan-400">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserCircle
                    size={40}
                    className="text-cyan-400 cursor-pointer"
                  />
                )}
              </div>

              {/* Logout Button */}
              <MotionLink
                onClick={logOut}
                to="/"
                className="
                  px-5 py-2 rounded-xl font-semibold text-white
                  transition-all cursor-pointer btn-gradient-animate2
                "
              >
                Sign Out
              </MotionLink>
            </div>
          ) : (
            <>
              {/* Login Button */}
              <MotionLink
                to="/login"
                className="
                  px-5 py-2 rounded-xl font-semibold text-white
                  transition-all cursor-pointer btn-gradient-animate2
                "
              >
                Login
              </MotionLink>

              {/* Register Button */}
              <MotionLink
                to="/register"
                className="
                  px-5 py-2 rounded-xl font-semibold text-white
                  transition-all cursor-pointer btn-gradient-animate2
                "
              >
                Register
              </MotionLink>
            </>
          )}
        </div>

        {/*Theme Toggling and mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle></ThemeToggle>
          <button
            className="md:hidden text-white dark:text-black cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-gray-900 dark:bg-gray-100 px-4 pb-4">
          <div className="flex flex-col items-center gap-2">
            {/* User section */}
            {user && (
              <div className="flex flex-col items-center mt-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-cyan-400 mb-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserCircle size={40} className="text-cyan-400" />
                  )}
                </div>
                <span className="text-white dark:text-gray-900 text-center text-sm">
                  {user.email}
                </span>
              </div>
            )}

            {/* Navigation links */}
            <div className="flex flex-col items-center gap-1.5">
              {[...navItems, ...privateNavItems].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/movies"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-medium transition hover:text-[#d65aff] inline-block ${
                      isActive ? "text-[#b12edd]" : "text-white dark:text-black"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Auth buttons */}
            {user ? (
              <motion.button
                onClick={logOut}
                className="mt-4 w-full px-5 py-2 rounded-xl font-semibold text-white transition-all cursor-pointer btn-gradient-animate"
              >
                Sign Out
              </motion.button>
            ) : (
              <div className="flex flex-col items-center gap-2 mt-4 w-full">
                <MotionLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="px-5 py-2 rounded-xl font-semibold text-white transition-all cursor-pointer btn-gradient-animate inline-block"
                >
                  Login
                </MotionLink>
                <MotionLink
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="px-5 py-2 rounded-xl font-semibold text-white transition-all cursor-pointer btn-gradient-animate inline-block"
                >
                  Register
                </MotionLink>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
