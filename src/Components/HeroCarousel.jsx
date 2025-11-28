import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import coc from "../assets/coc.jpg";
import modernWarship from "../assets/modernWarship.jpg";
import mlbb from "../assets/mlbb.jpg";
import pubg from "../assets/pubg.webp";
import ff from "../assets/ff.jpg";

const HeroCarousel = () => {
  const images = [coc, modernWarship, mlbb, pubg, ff];

  return (
    <div className="w-full max-w-6xl mx-auto mt-2.5">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 180,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="mySwiper"
      >
        {images.map((img, idx) => (
          <SwiperSlide
            key={idx}
            className="w-[320px] h-[420px] rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src={img}
              alt="carousel"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
