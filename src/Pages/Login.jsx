import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const Login = () => {
  const { login, signInWithGoogle, loading, setLoading } =
    useContext(AuthContext);
  const [dots, setDots] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);
    login(email, password)
      .then((userCredential) => {
        setLoading(false);
        toast.success("Logged in successfully!");
        navigate(location.state?.from || "/", { replace: true });
        console.log(userCredential.user);
      })
      .catch((error) => {
        const customMessage =
          error.code === "auth/invalid-credential"
            ? "Email/Password is incorrect!"
            : "Something went wrong!";
        setLoading(false);
        toast.error(customMessage);
        setError(customMessage);
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

  useEffect(() => {
    if (!loading) {
      setDots("");
      return;
    }
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 350);
    return () => clearInterval(interval);
  }, [loading]);

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

        <form className="" onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
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
          <div className="relative ">
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              className="w-full px-4 py-2 mt-2 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d351ff]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9.5 cursor-pointer  text-gray-500 hover:text-gray-900"
            >
              {showPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </button>
          </div>
          {/*Custom Error Message */}
          <div className="text-sm text-red-500 my-1">{error}</div>
          {/* Forgot Password */}
          <p className="text-gray-700 text-sm hover:text-[#ff5da1] hover:underline mb-1.5 mt-4 ml-1  cursor-pointer">
            Forget Password?
          </p>

          {/* Login Button */}
          <motion.button className="w-full text-white cursor-pointer py-2 rounded-lg font-bold btn-gradient-animate hover:brightness-110 transition-all">
            {loading ? `Logging in${dots}` : "Login"}
          </motion.button>
        </form>
        <motion.div
          className="flex items-center gap-3 my-2"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <hr className="flex-1 border-t border-gray-200" />
          <span className="text-gray-400 text-sm font-medium">OR</span>
          <hr className="flex-1 border-t border-gray-200" />
        </motion.div>
        {/*Google login */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-2 bg-gray-100 text-black rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-200 font-bold hover:text-[#111A2B] transition flex items-center justify-center gap-2"
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
