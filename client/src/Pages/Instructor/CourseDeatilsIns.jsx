import React from "react";

const CourseDetailsInstructor = ({ course }) => {
  if (!course) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
      <p className="text-sm text-gray-500 mb-2">Category: {course.category}</p>
      <p className="text-sm text-gray-600 mb-2">Duration: {course.duration}</p>
      <p className="text-gray-700 mb-4">{course.description}</p>
      <div className="flex items-center gap-2">
        <span className="text-green-600 font-bold">₹{course.finalPrice}</span>
        <span className="text-gray-400 line-through">
          ₹{course.originalPrice}
        </span>
        <span className="text-red-500">({course.discount}% OFF)</span>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {course.tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CourseDetailsInstructor;
