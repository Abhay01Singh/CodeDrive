import React from "react";
import MainBanner from "../components/MainBanner";
import CourseCategory from "../components/Category";

const Home = () => {
  return (
    <div className="mt-10">
      <MainBanner></MainBanner>
      <CourseCategory></CourseCategory>
    </div>
  );
};

export default Home;
