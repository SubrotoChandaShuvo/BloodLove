import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MainDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/myRequest?email=${user.email}&limit=3`)
        .then((res) => setRecentRequests(res.data.requests || []))
        .catch((err) => console.error(err));
    }
  }, [axiosSecure, user]);

  console.log(recentRequests);
  

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
      text: "This donation request will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete/request/${id}`).then(() => {
          Swal.fire("Deleted!", "Donation request has been deleted.", "success");
          setRecentRequests((prev) => prev.filter((req) => req._id !== id));
        });
      }
    });
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl text-center animate-bounce font-bold mb-8">
        Welcome, {user?.displayName || "Donor"} 🎉
      </h1>

      {recentRequests?.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Recent Donation Requests
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Donor Info</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req, index) => (
                  <tr key={req._id}>
                    <th>{index + 1}</th>
                    <td>{req.recipientName}</td>
                    <td>
                      {req.recipientDistrict}, {req.recipientUpazila}
                    </td>
                    <td>{req.donationDate}</td>
                    <td>{req.donationTime}</td>
                    <td>{req.bloodGroup}</td>
                    <td>{req.donationStatus}</td>
                    <td>
                      {req.donationStatus === "inprogress" && (
                        <>
                          {user?.displayName} <br />
                          {user?.email}
                        </>
                      )}
                    </td>
                    <td className="flex flex-wrap gap-2">
                      <button
                        onClick={() => navigate(`/edit-request/${req._id}`)}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </button>

                      {req.donationStatus === "inprogress" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusUpdate(req._id, "done")
                            }
                            className="btn btn-sm btn-success"
                          >
                            Done
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(req._id, "canceled")
                            }
                            className="btn btn-sm btn-error"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => handleDelete(req._id)}
                        className="btn btn-sm btn-outline"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => navigate(`/request-details/${req._id}`)}
                        className="btn btn-sm btn-info"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <button
        onClick={() => navigate("/my-requests")}
        className="btn btn-primary"
      >
        View My All Requests
      </button>
    </div>
  );
};

export default MainDashboard;
