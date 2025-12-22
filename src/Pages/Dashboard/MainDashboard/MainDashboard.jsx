import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import { FaMoneyBillWave, FaTint, FaUsers } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";

const MainDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [recentRequests, setRecentRequests] = useState([]);
  const [countReq, setCountReq] = useState(null)
  const [totalFund, setTotalFund] = useState(null)
  const [countDonor, setCountDonor] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user?.email) {
      axiosInstance
        .get(`/users/role/${user.email}`)
        .then((res) => setRole(res.data?.role || "user"))
        .catch(console.error);
    }
  }, [user?.email]);

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
        console.log("hhhh", res.data);
        setCountReq(res.data.totalRequests)
        // setTotalFund(res.data.totalFund.totalAmount)
        setTotalFund(res.data.totalFund[0]?.totalAmount || 0);
        setCountDonor(res.data.totalDonor)
      })
      .catch((err) => console.log(err));
  }, [axiosInstance, axiosSecure, user]);

//   console.log(recentRequests);

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
    <div className="min-h-screen p-6">
      <h1 className="text-3xl text-center animate-bounce font-bold mb-8">
        Welcome, {user?.displayName || "Donor"} 🎉
      </h1>

      {role !== "donor" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
            <FaUsers className="text-4xl text-blue-500 mb-3" />
            <h2 className="text-2xl font-bold">{countDonor}</h2>
            <p className="text-gray-500">Total Donors</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
            <FaMoneyBillWave className="text-4xl text-green-500 mb-3" />
            <h2 className="text-2xl font-bold">${totalFund}</h2>
            <p className="text-gray-500">Total Funding</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
            <FaTint className="text-4xl text-red-500 mb-3" />
            <h2 className="text-2xl font-bold">{countReq}</h2>
            <p className="text-gray-500">Blood Donation Requests</p>
          </div>
        </div>
      )}

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
                  <tr key={req._id} className="border">
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
                          {req.donorName || user?.displayName} <br />
                          {req.donorEmail || user?.email}
                        </>
                      )}
                    </td>
                    <td className="flex flex-wrap justify-between items-center gap-2">
                      <div className="flex gap-2 flex-wrap">
                        <Link to={`/dashboard/edit-request/${req._id}`}>
                          <button className="btn btn-sm btn-warning">
                            Edit
                          </button>
                        </Link>

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
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => handleDelete(req._id)}
                          className="btn btn-sm btn-neutral"
                        >
                          Delete
                        </button>

                        <Link to={`/details/${req._id}`}>
                          <button
                            onClick={() =>
                              navigate(`/request-details/${req._id}`)
                            }
                            className="btn btn-sm btn-info"
                          >
                            View
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

      <div className=" flex items-center justify-center mt-20">
        <button
          onClick={() => navigate("/all-request")}
          className="btn btn-primary"
        >
          View My All Requests
        </button>
      </div>
    </div>
  );
};

export default MainDashboard;

// ------------------------ new code -----------------------
