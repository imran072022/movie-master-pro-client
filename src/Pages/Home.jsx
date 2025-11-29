import { useEffect, useState } from "react";
import HeroCarousel from "../Components/HeroCarousel";
import TopRated from "../Components/ForHome/TopRated";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/poster.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
      });
  }, []);

  return (
    <div>
      <HeroCarousel movies={movies}></HeroCarousel>
      <div className="grid grid-cols-5 gap-7 mt-3.5 max-w-7xl mx-auto">
        {movies.map((movie) => (
          <TopRated movie={movie}></TopRated>
        ))}
      </div>
    </div>
  );
};

export default Home;
