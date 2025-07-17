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

  // Fetch chat rooms and unread messages
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const { data } = await axios.get("/api/doubt/rooms");
        if (data.success && data.rooms.length > 0) {
          setLatestRoomId(data.rooms[0]._id);
          // Calculate total unread messages
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

    // Initial fetch
    fetchChatRooms();

    // Set up polling every 30 seconds
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
    <div className="min-h-screen bg-gray-50">
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
                <span className="relative">
                  {item.icon}
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </span>
                {item.label}
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
