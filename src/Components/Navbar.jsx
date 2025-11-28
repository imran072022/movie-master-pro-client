import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", to: "/" },
    { name: "All Movies", to: "/movies" },
    { name: "My Collection", to: "/my-collection" },
  ];

  return (
    <div className="bg-black text-white  w-full z-50 shadow-lg">
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

          {/* Polished Neon Button */}
          <button
            className="
            relative px-6 py-2 font-semibold text-white rounded-xl
            bg-gradient-to-r from-[#00CFFF] to-[#8A2BE2]
            shadow-lg shadow-[#00CFFF]/50
            hover:bg-gradient-to-r from-[#00A3FF] to-[#5D00FF]
            transition-colors duration-300
            before:absolute before:inset-0 before:rounded-xl 
            before:bg-gradient-to-r before:from-[#00CFFF]/20 before:to-[#8A2BE2]/20
            before:blur-xl before:-z-10
          "
          >
            Login
          </button>
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

            {/* Neon Button for Mobile */}
            <button
              className="
              relative px-6 py-2 font-semibold text-white rounded-xl
              bg-gradient-to-r from-[#00CFFF] to-[#8A2BE2]
              shadow-lg shadow-[#00CFFF]/50
              hover:bg-gradient-to-r from-[#00A3FF] to-[#5D00FF]
              transition-colors duration-300
              before:absolute before:inset-0 before:rounded-xl 
              before:bg-gradient-to-r before:from-[#00CFFF]/20 before:to-[#8A2BE2]/20
              before:blur-xl before:-z-10
            "
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
