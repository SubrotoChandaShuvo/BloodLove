import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router";

const BLOOD_COLORS = {
  "A+": "bg-red-500", "A-": "bg-rose-500",
  "B+": "bg-orange-500", "B-": "bg-amber-500",
  "AB+": "bg-purple-500", "AB-": "bg-violet-600",
  "O+": "bg-green-500", "O-": "bg-teal-500",
};

const DonationJourney = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useContext(AuthContext);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axiosSecure.get(`/my-request?page=0&size=100&status=inprogress&role=${role}`),
      axiosSecure.get(`/my-request?page=0&size=100&status=done&role=${role}`),
    ])
      .then(([inProgressRes, doneRes]) => {
        setInProgress(inProgressRes.data.request || []);
        setCompleted(doneRes.data.request || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [role]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <span className="loading loading-spinner loading-lg text-red-500"></span>
        <p className="text-gray-400 animate-pulse text-sm">Loading your journey...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">

      {/* Page Header */}
      <div className="relative rounded-3xl overflow-hidden mb-10 shadow-xl">
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-500 px-8 py-8">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 10% 50%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-red-200 text-sm font-semibold uppercase tracking-widest mb-1">Dashboard</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">🩸 Donation Journey</h1>
              <p className="text-red-100 mt-2 text-sm">Track all your active and completed blood donation requests</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/20 border border-white/30 rounded-2xl px-5 py-3 text-center backdrop-blur-sm">
                <p className="text-2xl font-extrabold text-white">{inProgress.length}</p>
                <p className="text-red-100 text-xs uppercase font-semibold">In Progress</p>
              </div>
              <div className="bg-white/20 border border-white/30 rounded-2xl px-5 py-3 text-center backdrop-blur-sm">
                <p className="text-2xl font-extrabold text-white">{completed.length}</p>
                <p className="text-red-100 text-xs uppercase font-semibold">Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── In Progress Section ── */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-8 w-1.5 bg-blue-500 rounded-full"></div>
          <h2 className="text-2xl font-extrabold text-gray-800">Active Requests</h2>
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
            {inProgress.length} In Progress
          </span>
        </div>

        {inProgress.length === 0 ? (
          <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-3xl py-16 text-center">
            <p className="text-4xl mb-3">🚑</p>
            <h3 className="text-lg font-bold text-blue-400">No Active Requests</h3>
            <p className="text-blue-300 text-sm mt-1">You have no in-progress donation requests right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgress.map((req) => (
              <RequestCard key={req._id} req={req} status="inprogress" />
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="relative my-10 flex items-center">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="mx-4 flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-full px-4 py-1.5 text-sm font-bold text-gray-400">
          <span>✅</span> Completed Requests
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      {/* ── Completed Section ── */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-8 w-1.5 bg-green-500 rounded-full"></div>
          <h2 className="text-2xl font-extrabold text-gray-800">Completed Donations</h2>
          <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200">
            {completed.length} Done
          </span>
        </div>

        {completed.length === 0 ? (
          <div className="bg-green-50 border-2 border-dashed border-green-200 rounded-3xl py-16 text-center">
            <p className="text-4xl mb-3">💚</p>
            <h3 className="text-lg font-bold text-green-400">No Completed Requests Yet</h3>
            <p className="text-green-300 text-sm mt-1">Your completed donations will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completed.map((req) => (
              <RequestCard key={req._id} req={req} status="done" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Card Component ── */
const RequestCard = ({ req, status }) => {
  const isActive = status === "inprogress";
  const bgColor = BLOOD_COLORS[req.bloodGroup] || "bg-red-500";

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col
      ${isActive ? "border-blue-100" : "border-green-100"}`}>

      {/* Card Top Banner */}
      <div className={`${bgColor} px-5 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 border-2 border-white/50 rounded-full h-11 w-11 flex items-center justify-center">
            <span className="text-white font-extrabold text-sm">{req.bloodGroup}</span>
          </div>
          <div>
            <p className="text-white/70 text-xs uppercase tracking-widest">Blood Request</p>
            <p className="text-white font-extrabold">{req.recipientName}</p>
          </div>
        </div>
        {/* Status pill */}
        <span className={`text-xs font-bold px-3 py-1 rounded-full border backdrop-blur-sm
          ${isActive
            ? "bg-blue-100/30 border-white/40 text-white"
            : "bg-green-100/30 border-white/40 text-white"}`}>
          {isActive ? "🔵 Active" : "✅ Done"}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
            <span>🏥</span>
            <span><span className="font-semibold">Hospital:</span> {req.hospitalName}</span>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
              <span>📅</span>
              <span className="text-xs"><span className="font-semibold">Date:</span> {req.donationDate}</span>
            </div>
            <div className="flex-1 flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
              <span>⏰</span>
              <span className="text-xs"><span className="font-semibold">Time:</span> {req.donationTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
            <span>📍</span>
            <span><span className="font-semibold">Location:</span> {req.recipientDistrict}, {req.recipientUpazila}</span>
          </div>
          {isActive && req.donorName && (
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-xl border border-blue-100">
              <span>🧑‍⚕️</span>
              <span className="text-xs"><span className="font-semibold text-blue-700">Donor:</span> {req.donorName}</span>
            </div>
          )}
        </div>

        <Link to={`/details/${req._id}`} className="mt-auto">
          <button className={`w-full font-bold py-2.5 rounded-xl transition-all hover:scale-105 text-sm shadow-sm
            ${isActive
              ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-200"
              : "bg-green-600 hover:bg-green-500 text-white shadow-green-200"}`}>
            {isActive ? "👁 View Details" : "📋 View Summary"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DonationJourney;
