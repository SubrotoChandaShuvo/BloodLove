import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyRequest = () => {
  const axiosSecure = useAxiosSecure();

  const [myRequests, setMyRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);

    axiosSecure
      .get(
        `/my-request?page=${
          currentPage - 1
        }&size=${itemsPerPage}&status=${status}`
      )
      .then((res) => {
        setMyRequests(res.data.request || []);
        setTotalRequests(res.data.totalRequest || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure, currentPage, itemsPerPage, status]);

  const numberOfPages = Math.ceil(totalRequests / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((n) => n + 1);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < pages.length) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-6">
      {/* Filter */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Donation Requests</h2>

        <select
          className="select select-bordered"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>No.</th>
              <th>Recipient Name</th>
              <th>Hospital</th>
              <th>Blood Group</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="7" className="text-center py-8">
                  <span className="loading loading-spinner loading-md"></span>
                </td>
              </tr>
            )}

            {!loading && myRequests.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No donation requests found
                </td>
              </tr>
            )}

            {!loading &&
              myRequests.map((request, index) => (
                <tr key={request._id}>
                  <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                  <td>{request.recipientName}</td>
                  <td>{request.hospitalName}</td>
                  <td>{request.bloodGroup}</td>
                  <td>{request.donationDate}</td>
                  <td>
                    <span
                      className={`badge capitalize px-2 py-4 text-sm font-semibold rounded-md
                                  ${request.donationStatus === "pending" && "badge-warning"}
                                  ${request.donationStatus === "inprogress" && "badge-info"}
                                  ${request.donationStatus === "done" && "badge-success"}
                                  ${request.donationStatus === "canceled" && "badge-error"}
                                `}
                    >
                      {request.donationStatus}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {numberOfPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button onClick={handlePrev} className="btn btn-sm">
            Prev
          </button>

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`btn btn-sm ${
                page === currentPage ? "bg-red-500 text-white" : ""
              }`}
            >
              {page}
            </button>
          ))}

          <button onClick={handleNext} className="btn btn-sm">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyRequest;
