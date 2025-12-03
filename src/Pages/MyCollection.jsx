import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import MovieCard from "../Components/MovieCard";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
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
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="font-bold text-3xl text-white roboto text-center mt-4 mb-12">
        My Movie Collection
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
