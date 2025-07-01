import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const MyCourses = () => {
  const [paidCourses, setPaidCourses] = useState([]);
  const { axios } = useAppContext();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("/api/enroll/course");
        console.log(data.courses);
        if (data.success) {
          setPaidCourses(data.courses);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Courses</h2>
      {paidCourses.length === 0 ? (
        <p className="text-gray-600">You haven’t enrolled in any course yet.</p>
      ) : (
        <ul className="space-y-4">
          {paidCourses.map((course, index) => (
            <li
              key={index}
              className="p-4 bg-white rounded-xl shadow border border-gray-200">
              <h3 className="text-lg font-semibold text-indigo-700">
                {course.courseId?.title || "Untitled Course"}
              </h3>
              <p className="text-sm text-gray-500">
                Price: ₹{course.amount} | Status: {course.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCourses;
