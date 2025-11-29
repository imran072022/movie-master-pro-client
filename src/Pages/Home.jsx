import { useEffect, useState } from "react";
import HeroCarousel from "../Components/HeroCarousel";
import TopRated from "../Components/ForHome/TopRated";
import MovieCard from "../Components/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
      });
  }, []);

  return (
    <div>
      <HeroCarousel movies={movies}></HeroCarousel>
      <div className="grid grid-cols-5 gap-7 mt-3.5 max-w-7xl mx-auto"></div>
      <section className="max-w-7xl mx-auto">
        <h2 className="roboto font-bold text-3xl text-white">
          Top Rated Movies -
        </h2>
        <TopRated></TopRated>
      </section>
    </div>
  );
};

export default Home;
