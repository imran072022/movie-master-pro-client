import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BarChart3, Users } from "lucide-react";

// Counter hook
const useCounter = (value, duration = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof value !== "number") return;

    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) {
        startTimestamp = timestamp;
        setCount(0);
      }
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * value));

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [value, duration]);

  return count;
};

const Statistics = ({ totalMovies = 0, totalUsers = 0 }) => {
  const moviesCount = useCounter(totalMovies);
  const usersCount = useCounter(totalUsers);

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 -z-20 opacity-[0.06] bg-[radial-gradient(circle,_#ffffff30_1px,_transparent_1px)] [background-size:20px_20px]"></div>

      {/* Glowing Background Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="w-80 h-80 bg-purple-600/30 rounded-full blur-[180px] absolute top-16 left-10 animate-blob"></div>
        <div className="w-80 h-80 bg-cyan-400/30 rounded-full blur-[180px] absolute bottom-16 right-10 animate-blob animation-delay-2000"></div>
      </div>

      <h2
        className="text-center text-4xl md:text-5xl font-bold mb-12
             dark:text-white animate-fadeInSlide"
      >
        <span>By the </span>
        <span className="text-[#d65aff] ">Numbers</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto px-5">
        {/* Card 1 - Total Movies */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden cursor-default"
        >
          {/* Decorative Circle */}
          <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-purple-500/20 blur-3xl"></div>

          {/* Icon + Text */}
          <div className="flex items-center gap-4 relative z-10">
            <BarChart3 className="w-14 h-14 text-purple-400" />
            <h3 className="text-lg font-semibold text-gray-300">
              Total Movies
            </h3>
          </div>

          {/* Counter */}
          <motion.p className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mt-6 relative z-10 animate-pulse">
            {moviesCount}
          </motion.p>

          <p className="text-gray-400 mt-2 text-sm relative z-10">
            Movies available on the platform
          </p>

          {/* Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 opacity-0 group-hover:opacity-50 transition-all duration-500 mix-blend-screen animate-shimmer pointer-events-none rounded-3xl"></div>
        </motion.div>

        {/* Card 2 - Unique Users */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden cursor-default"
        >
          {/* Decorative Circle */}
          <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-cyan-400/20 blur-3xl"></div>

          {/* Icon + Text */}
          <div className="flex items-center gap-4 relative z-10">
            <Users className="w-14 h-14 text-cyan-300" />
            <h3 className="text-lg font-semibold text-gray-300">
              Unique Users
            </h3>
          </div>

          {/* Counter */}
          <motion.p className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mt-6 relative z-10 animate-pulse">
            {usersCount}
          </motion.p>

          <p className="text-gray-400 mt-2 text-sm relative z-10">
            People who contributed movies
          </p>

          {/* Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 opacity-0 group-hover:opacity-50 transition-all duration-500 mix-blend-screen animate-shimmer pointer-events-none rounded-3xl"></div>
        </motion.div>
      </div>

      {/* Tailwind Keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -20px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default Statistics;
