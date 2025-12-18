import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios"; 
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddRequest = () => {
  const { user } = useContext(AuthContext);

  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  //   console.log(districts);
  //   console.log(upazilas);
  //   return

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: form.recipient_name.value,
      recipientDistrict: form.recipient_district.value,
      recipientUpazila: form.recipient_upazila.value,
      hospitalName: form.hospital_name.value,
      fullAddress: form.full_address.value,
      bloodGroup: form.blood_group.value,
      donationDate: form.donation_date.value,
      donationTime: form.donation_time.value,
      requestMessage: form.request_message.value,
      donationStatus: "pending",
    };

    console.log(formData);

    axiosSecure.post("/request", formData)
      .then((res) => {
        alert(res.data.insertedId);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="card bg-base-200 border border-base-300 rounded-box w-full max-w-sm md:max-w-lg lg:max-w-2xl shrink-0 p-10 shadow-2xl shadow-gray-600 "
      >
        <h2 className="text-2xl font-semibold text-center">
          Create Donation Request
        </h2>

        {/* Requester Name */}
        <div>
          <label className="label">Requester Name</label>
          <input
            type="text"
            readOnly
            value={user?.displayName || ""}
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Requester Email */}
        <div>
          <label className="label">Requester Email</label>
          <input
            type="email"
            readOnly
            value={user?.email || ""}
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Recipient Name */}
        <div>
          <label className="label">Recipient Name</label>
          <input
            type="text"
            name="recipient_name"
            required
            className="input input-bordered w-full"
            placeholder="Recipient Full Name"
          />
        </div>

        <label className="text-[15px]">District</label>
        <select
          name="recipient_district"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          required
          className="select w-full"
        >
          <option value="" disabled>
            Select Your District
          </option>

          {districts?.map((d, index) => {
            return (
              <option key={index} value={d?.name}>
                {d?.name}
              </option>
            );
          })}
        </select>

        <label className="text-[15px]">Upazila</label>
        <select
          name="recipient_upazila"
          value={upazila}
          onChange={(e) => setUpazila(e.target.value)}
          required
          className="select w-full"
        >
          <option value="" disabled>
            Select Your Upazila
          </option>

          {upazilas?.map((u) => (
            <option key={u?.id} value={u?.name}>
              {u?.name}
            </option>
          ))}
        </select>

        {/* Hospital */}
        <div>
          <label className="label">Hospital Name</label>
          <input
            type="text"
            name="hospital_name"
            required
            className="input input-bordered w-full"
            placeholder="Dhaka Medical College Hospital"
          />
        </div>

        {/* Full Address */}
        <div>
          <label className="label">Full Address</label>
          <input
            type="text"
            name="full_address"
            required
            className="input input-bordered w-full"
            placeholder="Zahir Raihan Rd, Dhaka"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="label">Blood Group</label>
          <select
            name="blood_group"
            required
            className="select select-bordered w-full"
          >
            <option value="" disabled selected>
              Select Blood Group
            </option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Donation Date</label>
            <input
              type="date"
              name="donation_date"
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Donation Time</label>
            <input
              type="time"
              name="donation_time"
              required
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Request Message */}
        <div>
          <label className="label">Request Message</label>
          <textarea
            name="request_message"
            required
            rows="4"
            className="textarea textarea-bordered w-full"
            placeholder="Explain why blood is needed..."
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn bg-red-500 text-white w-full hover:brightness-110 mt-4"
        >
          Request For Blood
        </button>
      </form>
    </div>
  );
};

export default AddRequest;
