import { div } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard";

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/movies/top-rated")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
      });
  }, []);

  return (
    <div className="py-12">
      <h2
        className="text-center text-4xl md:text-5xl font-bold mb-12
             text-white animate-fadeInSlide"
      >
        <span className="text-white">Top Rated </span>
        <span className="text-[#d65aff] ">Today</span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-7 max-w-7xl mx-auto">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            _id={movie._id}
            title={movie.title}
            genre={movie.genre}
            releaseYear={movie.releaseYear}
            rating={movie.rating}
            posterUrl={movie.posterUrl}
          ></MovieCard>
        ))}
      </div>
    </div>
  );
};

export default TopRated;
