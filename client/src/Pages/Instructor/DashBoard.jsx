import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const DashBoard = () => {
  const [name, setName] = useState("Riitvik Singh");
  const [email] = useState("ritvik@gmail.com");
  const [bio, setBio] = useState("Instructor at CodeDrive");
  const [profileImage, setProfileImage] = useState(null);

  const { courses, user, allUsers } = useAppContext();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Save changes to backend
    alert("Profile updated!");
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 sm:px-12 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-indigo-700 text-center sm:text-left drop-shadow-lg">
        Instructor Dashboard
      </h2>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Profile Section */}
        <form
          onSubmit={handleSave}
          className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200 space-y-8">
          <div className="flex items-center gap-8">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-600 shadow-md">
              <img
                src={profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-700 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-xl px-5 py-3 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address (Read Only)
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-600 bg-gray-100 cursor-not-allowed"
              value={email}
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              rows="4"
              className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-10 py-3 rounded-full font-bold shadow-md hover:bg-indigo-700 transition-transform hover:scale-105">
              Save Changes
            </button>
          </div>
        </form>

        {/* Dashboard Stats & Actions */}
        <div className="space-y-10">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-indigo-100 text-indigo-900 rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow cursor-default select-none">
              <p className="text-4xl font-extrabold">{courses.length}</p>
              <p className="text-lg font-semibold mt-1">Courses Created</p>
            </div>
            <div className="bg-green-100 text-green-900 rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow cursor-default select-none">
              <p className="text-4xl font-extrabold">{allUsers.length}</p>
              <p className="text-lg font-semibold mt-1">Total Students</p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <NavLink
              to={"/instructor/create-course"}
              className="w-full py-4 px-6 bg-indigo-600 text-white rounded-3xl hover:bg-indigo-700 shadow-lg font-bold text-center transition-transform hover:scale-105">
              Create New Course
            </NavLink>
            <NavLink
              to={"/instructor/my-courses"}
              className="w-full py-4 px-6 bg-gray-200 text-gray-700 rounded-3xl hover:bg-gray-300 shadow-md font-semibold text-center transition-transform hover:scale-105">
              View My Courses
            </NavLink>
            <NavLink
              to={"/instructor/reviews"}
              className="w-full py-4 px-6 bg-yellow-100 text-yellow-800 rounded-3xl hover:bg-yellow-200 shadow-md font-semibold text-center transition-transform hover:scale-105">
              Student Feedback
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
