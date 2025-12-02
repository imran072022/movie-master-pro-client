import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const FooterCinematic = () => {
  const MotionLink = motion(Link);

  const socialIcons = [
    { icon: <FaFacebookF />, color: "#d65aff", link: "#" },
    { icon: <FaTwitter />, color: "#ff5da1", link: "#" },
    { icon: <FaInstagram />, color: "#00FFC6", link: "#" },
    { icon: <FaYoutube />, color: "#d351ff", link: "#" },
  ];

  const neonLinkHover = {
    textShadow: "0 0 8px #ff5da1",
  };

  const emojiPulse = {
    scale: [1, 1.15, 1],
    textShadow: ["0 0 0px #fff", "0 0 6px #ff5da1", "0 0 0px #fff"],
  };

  const toPath = (label) =>
    "/" +
    label
      .toLowerCase()
      .replace(/\s*&\s*/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .replace(/^-|-$/g, "");

  return (
    <footer className="relative bg-[#111A2B] text-gray-300 py-12 overflow-hidden">
      <motion.div
        className="absolute -top-20 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#d65aff] via-[#ff5da1] to-[#d351ff] opacity-30 blur-3xl"
        animate={{ x: [0, 50, -50, 0], y: [0, -30, 30, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -bottom-20 -right-40 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#00FFC6] via-[#00a3ff] to-[#d351ff] opacity-20 blur-3xl"
        animate={{ x: [0, -50, 50, 0], y: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d65aff] via-[#ff5da1] to-[#d351ff] opacity-60"
        animate={{ x: [0, 300, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <motion.h2
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d65aff] via-[#ff5da1] to-[#d351ff] orbitron"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            MovieMaster Pro
          </motion.h2>

          <p className="text-gray-400 text-sm">
            Explore thousands of movies, collections, and personalized
            recommendations.
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-300 mt-2">
            <motion.div
              className="flex items-center gap-1"
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🎬 <span>5000+ Movies</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-1"
              transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
            >
              ⭐ <span>Top Rated Today</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-1"
              transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
            >
              🎞️ <span>Curated Collections</span>
            </motion.div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            {["Home", "Movies", "Top Rated", "Collections", "Contact"].map(
              (label, idx) => (
                <li key={idx}>
                  <MotionLink
                    to={toPath(label)}
                    whileHover={neonLinkHover}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="inline-block hover:text-[#ff5da1] transition"
                  >
                    {label}
                  </MotionLink>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Resources</h3>
          <ul className="space-y-2">
            {["About", "FAQ", "Terms & Conditions", "Privacy Policy"].map(
              (label, idx) => (
                <li key={idx}>
                  <MotionLink
                    to={toPath(label)}
                    whileHover={neonLinkHover}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="inline-block hover:text-[#d351ff] transition"
                  >
                    {label}
                  </MotionLink>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Connect</h3>
          <div className="flex space-x-4 mb-4 text-2xl">
            {socialIcons.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                whileHover={{
                  scale: 1.3,
                  textShadow: `0 0 8px ${item.color}`,
                  color: item.color,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="cursor-pointer"
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            Join thousands of movie lovers and stay updated on top releases!
          </p>
        </div>
      </div>

      <motion.p
        className="relative text-center text-sm mt-10 text-transparent bg-clip-text bg-gradient-to-r from-[#d65aff] via-[#ff5da1] to-[#d351ff] font-semibold"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        &copy; {new Date().getFullYear()} MovieMaster Pro. Designed with 💜 by
        the MovieMaster Team
      </motion.p>
    </footer>
  );
};

export default FooterCinematic;
