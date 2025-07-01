import React from "react";
import { Link } from "react-router-dom";
import { slugify } from "../utils/slugify";

const CourseCard = ({ course }) => {
  return (
    <div className="border border-orange-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-all w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        {course.title}
      </h3>

      <p className="text-sm text-purple-600 font-medium mb-3">
        {course.tags?.join(", ")}
      </p>

      <div className="relative rounded-xl overflow-hidden mb-4">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="text-sm text-gray-700 mb-2">
        <span className="block font-medium">Duration: {course.duration}</span>
      </div>

      <div className="text-sm mb-3">
        <span className="font-bold text-xl text-gray-800">₹{course.price}</span>
        <span className="line-through text-gray-400 ml-2">
          ₹{course.originalPrice}
        </span>
        <span className="ml-2 px-2 py-0.5 bg-orange-400 text-white text-xs rounded font-semibold">
          {course.discount}% OFF
        </span>
        <div className="text-xs text-gray-500 mt-1">
          Final ₹{course.finalPrice} (incl. GST ₹{course.gst})
        </div>
      </div>

      <Link
        to={`/courses/${slugify(course.category)}/${slugify(course.title)}`}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition text-sm">
        View Course →
      </Link>
    </div>
  );
};

export default CourseCard;
