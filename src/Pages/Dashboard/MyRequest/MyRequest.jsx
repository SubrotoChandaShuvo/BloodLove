import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";

const MyRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useContext(AuthContext);

  const [myRequests, setMyRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10;

  const fetchRequests = () => {
    setLoading(true);

    axiosSecure
      .get(
        `/my-request?page=${
          currentPage - 1
        }&size=${itemsPerPage}&status=${status}&role=${role}`
      )
      .then((res) => {
        setMyRequests(res.data.request || []);
        setTotalRequests(res.data.totalRequest || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchRequests();
  }, [currentPage, status, role]);

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
                Swal.fire({
                  icon: "success",
                  title: `Request marked as ${newStatus}`,
                });
                fetchRequests()
              })
              .catch(() =>
                Swal.fire({ icon: "error", title: "Failed to update status" })
              );
      }
    });
  };

  const numberOfPages = Math.ceil(totalRequests / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((n) => n + 1);

  return (
    <div className="p-6">
      {/* Header & Filter */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          {role === "admin" ? "All Donation Requests" : "My Donation Requests"}
        </h2>

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
              <th>Recipient</th>
              <th>Hospital</th>
              <th>Blood</th>
              <th>Date</th>
              <th>Status</th>
              {role === "admin" && <th>Action</th>}
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
              myRequests.map((req, index) => (
                <tr key={req._id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{req.recipientName}</td>
                  <td>{req.hospitalName}</td>
                  <td>{req.bloodGroup}</td>
                  <td>{req.donationDate}</td>

                  <td>
                    <span
                      className={`badge capitalize px-3 min-w-25 py-2
                        ${req.donationStatus === "pending" && "badge-warning"}
                        ${req.donationStatus === "inprogress" && "badge-info"}
                        ${req.donationStatus === "done" && "badge-success"}
                        ${req.donationStatus === "canceled" && "badge-error"}
                      `}
                    >
                      {req.donationStatus}
                    </span>
                  </td>

                  {role === "admin" && (
                    <td>
                      <select
                        className="select select-bordered select-sm"
                        value={req.donationStatus}
                        onChange={(e) =>
                          handleStatusUpdate(req._id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                      </select>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {numberOfPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="btn btn-sm"
          >
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

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, pages.length))
            }
            className="btn btn-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyRequest;
