import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { courseCategories } from "../assets/asset";
import { slugify } from "../utils/slugify";

const Category = () => {
  const { navigate } = useAppContext();

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">Categories</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {courseCategories.map((category, index) => (
            <button
              key={index}
              value={category.text}
              onClick={() => {
                navigate(`/courses/${slugify(category.text)}`);
                scrollTo(0, 0);
              }}
              className="cursor-pointer rounded-2xl p-5 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105"
              style={{ backgroundColor: category.bgColor || "#fefefe" }}>
              <img
                src={category.image}
                alt={category.text}
                className="h-20 w-auto object-contain mb-4"
              />
              <span className="text-base font-medium text-gray-800 text-center">
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
