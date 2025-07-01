import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const InstructorLogin = () => {
  const { isInstructor, setIsInstructor, navigate, axios } = useAppContext();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post("api/instructor/login", {
        email,
        password,
      });
      if (data.success) {
        setIsInstructor(true);
        navigate("/instructor/dashboard");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isInstructor) {
      navigate("/instructor/dashboard");
    }
  }, [isInstructor]);

  return (
    !isInstructor && (
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-gray-200 rounded-xl shadow-2xl p-8 w-80 sm:w-96 space-y-5 animate-fade-in mx-auto my-auto ">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          <span className="text-indigo-600">Instructor</span> Login
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Your email"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            type="email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Your password"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            type="password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow transition-all text-sm font-semibold">
          Login
        </button>
      </form>
    )
  );
};

export default InstructorLogin;
