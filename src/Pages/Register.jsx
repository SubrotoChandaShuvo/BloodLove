import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import auth from "../firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-400 focus:outline-none transition-colors text-gray-800";
const labelClass = "block text-sm font-bold text-gray-700 mb-1.5";

const Register = () => {
  const { registerWithEmailPassword, setUser, loading, setLoading, setIsFatching, handleGoogleSignin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  useEffect(() => {
    axios.get("/upazila.json").then((res) => setUpazilas(res.data.upazilas));
    axios.get("/district.json").then((res) => setDistricts(res.data.districts));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    const confirmPass = e.target.confirmPassword.value;
    const name = e.target.name.value;
    const file = e.target.photoUrl.files[0];
    const blood = e.target.blood.value;

    if (pass.length < 6) return Swal.fire({ icon: "error", title: "Oops...", text: "Password must be at least 6 characters!" });
    if (!/[A-Z]/.test(pass)) return Swal.fire({ icon: "error", title: "Oops...", text: "Password needs an uppercase letter!" });
    if (!/[a-z]/.test(pass)) return Swal.fire({ icon: "error", title: "Oops...", text: "Password needs a lowercase letter!" });
    if (pass !== confirmPass) return Swal.fire({ icon: "error", title: "Oops...", text: "Passwords do not match!" });

    Swal.fire({ title: "Creating your account...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    const formData = new FormData();
    formData.append("image", file);
    const imgRes = await axios.post("https://api.imgbb.com/1/upload?key=f597642f9c8f007109a3f030821c0edb", formData, { headers: { "Content-Type": "multipart/form-data" } });
    const mainPhotoUrl = imgRes.data.data.display_url;

    if (imgRes.data.success) {
      registerWithEmailPassword(email, pass)
        .then((userCredential) => {
          updateProfile(auth.currentUser, { displayName: name, photoURL: mainPhotoUrl })
            .then(() => {
              setUser(userCredential.user);
              axios.post("https://bloodlove.vercel.app/users", { email, name, mainPhotoUrl, blood, district, upazila })
                .then(() => setIsFatching(true))
                .catch(console.log);
              setLoading(false);
              Swal.fire({ title: "Registration Successful! 🎉", icon: "success", confirmButtonColor: "#dc2626" });
              navigate("/");
            })
            .catch((err) => { console.log(err); setLoading(false); });
        })
        .catch((err) => { console.log(err); setLoading(false); });
    }
  };

  const googleSignup = () => {
    handleGoogleSignin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        axios.post("https://bloodlove.vercel.app/users", { email: user.email, name: user.displayName, mainPhotoUrl: user.photoURL, blood: "Unknown", district: "Unknown", upazila: "Unknown" })
          .then(() => { setIsFatching(true); Swal.fire({ title: "Registration Successful! 🎉", icon: "success", confirmButtonColor: "#dc2626" }); navigate("/"); })
          .catch(() => navigate("/"));
      })
      .catch(() => Swal.fire({ icon: "error", title: "Oops...", text: "Google signup failed. Please try again." }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-rose-50 px-4 py-10">
      <div className="w-full max-w-lg">

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-red-600 to-rose-500 text-3xl shadow-lg shadow-red-200 mb-4">🩸</div>
          <h1 className="text-3xl font-extrabold text-gray-800">Create Account</h1>
          <p className="text-gray-400 mt-1 text-sm">Join the BloodLove donor community</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-400"></div>

          <form onSubmit={handleSubmit} className="p-8 space-y-5">

            {/* Email & Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>✉️ Email</label>
                <input required name="email" type="email" placeholder="your@email.com" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>👤 Full Name</label>
                <input required name="name" type="text" placeholder="Your full name" className={inputClass} />
              </div>
            </div>

            {/* Photo */}
            <div>
              <label className={labelClass}>📷 Profile Photo</label>
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-red-200 rounded-2xl cursor-pointer bg-red-50 hover:bg-red-100 transition-colors group">
                <div className="flex flex-col items-center text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-400 mb-1 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-semibold text-red-500">Click to upload your photo</p>
                  <p className="text-xs text-gray-400">PNG, JPG — Max 5MB</p>
                </div>
                <input required name="photoUrl" type="file" accept="image/*" className="hidden" />
              </label>
            </div>

            {/* Blood Group */}
            <div>
              <label className={labelClass}>🩸 Blood Group</label>
              <select name="blood" defaultValue="" required className={inputClass}>
                <option value="" disabled>Select Blood Group</option>
                {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            {/* District & Upazila */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>📍 District</label>
                <select value={district} onChange={(e) => setDistrict(e.target.value)} required className={inputClass}>
                  <option value="" disabled>Select District</option>
                  {districts.map((d, i) => <option key={i} value={d?.name}>{d?.name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>🏘️ Upazila</label>
                <select value={upazila} onChange={(e) => setUpazila(e.target.value)} required className={inputClass}>
                  <option value="" disabled>Select Upazila</option>
                  {upazilas.map((u) => <option key={u?.id} value={u?.name}>{u?.name}</option>)}
                </select>
              </div>
            </div>

            {/* Password & Confirm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>🔑 Password</label>
                <div className="relative">
                  <input required name="password" type={showPass ? "text" : "password"} placeholder="Min. 6 characters" className={`${inputClass} pr-12`} />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500">
                    {showPass ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className={labelClass}>🔑 Confirm Password</label>
                <div className="relative">
                  <input required name="confirmPassword" type={showPass ? "text" : "password"} placeholder="Re-enter password" className={`${inputClass} pr-12`} />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500">
                    {showPass ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Already have account */}
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-red-600 font-bold hover:underline">Sign In</Link>
            </p>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-300 text-white font-extrabold py-3.5 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-red-200 flex items-center justify-center gap-2">
              {loading ? <><span className="loading loading-spinner loading-sm"></span> Creating account...</> : "🩸 Create Account"}
            </button>

            {/* Divider */}
            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-gray-400 text-xs font-semibold">OR</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Google */}
            <button type="button" onClick={googleSignup}
              className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-red-400 bg-white py-3 rounded-2xl font-bold text-gray-600 hover:text-red-600 transition-all hover:shadow-md">
              <FcGoogle size={22} /> Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
