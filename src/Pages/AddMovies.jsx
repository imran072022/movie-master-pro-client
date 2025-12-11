import React, { useState, useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const AddMovie = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newMovie = {
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
      addedBy: user.email,
      createdAt: new Date(),
    };

    fetch("http://localhost:3000/movies/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newMovie),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Movie successfully added!");
      });
  };

  const inputs = [
    { name: "title", label: "Movie Title", type: "text" },
    { name: "genre", label: "Genre (e.g., Action, Drama)", type: "text" },
    { name: "releaseYear", label: "Release Year", type: "number" },
    { name: "director", label: "Director", type: "text" },
    { name: "cast", label: "Cast (comma-separated)", type: "text" },
    { name: "rating", label: "Rating (0–10)", type: "number", step: "0.1" },
    { name: "duration", label: "Duration (in minutes)", type: "number" },
    { name: "posterUrl", label: "Poster Image URL", type: "url" },
    { name: "language", label: "Language", type: "text" },
    { name: "country", label: "Country", type: "text" },
  ];

  return (
    <div className="relative min-h-screen flex justify-center items-center p-4 overflow-hidden py-28 md:py-40">
      {/* Background gradients behind form */}
      <div
        className="absolute inset-0 z-0
        bg-[radial-gradient(circle_at_center,_#25163b_0%,_#1a1a2e_60%,_#000000_100%)]
        dark:bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#f8f4ff_60%,_#f0e8ff_100%)]
        dark:before:absolute dark:before:inset-0 
        dark:before:bg-[radial-gradient(circle_at_50%_50%,_rgba(214,90,255,0.08)_0%,_transparent_70%)]
        dark:before:pointer-events-none
      "
      ></div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="
          relative z-10 w-full max-w-2xl p-8 rounded-2xl shadow-lg shadow-black/50
          bg-[linear-gradient(180deg,_#1e1e2e,_#1a1a28)]
          border border-[#333]
          text-[#eee]
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
        {/* Decorative top bar */}
        <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r from-transparent via-[#d65aff] to-transparent dark:via-purple-400/80"></div>

        <h2 className="text-3xl font-bold text-center mb-6 text-[#eee] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-purple-700 dark:to-pink-600">
          Add New Movie
        </h2>

        {/* Inputs */}
        {inputs.map((input) => (
          <div key={input.name} className="mb-4">
            <label className="block text-[#ccc] mb-1 dark:text-[#5a5568] dark:font-medium">
              {input.label}
            </label>

            <motion.input
              type={input.type}
              name={input.name}
              step={input.step}
              required
              animate={{ scale: 1 }}
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="
                w-full p-3 rounded
                bg-[#222] border border-[#333] text-[#eee] placeholder-[#aaa]
                dark:bg-white/80
                dark:border-[#e0d6ff]
                dark:text-[#3a3a4c]
                dark:placeholder-[#a0a0c0]
                dark:shadow-sm
                focus:border-[#d65aff] focus:shadow-[0_0_8px_#d65aff55] focus:outline-none
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
            required
            rows={4}
            className="
              w-full p-3 rounded
              bg-[#222] border border-[#333] text-[#eee] placeholder-[#aaa]
              dark:bg-white/80
              dark:border-[#e0d6ff]
              dark:text-[#3a3a4c]
              dark:placeholder-[#a0a0c0]
              dark:shadow-sm
              focus:border-[#d65aff] focus:shadow-[0_0_8px_#d65aff55] focus:outline-none
            "
          />
        </div>

        {/* Featured */}
        <div className="mb-4">
          <label className="block text-[#ccc] mb-1 dark:text-[#5a5568] dark:font-medium">
            Featured
          </label>
          <select
            name="featured"
            className="
              w-full p-3 rounded
              bg-[#222] border border-[#333] text-[#eee]
              dark:bg-white/80
              dark:border-[#e0d6ff]
              dark:text-[#3a3a4c]
              dark:shadow-sm
              dark:pr-10
              focus:border-[#d65aff] focus:shadow-[0_0_8px_#d65aff55] focus:outline-none
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

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full p-3 mt-4 rounded text-white font-bold text-lg btn-gradient-animate cursor-pointer"
          whileHover={{ scale: 1.03, boxShadow: "0 0 12px #d65aff55" }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          Add Movie
        </motion.button>
      </motion.form>
    </div>
  );
};

export default AddMovie;
