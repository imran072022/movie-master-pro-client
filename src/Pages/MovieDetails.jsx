import React, { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const MovieDetails = () => {
  const movie = useLoaderData();
  const { user } = useContext(AuthContext);
  const isOwner = user?.email === movie.addedBy;
  // Local state to handle deletion
  const [movieData, setMovieData] = useState(movie);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://movie-master-pro-server-p31s3i7uw.vercel.app/movies/my-collection/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount === 1) {
              Swal.fire({
                title: "Deleted!",
                text: "Your movie has been deleted.",
                icon: "success",
              });
              setMovieData(null); // Remove movie from view
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  // Render deleted state if movie is removed
  if (!movieData) {
    return (
      <div className="py-28 text-center text-white">
        <p className="text-2xl mb-6">This movie has been deleted.</p>
        <Link
          to="/movies"
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-md text-white transition"
        >
          Back to Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="py-28 text-white">
      <div className="p-6 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Poster */}
        <div className="flex-shrink-0 w-full lg:w-[300px] rounded-xl overflow-hidden shadow-lg">
          <img
            src={movieData.posterUrl}
            alt={movieData.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Movie Info */}
        <div className="flex-1 flex flex-col justify-between dark:text-gray-900">
          <div>
            <h1 className="text-4xl font-bold mb-2 dark:text-black">
              {movieData.title}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-yellow-400 text-black font-semibold px-3 py-1 rounded-lg">
                ⭐ {movieData.rating}
              </span>
              <span className="text-gray-400 dark:text-gray-800">
                {movieData.duration} min
              </span>
              <span className="text-gray-400 dark:text-gray-800">
                {movieData.language}
              </span>
              <span className="text-gray-400 dark:text-gray-800">
                {movieData.country}
              </span>
            </div>

            <div className="mb-4 space-y-2">
              <p>
                <span className="font-semibold dark:text-black">Genre:</span>{" "}
                {movieData.genre}
              </p>
              <p>
                <span className="font-semibold dark:text-black">
                  Release Year:
                </span>{" "}
                {movieData.releaseYear}
              </p>
              <p>
                <span className="font-semibold dark:text-black">Director:</span>{" "}
                {movieData.director}
              </p>
              <p>
                <span className="font-semibold dark:text-black">Cast:</span>{" "}
                {movieData.cast.join(", ")}
              </p>
              <p>
                <span className="font-semibold dark:text-black">Added By:</span>{" "}
                {movieData.addedBy}
              </p>
              <p>
                <span className="font-semibold dark:text-black">Featured:</span>{" "}
                <span
                  className={
                    movieData.featured
                      ? "text-green-400 dark:text-green-600"
                      : "text-red-400 dark:text-red-600"
                  }
                >
                  {movieData.featured ? "Yes" : "No"}
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2 dark:text-black">
                Plot Summary
              </h2>
              <p className="text-gray-300 leading-relaxed dark:text-gray-800">
                {movieData.plotSummary}
              </p>
            </div>
          </div>

          {/* Edit / Delete Buttons for owner */}
          {isOwner && (
            <div className="mt-4 flex gap-4">
              <Link
                to={`/movies/update/${movieData._id}`}
                state={{ movie: movieData }}
                className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded-md transition cursor-pointer"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(movieData._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md transition cursor-pointer"
              >
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
