import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { courseCategories } from "../assets/asset";
import { slugify } from "../utils/slugify";

const Category = () => {
  const { navigate } = useAppContext();

  return (
    <section className="bg-gradient-to-tr from-blue-50 via-white to-purple-50 py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-12 text-center tracking-tight drop-shadow-md">
          Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {courseCategories.map((category, index) => (
            <button
              key={index}
              value={category.text}
              onClick={() => {
                navigate(`/courses/${slugify(category.text)}`);
                scrollTo(0, 0);
              }}
              className="group cursor-pointer p-5 rounded-3xl flex flex-col items-center justify-center transition-all duration-300 shadow-sm hover:shadow-xl bg-gradient-to-br from-white to-blue-50 hover:from-blue-100 hover:to-purple-100 focus:ring-4 focus:ring-blue-200 border border-gray-100"
              style={{ backgroundColor: category.bgColor || undefined }}>
              <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow hover:bg-blue-50 hover:scale-110 transform-gpu transition-all duration-200">
                <img
                  src={category.image}
                  alt={category.text}
                  className="h-16 w-auto object-contain mb-4 drop-shadow-lg transition-transform group-hover:scale-105"
                />
              </div>
              <span className="text-lg font-semibold text-gray-800 mt-2 text-center group-hover:text-blue-600 transition-colors duration-200">
                {category.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
