import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useWatchlist from "../hooks/useWatchlist";
import { AuthContext } from "../Providers/AuthProvider";

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
  handleWatchList = undefined,
  inWatchlist = false,
}) => {
  const watch = useWatchlist() || {};
  const ctxHandle =
    watch.handleWatchList || watch.toggle || watch.add || (() => {});
  const handle = handleWatchList || ctxHandle;
  const currentlyIn =
    Boolean(inWatchlist) ||
    (typeof watch.isIn === "function" && watch.isIn(_id));

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full sm:w-[210px] bg-[#1A1A1A] dark:bg-white border border-[#2a2c3a] dark:border-gray-400 rounded-xl overflow-hidden flex flex-col">
      {/* Poster */}
      <div className="relative overflow-hidden">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-[220px] sm:w-[210px] sm:h-[290px] object-cover  transition-transform duration-300 ease-out hover:scale-105"
        />

        <span className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-sm font-semibold px-2 py-1 rounded-md">
          ⭐ {rating}
        </span>

        {showActions && (
          <div className="absolute top-2 left-2 flex gap-2">
            <button
              onClick={() => handleEdit(_id)}
              className="bg-purple-600 text-white px-2 py-1 rounded text-xs shadow-md backdrop-blur-sm hover:bg-purple-700 transition-all"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(_id)}
              className="bg-red-600 text-white px-2 py-1 rounded text-xs shadow-md backdrop-blur-sm hover:bg-red-700 transition-all"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        {/* Fixed height zone so buttons never shift */}
        <div className="min-h-[60px]">
          <h2 className="text-white dark:text-black text-base font-semibold line-clamp-2 leading-tight roboto">
            {title}
          </h2>
          <p className="text-gray-400 dark:text-gray-800 text-sm my-1">
            {genre} • {releaseYear}
          </p>
        </div>

        {/* Buttons (NORMAL FLOW, not absolute/mt-auto) */}
        <div className=" flex flex-col gap-2 mt-auto">
          {/* Watchlist */}
          <button
            onClick={() => {
              if (!user?.email) {
                navigate("/login");
                return;
              }
              handle(_id);
            }}
            className="w-full cursor-pointer text-base border border-gray-800 text-[#5799EF] dark:text-white py-1 hover:bg-gray-700 transition flex bg-[#2C2C2C] rounded-4xl items-center justify-center gap-2"
          >
            {currentlyIn ? (
              <>
                <AiFillHeart color="red" size={24} />
                In Watchlist
              </>
            ) : (
              <>
                <AiOutlineHeart className="text-gray-200" size={24} />
                Watchlist
              </>
            )}
          </button>

          {/* Details */}
          <Link
            to={`/movie/${_id}`}
            className="block w-full border rounded-4xl border-gray-800  text-gray-200 dark:text-gray-900 py-1  hover:bg-gray-700 dark:hover:bg-gray-200 text-center transition"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
