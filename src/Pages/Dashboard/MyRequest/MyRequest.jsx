import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router";

const STATUS_STYLES = {
  pending:    "bg-yellow-100 text-yellow-700 border-yellow-200",
  inprogress: "bg-blue-100 text-blue-700 border-blue-200",
  done:       "bg-green-100 text-green-700 border-green-200",
  canceled:   "bg-red-100 text-red-700 border-red-200",
};

const STATUS_DOT = {
  pending:    "bg-yellow-500",
  inprogress: "bg-blue-500",
  done:       "bg-green-500",
  canceled:   "bg-red-500",
};

const BLOOD_COLORS = {
  "A+": "bg-red-500", "A-": "bg-rose-500",
  "B+": "bg-orange-500", "B-": "bg-amber-500",
  "AB+": "bg-purple-500", "AB-": "bg-violet-600",
  "O+": "bg-green-500", "O-": "bg-teal-500",
};

const MyRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useContext(AuthContext);

  const [myRequests, setMyRequests]   = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus]           = useState("all");
  const [loading, setLoading]         = useState(true);

  const itemsPerPage = 10;

  const fetchRequests = () => {
    setLoading(true);
    axiosSecure
      .get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}&status=${status}&role=${role}`)
      .then((res) => {
        setMyRequests(res.data.request || []);
        setTotalRequests(res.data.totalRequest || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchRequests(); }, [currentPage, status, role]);

  const handleStatusUpdate = (id, newStatus) => {
    Swal.fire({
      title: "Change request status?",
      text: `Set status to "${newStatus}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/updateRequest/user/status?requestId=${id}&status=${newStatus}`)
          .then(() => {
            Swal.fire({ icon: "success", title: `Marked as ${newStatus}` });
            fetchRequests();
          })
          .catch(() => Swal.fire({ icon: "error", title: "Failed to update status" }));
      }
    });
  };

  const numberOfPages = Math.ceil(totalRequests / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((n) => n + 1);
  const isAdmin = role === "admin";

  return (
    <div className="p-4 md:p-8 min-h-screen">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">
          {isAdmin ? "All Donation Requests" : "My Donation Requests"}
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {isAdmin ? "Manage and update all blood donation requests" : "Track and manage your submitted blood donation requests"}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-semibold text-gray-700">{totalRequests}</span> total request{totalRequests !== 1 ? "s" : ""}
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-gray-600">Filter by Status:</label>
          <select
            className="px-4 py-2 rounded-xl border-2 border-red-100 focus:border-red-400 focus:outline-none text-sm font-medium text-gray-700 bg-white shadow-sm"
            value={status}
            onChange={(e) => { setStatus(e.target.value); setCurrentPage(1); }}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center py-24 gap-4">
          <span className="loading loading-spinner loading-lg text-red-500"></span>
          <p className="text-gray-400 animate-pulse text-sm">Loading requests...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && myRequests.length === 0 && (
        <div className="flex flex-col items-center py-20 text-center">
          <div className="bg-red-50 rounded-full p-8 mb-4 border-2 border-dashed border-red-200">
            <span className="text-5xl">🩸</span>
          </div>
          <h3 className="text-xl font-bold text-gray-500">No requests found</h3>
          <p className="text-gray-400 text-sm mt-2">
            {status !== "all" ? `No "${status}" requests to show.` : "You haven't made any blood donation requests yet."}
          </p>
        </div>
      )}

      {/* Table */}
      {!loading && myRequests.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-gray-500 text-left text-xs uppercase tracking-wider">
                  <th className="px-5 py-4 font-semibold">#</th>
                  <th className="px-5 py-4 font-semibold">Recipient</th>
                  <th className="px-5 py-4 font-semibold">Hospital</th>
                  <th className="px-5 py-4 font-semibold">Blood</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  {isAdmin && <th className="px-5 py-4 font-semibold text-center">Update Status</th>}
                  <th className="px-5 py-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {myRequests.map((req, index) => (
                  <tr key={req._id} className="hover:bg-gray-50 transition-colors group">
                    {/* # */}
                    <td className="px-5 py-4 text-gray-400 font-bold text-xs">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    {/* Recipient */}
                    <td className="px-5 py-4">
                      <p className="font-bold text-gray-800">{req.recipientName}</p>
                      <p className="text-xs text-gray-400">{req.recipientDistrict}, {req.recipientUpazila}</p>
                    </td>

                    {/* Hospital */}
                    <td className="px-5 py-4">
                      <span className="text-gray-600 font-medium">{req.hospitalName}</span>
                    </td>

                    {/* Blood Group */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center justify-center h-9 w-9 rounded-xl text-white font-extrabold text-xs shadow-sm ${BLOOD_COLORS[req.bloodGroup] || "bg-red-500"}`}>
                        {req.bloodGroup}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-700">{req.donationDate}</p>
                      <p className="text-xs text-gray-400">{req.donationTime}</p>
                    </td>

                    {/* Status Badge */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold capitalize border ${STATUS_STYLES[req.donationStatus] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[req.donationStatus] || "bg-gray-400"}`}></span>
                        {req.donationStatus}
                      </span>
                    </td>

                    {/* Admin Status Changer */}
                    {isAdmin && (
                      <td className="px-5 py-4 text-center">
                        <select
                          className="px-3 py-1.5 rounded-xl border-2 border-gray-200 focus:border-red-400 focus:outline-none text-xs font-semibold text-gray-700 bg-white shadow-sm cursor-pointer"
                          value={req.donationStatus}
                          onChange={(e) => handleStatusUpdate(req._id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="inprogress">In Progress</option>
                          <option value="done">Done</option>
                          <option value="canceled">Canceled</option>
                        </select>
                      </td>
                    )}

                    {/* View Action */}
                    <td className="px-5 py-4 text-center">
                      <Link to={`/details/${req._id}`}>
                        <button
                          title="View Details"
                          className="h-8 w-8 inline-flex items-center justify-center rounded-lg bg-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white transition-all hover:scale-110 border border-blue-200 shadow-sm"
                        >
                          👁
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {numberOfPages > 1 && (
        <div className="flex justify-center items-center gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl font-bold border-2 border-red-200 text-red-600 bg-white hover:bg-red-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            ← Prev
          </button>

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-10 w-10 rounded-xl font-bold border-2 transition-all ${
                page === currentPage
                  ? "bg-red-600 text-white border-red-600 scale-110 shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-red-400 hover:text-red-600"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, pages.length))}
            disabled={currentPage === pages.length}
            className="px-4 py-2 rounded-xl font-bold border-2 border-red-200 text-red-600 bg-white hover:bg-red-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default MyRequest;
