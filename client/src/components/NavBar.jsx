import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/asset";
import toast from "react-hot-toast";

const NavBar = () => {
  const {
    searchQuery,
    setSearchQuery,
    navigate,
    user,
    setShowUserLogin,
    setUser,
  } = useAppContext();

  const logout = () => {
    setUser(null);
    navigate("/");
    setSearchQuery("");
    setShowUserLogin(false);
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/courses");
    }
  }, [searchQuery]);

  return (
    <header className="bg-white border-b shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-extrabold text-indigo-600">
          EduHub
        </NavLink>

        <NavLink
          to="/code-editor"
          className="text-gray-600 hover:text-indigo-600 font-medium transition">
          Editor
        </NavLink>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink
            to="/"
            className="text-gray-600 hover:text-indigo-600 font-medium transition">
            Home
          </NavLink>
          <NavLink
            to="/courses"
            className="text-gray-600 hover:text-indigo-600 font-medium transition">
            Courses
          </NavLink>
          <NavLink
            to="/contact"
            className="text-gray-600 hover:text-indigo-600 font-medium transition">
            Contact
          </NavLink>

          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            type="text"
            placeholder="Search courses"
            className="ml-4 px-4 py-1.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300 transition text-sm"
          />

          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="cursor-pointer ml-4 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-medium shadow transition">
              Login
            </button>
          ) : (
            <div className="relative group">
              <img src={assets.profile_icon} className="w-10" alt="" />
              <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border-gray-200 py-2.5 w-40 rounded-md text-sm z-40">
                <li>
                  <NavLink
                    to={`/doubt-chat/${user._id}`}
                    className="block px-4 py-2 hover:bg-gray-100">
                    Chat with Mentor
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/user/my-courses"
                    className="block px-4 py-2 hover:bg-gray-100">
                    My Courses
                  </NavLink>
                </li>
                <li
                  onClick={logout}
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
