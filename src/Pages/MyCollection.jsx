import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import MovieCard from "../Components/MovieCard";

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
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

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="font-bold text-3xl text-white roboto text-center mt-4 mb-12">
        My Movie Collection
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie._id} {...movie} showActions={true} />
          ))
        ) : (
          <p className="text-gray-300 col-span-full text-center">
            No movies found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyCollection;
