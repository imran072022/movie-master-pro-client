import React from "react";
import { Link } from "react-router";

const MovieCard = ({
  _id,
  title,
  releaseYear,
  posterUrl,
  genre,
  rating,
  showActions = false,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="w-[210px] bg-[#161722] border border-[#2a2c3a] rounded-xl overflow-hidden flex flex-col cursor-pointer">
      {/* Poster */}
      <div className="relative overflow-hidden">
        <img
          src={posterUrl}
          alt={title}
          className="w-[210px] h-[290px] object-cover transition-transform duration-300 ease-out hover:scale-105"
        />

        {/* Rating badge */}
        <span className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-sm font-semibold px-2 py-1 rounded-md">
          ⭐ {rating}
        </span>

        {/* Edit/Delete buttons */}
        {showActions && (
          <div className="absolute top-2 left-2 flex gap-2">
            <button
              onClick={() => handleEdit(_id)}
              className="bg-purple-600 text-white px-2 py-1 rounded text-xs shadow-md backdrop-blur-sm bg-black/30 hover:bg-purple-700 transition-all"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(_id)}
              className="bg-red-600 text-white px-2 py-1 rounded text-xs shadow-md backdrop-blur-sm bg-black/30 hover:bg-red-700 transition-all cursor-pointer"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-white text-base font-semibold line-clamp-2">
            {title}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {genre} • {releaseYear}
          </p>
        </div>

        <Link
          to={`/movie/${_id}`}
          className="mt-3 w-full border border-gray-600 text-gray-200 py-[6px] rounded hover:bg-gray-700 transition-colors duration-200 cursor-pointer text-center"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
