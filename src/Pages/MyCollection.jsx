import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import MovieCard from "../Components/MovieCard";
import useWatchlist from "../hooks/useWatchlist";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const { handleWatchList } = useWatchlist();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/movies/my-collection?addedBy=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMovies(data);
        })
        .catch((error) => console.log(error));
    }
  }, [user.email]);

  const handleEdit = (id) => {
    const movieToEdit = movies.find((movie) => movie._id === id);
    navigate(`/movies/update/${id}`, { state: { movie: movieToEdit } });
  };
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
        fetch(`http://localhost:3000/movies/my-collection/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount === 1) {
              setMovies((prev) => prev.filter((movie) => movie._id !== id));
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };
  return (
    <div className="max-w-7xl mx-auto py-12 md:py-24">
      <h2
        className="text-center text-4xl md:text-5xl font-bold mb-12
             text-white animate-fadeInSlide roboto"
      >
        <span>Your </span>
        <span className="text-[#d65aff] "> Collection</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              {...movie}
              showActions={true}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleWatchList={handleWatchList}
            />
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center italic text-xl mt-8">
            The reel is silent… add some movies to start the show.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyCollection;
