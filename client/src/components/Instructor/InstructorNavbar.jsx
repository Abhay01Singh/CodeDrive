import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  FaBookOpen,
  FaMoneyBillWave,
  FaPlusCircle,
  FaStar,
  FaTachometerAlt,
  FaSignOutAlt,
  FaComments,
} from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const InstructorNavBar = () => {
  const { navigate, axios, setIsInstructor } = useAppContext();
  const location = useLocation();
  const [latestRoomId, setLatestRoomId] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const { data } = await axios.get("/api/doubt/rooms");
        console.log(data);
        if (data.success) {
          setLatestRoomId(data.rooms[0]._id);
          const totalUnread = data.rooms.reduce(
            (sum, room) => sum + (room.unreadCount || 0),
            0
          );
          setUnreadCount(totalUnread);
        }
      } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
      }
    };

    fetchChatRooms();

    const interval = setInterval(fetchChatRooms, 30000);
    return () => clearInterval(interval);
  }, [axios]);

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
    ...(latestRoomId
      ? [
          {
            label: "Mentor Chat",
            path: `/instructor/chat/${latestRoomId}`,
            icon: <FaComments />,
            badge: unreadCount > 0 ? unreadCount : null,
          },
        ]
      : []),
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
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <nav className="bg-white/90 backdrop-blur-lg shadow-md border-b border-indigo-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1
          className="text-2xl font-extrabold text-indigo-700 cursor-pointer select-none transition-transform hover:scale-105"
          onClick={() => navigate("/instructor/dashboard")}
          aria-label="Go to Instructor Dashboard"
          tabIndex={0}
          onKeyPress={(e) =>
            e.key === "Enter" && navigate("/instructor/dashboard")
          }>
          Instructor Panel
        </h1>

        <ul className="flex gap-8 text-sm font-semibold items-center">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                   ${
                     isActive
                       ? "bg-indigo-100 text-indigo-700 shadow-inner"
                       : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                   }`
                }
                title={item.label}
                aria-current={({ isActive }) =>
                  isActive ? "page" : undefined
                }>
                <span className="relative text-lg">
                  {item.icon}
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                      {item.badge}
                    </span>
                  )}
                </span>
                <span className="hidden md:inline">{item.label}</span>
              </NavLink>
            </li>
          ))}

          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-100 transition focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Logout">
              <FaSignOutAlt />
              <span className="hidden md:inline font-semibold">Logout</span>
            </button>
          </li>
        </ul>
      </nav>

      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default InstructorNavBar;
