import React, { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
      });
  }, []);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="font-bold text-3xl text-white roboto text-center mt-4 mb-12">
        All movies here
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
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

export default AllMovies;
