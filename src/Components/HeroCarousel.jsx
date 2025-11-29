import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  Keyboard,
  A11y,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroCarousel({ movies = [] }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="max-w-7xl mx-auto my-16">
      <h2 className="font-bold text-3xl text-white mb-4">Featured Movies</h2>;
      <div className="relative w-6xl mx-auto ">
        {/* Navigation buttons */}
        <button
          ref={prevRef}
          className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-20 flex items-center justify-center rounded-lg bg-black/40 text-white text-3xl font-bold shadow-lg hover:bg-blue-600 transition-colors duration-200"
        >
          ‹
        </button>
        <button
          ref={nextRef}
          className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-20 flex items-center justify-center rounded-lg bg-black/40 text-white text-3xl font-bold shadow-lg hover:bg-blue-600 transition-colors duration-200"
        >
          ›
        </button>

        <Swiper
          modules={[Navigation, Autoplay, Keyboard, A11y]}
          slidesPerView={4}
          spaceBetween={16}
          loop={movies.length >= 4}
          speed={700}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          keyboard={{ enabled: true }}
          a11y={{ enabled: true }}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation !== "boolean") {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          breakpoints={{
            320: { slidesPerView: 1.5, spaceBetween: 12 },
            640: { slidesPerView: 2, spaceBetween: 14 },
            768: { slidesPerView: 3, spaceBetween: 16 },
            1024: { slidesPerView: 4, spaceBetween: 16 },
          }}
          className="pb-12"
        >
          {movies.map((movie, i) => (
            <SwiperSlide key={movie.id || i} className="cursor-pointer">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -8, opacity: 0.9 }}
                className="rounded-lg overflow-hidden"
              >
                <img
                  src={movie.carouselURL || movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-[326px] object-contain bg-black"
                />
                <div className="mt-2 text-white text-sm px-1">
                  <h3 className="font-semibold line-clamp-1">{movie.title}</h3>
                  <div className="flex justify-between text-xs opacity-80 mt-1">
                    <span>{movie.genre}</span>
                    <span>⭐ {movie.rating}</span>
                    <span>{movie.releaseYear}</span>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination below carousel */}
        <div className="custom-pagination flex justify-center mt-4"></div>

        <style jsx>{`
          .custom-pagination .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background-color: #888888;
            opacity: 1;
            margin: 0 4px;
          }
          .custom-pagination .swiper-pagination-bullet-active {
            background-color: #3b82f6;
          }
        `}</style>
      </div>
    </div>
  );
}
