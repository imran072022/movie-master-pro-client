import React from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white dark:bg-white dark:text-black transition-colors duration-300">
      <div className="hidden bg-black text-white dark:bg-white dark:text-black" />
      <header>
        <nav>
          <Navbar></Navbar>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;
