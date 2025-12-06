import React, { useEffect, useState, useRef, useCallback } from "react";
import MovieCard from "../Components/MovieCard";
import useWatchlist from "../hooks/useWatchlist";
import Loading from "../Components/Loading";
import { toast } from "react-hot-toast";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { handleWatchList } = useWatchlist();
  const dropdownRef = useRef(null);

  // Wrap fetchMovies in useCallback to avoid infinite re-renders
  const fetchMovies = useCallback(async (filterQuery = "") => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/movies/filter${filterQuery}`
      );
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast.error("Failed to fetch movies");
    } finally {
      // Use setTimeout to defer state update to next tick
      setTimeout(() => setLoading(false), 0);
    }
  }, []);

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("http://localhost:3000/movies/genres");
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  // Fetch all movies initially
  useEffect(() => {
    // Call fetchMovies in an async function to avoid synchronous setState
    const fetchInitialMovies = async () => {
      await fetchMovies();
    };

    fetchInitialMovies();
  }, [fetchMovies]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGenreToggle = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleFilter = async () => {
    if (
      minRating &&
      maxRating &&
      parseFloat(minRating) > parseFloat(maxRating)
    ) {
      toast.error("Minimum rating cannot be greater than maximum rating");
      return;
    }

    const genreParam = selectedGenres.join(",");
    let query = "?";
    if (genreParam) query += `genres=${genreParam}&`;
    if (minRating) query += `minRating=${minRating}&`;
    if (maxRating) query += `maxRating=${maxRating}`;

    await fetchMovies(query);
    setDropdownOpen(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto py-12 md:py-24">
      <h2 className="text-center text-4xl md:text-5xl font-bold mb-12 text-white animate-fadeInSlide roboto">
        <span>Browse </span>
        <span className="text-[#d65aff] "> Movies</span>
      </h2>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-center relative z-10">
        {/* Genre Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="bg-[#222] cursor-pointer text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-[#333]"
          >
            Genres <span className="ml-1">&#9662;</span>
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-[#222] border border-gray-600 rounded shadow-lg z-50 overflow-hidden">
              {genres.map((genre) => (
                <label
                  key={genre}
                  className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-[#333]"
                >
                  <span className="text-white">{genre}</span>
                  <input
                    className="checkbox checkbox-secondary"
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleGenreToggle(genre)}
                  />
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Rating Inputs */}
        <div className="flex gap-2 items-center">
          <input
            type="number"
            min={0}
            max={10}
            step={0.1}
            placeholder="Min Rating"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="p-2 rounded w-28  text-white placeholder-gray-300"
          />
          <input
            type="number"
            min={0}
            max={10}
            step={0.1}
            placeholder="Max Rating"
            value={maxRating}
            onChange={(e) => setMaxRating(e.target.value)}
            className="p-2 rounded w-28  text-white placeholder-gray-300"
          />
        </div>

        {/* Apply Filter */}
        <button
          onClick={handleFilter}
          className=" 
                  px-5 py-2 rounded-xl font-semibold text-white
                  transition-all cursor-pointer btn-gradient-animate2
                "
        >
          Apply Filter
        </button>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 relative z-0">
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
          />
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
