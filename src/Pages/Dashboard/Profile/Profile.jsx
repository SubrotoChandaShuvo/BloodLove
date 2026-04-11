import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const BLOOD_COLORS = {
  "A+": "bg-red-500", "A-": "bg-rose-500",
  "B+": "bg-orange-500", "B-": "bg-amber-500",
  "AB+": "bg-purple-500", "AB-": "bg-violet-600",
  "O+": "bg-green-500", "O-": "bg-teal-500",
};

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://bloodlove.vercel.app/users/role/${user.email}`)
        .then((res) => res.json())
        .then((data) => setProfileData(data));
    }
  }, [user]);

  if (!profileData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-red-500"></span>
      </div>
    );
  }

  const bloodColor = BLOOD_COLORS[profileData.blood] || "bg-red-500";

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">My Profile</h1>
        <p className="text-gray-400 text-sm mt-1">Your personal information and donor details</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Hero Profile Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Red gradient banner */}
          <div className="h-36 bg-gradient-to-r from-red-700 via-red-500 to-rose-400 relative">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}>
            </div>
          </div>

          {/* Profile content */}
          <div className="bg-white px-6 pb-8 pt-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-14 mb-6">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={profileData.mainPhotoUrl || user?.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}&background=dc2626&color=fff&bold=true&size=120`}
                  alt={profileData.name}
                  className="h-28 w-28 rounded-2xl object-cover border-4 border-white shadow-xl"
                />
                {/* Blood Group Badge */}
                <span className={`absolute -bottom-2 -right-2 ${bloodColor} text-white text-xs font-extrabold px-2 py-1 rounded-full border-2 border-white shadow-md`}>
                  {profileData.blood}
                </span>
              </div>

              <div className="text-center sm:text-left pb-1">
                <h2 className="text-2xl font-extrabold text-gray-800">{profileData.name}</h2>
                <p className="text-gray-400 text-sm">{profileData.email}</p>
                <span className={`inline-block mt-2 px-3 py-1 text-xs font-bold rounded-full capitalize border
                  ${profileData.role === "admin" ? "bg-purple-100 text-purple-700 border-purple-200" :
                    profileData.role === "volunteer" ? "bg-blue-100 text-blue-700 border-blue-200" :
                    "bg-green-100 text-green-700 border-green-200"}`}>
                  {profileData.role}
                </span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard icon="🩸" label="Blood Group" value={profileData.blood || "Not set"} highlight />
              <InfoCard icon="✉️" label="Email" value={profileData.email} />
              <InfoCard icon="📍" label="District" value={profileData.district || "Not set"} />
              <InfoCard icon="🏘️" label="Upazila" value={profileData.upazila || "Not set"} />
              <InfoCard icon="👤" label="Role" value={profileData.role} capitalize />
              <InfoCard icon="🟢" label="Status" value={profileData.status || "active"} capitalize
                statusColor={profileData.status === "blocked" ? "text-red-600" : "text-green-600"} />
            </div>
          </div>
        </div>

        {/* Tip Card */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-4">
          <div className="text-2xl">⚙️</div>
          <div>
            <p className="font-bold text-red-700">Want to update your profile?</p>
            <p className="text-sm text-red-500 mt-1">
              Go to <strong>Settings</strong> from the sidebar to change your name or profile photo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value, highlight, capitalize, statusColor }) => (
  <div className={`flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all
    ${highlight ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-100"}`}>
    <span className="text-2xl">{icon}</span>
    <div>
      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{label}</p>
      <p className={`font-bold text-gray-800 mt-0.5 ${capitalize ? "capitalize" : ""} ${statusColor || ""}`}>
        {value}
      </p>
    </div>
  </div>
);

export default Profile;
