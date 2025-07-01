import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import NavBar from "./components/NavBar";
import AllCourse from "./Pages/AllCourse";
import CourseCategory from "./Pages/CourseCategory";
import CourseDetails from "./Pages/CourseDetails";
import Login from "./components/Login";
import InstructorLogin from "./components/Instructor/InstructorLogin";
import InstructorNavBar from "./components/Instructor/InstructorNavbar";
import CreateCourse from "./Pages/Instructor/CreateCourse";
import MyCourses from "./Pages/Instructor/MyCourses";
import EarningsDashboard from "./Pages/Instructor/EarningsDashboard";
import Reviews from "./Pages/Instructor/Reviews";
import { useAppContext } from "./context/AppContext";
import DashBoard from "./Pages/Instructor/DashBoard";
import Enroll from "./Pages/Enroll";
import AddAddress from "./Pages/AddAddress";
import { Toaster } from "react-hot-toast";

function App() {
  const isInstructorPath = useLocation().pathname.includes("instructor");
  const { showUserLogin, isInstructor } = useAppContext();

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {isInstructorPath ? null : <NavBar />}
      {showUserLogin ? <Login /> : null}
      <Toaster></Toaster>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<AllCourse />} />
        <Route path="/courses/:category" element={<CourseCategory />} />
        <Route path="/courses/:category/:title" element={<CourseDetails />} />
        <Route path="/courses/enroll" element={<Enroll />} />
        <Route path="/add-address" element={<AddAddress />} />
        <Route
          path="/instructor"
          element={isInstructor ? <InstructorNavBar /> : <InstructorLogin />}>
          <Route index element={<DashBoard />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="create-course" element={<CreateCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="earnings" element={<EarningsDashboard />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
