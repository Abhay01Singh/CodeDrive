import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const DashBoard = () => {
  const [name, setName] = useState("Riitvik Singh");
  const [email] = useState("ritvik@gmail.com");
  const [bio, setBio] = useState("Instructor at CodeDrive");
  const [profileImage, setProfileImage] = useState(null);

  const { courses, user } = useAppContext();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Save name, bio, and image to backend
    alert("Profile updated!");
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">
        Instructor Dashboard
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Section */}
        <form
          onSubmit={handleSave}
          className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-500">
              <img
                src={profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address (Read Only)
            </label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
              value={email}
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200 shadow-sm">
              Save Changes
            </button>
          </div>
        </form>

        {/* Dashboard Stats & Actions */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-100 text-indigo-800 rounded-lg p-4 text-center shadow">
              <p className="text-2xl font-bold">{courses.length}</p>
              <p className="text-sm">Courses Created</p>
            </div>
            <div className="bg-green-100 text-green-800 rounded-lg p-4 text-center shadow">
              <p className="text-2xl font-bold">{}</p>
              <p className="text-sm">Total Students</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <NavLink
              to={"/instructor/create-course"}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700">
              Create New Course
            </NavLink>
            <NavLink
              to={"/instructor/my-courses"}
              className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded shadow hover:bg-gray-300">
              View My Courses
            </NavLink>
            <NavLink
              to={"/instructor/reviews"}
              className="w-full py-2 px-4 bg-yellow-100 text-yellow-700 rounded shadow hover:bg-yellow-200">
              Student Feedback
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
