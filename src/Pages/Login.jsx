import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
const Login = () => {
  const { login, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    login(email, password)
      .then((userCredential) => {
        toast.success("Logged in successfully!");
        navigate(location.state?.from || "/", { replace: true });
        console.log(userCredential.user);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((userCredential) => {
        console.log(userCredential.user);
        toast.success("Logged in successfully");
        navigate(location.state?.from || "/", { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#f9f9f9" }}
    >
      <title>MovieMaster Pro | Login Now</title>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Optional message */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-2 bg-yellow-400 text-black rounded-md text-center font-semibold hidden"
        >
          {/* Placeholder message */}
        </motion.div>

        <h2 className="text-3xl font-bold text-[#d351ff] text-center mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              className="w-full px-4 py-2 mt-2 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d351ff]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              className="w-full px-4 py-2 mt-2 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d351ff]"
            />
          </div>

          {/* Forgot Password */}
          <p className="text-gray-700 hover:text-[#ff5da1] hover:underline mb-1.5 ml-1 inline-block cursor-pointer">
            Forget Password?
          </p>

          {/* Login Button */}
          <motion.button className="w-full text-white cursor-pointer py-2 rounded-lg font-bold btn-gradient-animate hover:brightness-110 transition-all">
            Login
          </motion.button>

          {/* Google Login Button */}
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-2 bg-gray-100 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-200 font-bold hover:text-[#111A2B] transition flex items-center justify-center gap-2"
        >
          <FcGoogle className="w-6 h-6" /> Continue with Google
        </button>

        {/* Register Link */}
        <p className="mt-4 text-center text-gray-700">
          Don't have an account?
          <Link
            to="/register"
            state={location.state}
            className="text-[#d351ff] hover:text-[#ff5da1] hover:underline ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
