import { useEffect, useState } from "react";
import HeroCarousel from "../Components/HeroCarousel";
import TopRated from "../Components/ForHome/TopRated";
import AboutPlatform from "../Components/ForHome/AboutPlatform";
import Statistics from "../Components/ForHome/Statistics";
import RecentlyAdded from "../Components/ForHome/RecentlyAdded";
import Genre from "../Components/ForHome/Genre";
import Loading from "../Components/Loading";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
        setLoading(false);
      });
  }, []);
  if (loading) return <Loading></Loading>;
  return (
    <div className="py-20">
      <HeroCarousel movies={movies}></HeroCarousel>
      <Statistics
        totalMovies={movies?.length || 0}
        totalUsers={
          [...new Set(movies.map((movie) => movie.addedBy))]?.length || 0
        }
      />
      <section className="max-w-7xl mx-auto">
        <TopRated></TopRated>
        <RecentlyAdded></RecentlyAdded>
        <Genre></Genre>
        <AboutPlatform></AboutPlatform>
      </section>
    </div>
  );
};

export default Home;
