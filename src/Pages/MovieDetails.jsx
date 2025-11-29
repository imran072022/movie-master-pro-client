import React from "react";
import { useLoaderData } from "react-router";

const MovieDetails = () => {
  const movie = useLoaderData();

  // Simulate logged-in user
  const currentUser = "user@example.com"; // replace with auth context in real app
  const isOwner = currentUser === movie.addedBy;

  return (
    <div className="min-h-screen p-6 bg-[#14151F] text-white">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Poster */}
        <div className="flex-shrink-0 w-full lg:w-[300px] rounded-xl overflow-hidden shadow-lg">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Movie Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-yellow-400 text-black font-semibold px-3 py-1 rounded-lg">
                ⭐ {movie.rating}
              </span>
              <span className="text-gray-400">{movie.duration} min</span>
              <span className="text-gray-400">{movie.language}</span>
              <span className="text-gray-400">{movie.country}</span>
            </div>

            <div className="mb-4 space-y-2">
              <p>
                <span className="font-semibold">Genre:</span> {movie.genre}
              </p>
              <p>
                <span className="font-semibold">Release Year:</span>{" "}
                {movie.releaseYear}
              </p>
              <p>
                <span className="font-semibold">Director:</span>{" "}
                {movie.director}
              </p>
              <p>
                <span className="font-semibold">Cast:</span>{" "}
                {movie.cast.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Added By:</span> {movie.addedBy}
              </p>
              <p>
                <span className="font-semibold">Featured:</span>{" "}
                <span
                  className={
                    movie.featured === "true"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {movie.featured === "true" ? "Yes" : "No"}
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Plot Summary</h2>
              <p className="text-gray-300 leading-relaxed">
                {movie.plotSummary}
              </p>
            </div>
          </div>

          {/* Edit / Delete Buttons for owner */}
          {isOwner && (
            <div className="mt-6 flex gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
                Edit
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
