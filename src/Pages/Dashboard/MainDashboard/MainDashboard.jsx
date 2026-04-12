import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import { FaMoneyBillWave, FaTint, FaUsers } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";

const MainDashboard = () => {
  const { user, role } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [recentRequests, setRecentRequests] = useState([]);
  const [countReq, setCountReq] = useState(null)
  const [totalFund, setTotalFund] = useState(null)
  const [countDonor, setCountDonor] = useState(null);
  // const [role, setRole] = useState("");

  // useEffect(() => {
  //   if (user?.email) {
  //     axiosInstance
  //       .get(`/users/role/${user.email}`)
  //       .then((res) => {

          
  //         setRole(res.data?.role || "donor")
  //       })
  //       .catch(console.error);
  //   }
  // }, [user?.email]);

  // console.log(role);
  

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/myRequest?email=${user.email}&limit=3`)
        .then((res) => setRecentRequests(res.data.requests || []))
        .catch((err) => console.error(err));
    }

    // console.log("reee");

    axiosInstance
      .get("/requests/count")
      .then((res) => {
        console.log("🔍 Backend response keys:", Object.keys(res.data));
        console.log("🔍 Full response data:", res.data);
        setCountReq(res.data.totalRequests)
        setTotalFund(res.data.totalFund[0]?.totalAmount || 0);
        setCountDonor(res.data.totalDonor)
      })
      .catch((err) => {
        console.error("❌ /requests/count API failed!");
        console.error("Status:", err?.response?.status);
        console.error("Message:", err?.response?.data || err?.message);
        console.error("Full error:", err);
      });
  }, [axiosInstance, axiosSecure, user]);

//   console.log(recentRequests);
// console.log(role);


  const handleStatusUpdate = (id, newStatus) => {
    console.log(id);

    axiosSecure
      .patch(`/updateRequest/user/status?requestId=${id}&status=${newStatus}`)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: `Request marked as ${newStatus}`,
        });
        setRecentRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, donationStatus: newStatus } : req
          )
        );
      })
      .catch(() =>
        Swal.fire({ icon: "error", title: "Failed to update status" })
      );
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This donation request will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/delete/request/${id}`)
          .then(() => {
            Swal.fire(
              "Deleted!",
              "Donation request has been deleted.",
              "success"
            );
            setRecentRequests((prev) => prev.filter((req) => req._id !== id));
          })
          .catch(() =>
            Swal.fire({
              icon: "error",
              title: "Failed to delete",
              text: "Something went wrong. Please try again.",
            })
          );
      }
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8">

      {/* Welcome Header */}
      <div className="relative rounded-3xl overflow-hidden mb-8 shadow-xl">
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-500 px-8 py-8">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 10% 50%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}>
          </div>
          <div className="relative z-10">
            <p className="text-red-200 text-sm font-semibold uppercase tracking-widest mb-1">Dashboard</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
              Welcome, {user?.displayName?.split(" ")[0] || "Donor"}
            </h1>
            <p className="text-red-100 mt-2 text-sm">Here's a summary of your recent blood donation activity.</p>
          </div>
        </div>
      </div>

      {/* Admin Stats Cards */}
      {role !== "donor" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6 flex items-center gap-5 hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 rounded-2xl p-4">
              <FaUsers className="text-3xl text-blue-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-semibold">Total Donors</p>
              <h2 className="text-3xl font-extrabold text-gray-800">{countDonor ?? "—"}</h2>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6 flex items-center gap-5 hover:shadow-lg transition-shadow">
            <div className="bg-green-100 rounded-2xl p-4">
              <FaMoneyBillWave className="text-3xl text-green-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-semibold">Total Funding</p>
              <h2 className="text-3xl font-extrabold text-gray-800">${totalFund ?? "—"}</h2>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-red-100 p-6 flex items-center gap-5 hover:shadow-lg transition-shadow">
            <div className="bg-red-100 rounded-2xl p-4">
              <FaTint className="text-3xl text-red-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-semibold">Total Requests</p>
              <h2 className="text-3xl font-extrabold text-gray-800">{countReq ?? "—"}</h2>
            </div>
          </div>
        </div>
      )}

      {/* Recent Donation Requests */}
      {recentRequests?.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          {/* Section Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 bg-red-500 rounded-full"></div>
              <h2 className="text-xl font-extrabold text-gray-800">Recent Donation Requests</h2>
            </div>
            <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full">
              {recentRequests.length} Request{recentRequests.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-gray-500 text-left text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">#</th>
                  <th className="px-6 py-4 font-semibold">Recipient</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                  <th className="px-6 py-4 font-semibold">Date & Time</th>
                  <th className="px-6 py-4 font-semibold">Blood</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Donor Info</th>
                  <th className="px-6 py-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentRequests.map((req, index) => (
                  <tr key={req._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-400 font-bold">{index + 1}</td>

                    {/* Recipient */}
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-800">{req.recipientName}</p>
                      <p className="text-xs text-gray-400 truncate max-w-[120px]">{req.hospitalName}</p>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
                        📍 {req.recipientDistrict}
                      </span>
                    </td>

                    {/* Date & Time */}
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-700">{req.donationDate}</p>
                      <p className="text-xs text-gray-400">{req.donationTime}</p>
                    </td>

                    {/* Blood Group */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-red-100 text-red-700 font-extrabold text-sm border border-red-200">
                        {req.bloodGroup}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold capitalize border
                        ${req.donationStatus === "pending" ? "bg-yellow-100 text-yellow-700 border-yellow-200" :
                          req.donationStatus === "inprogress" ? "bg-blue-100 text-blue-700 border-blue-200" :
                          req.donationStatus === "done" ? "bg-green-100 text-green-700 border-green-200" :
                          "bg-red-100 text-red-700 border-red-200"}`}>
                        <span className={`h-1.5 w-1.5 rounded-full
                          ${req.donationStatus === "pending" ? "bg-yellow-500" :
                            req.donationStatus === "inprogress" ? "bg-blue-500" :
                            req.donationStatus === "done" ? "bg-green-500" : "bg-red-500"}`}>
                        </span>
                        {req.donationStatus}
                      </span>
                    </td>

                    {/* Donor Info */}
                    <td className="px-6 py-4">
                      {req.donationStatus === "inprogress" ? (
                        <div>
                          <p className="font-semibold text-gray-700 text-xs">{req.donorName || user?.displayName}</p>
                          <p className="text-gray-400 text-xs truncate max-w-[130px]">{req.donorEmail || user?.email}</p>
                        </div>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        <Link to={`/dashboard/edit-request/${req._id}`}>
                          <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition-all hover:scale-105 shadow-sm">
                            ✏️ Edit
                          </button>
                        </Link>

                        {req.donationStatus === "inprogress" && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(req._id, "done")}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-green-600 hover:bg-green-700 text-white transition-all hover:scale-105 shadow-sm"
                            >
                              ✅ Done
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(req._id, "canceled")}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-500 hover:bg-red-600 text-white transition-all hover:scale-105 shadow-sm"
                            >
                              ✕ Cancel
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => handleDelete(req._id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-700 hover:bg-gray-900 text-white transition-all hover:scale-105 shadow-sm"
                        >
                          🗑 Delete
                        </button>

                        <Link to={`/details/${req._id}`}>
                          <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-105 shadow-sm">
                            👁 View
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CTA Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => navigate("/all-request")}
          className="bg-red-600 hover:bg-red-500 text-white font-bold px-10 py-3.5 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-red-200"
        >
          View All Requests →
        </button>
      </div>
    </div>
  );
};

export default MainDashboard;


