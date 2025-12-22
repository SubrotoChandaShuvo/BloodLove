import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";

const Details = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const [request, setRequest] = useState({});

  //   console.log(request);

  const fetchRequest = () => {
    axiosInstance
      .get(`/details/${id}`)
      .then((res) => setRequest(res.data))
      .catch((err) => console.log(err));

    console.log("hello");
  };

  useEffect(() => {
    fetchRequest();
  }, [axiosInstance, id]);

  // Handle donation confirmation
//   const handleDonate = (e) => {
//     e.preventDefault();

//     axiosInstance
//       .patch(`/update/donation/status?id=${id}&status=inprogress`)
//       .then(() => {
//         document.getElementById("donate_modal").close();
//         Swal.fire({
//           title: "Donation confirmed!",
//           icon: "success",
//           confirmButtonText: "OK",
//         });
//         fetchRequest();
//         document.getElementById("donate_modal")?.close();
//       })
//       .catch(() => {
//         document.getElementById("donate_modal").close();
//         Swal.fire({
//           title: "Error!",
//           text: "Could not update donation status",
//           icon: "error",
//         });
//       });
//   };
const handleDonate = (e) => {
  e.preventDefault();

  axiosInstance
    .patch(`/update/donation/status`, {
      id,
      status: "inprogress",
      donorName: user?.displayName,
      donorEmail: user?.email,
    })
    .then(() => {
      document.getElementById("donate_modal").close();
      Swal.fire({
        title: "Donation confirmed!",
        icon: "success",
        confirmButtonText: "OK",
      });
      fetchRequest();
    })
    .catch(() => {
      document.getElementById("donate_modal").close();
      Swal.fire({
        title: "Error!",
        text: "Could not update donation status",
        icon: "error",
      });
    });
};


  if (!request) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity w-24 h-24"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-10 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-linear-to-r from-red-500 to-pink-500 text-white px-6 py-5">
          <h2 className="text-2xl font-bold">{request.requesterName}</h2>
          <p className="text-sm opacity-90">{request.requesterEmail}</p>
        </div>

        <div className="px-6 py-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-600">Recipient</span>
              <span className="text-gray-800">{request.recipientName}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-600">Blood Group</span>
              <span className="text-red-600 font-bold text-lg">
                {request.bloodGroup}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-600">Hospital</span>
              <span className="text-gray-800">{request.hospitalName}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-600">
                District / Upazila
              </span>
              <span className="text-gray-800">
                {request.recipientDistrict} / {request.recipientUpazila}
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-gray-600">Full Address</span>
            <span className="text-gray-800">{request.fullAddress}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-600">Donation Date</span>
              <span className="text-gray-800">{request.donationDate}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-600">Donation Time</span>
              <span className="text-gray-800">{request.donationTime}</span>
            </div>
          </div>

          {request.requestMessage && (
            <div className="flex flex-col">
              <span className="font-semibold text-gray-600">Message:</span>
              <p className="p-2 rounded-md mt-1 text-gray-800">
                {request.requestMessage}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex gap-6 items-center mt-2">
              <span className="font-semibold text-gray-600">Status</span>
              <span
                className={`px-4 py-1 rounded-full text-white font-medium capitalize
                  ${request.donationStatus === "pending" ? "bg-yellow-500" : ""}
                  ${
                    request.donationStatus === "inprogress" ? "bg-blue-500" : ""
                  }
                  ${request.donationStatus === "done" ? "bg-green-500" : ""}
                  ${request.donationStatus === "canceled" ? "bg-red-500" : ""}`}
              >
                {request.donationStatus}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-gray-600">Created At</span>
              <span className="text-gray-800">
                {new Date(request.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
          <button
            onClick={() => window.history.back()}
            className="btn btn-neutral btn-sm hover:bg-gray-700"
          >
            Back
          </button>

          {request.donationStatus === "pending" && (
            <button
              onClick={() =>
                document.getElementById("donate_modal").showModal()
              }
              className="btn bg-red-500 text-white btn-sm hover:bg-red-800"
            >
              Donate
            </button>
          )}
        </div>
      </div>

      {/* Donate Modal */}
      <dialog id="donate_modal" className="modal">
        <form onSubmit={handleDonate} method="dialog" className="modal-box p-6">
          <h3 className="text-lg font-bold mb-4">Confirm Donation</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Donor Name</label>
              <input
                type="text"
                readOnly
                value={user?.displayName || ""}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Donor Email</label>
              <input
                type="email"
                readOnly
                value={user?.email || ""}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-neutral"
              onClick={() => document.getElementById("donate_modal").close()}
            >
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Confirm
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default Details;
