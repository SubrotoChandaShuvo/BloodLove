import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";

const EditRequest = () => {
  const { id } = useParams(); // Get request ID from URL
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [requestData, setRequestData] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
    donorName: "",
    donorEmail: "",
    donationStatus: "pending",
  });

  // Fetch existing request details
  useEffect(() => {
    axiosSecure
      .get(`/details/${id}`)
      .then((res) => {
        setRequestData({
          recipientName: res.data.recipientName || "",
          recipientDistrict: res.data.recipientDistrict || "",
          recipientUpazila: res.data.recipientUpazila || "",
          hospitalName: res.data.hospitalName || "",
          fullAddress: res.data.fullAddress || "",
          bloodGroup: res.data.bloodGroup || "",
          donationDate: res.data.donationDate || "",
          donationTime: res.data.donationTime || "",
          requestMessage: res.data.requestMessage || "",
          donorName: res.data.donorName || "",
          donorEmail: res.data.donorEmail || "",
          donationStatus: res.data.donationStatus || "pending",
        });
      })
      .catch((err) => console.log(err));
  }, [axiosSecure, id]);

  // Handle form input changes
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRequestData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to update the donation request
  const handleUpdate = (e) => {
    e.preventDefault();

    const updateData = { ...requestData };
    if (requestData.donationStatus === "inprogress") {
      updateData.donorName = user?.displayName || "";
      updateData.donorEmail = user?.email || "";
    }

    axiosSecure
      .patch(`/update/request/${id}`, updateData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Donation request has been updated successfully.",
        });
        navigate("/dashboard"); // redirect back to dashboard
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to update donation request.",
        })
      );
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Donation Request</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="label">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            value={requestData.recipientName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">Hospital</label>
          <input
            type="text"
            name="hospitalName"
            value={requestData.hospitalName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">District</label>
            <input
              type="text"
              name="recipientDistrict"
              value={requestData.recipientDistrict}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">Upazila</label>
            <input
              type="text"
              name="recipientUpazila"
              value={requestData.recipientUpazila}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div>
          <label className="label">Full Address</label>
          <textarea
            name="fullAddress"
            value={requestData.fullAddress}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">Blood Group</label>
          <select
            name="bloodGroup"
            value={requestData.bloodGroup}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Donation Date</label>
            <input
              type="date"
              name="donationDate"
              value={requestData.donationDate}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">Donation Time</label>
            <input
              type="time"
              name="donationTime"
              value={requestData.donationTime}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div>
          <label className="label">Message (Optional)</label>
          <textarea
            name="requestMessage"
            value={requestData.requestMessage}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Donation Status</label>
          <select
            name="donationStatus"
            value={requestData.donationStatus}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Update Donation Request
        </button>
      </form>
    </div>
  );
};

export default EditRequest;
