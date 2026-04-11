import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router";

const BLOOD_COLORS = {
  "A+": "bg-red-600",
  "A-": "bg-rose-600",
  "B+": "bg-orange-500",
  "B-": "bg-amber-600",
  "AB+": "bg-purple-600",
  "AB-": "bg-violet-700",
  "O+": "bg-green-600",
  "O-": "bg-teal-600",
};

const AllRequest = () => {
  const axiosInstance = useAxios();
  const [allRequest, setAllRequest] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/request", {
        params: {
          page: currentPage - 1,
          size: itemsPerPage,
          status: "pending",
        },
      })
      .then((res) => {
        setAllRequest(res.data.requests);
        setTotalRequests(res.data.totalRequests);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [axiosInstance, currentPage, itemsPerPage]);

  const numberOfPages = Math.ceil(totalRequests / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((e) => e + 1);

  const handlePrev = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  const handleNext = () => { if (currentPage < pages.length) setCurrentPage(currentPage + 1); };

  return (
    <div className="min-h-screen">
      {/* ── Hero Header ── */}
      <div className="relative bg-gradient-to-br from-red-800 via-red-600 to-rose-500 text-white py-14 px-6 text-center overflow-hidden mb-8">
        <div className="absolute -top-10 -left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C12 2 4 9.5 4 14a8 8 0 0 0 16 0C20 9.5 12 2 12 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg tracking-tight">
            Blood Donation Requests
          </h1>
          <p className="text-red-100 text-lg max-w-xl mx-auto">
            Browse all active, pending blood donation requests. Your response can save a life.
          </p>

          {totalRequests > 0 && (
            <div className="mt-5 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2 text-sm font-semibold">
              <span className="h-2 w-2 rounded-full bg-green-300 animate-ping inline-block"></span>
              {totalRequests} Active Request{totalRequests > 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>

      {/* ── Loading Spinner ── */}
      {loading && allRequest.length === 0 && (
        <div className="flex flex-col justify-center items-center min-h-[40vh] gap-4">
          <span className="loading loading-spinner text-error w-[70px] h-[70px]"></span>
          <p className="text-gray-400 font-medium animate-pulse">Fetching requests...</p>
        </div>
      )}

      {/* ── Cards Grid ── */}
      {!loading && (
        <>
          {allRequest.length === 0 ? (
            <div className="flex flex-col items-center py-24 text-center">
              <div className="text-6xl mb-4">🩸</div>
              <h3 className="text-2xl font-bold text-gray-400">No Pending Requests</h3>
              <p className="text-gray-400 mt-2">There are no active donation requests at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pb-10 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
              {allRequest.map((req) =>
                req.donationStatus === "pending" && (
                  <div
                    key={req._id}
                    className="group bg-white rounded-2xl border border-red-100 shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-red-300 flex flex-col"
                  >
                    {/* Card Top */}
                    <div className={`${BLOOD_COLORS[req.bloodGroup] || "bg-red-600"} px-5 py-4 flex items-center justify-between`}>
                      <div className="flex items-center gap-3">
                        {/* Blood Group Circle */}
                        <div className="bg-white/20 border-2 border-white/60 rounded-full h-12 w-12 flex items-center justify-center shadow-md">
                          <span className="text-white font-extrabold text-sm leading-none">{req.bloodGroup}</span>
                        </div>
                        <div>
                          <p className="text-white/80 text-xs uppercase tracking-widest font-semibold">Blood Needed</p>
                          <h2 className="text-white font-extrabold text-lg leading-tight">{req.bloodGroup} Group</h2>
                        </div>
                      </div>
                      <span className="text-xs capitalize bg-white/20 border border-white/40 text-white px-3 py-1 rounded-full font-semibold backdrop-blur-sm">
                        {req.donationStatus}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col gap-3">
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                          <span className="text-base">🧑‍⚕️</span>
                          <span><span className="font-semibold">Recipient:</span> {req.recipientName}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                          <span className="text-base">🏥</span>
                          <span><span className="font-semibold">Hospital:</span> {req.hospitalName}</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1 flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                            <span className="text-base">📅</span>
                            <span className="text-xs"><span className="font-semibold">Date:</span> {req.donationDate}</span>
                          </div>
                          <div className="flex-1 flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                            <span className="text-base">⏰</span>
                            <span className="text-xs"><span className="font-semibold">Time:</span> {req.donationTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      {req.requestMessage && (
                        <div className="bg-red-50 border border-red-100 p-3 rounded-xl text-sm text-gray-600 italic line-clamp-2">
                          "{req.requestMessage}"
                        </div>
                      )}

                      {/* View Button */}
                      <div className="mt-auto pt-2">
                        <Link to={`/details/${req._id}`}>
                          <button className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-md shadow-red-200 text-sm">
                            View Details →
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* ── Pagination ── */}
          {pages.length > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6 pb-12 flex-wrap px-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl font-bold border-2 border-red-200 text-red-600 bg-white hover:bg-red-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                ← Prev
              </button>

              {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-10 w-10 rounded-xl font-bold border-2 transition-all duration-200 ${
                    page === currentPage
                      ? "bg-red-600 text-white border-red-600 scale-110 shadow-md"
                      : "bg-white text-gray-600 border-gray-200 hover:border-red-400 hover:text-red-600"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={handleNext}
                disabled={currentPage === pages.length}
                className="px-4 py-2 rounded-xl font-bold border-2 border-red-200 text-red-600 bg-white hover:bg-red-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllRequest;
