import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaBookOpen,
  FaMoneyBillWave,
  FaPlusCircle,
  FaStar,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const InstructorNavBar = () => {
  const { navigate, axios, setIsInstructor } = useAppContext();

  const navItems = [
    {
      label: "Dashboard",
      path: "/instructor/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      label: "Create Course",
      path: "/instructor/create-course",
      icon: <FaPlusCircle />,
    },
    {
      label: "My Courses",
      path: "/instructor/my-courses",
      icon: <FaBookOpen />,
    },
    {
      label: "Earnings",
      path: "/instructor/earnings",
      icon: <FaMoneyBillWave />,
    },
    {
      label: "Reviews",
      path: "/instructor/reviews",
      icon: <FaStar />,
    },
  ];

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/api/instructor/logout");
      if (data.success) {
        toast.success(data.message);
        setIsInstructor(false);
        navigate("/instructor");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <nav className="bg-white border-b px-6 py-4 shadow flex justify-between items-center">
        <h1
          className="text-xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => navigate("/instructor/dashboard")}>
          Instructor Panel
        </h1>
        <ul className="flex gap-6 text-sm font-medium items-center">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "hover:bg-gray-100"
                  }`
                }>
                {item.icon} {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-red-600 hover:bg-red-100 transition">
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </nav>
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default InstructorNavBar;
