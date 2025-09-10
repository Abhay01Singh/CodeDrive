import React from "react";
import { Link } from "react-router-dom";
import ChatbotWidget from "./ChatbotWidget";
const MainBanner = () => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900 to-black text-white py-28 px-8">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-6xl font-extrabold leading-tight mb-7 animate-fade-in">
          Master <span className="text-blue-400 drop-shadow-lg">Coding</span>{" "}
          with Real Projects
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-xl animate-fade-in-delayed">
          Learn by building hands-on apps, solving real challenges, and
          collaborating globally.
        </p>
        <div className="flex flex-col md:flex-row gap-6 mb-7">
          <Link
            to={"/courses"}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-xl transition-transform hover:scale-105">
            Get Started
          </Link>
          <Link
            to={"/courses"}
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-2xl border border-gray-700 transition-transform hover:scale-105">
            Explore Courses
          </Link>
        </div>
        {/* Chatbot Widget */}
        <div className="fixed bottom-6 right-6 z-40">
          <ChatbotWidget />
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
