import React from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Outlet, useNavigation } from "react-router";
import ScrollToTop from "../Components/ScrollToTop";
import Loading from "../Components/Loading";
const MainLayout = () => {
  const navigation = useNavigation();
  return (
    <>
      {navigation.state === "loading" && <Loading />}
      <div className="flex flex-col min-h-screen">
        <header>
          <Navbar />
        </header>
        <ScrollToTop />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};
export default MainLayout;
