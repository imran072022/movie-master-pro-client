import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Lottie from "lottie-react";
import error404 from "../assets/lotties/Error404.json";

const Page404 = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 
                dark:bg-gradient-to-br dark:from-purple-100 dark:via-pink-50 dark:to-white 
                bg-gradient-to-br from-gray-900 via-gray-800 to-black"
    >
      <title>Page Not Found</title>
      {/* Center glow container */}
      <motion.div
        className="w-full max-w-lg p-8 flex flex-col items-center text-center rounded-2xl
                   bg-gradient-to-b from-white/20 via-white/40 to-white/10
                   shadow-lg shadow-[#00A3FF]/20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Lottie animation */}
        <div className="w-64 md:w-96 mb-4">
          <Lottie animationData={error404} loop={true} />
        </div>

        {/* Description text */}
        <motion.p
          className="text-gray-200 dark:text-gray-900 mb-6 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Looks like this page doesn’t exist or has been moved.
        </motion.p>

        {/* Back to home button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to="/"
            replace={true}
            className="btn-gradient-animate text-white  font-semibold py-2 px-6 rounded-lg hover:opacity-90 transition"
          >
            Go Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page404;
