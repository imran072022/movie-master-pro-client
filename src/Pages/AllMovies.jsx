import React, { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import useWatchlist from "../hooks/useWatchlist";
import MovieCardSkeleton from "../Components/MovieCardSkeleton";
import Loading from "../Components/Loading";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handleWatchList } = useWatchlist();
  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
        setLoading(false);
      });
  }, []);
  if (loading) return <Loading></Loading>;
  return (
    <div className="max-w-7xl mx-auto py-12 md:py-24">
      <h2
        className="text-center text-4xl md:text-5xl font-bold mb-12
             dark:text-white animate-fadeInSlide roboto"
      >
        <span>Browse </span>
        <span className="text-[#d65aff] "> Movies</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {loading
          ? Array.from({ length: 50 }).map((_, index) => {
              <MovieCardSkeleton key={index}></MovieCardSkeleton>;
            })
          : movies.map((movie) => (
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

export default AllMovies;
