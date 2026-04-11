import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import auth from "../firebase/firebase.config";
import { AuthContext } from "../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const { user, setUser, setLoading, handleGoogleSignin, setIsFatching } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoadingLocal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingLocal(true);
    setLoading(true);
    const email = e.target.email.value;
    const pass = e.target.password.value;

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        setUser(userCredential.user);
        setLoading(false);
        setLoadingLocal(false);
        Swal.fire({ title: "Login Successful! 🎉", icon: "success", confirmButtonColor: "#dc2626" });
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setLoading(false);
        setLoadingLocal(false);
        Swal.fire({ icon: "error", title: "Login Failed", text: error.message });
      });
  };

  const handleForget = () => navigate(`/forget/${email}`);

  const googleSignup = () => {
    handleGoogleSignin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        const formData = {
          email: user.email,
          name: user.displayName,
          mainPhotoUrl: user.photoURL,
          blood: "Unknown",
          district: "Unknown",
          upazila: "Unknown",
        };
        axios.post("https://bloodlove.vercel.app/users", formData)
          .then(() => {
            if (setIsFatching) setIsFatching(true);
            Swal.fire({ title: "Login Successful! 🎉", icon: "success", confirmButtonColor: "#dc2626" });
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
          })
          .catch(() => {
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
          });
      })
      .catch(() => {
        Swal.fire({ icon: "error", title: "Oops...", text: "Google login failed. Please try again." });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-rose-50 px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-red-600 to-rose-500 text-3xl shadow-lg shadow-red-200 mb-4">
            🩸
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">Welcome Back</h1>
          <p className="text-gray-400 mt-1 text-sm">Sign in to your BloodLove account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Top accent */}
          <div className="h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-400"></div>

          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">✉️ Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-400 focus:outline-none transition-colors text-gray-800"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">🔑 Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:border-red-400 focus:outline-none transition-colors text-gray-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  {showPass ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Don't have an account?{" "}
                <Link to="/register" className="text-red-600 font-bold hover:underline">Register</Link>
              </span>
              <button type="button" onClick={handleForget} className="text-red-500 font-semibold hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-300 text-white font-extrabold py-3.5 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-red-200 flex items-center justify-center gap-2"
            >
              {loading ? <><span className="loading loading-spinner loading-sm"></span> Signing in...</> : "🚀 Sign In"}
            </button>

            {/* Divider */}
            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-gray-400 text-xs font-semibold">OR</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={googleSignup}
              className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-red-400 bg-white py-3 rounded-2xl font-bold text-gray-600 hover:text-red-600 transition-all hover:shadow-md"
            >
              <FcGoogle size={22} /> Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
