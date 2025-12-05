import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const Register = () => {
  const { signUp, signInWithGoogle, setUser } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [zodErrors, setZodErrors] = useState([]);
  const [firebaseError, setFirebaseError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    console.log(name, email, photo, password);
    setLoading(true);
    signUp(email, password)
      .then((userCredential) => {
        setLoading(false);
        setUser(userCredential.user);
        toast.success("Registered successfully!");
        navigate(location.state?.from || "/", { replace: true });
        console.log(userCredential.user);
      })
      .catch((error) => {
        setLoading(false);
        const customMessage =
          error.code === "auth/email-already-in-use"
            ? "Email already registered!"
            : "Something is wrong!";
        toast.error(customMessage);
        console.log(error.code, customMessage);
        setFirebaseError(customMessage);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((userCredential) => {
        console.log(userCredential.user);
        setUser(userCredential.user);
        toast.success("Logged in successfully");
        navigate(location.state?.from || "/", { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  /*Password validation part using zod package */

  const passwordSchema = z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/\W/, "Must include a special character");

  const handlePassChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const result = passwordSchema.safeParse(value);
    console.log(result);
    if (result.success) {
      setZodErrors([]);
    } else {
      setZodErrors(result.error.issues.map((e) => e.message));
    }
  };
  const isValid = zodErrors.length === 0;

  /*Dot animation in register button*/
  useEffect(() => {
    if (!loading) {
      setDots("");
      return;
    }
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 300);
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#f9f9f9" }}
    >
      <title>MovieMaster Pro | Register Now</title>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-[#d351ff] text-center mb-6">
          Register
        </h2>

        <form onSubmit={handleRegister}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              className="w-full px-4 py-2 mt-2 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d351ff]"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d351ff]"
            />
          </div>

          {/* Photo URL */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter photo URL"
              className="w-full px-4 py-2 mt-2 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d351ff]"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handlePassChange}
              placeholder="Enter your password"
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
          <div>
            {password.length > 0 &&
              zodErrors.map((message, index) => (
                <p key={index} className="text-red-500 text-xs">
                  {message}
                </p>
              ))}
          </div>
          <p className="text-red-500 text-sm mb-4 my-1">{firebaseError}</p>
          {/* Register Button */}
          <motion.button
            disabled={!isValid}
            className="w-full text-white cursor-pointer py-2 rounded-lg font-bold btn-gradient-animate  hover:brightness-110 transition-all"
          >
            {loading ? `Registering${dots}` : "Register"}
          </motion.button>

          {/* Google Register Button */}
        </form>
        <motion.div
          className="flex items-center gap-3 my-2"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <hr className="flex-1 border-t border-gray-300" />
          <span className="text-gray-400 text-sm font-medium">OR</span>
          <hr className="flex-1 border-t border-gray-300" />
        </motion.div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-2 bg-gray-100 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-200 font-bold hover:text-[#111A2B] transition flex items-center justify-center gap-2"
        >
          <FcGoogle className="w-6 h-6" /> Continue with Google
        </button>

        {/* Login Link */}
        <p className="mt-4 text-center text-gray-700">
          Already have an account?
          <Link
            to="/login"
            className="text-[#d351ff] hover:text-[#ff5da1] hover:underline ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
