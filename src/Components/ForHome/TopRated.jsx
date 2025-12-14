import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import useWatchlist from "../../hooks/useWatchlist";
import "react-loading-skeleton/dist/skeleton.css";

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handleWatchList } = useWatchlist();
  useEffect(() => {
    fetch(
      "https://movie-master-pro-server-p31s3i7uw.vercel.app/movies/top-rated"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-12 px-2.5">
      <h2
        className="text-center text-4xl md:text-5xl font-bold mb-12
             text-white dark:text-black animate-fadeInSlide"
      >
        <span>Top Rated </span>
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
            handleWatchList={handleWatchList}
          ></MovieCard>
        ))}
      </div>
    </div>
  );
};

export default TopRated;
