import React, { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import useWatchlist from "../hooks/useWatchlist";

const WatchList = () => {
  const { entries } = useWatchlist();
  const [movies, setMovies] = useState([]);

  // When watchlist entries change, fetch the full movie details for each entry
  useEffect(() => {
    let mounted = true;
    if (!entries || entries.length === 0) {
      setMovies([]);
      return;
    }

    (async () => {
      const details = await Promise.all(
        entries.map(async (entry) => {
          try {
            const r = await fetch(
              `http://localhost:3000/movie/${entry.movieId}`
            );
            if (!r.ok) return null;
            const movie = await r.json();
            return { ...movie, _watchlistId: entry._id };
          } catch (err) {
            console.error(
              "Failed to fetch movie details for",
              entry.movieId,
              err
            );
            return null;
          }
        })
      );

      if (mounted) setMovies(details.filter(Boolean));
    })();

    return () => {
      mounted = false;
    };
  }, [entries]);

  return (
    <div className="py-24">
      <h2
        className="text-center text-4xl md:text-5xl font-bold mb-12
             text-white animate-fadeInSlide"
      >
        <span className="text-white">Your </span>
        <span className="text-[#d65aff] "> Watchlist</span>
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

export default WatchList;
