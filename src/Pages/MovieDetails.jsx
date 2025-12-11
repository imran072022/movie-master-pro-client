import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../Providers/AuthProvider";

const MovieDetails = () => {
  const movie = useLoaderData();
  const { user } = useContext(AuthContext);
  const isOwner = user?.email === movie.addedBy;

  return (
    <div className="py-28 text-white">
      <div className="p-6">
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
          <div className="flex-1 flex flex-col justify-between dark:text-gray-900">
            <div>
              <h1 className="text-4xl font-bold mb-2 dark:text-black">
                {movie.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-yellow-400 text-black font-semibold px-3 py-1 rounded-lg">
                  ⭐ {movie.rating}
                </span>
                <span className="text-gray-400 dark:text-gray-800">
                  {movie.duration} min
                </span>
                <span className="text-gray-400 dark:text-gray-800">
                  {movie.language}
                </span>
                <span className="text-gray-400 dark:text-gray-800">
                  {movie.country}
                </span>
              </div>

              <div className="mb-4 space-y-2">
                <p>
                  <span className="font-semibold dark:text-black">Genre:</span>{" "}
                  {movie.genre}
                </p>
                <p>
                  <span className="font-semibold dark:text-black">
                    Release Year:
                  </span>{" "}
                  {movie.releaseYear}
                </p>
                <p>
                  <span className="font-semibold dark:text-black">
                    Director:
                  </span>{" "}
                  {movie.director}
                </p>
                <p>
                  <span className="font-semibold dark:text-black">Cast:</span>{" "}
                  {movie.cast.join(", ")}
                </p>
                <p>
                  <span className="font-semibold dark:text-black">
                    Added By:
                  </span>{" "}
                  {movie.addedBy}
                </p>
                <p>
                  <span className="font-semibold dark:text-black">
                    Featured:
                  </span>{" "}
                  <span
                    className={
                      movie.featured === true
                        ? "text-green-400 dark:text-green-600"
                        : "text-red-400 dark:text-red-600"
                    }
                  >
                    {movie.featured === true ? "Yes" : "No"}
                  </span>
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-2 dark:text-black">
                  Plot Summary
                </h2>
                <p className="text-gray-300 leading-relaxed dark:text-gray-800">
                  {movie.plotSummary}
                </p>
              </div>
            </div>

            {/* Edit / Delete Buttons for owner */}
            {isOwner && (
              <div className="mt-4 flex gap-4">
                <Link
                  to={`/movies/update/${movie._id}`}
                  state={{ movie }}
                  className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded-md transition cursor-pointer"
                >
                  Edit
                </Link>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md transition cursor-pointer">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
