import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X, UserCircle } from "lucide-react";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", to: "/" },
    { name: "All Movies", to: "/movies" },
    { name: "My Collection", to: "/my-collection" },
  ];

  return (
    <div className="bg-black text-white w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide font-inter">
          MovieMaster Pro
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-lg hover:text-cyan-400 transition ${
                  isActive ? "text-cyan-400" : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

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
              <button
                onClick={logOut}
                className="
                  px-5 py-2 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-red-500 to-pink-600
                  hover:brightness-110 transition-all cursor-pointer
                "
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              {/* Login Button */}
              <Link
                to="/login"
                className="
                  relative px-6 py-2 font-semibold text-white rounded-xl
                  bg-gradient-to-r from-[#00CFFF] to-[#8A2BE2]
                  shadow-lg shadow-[#00CFFF]/50
                  hover:bg-gradient-to-r from-[#00A3FF] to-[#5D00FF]
                  transition-colors duration-300
                "
              >
                Login
              </Link>

              {/* Register Button */}
              <Link
                to="/register"
                className="
                  relative px-6 py-2 font-semibold text-white rounded-xl
                  bg-gradient-to-r from-[#00CFFF] to-[#8A2BE2]
                  shadow-lg shadow-[#00CFFF]/50
                  hover:bg-gradient-to-r from-[#00A3FF] to-[#5D00FF]
                  transition-colors duration-300
                "
              >
                Register
              </Link>
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
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-lg hover:text-cyan-400 transition block ${
                    isActive ? "text-cyan-400" : "text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

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

                <button
                  onClick={logOut}
                  className="
                    mt-3 px-5 py-2 rounded-xl font-semibold text-white
                    bg-gradient-to-r from-red-500 to-pink-600
                    hover:brightness-110 transition-all
                  "
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="
                    mt-3 px-6 py-2 rounded-xl text-white font-semibold
                    bg-gradient-to-r from-[#00CFFF] to-[#8A2BE2]
                  "
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="
                    px-6 py-2 rounded-xl text-white font-semibold
                    bg-gradient-to-r from-[#00CFFF] to-[#8A2BE2]
                  "
                  onClick={() => setOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
