import React from "react";
import { useAppContext } from "../../context/AppContext";
import CourseCard from "../../components/CourseCard";
const InstructorCourses = async () => {
  const { courses, axios } = useAppContext();

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">My Courses</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};
export default InstructorCourses;
