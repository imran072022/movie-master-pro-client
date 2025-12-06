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
        { name: "Add Movie", to: "/movies/add" },
        { name: "Watchlist", to: "movies/watchlist" },
      ]
    : [];

  return (
    <div className=" text-white w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
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
              <motion.button
                onClick={logOut}
                className="
                  px-5 py-2 rounded-xl font-semibold text-white
                  transition-all cursor-pointer btn-gradient-animate2
                "
              >
                Sign Out
              </motion.button>
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

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-gray-900 px-4 pb-4">
          <div className="flex flex-col gap-4">
            {[...navItems, ...privateNavItems].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-lg hover:text-[#d65aff] transition ${
                    isActive ? "text-[#d65aff]" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* Theme toggle (mobile) */}
            <div className="pl-2">
              <ThemeToggle />
            </div>

            {/* MOBILE: If user exists */}
            {user ? (
              <>
                <div className="flex items-center gap-3 mt-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-cyan-400">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCircle size={40} className="text-cyan-400" />
                    )}
                  </div>

                  <span className="text-white">{user.email}</span>
                </div>

                <motion.button
                  onClick={logOut}
                  className="
                  px-5 py-2 rounded-xl font-semibold text-white
                  transition-all cursor-pointer btn-gradient-animate
                "
                >
                  Sign Out
                </motion.button>
              </>
            ) : (
              <>
                <MotionLink
                  to="/login"
                  className="
                  px-5 py-2 rounded-xl font-semibold text-white
                  transition-all cursor-pointer btn-gradient-animate
                "
                  onClick={() => setOpen(false)}
                >
                  Login
                </MotionLink>

                <MotionLink
                  to="/register"
                  className="
                  px-5 py-2 rounded-xl font-semibold text-white
                  transition-all cursor-pointer btn-gradient-animate
                "
                  onClick={() => setOpen(false)}
                >
                  Register
                </MotionLink>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
