import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router";
import Loading from "../Components/Loading";

const UpdateMovie = () => {
  const location = useLocation();
  const { id } = useParams();
  const movieFromState = location.state?.movie;
  const [movie, setMovie] = useState(movieFromState || null);
  const [loading, setLoading] = useState(!movieFromState);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!movieFromState) {
      fetch(`https://movie-master-pro-server-p31s3i7uw.vercel.app/movie/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setMovie(data);
          setLoading(false);
        });
    }
  }, [id, movieFromState]);
  if (loading) return <Loading></Loading>;

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedMovie = {
      title: form.title.value,
      genre: form.genre.value,
      releaseYear: parseInt(form.releaseYear.value),
      director: form.director.value,
      cast: form.cast.value.split(",").map((c) => c.trim()),
      rating: parseFloat(form.rating.value),
      duration: parseInt(form.duration.value),
      plotSummary: form.plotSummary.value,
      posterUrl: form.posterUrl.value,
      language: form.language.value,
      country: form.country.value,
      featured: form.featured.value === "true",
      addedBy: movie.addedBy,
    };

    fetch(
      `https://movie-master-pro-server-p31s3i7uw.vercel.app/movies/update/${movie._id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedMovie),
      }
    )
      .then((res) => res.json())
      .then(() => toast.success("Movie updated successfully!"));
  };

  const inputs = [
    { name: "title", label: "Movie Title", type: "text" },
    { name: "genre", label: "Genre", type: "text" },
    { name: "releaseYear", label: "Release Year", type: "number" },
    { name: "director", label: "Director", type: "text" },
    { name: "cast", label: "Cast (comma-separated)", type: "text" },
    { name: "rating", label: "Rating (0-10)", type: "number", step: "0.1" },
    { name: "duration", label: "Duration (minutes)", type: "number" },
    { name: "posterUrl", label: "Poster URL", type: "url" },
    { name: "language", label: "Language", type: "text" },
    { name: "country", label: "Country", type: "text" },
  ];

  return (
    <div
      className="
        relative min-h-screen flex justify-center items-center p-4 overflow-hidden py-28 md:py-40
        
        /* DARK MODE */
        bg-[radial-gradient(circle_at_center,_#25163b_0%,_#1a1a2e_60%,_#000000_100%)]
        
        /* LIGHT MODE - Same premium gradient */
        dark:bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#f8f4ff_60%,_#f0e8ff_100%)]
        dark:before:absolute dark:before:inset-0 
        dark:before:bg-[radial-gradient(circle_at_50%_50%,_rgba(214,90,255,0.08)_0%,_transparent_70%)]
        dark:before:pointer-events-none
      "
    >
      <motion.form
        onSubmit={handleUpdate}
        className="
          relative w-full max-w-2xl p-8 rounded-2xl shadow-lg shadow-black/50
          
          /* DARK MODE */
          bg-[#1e1e2e] border border-[#333] text-[#eee]
          
          /* LIGHT MODE - Premium glass-like effect */
          dark:bg-[linear-gradient(180deg,_rgba(255,255,255,0.95)_0%,_rgba(248,244,255,0.98)_100%)]
          dark:border-[#e6deff]
          dark:text-[#2a2a3c]
          dark:shadow-xl
          dark:shadow-purple-200/30
          dark:backdrop-blur-sm
          dark:ring-1 dark:ring-inset dark:ring-purple-100/50
        "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Decorative top border for light mode */}
        <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r from-transparent via-[#d65aff] to-transparent dark:via-purple-400/80"></div>

        <h2 className="text-3xl font-bold text-center mb-6 text-[#eee] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-purple-700 dark:to-pink-600">
          Update Movie
        </h2>

        {/* Inputs with labels above */}
        {inputs.map((input) => (
          <div key={input.name} className="mb-4">
            <label className="block text-[#ccc] mb-1 dark:text-[#5a5568] dark:font-medium">
              {input.label}
            </label>
            <input
              type={input.type}
              name={input.name}
              step={input.step}
              required
              defaultValue={
                input.name === "cast" && Array.isArray(movie.cast)
                  ? movie.cast.join(", ")
                  : movie[input.name]
              }
              className="
                w-full p-3 rounded
                
                /* DARK MODE */
                bg-[#222] border border-[#333] text-[#eee]
                
                /* LIGHT MODE */
                dark:bg-white/80
                dark:border-[#e0d6ff]
                dark:text-[#3a3a4c]
                dark:shadow-sm
                
                /* Common focus */
                focus:border-[#d65aff] focus:outline-none
              "
            />
          </div>
        ))}

        {/* Plot Summary */}
        <div className="mb-4">
          <label className="block text-[#ccc] mb-1 dark:text-[#5a5568] dark:font-medium">
            Plot Summary
          </label>
          <textarea
            name="plotSummary"
            rows={4}
            required
            defaultValue={movie.plotSummary}
            className="
              w-full p-3 rounded
              
              /* DARK MODE */
              bg-[#222] border border-[#333] text-[#eee]
              
              /* LIGHT MODE */
              dark:bg-white/80
              dark:border-[#e0d6ff]
              dark:text-[#3a3a4c]
              dark:shadow-sm
              
              /* Common focus */
              focus:border-[#d65aff] focus:outline-none
            "
          />
        </div>

        {/* Featured select */}
        <div className="mb-4">
          <label className="block text-[#ccc] mb-1 dark:text-[#5a5568] dark:font-medium">
            Featured
          </label>
          <select
            name="featured"
            defaultValue={movie.featured ? "true" : "false"}
            className="
              w-full p-3 rounded
              
              /* DARK MODE */
              bg-[#222] border border-[#333] text-[#eee]
              
              /* LIGHT MODE */
              dark:bg-white/80
              dark:border-[#e0d6ff]
              dark:text-[#3a3a4c]
              dark:shadow-sm
              dark:pr-10
              
              /* Common focus */
              focus:border-[#d65aff] focus:outline-none
            "
          >
            <option value="true" className="dark:bg-white dark:text-[#3a3a4c]">
              Featured
            </option>
            <option value="false" className="dark:bg-white dark:text-[#3a3a4c]">
              Not Featured
            </option>
          </select>
        </div>

        {/* Added By - disabled */}
        <div className="mb-4">
          <label className="block text-[#888] mb-1 dark:text-[#8a85a0] dark:font-medium">
            Added By
          </label>
          <input
            type="text"
            disabled
            value={movie.addedBy}
            className="
              w-full p-3 rounded
              
              /* DARK MODE */
              bg-[#333] border border-[#444] text-[#bbb] cursor-not-allowed
              
              /* LIGHT MODE */
              dark:bg-[#f5f2ff]
              dark:border-[#e0d6ff]
              dark:text-[#7a7590]
              dark:cursor-not-allowed
            "
          />
        </div>

        {/* Submit button */}
        <motion.button
          type="submit"
          className="w-full p-3 mt-4 rounded text-white font-bold text-lg cursor-pointer btn-gradient-animate scale-safe"
          whileHover={{
            filter:
              "drop-shadow(0 0 8px rgba(214, 90, 255, 0.5)) brightness(1.05)",
            boxShadow: "0 0 12px #d65aff55",
          }}
          whileTap={{ filter: "brightness(0.95)" }}
          transition={{ duration: 0.2 }}
        >
          Update Movie
        </motion.button>
      </motion.form>
    </div>
  );
};

export default UpdateMovie;
