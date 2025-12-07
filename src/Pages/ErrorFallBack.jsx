import React from "react";
import { motion } from "framer-motion";
import { Link, useRouteError } from "react-router";
import Lottie from "lottie-react";
import errorBoundary from "../assets/lotties/errorBoundary.json";
const ErrorFallBack = () => {
  const error = useRouteError();
  console.error("ErrorBoundary caught an error:", error);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-white px-4">
      <title>Something is wrong!</title>
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
          <Lottie animationData={errorBoundary} loop={true} />
        </div>

        {/* Description text */}
        <motion.h2
          className="text-gray-900  font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Oops! Something went wrong.
        </motion.h2>
        <p className=" text-gray-600 mb-4">
          {error?.statusText || error?.message || "Unknown error occurred."}
        </p>

        {/* Back to home button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to="/"
            replace={true}
            onClick={() => window.location.reload()}
            className="px-5 py-2 rounded-xl font-semibold text-white transition-all cursor-pointer btn-gradient-animate2"
          >
            Reload page
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorFallBack;
