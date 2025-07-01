import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });
      if (data.success) {
        navigate("/");
        setUser(data.user);
        setShowUserLogin(false);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-gray-200 rounded-xl shadow-2xl p-8 w-80 sm:w-96 space-y-5 animate-fade-in">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          <span className="text-indigo-600">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </h2>

        {state === "register" && (
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Your name"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              type="text"
              required
            />
          </div>
        )}

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

        <p className="text-sm text-gray-500">
          {state === "register" ? (
            <>
              Already have an account?{" "}
              <span
                className="text-indigo-600 hover:underline cursor-pointer"
                onClick={() => setState("login")}>
                Login here
              </span>
            </>
          ) : (
            <>
              Create an account?{" "}
              <span
                className="text-indigo-600 hover:underline cursor-pointer"
                onClick={() => setState("register")}>
                Sign up
              </span>
            </>
          )}
        </p>

        <button
          type="submit"
          className="cursor-pointer w-full py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow transition-all text-sm font-semibold">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
