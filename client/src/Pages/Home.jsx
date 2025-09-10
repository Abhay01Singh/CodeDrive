import React from "react";
import MainBanner from "../components/MainBanner";
import CourseCategory from "../components/Category";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="mt-0">
      <MainBanner></MainBanner>
      <CourseCategory></CourseCategory>
      <Footer></Footer>
    </div>
  );
};

export default Home;
