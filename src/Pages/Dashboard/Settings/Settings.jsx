import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";

const Settings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://bloodlove.vercel.app/users/role/${user.email}`)
        .then((res) => res.json())
        .then((data) => setProfileData(data));
    }
  }, [user]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const file = form.photo.files[0];

    if (!name) {
      return Swal.fire({ icon: "warning", title: "Name cannot be empty!" });
    }

    setLoading(true);
    let mainPhotoUrl = profileData.mainPhotoUrl;

    try {
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        const res = await axios.post(
          "https://api.imgbb.com/1/upload?key=f597642f9c8f007109a3f030821c0edb",
          formData
        );
        mainPhotoUrl = res.data.data.display_url;
      }

      await axiosSecure.patch(`/users/update/profile?email=${profileData.email}`, {
        name,
        mainPhotoUrl,
      });

      setProfileData((prev) => ({ ...prev, name, mainPhotoUrl }));
      setPreviewUrl(null);
      form.photo.value = "";

      Swal.fire({
        icon: "success",
        title: "Settings Saved!",
        text: "Your name and photo have been updated.",
        confirmButtonColor: "#dc2626",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!profileData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-red-500"></span>
      </div>
    );
  }

  const currentPhoto = previewUrl || profileData.mainPhotoUrl || user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}&background=dc2626&color=fff&bold=true&size=120`;

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Update your display name and profile photo</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-7 py-5">
              <h2 className="text-white font-bold text-lg">Profile Settings</h2>
              <p className="text-slate-400 text-sm">Changes apply immediately after saving</p>
            </div>

            <div className="p-7 space-y-8">
              {/* Avatar Preview Section */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <img
                    src={currentPhoto}
                    alt="Profile Preview"
                    className="h-28 w-28 rounded-2xl object-cover border-4 border-red-100 shadow-lg"
                  />
                  {previewUrl && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white shadow">
                      Preview
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm">This is how your photo will look</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100"></div>

              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">
                  👤 Display Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={profileData.name}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-400 focus:outline-none transition-colors text-gray-800 font-medium"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email (read-only) */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">
                  ✉️ Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                />
                <p className="text-xs text-gray-400">Email cannot be changed</p>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">
                  📷 Profile Photo
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-red-200 rounded-2xl cursor-pointer bg-red-50 hover:bg-red-100 transition-colors group">
                  <div className="flex flex-col items-center text-center px-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400 mb-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-semibold text-red-500">Click to upload a new photo</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — Max 5MB</p>
                  </div>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </label>
              </div>
            </div>

            {/* Save Button */}
            <div className="px-7 pb-7">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-300 text-white font-bold py-3.5 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-red-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving Changes...
                  </>
                ) : (
                  "💾 Save Changes"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
