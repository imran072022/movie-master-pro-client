import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#111A2B] text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Logo / Copyright */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#d351ff] mb-3">
              MovieMaster Pro
            </h2>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} MovieMaster Pro. All rights
              reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-[#ff5da1] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/movies"
                  className="hover:text-[#ff5da1] transition-colors"
                >
                  Movies
                </a>
              </li>
              <li>
                <a
                  href="/top-rated"
                  className="hover:text-[#ff5da1] transition-colors"
                >
                  Top Rated
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-[#ff5da1] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-[#d351ff] transition-colors"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#ff5da1] transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#00FFC6] transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#d351ff] transition-colors"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
          Designed with 💜 by MovieMaster Team
        </div>
      </div>
    </footer>
  );
};

export default Footer;
