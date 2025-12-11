import React, { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import useWatchlist from "../hooks/useWatchlist";
import Loading from "../Components/Loading";

const WatchList = () => {
  const { entries } = useWatchlist();
  const [movies, setMovies] = useState(null); // null = not fetched yet
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    if (!entries || entries.length === 0) {
      if (mounted) {
        setMovies([]); // No entries
        setLoading(false);
      }
      return;
    }

    (async () => {
      setLoading(true);
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
            console.error("Failed to fetch movie", entry.movieId, err);
            return null;
          }
        })
      );

      if (mounted) {
        setMovies(details.filter(Boolean));
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [entries]);

  if (loading || movies === null) return <Loading />; // show loading until fetch completes

  return (
    <div className="py-28 md:py-40">
      <h2 className="text-center text-4xl md:text-5xl font-bold mb-12 text-white animate-fadeInSlide dark:text-black roboto">
        <span>Your </span>
        <span className="text-[#d65aff] "> Watchlist</span>
      </h2>

      {movies.length === 0 ? (
        <div className="col-span-full py-14">
          <p className="text-center font-bold text-3xl text-gray-400">
            No movies in your watchlist yet.
          </p>
        </div>
      ) : (
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchList;
