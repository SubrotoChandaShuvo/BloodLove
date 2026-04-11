import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-400 focus:outline-none transition-colors text-gray-800 bg-white";
const labelClass = "block text-sm font-bold text-gray-700 mb-1.5";

const AddRequest = () => {
  const { user, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios.get("/upazila.json").then((res) => setUpazilas(res.data.upazilas));
    axios.get("/district.json").then((res) => setDistricts(res.data.districts));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
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

    axiosSecure.post("/request", formData)
      .then((res) => {
        setSubmitting(false);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "🩸 Request Submitted!",
            text: "Your blood request has been sent successfully.",
            confirmButtonColor: "#dc2626",
            confirmButtonText: "View All Requests",
          }).then(() => navigate("/all-request"));
          form.reset();
          setDistrict(""); setUpazila("");
        }
      })
      .catch(() => {
        setSubmitting(false);
        Swal.fire({ icon: "error", title: "Oops!", text: "Something went wrong. Please try again." });
      });
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">

        {/* Page Header */}
        <div className="relative rounded-3xl overflow-hidden mb-8 shadow-xl">
          <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-500 px-8 py-7">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 10% 50%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="h-14 w-14 bg-white/20 border border-white/40 rounded-2xl flex items-center justify-center text-3xl shadow-lg">🩸</div>
              <div>
                <p className="text-red-200 text-xs font-bold uppercase tracking-widest">Dashboard</p>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">Create Blood Request</h1>
                <p className="text-red-100 text-sm mt-0.5">Fill in the details below to post a blood donation request</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-7 md:p-10 space-y-6">

            {/* Requester Info — Read Only */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
              <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-3">📋 Requester Info (Auto-filled)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>👤 Your Name</label>
                  <input type="text" readOnly value={user?.displayName || ""} className={`${inputClass} bg-red-50 text-gray-400 cursor-not-allowed border-red-100`} />
                </div>
                <div>
                  <label className={labelClass}>✉️ Your Email</label>
                  <input type="email" readOnly={role !== "admin"} value={user?.email || ""} className={`${inputClass} bg-red-50 text-gray-400 cursor-not-allowed border-red-100`} />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100"></div>

            {/* Recipient Info */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">🧑‍⚕️ Recipient Details</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className={labelClass}>Recipient Full Name</label>
                  <input type="text" name="recipient_name" required placeholder="e.g. Md. Rahim Uddin" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>📍 District</label>
                  <select name="recipient_district" value={district} onChange={(e) => setDistrict(e.target.value)} required className={inputClass}>
                    <option value="" disabled>Select District</option>
                    {districts.map((d, i) => <option key={i} value={d?.name}>{d?.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>🏘️ Upazila</label>
                  <select name="recipient_upazila" value={upazila} onChange={(e) => setUpazila(e.target.value)} required className={inputClass}>
                    <option value="" disabled>Select Upazila</option>
                    {upazilas.map((u) => <option key={u?.id} value={u?.name}>{u?.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>🏥 Hospital Name</label>
                  <input type="text" name="hospital_name" required placeholder="e.g. Dhaka Medical College" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>📌 Full Address</label>
                  <input type="text" name="full_address" required placeholder="e.g. Zahir Raihan Rd, Dhaka" className={inputClass} />
                </div>
              </div>
            </div>

            {/* Blood & Schedule */}
            <div className="h-px bg-gray-100"></div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">🩸 Blood & Schedule</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className={labelClass}>🩸 Blood Group</label>
                  <select name="blood_group" required defaultValue="" className={inputClass}>
                    <option value="" disabled>Select Group</option>
                    {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>📅 Donation Date</label>
                  <input type="date" name="donation_date" required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>⏰ Donation Time</label>
                  <input type="time" name="donation_time" required className={inputClass} />
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className={labelClass}>💬 Request Message</label>
              <textarea
                name="request_message"
                required
                rows="4"
                placeholder="Explain the urgency and why blood is needed..."
                className={`${inputClass} resize-none`}
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-300 text-white font-extrabold py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-red-200 flex items-center justify-center gap-2 text-base"
            >
              {submitting ? (
                <><span className="loading loading-spinner loading-sm"></span> Submitting...</>
              ) : "🩸 Submit Blood Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRequest;
