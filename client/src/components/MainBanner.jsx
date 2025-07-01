import React from "react";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <section className="bg-gradient-to-br from-gray-900 to-black text-white py-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Master <span className="text-blue-500">Coding</span> with Real
          Projects
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          Learn to code by building hands-on apps, solving real-world
          challenges, and collaborating with others.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to={"/courses"}
            href="#get-started"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition">
            Get Started
          </Link>
          <Link
            to={"/courses"}
            href="#explore"
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl border border-gray-600 transition">
            Explore Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
