import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [isInstructor, setIsInstructor] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // fetch Instructor status
  const fetchInstructor = async () => {
    try {
      const { data } = await axios.get("/api/instructor/is-auth");
      if (data.success) {
        setIsInstructor(true);
      } else {
        setIsInstructor(false);
      }
    } catch (error) {
      setIsInstructor(false);
    }
  };

  // Fetch User Auth Status
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  // Fetch Courses
  const fetchCourses = async () => {
    try {
      const { data } = await axios.get("/api/course/list");
      if (data.success) {
        setCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchInstructor();
    fetchCourses();
  }, []);

  const value = {
    searchQuery,
    setSearchQuery,
    navigate,
    user,
    setUser,
    isInstructor,
    setIsInstructor,
    showUserLogin,
    setShowUserLogin,
    courses,
    setCourses,
    axios,
    fetchCourses,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export const useAppContext = () => {
  return useContext(AppContext);
};
