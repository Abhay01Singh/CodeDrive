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
    <header
      className="
      sticky top-0 left-0 right-0 z-50 
      bg-gradient-to-tr from-white/90 via-blue-50/80 to-indigo-100/80 
      backdrop-blur-lg shadow-2xl border-b border-indigo-100
      transition-all
    ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="
            text-3xl font-extrabold text-indigo-700 tracking-tight 
            drop-shadow-lg transition-transform 
            hover:scale-105 hover:text-purple-700
          ">
          CodeDrive
        </NavLink>

        <NavLink
          to="/code-editor"
          className="
            hidden sm:block text-gray-500 hover:text-indigo-700 font-semibold
            transition-colors px-3 py-1 rounded-lg bg-white/20
          ">
          Editor
        </NavLink>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {["Home", "Courses", "Contact"].map((label, idx) => (
            <NavLink
              key={label}
              to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
              className="
                relative text-lg text-gray-700 hover:text-indigo-700 font-semibold 
                px-3 py-1 
                transition-all rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300
                bg-white/40 hover:bg-indigo-50
                after:absolute after:w-full after:h-0.5 after:bg-indigo-500 after:bottom-0 after:left-0
                after:scale-x-0 hover:after:scale-x-100 after:transition-transform
              ">
              {label}
            </NavLink>
          ))}

          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            type="text"
            placeholder="Search courses"
            className="
              ml-4 px-4 py-2 border border-indigo-200 rounded-full
              bg-gradient-to-r from-white/95 to-indigo-50/80
              text-sm transition-all shadow-sm text-gray-700
              focus:outline-none focus:ring-2 focus:ring-indigo-300
              placeholder-gray-400
            "
          />

          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="
                ml-4 bg-gradient-to-tr from-indigo-700 via-purple-600 to-indigo-800
                hover:from-purple-700 hover:to-blue-800 text-white px-6 py-2
                rounded-full text-sm font-semibold shadow-lg
                transition-transform hover:scale-105
              ">
              Login
            </button>
          ) : (
            <div className="relative group">
              <img
                src={assets.profile_icon}
                className="
                  w-10 h-10 rounded-full border-2 border-indigo-500 shadow-lg
                  transition-transform scale-100 group-hover:scale-110
                "
                alt="Profile"
              />
              <ul
                className="
                absolute top-12 right-0 bg-gradient-to-tr from-white/95 to-purple-50/90 shadow-xl border border-indigo-200 py-3 w-48 rounded-2xl text-sm scale-0
                group-hover:scale-100 origin-top-right transition-transform z-40
              ">
                <li>
                  <NavLink
                    to={`/doubt-chat/${user._id}`}
                    className="block px-5 py-2 hover:bg-indigo-50 hover:text-indigo-700 transition rounded-xl">
                    Chat with Mentor
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/user/my-courses"
                    className="block px-5 py-2 hover:bg-indigo-50 hover:text-indigo-700 transition rounded-xl">
                    My Courses
                  </NavLink>
                </li>
                <li
                  onClick={logout}
                  className="block px-5 py-2 hover:bg-red-50 text-red-600 transition cursor-pointer rounded-xl">
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
