import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { slugify } from "../utils/slugify";

const CourseDetails = () => {
  const { category, title } = useParams();
  const { courses, navigate, user } = useAppContext();

  const course = courses.find(
    (c) => slugify(c.category) === category && slugify(c.title) === title
  );

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Course not found.</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={course.image}
            alt={course.title}
            className="w-full md:w-1/3 rounded-lg object-contain"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {course.title}
            </h1>
            <p className="text-sm text-gray-500 mb-2">
              Category: <span className="capitalize">{course.category}</span>
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Duration: {course.duration}
            </p>

            {/* ✅ Description */}
            <p className="text-gray-700 mb-4">{course.description}</p>

            <div className="mb-4">
              <span className="text-lg font-semibold text-green-600">
                ₹{course.finalPrice}
              </span>
              <span className="text-sm text-gray-500 line-through ml-2">
                ₹{course.originalPrice}
              </span>
              <span className="text-sm text-red-500 ml-2">
                ({course.discount}% OFF)
              </span>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-2">Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                navigate("/courses/enroll", { state: { course } });
                scrollTo(0, 0);
              }}
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
