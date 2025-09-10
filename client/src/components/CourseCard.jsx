import React from "react";
import { Link } from "react-router-dom";
import { slugify } from "../utils/slugify"; // your custom util

const CourseCard = ({ course }) => (
  <div
    className="flex flex-col justify-between bg-gradient-to-tr from-white via-orange-50 to-purple-50 border border-orange-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 w-full ring-1 ring-orange-100/20 relative overflow-hidden group min-h-[440px]"
    style={{ minHeight: "440px", maxWidth: "330px" }} // ensures consistent height/width
  >
    <div>
      {/* Title */}
      <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
        {course.title}
      </h3>
      {/* Tags */}
      <p className="text-xs text-purple-500 font-semibold mb-4 tracking-wide uppercase">
        {course.tags?.join(" · ")}
      </p>

      {/* Image */}
      <div className="rounded-xl overflow-hidden mb-5 shadow group-hover:scale-[1.03] transition-transform duration-200">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-32 object-cover bg-white"
        />
      </div>

      {/* Duration */}
      <div className="text-xs text-gray-500 mb-2">
        <span className="block font-medium">
          <span className="inline-block mr-2 bg-blue-50 text-blue-600 rounded px-2 py-0.5 text-xs font-bold">
            ⏳
          </span>
          {course.duration}
        </span>
      </div>

      {/* Pricing row */}
      <div className="text-base mb-3 flex items-center gap-3">
        <span className="font-extrabold text-2xl text-orange-600 bg-white/80 px-3 py-1 rounded-xl shadow">
          ₹{course.price}
        </span>
        <span className="line-through text-gray-400 text-xs font-semibold ml-1">
          ₹{course.originalPrice}
        </span>
        <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-orange-400 to-pink-400 text-white text-xs rounded-lg font-bold shadow">
          {course.discount}% OFF
        </span>
      </div>
      <div className="text-xs text-gray-400 mb-4 mt-1">
        Final ₹{course.finalPrice}
        <span className="ml-1">(incl. GST ₹{course.gst})</span>
      </div>
    </div>
    {/* Button forced to bottom */}
    <Link
      to={`/courses/${slugify(course.category)}/${slugify(course.title)}`}
      className="w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700 hover:from-blue-700 hover:to-purple-600 text-white font-bold py-2 rounded-xl shadow-lg transition-all text-center block mt-3 text-sm group-hover:scale-105"
      style={{ marginTop: "auto" }}>
      View Course →
    </Link>
  </div>
);

export default CourseCard;
