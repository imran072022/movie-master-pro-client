import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

/* Genre images importing */
import scifi from "../../assets/scifi.jpg";
import action from "../../assets/action.webp";
import thriller from "../../assets/thriller.jpg";
import romance from "../../assets/romance.jpg";
import history from "../../assets/history.png";
import animation from "../../assets/animation.webp";
import adventure from "../../assets/adventure.webp";
import biography from "../../assets/biography.jpg";
import crime from "../../assets/crime.jpg";
import mystery from "../../assets/mystery.avif";
import musical from "../../assets/musical.jpg";
import fantasy from "../../assets/fantasy.jpg";
import drama from "../../assets/drama.webp";

const GenreCarousel = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movies/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data))
      .catch((err) => console.error(err));
  }, []);

  const genreImages = {
    "Sci-Fi": scifi,
    Action: action,
    Thriller: thriller,
    Crime: crime,
    Drama: drama,
    Animation: animation,
    Romance: romance,
    History: history,
    Fantasy: fantasy,
    Mystery: mystery,
    Musical: musical,
    Adventure: adventure,
    Biography: biography,
  };

  return (
    <div className="py-12 ">
      <h2
        className="text-center text-4xl md:text-5xl font-bold mb-12
             text-white animate-fadeInSlide"
      >
        <span className="text-white">Browse by</span>
        <span className="text-[#d65aff] "> Genre</span>
      </h2>
      <Swiper
        modules={[Navigation]}
        slidesPerView={4}
        spaceBetween={24}
        navigation={true}
        loop={false}
        breakpoints={{
          320: { slidesPerView: 1.5, spaceBetween: 12 },
          640: { slidesPerView: 2, spaceBetween: 14 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 16 },
        }}
        className="my-genre-swiper"
      >
        {genres.map((genre) => (
          <SwiperSlide key={genre}>
            <div className="cursor-pointer">
              <div className="relative w-full aspect-[5/3] rounded-t-2xl overflow-hidden">
                <img
                  src={genreImages[genre]}
                  alt={genre}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="text-center font-semibold bg-[#1A1A1A] text-white py-1.5 rounded-b-2xl">
                {genre}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GenreCarousel;
