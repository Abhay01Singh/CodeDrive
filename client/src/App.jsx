import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import { Toaster } from "react-hot-toast";

// Student Pages
import Home from "./Pages/Home";
import AllCourse from "./Pages/AllCourse";
import CourseCategory from "./Pages/CourseCategory";
import CourseDetails from "./Pages/CourseDetails";
import Enroll from "./Pages/Enroll";
import AddAddress from "./Pages/AddAddress";
import MyCourses from "./Pages/MyCourses";
import ChatRoom from "./Pages/ChatRoom";

// Instructor Pages
import CreateCourse from "./Pages/Instructor/CreateCourse";
import EarningsDashboard from "./Pages/Instructor/EarningsDashboard";
import Reviews from "./Pages/Instructor/Reviews";
import DashBoard from "./Pages/Instructor/DashBoard";
import InstructorCourses from "./Pages/Instructor/InstructorCourses";
import MentorChat from "./Pages/Instructor/MentorChat";

// Components
import NavBar from "./components/NavBar";
import InstructorNavBar from "./components/Instructor/InstructorNavbar";
import Login from "./components/Login";
import InstructorLogin from "./components/Instructor/InstructorLogin";

// Instructor Layout Wrapper
const InstructorLayout = () => (
  <>
    <InstructorNavBar />
  </>
);

function App() {
  const { showUserLogin, isInstructor } = useAppContext();
  const location = useLocation();
  const isInstructorPath = location.pathname.startsWith("/instructor");

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {!isInstructorPath && <NavBar />}
      {showUserLogin && <Login />}
      <Toaster />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<AllCourse />} />
        <Route path="/courses/:category" element={<CourseCategory />} />
        <Route path="/courses/:category/:title" element={<CourseDetails />} />
        <Route path="/courses/enroll" element={<Enroll />} />
        <Route path="/add-address" element={<AddAddress />} />
        <Route path="/user/my-courses" element={<MyCourses />} />
        <Route path="/doubt-chat/:roomId" element={<ChatRoom />} />

        {/* Instructor Routes */}
        <Route path="/instructor">
          <Route
            index
            element={
              isInstructor ? (
                <Navigate to="/instructor/dashboard" />
              ) : (
                <InstructorLogin />
              )
            }
          />

          {isInstructor && (
            <Route element={<InstructorLayout />}>
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="create-course" element={<CreateCourse />} />
              <Route path="my-courses" element={<InstructorCourses />} />
              <Route path="earnings" element={<EarningsDashboard />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="chat/:roomId" element={<MentorChat />} />
            </Route>
          )}
        </Route>
      </Routes>
    </div>
  );
}
export default App;
