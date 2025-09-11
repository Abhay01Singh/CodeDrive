import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import CourseDetailsInstructor from "./CourseDeatilsIns";

const InstructorCourses = () => {
  const { courses } = useAppContext();
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const instructorCourses = courses.filter(
      (course) => course.instructorId === courses.instructorId
    );
    setMyCourses(instructorCourses);
  }, [courses]);

  if (!myCourses.length) {
    return <p className="text-gray-500">No courses available.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">My Courses</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {myCourses.map((course, index) => (
          <CourseDetailsInstructor key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default InstructorCourses;
