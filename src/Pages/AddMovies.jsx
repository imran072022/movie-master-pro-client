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
    console.log("Movie to add:", newMovie);

    fetch("http://localhost:3000/movies/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
    <div
      className="relative min-h-screen flex justify-center items-center p-4 overflow-hidden py-14 md:py-24"
      style={{
        background:
          "radial-gradient(circle at center, #25163b 0%, #1a1a2e 60%, #000000 100%)",
      }}
    >
      {/* Form with entrance animation */}
      <motion.form
        onSubmit={handleSubmit}
        className="relative w-full max-w-2xl p-8 rounded-2xl shadow-lg shadow-black/50"
        style={{
          background: "linear-gradient(180deg, #1e1e2e, #1a1a28)",
          border: "1px solid #333",
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-[#eee]">
          Add New Movie
        </h2>

        {/* Inputs with labels on top */}
        {inputs.map((input) => (
          <div key={input.name} className="mb-4">
            <label className="block text-[#ccc] mb-1">{input.label}</label>
            <motion.input
              type={input.type}
              name={input.name}
              step={input.step}
              required
              animate={{ scale: 1 }}
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="w-full p-3 rounded bg-[#222] border border-[#333] placeholder-[#aaa] text-[#eee] focus:border-[#d65aff] focus:shadow-[0_0_8px_#d65aff55] focus:outline-none"
            />
          </div>
        ))}

        {/* Plot summary */}
        <div className="mb-4">
          <label className="block text-[#ccc] mb-1">Plot Summary</label>
          <textarea
            name="plotSummary"
            required
            rows={4}
            className="w-full p-3 rounded bg-[#222] border border-[#333] placeholder-[#aaa] text-[#eee] focus:border-[#d65aff] focus:shadow-[0_0_8px_#d65aff55] focus:outline-none"
          />
        </div>

        {/* Featured select */}
        <div className="mb-4">
          <label className="block text-[#ccc] mb-1">Featured</label>
          <select
            name="featured"
            className="w-full p-3 rounded bg-[#222] border border-[#333] text-[#eee] focus:border-[#d65aff] focus:shadow-[0_0_8px_#d65aff55] focus:outline-none"
          >
            <option value="true">Featured</option>
            <option value="false">Not Featured</option>
          </select>
        </div>

        {/* Submit button with subtle hover animation */}
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
