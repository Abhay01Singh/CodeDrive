import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

// Utility to extract YouTube Video ID
const extractYouTubeId = (url) => {
  try {
    if (!url) return null;

    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1); // for youtu.be/xyz123
    }

    return parsedUrl.searchParams.get("v");
  } catch (err) {
    return null;
  }
};

const MyCourses = () => {
  const [paidCourses, setPaidCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios } = useAppContext();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("/api/enroll/courses");
        if (data.success) {
          setPaidCourses(data.courses); // Enrolled & paid courses
        } else {
          toast.error(data.message || "Failed to fetch courses");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">My Courses</h2>

      {loading ? (
        <p className="text-gray-500">Loading courses...</p>
      ) : paidCourses.length === 0 ? (
        <p className="text-gray-600">You haven’t enrolled in any course yet.</p>
      ) : (
        <ul className="space-y-6">
          {paidCourses.map((enrollment) => {
            const course = enrollment.courseId;
            const videoId = extractYouTubeId(course?.videoUrl);

            return (
              <li
                key={enrollment._id}
                className="p-5 bg-white rounded-xl shadow border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-indigo-700">
                      {course?.title || "Untitled Course"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Price Paid: ₹{enrollment.amount}
                    </p>
                    {course?.description && (
                      <p className="text-sm text-gray-600 mt-2">
                        {course.description}
                      </p>
                    )}
                  </div>
                  {course?.image && (
                    <img
                      src={course.image}
                      alt="Course Thumbnail"
                      className="w-40 h-24 object-cover rounded-lg border"
                    />
                  )}
                </div>

                {videoId ? (
                  <div className="mt-4 aspect-video">
                    <iframe
                      className="w-full h-full rounded-lg border"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="Course Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen></iframe>
                  </div>
                ) : (
                  <p className="text-red-500 mt-3">
                    Video URL is invalid or not available.
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MyCourses;
