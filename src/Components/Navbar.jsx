import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X, UserCircle } from "lucide-react";
import { AuthContext } from "../Providers/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../Components/ThemeToggle";

const MotionLink = motion(Link);

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: "Home", to: "/" },
    { name: "All Movies", to: "/movies" },
  ];

  const privateNavItems = user
    ? [
        { name: "My Collection", to: "/movies/my-collection" },
        { name: "Watchlist", to: "/movies/watchlist" },
        { name: "Add Movie", to: "/movies/add" },
      ]
    : [];

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-black dark:bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl md:text-3xl font-bold tracking-wide roboto text-white dark:text-black"
        >
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
                `text-lg hover:text-[#d65aff] transition ${
                  isActive ? "text-[#d65aff]" : "text-white dark:text-black"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <ThemeToggle />

          {/* Auth Buttons */}
          {!loading &&
            (user ? (
              <div className="flex items-center gap-4">
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

                <MotionLink
                  onClick={logOut}
                  to="/"
                  className="px-5 py-2 rounded-xl font-semibold text-white transition-all cursor-pointer btn-gradient-animate2"
                >
                  Sign Out
                </MotionLink>
              </div>
            ) : (
              <>
                <MotionLink
                  to="/login"
                  className="px-5 py-2 rounded-xl font-semibold text-white transition-all cursor-pointer btn-gradient-animate2"
                >
                  Login
                </MotionLink>
                <MotionLink
                  to="/register"
                  className="px-5 py-2 rounded-xl font-semibold text-white transition-all cursor-pointer btn-gradient-animate2"
                >
                  Register
                </MotionLink>
              </>
            ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button
            className="ml-2 text-white dark:text-black"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar with Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black dark:bg-gray-200 z-40"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-64 bg-[#1a1a2e] dark:bg-white z-50 shadow-lg flex flex-col p-5"
            >
              {/* Close Button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-white dark:text-black"
                >
                  <X size={28} />
                </button>
              </div>

              {/* User Section */}
              {!loading && user && (
                <div className="flex flex-col items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-cyan-400 mb-2">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCircle size={64} className="text-cyan-400" />
                    )}
                  </div>
                  <span className="text-white dark:text-gray-900 text-center text-sm">
                    {user.email}
                  </span>
                </div>
              )}

              {/* Navigation Links */}
              <div className="flex flex-col gap-3 mb-6">
                {[...navItems, ...privateNavItems].map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/movies"}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `text-lg font-medium transition hover:text-[#d65aff] ${
                        isActive
                          ? "text-[#b12edd]"
                          : "text-white dark:text-black"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>

              {/* Auth Buttons */}
              {!loading && (
                <div className="mt-auto">
                  {user ? (
                    <motion.button
                      onClick={() => {
                        logOut();
                        setSidebarOpen(false);
                      }}
                      className="w-full px-5 py-2 rounded-xl font-semibold text-white transition-all cursor-pointer btn-gradient-animate"
                    >
                      Sign Out
                    </motion.button>
                  ) : (
                    <div className="flex flex-col gap-2 w-full">
                      <MotionLink
                        to="/login"
                        onClick={() => setSidebarOpen(false)}
                        className="text-center px-5 py-2 rounded-xl font-semibold text-white transition-all cursor-pointer btn-gradient-animate"
                      >
                        Login
                      </MotionLink>
                      <MotionLink
                        to="/register"
                        onClick={() => setSidebarOpen(false)}
                        className="text-center px-5 py-2 rounded-xl font-semibold text-white transition-all cursor-pointer btn-gradient-animate"
                      >
                        Register
                      </MotionLink>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
