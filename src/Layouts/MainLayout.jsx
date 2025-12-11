import React from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import ScrollToTop from "../Components/ScrollToTop";

const MainLayout = () => {
  return (
    <div>
      <header>
        <nav>
          <Navbar></Navbar>
        </nav>
      </header>
      <ScrollToTop></ScrollToTop>
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
