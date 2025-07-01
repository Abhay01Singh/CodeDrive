import React, { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import { useAppContext } from "../context/AppContext";

const AllCourse = () => {
  const { courses, searchQuery } = useAppContext();
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredCourses(
        courses.filter((course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredCourses(courses);
    }
  }, [searchQuery, courses]);
  return (
    <section className="bg-gray-100 min-h-screen py-16 px-6 mt-16 pb-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          All <span className="text-blue-600">Courses</span>
        </h1>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllCourse;
