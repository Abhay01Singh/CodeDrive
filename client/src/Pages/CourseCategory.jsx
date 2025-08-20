import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { courseCategories } from "../assets/asset";
import CourseCard from "../components/CourseCard";
import { slugify } from "../utils/slugify";

const CourseCategory = () => {
  const { courses, user, navigate } = useAppContext();
  const { category } = useParams();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const searchCategory = courseCategories.find(
    (item) => slugify(item.text) === category
  );

  const filteredCourses = courses.filter(
    (course) => slugify(course.category) === category
  );

  return (
    <section className="bg-gray-100 min-h-screen py-16 px-6 mt-16 pb-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          {searchCategory ? searchCategory.text : "Courses in this Category"}
        </h1>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredCourses.map((course, key) => (
              <CourseCard key={key} course={course} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8">No courses found.</p>
        )}
      </div>
    </section>
  );
};

export default CourseCategory;
