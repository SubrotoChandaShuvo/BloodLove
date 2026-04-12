import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import auth from "../firebase/firebase.config";
import { AuthContext } from "../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const DEMO_CREDENTIALS = [
  {
    role: "Admin",
    email: "admin@bloodlove.com",
    password: "Admin@123",
    icon: "",
    color: "from-purple-600 to-violet-500",
    shadow: "shadow-purple-200",
    hover: "hover:from-purple-500 hover:to-violet-400",
    badge: "bg-purple-100 text-purple-700",
  },
  {
    role: "Volunteer",
    email: "volunteer@bloodlove.com",
    password: "Volunteer@123",
    icon: "",
    color: "from-emerald-600 to-teal-500",
    shadow: "shadow-emerald-200",
    hover: "hover:from-emerald-500 hover:to-teal-400",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    role: "User",
    email: "user@bloodlove.com",
    password: "User@123",
    icon: "",
    color: "from-blue-600 to-sky-500",
    shadow: "shadow-blue-200",
    hover: "hover:from-blue-500 hover:to-sky-400",
    badge: "bg-blue-100 text-blue-700",
  },
];

const Login = () => {
  const { user, setUser, setLoading, handleGoogleSignin, setIsFatching } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoadingLocal] = useState(false);
  const [demoLoading, setDemoLoading] = useState(null);

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
        // On mobile redirect, result is undefined — AuthProvider handles it
        if (!result?.user) return;

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
      .catch((err) => {
        // Don't show error if it's just the redirect (no error, just void)
        if (err?.code !== "auth/redirect-cancelled-by-user") {
          Swal.fire({ icon: "error", title: "Oops...", text: "Google login failed. Please try again." });
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-rose-50 px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo / Brand */}
        <div className="mb-8 flex items-center justify-center gap-4">
          {/* Glow ring + logo */}
          <div className="relative inline-flex items-center justify-center flex-shrink-0">
            <div className="absolute h-16 w-16 rounded-full bg-red-400 opacity-20 animate-ping"></div>
            <div className="relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-rose-500 text-3xl shadow-xl shadow-red-200 p-3">
              🩸
            </div>
          </div>
          {/* Title */}
          <div className="text-left">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 via-rose-500 to-red-400 bg-clip-text text-transparent leading-tight">
              BloodLove
            </h1>
            <p className="text-gray-400 mt-1 text-sm tracking-wide">Sign in to your account</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Top accent */}
          <div className="h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-400"></div>

          {/* ── Quick Demo Access ── */}
          <div className="px-8 pt-7 pb-2">
            <div className="relative flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-black text-xs font-bold whitespace-nowrap">Quick Demo Access</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <p className="text-center text-xs text-gray-400 mb-4">Explore the project instantly as a specific role</p>

            <div className="grid grid-cols-3 gap-3">
              {DEMO_CREDENTIALS.map(({ role, email: dEmail, password, icon, color, shadow, hover }) => (
                <button
                  key={role}
                  type="button"
                  disabled={demoLoading !== null}
                  onClick={() => {
                    setDemoLoading(role);
                    setLoading(true);
                    signInWithEmailAndPassword(auth, dEmail, password)
                      .then((userCredential) => {
                        setUser(userCredential.user);
                        setLoading(false);
                        setDemoLoading(null);
                        Swal.fire({
                          title: `Logged in as ${role}! ${icon}`,
                          icon: "success",
                          confirmButtonColor: "#dc2626",
                          timer: 1800,
                          showConfirmButton: false,
                        });
                        const from = location.state?.from?.pathname || "/";
                        navigate(from, { replace: true });
                      })
                      .catch((err) => {
                        setLoading(false);
                        setDemoLoading(null);
                        Swal.fire({ icon: "error", title: "Demo Login Failed", text: err.message });
                      });
                  }}
                  className={`flex flex-col items-center gap-2 bg-gradient-to-br ${color} ${hover} text-white py-3 px-2 rounded-2xl font-bold transition-all shadow-lg ${shadow} hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {demoLoading === role ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : null}
                  <span className="text-xs font-extrabold tracking-wide">{role}</span>
                </button>
              ))}
            </div>

            <p className="text-center text-[10px] text-gray-300 mt-3 mb-1">
              Demo credentials are read-only for portfolio review
            </p>
          </div>

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
