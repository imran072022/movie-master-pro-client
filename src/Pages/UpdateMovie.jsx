import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useLocation } from "react-router";

const UpdateMovie = () => {
  const location = useLocation();
  const movie = location.state?.movie;
  const { user } = useContext(AuthContext);

  if (!movie) {
    return <div className="text-white text-center mt-20">Movie not found.</div>;
  }

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

    fetch(`http://localhost:3000/movies/update/${movie._id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedMovie),
    })
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
      className="relative min-h-screen flex justify-center items-center p-4 overflow-hidden py-14 md:py-24"
      style={{
        background:
          "radial-gradient(circle at center, #25163b 0%, #1a1a2e 60%, #000000 100%)",
      }}
    >
      <motion.form
        onSubmit={handleUpdate}
        className="relative w-full max-w-2xl p-8 rounded-2xl shadow-lg shadow-black/50 bg-[#1e1e2e] border border-[#333]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-[#eee]">
          Update Movie
        </h2>

        {/* Inputs with labels above */}
        {inputs.map((input) => (
          <div key={input.name} className="mb-4">
            <label className="block text-[#ccc] mb-1">{input.label}</label>
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
              className="w-full p-3 rounded bg-[#222] border border-[#333] text-[#eee] focus:border-[#d65aff] focus:outline-none"
            />
          </div>
        ))}

        {/* Plot Summary */}
        <div className="mb-4">
          <label className="block text-[#ccc] mb-1">Plot Summary</label>
          <textarea
            name="plotSummary"
            rows={4}
            required
            defaultValue={movie.plotSummary}
            className="w-full p-3 rounded bg-[#222] border border-[#333] text-[#eee] focus:border-[#d65aff] focus:outline-none"
          />
        </div>

        {/* Featured select */}
        <div className="mb-4">
          <label className="block text-[#ccc] mb-1">Featured</label>
          <select
            name="featured"
            defaultValue={movie.featured ? "true" : "false"}
            className="w-full p-3 rounded bg-[#222] border border-[#333] text-[#eee] focus:border-[#d65aff] focus:outline-none"
          >
            <option value="true">Featured</option>
            <option value="false">Not Featured</option>
          </select>
        </div>

        {/* Added By - disabled */}
        <div className="mb-4">
          <label className="block text-[#888] mb-1">Added By</label>
          <input
            type="text"
            disabled
            value={movie.addedBy}
            className="w-full p-3 rounded bg-[#333] border border-[#444] text-[#bbb] cursor-not-allowed"
          />
        </div>

        {/* Submit button */}
        <motion.button
          type="submit"
          className="w-full p-3 mt-4 rounded text-white font-bold text-lg btn-gradient-animate"
          whileHover={{ scale: 1.03, boxShadow: "0 0 12px #d65aff55" }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          Update Movie
        </motion.button>
      </motion.form>
    </div>
  );
};

export default UpdateMovie;
