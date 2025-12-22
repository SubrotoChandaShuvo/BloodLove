import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router";

const AllRequest = () => {
  const axiosInstance = useAxios();
  const [allRequest, setAllRequest] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const itemsPerPage = 9; 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
  //   axiosInstance
  //     .get(`/request?page=${currentPage - 1}&size=${itemsPerPage}`)
  //     .then((res) => {
  //       setAllRequest(res.data.requests);
  //       setTotalRequests(res.data.totalRequests);
  //     })
  //     .catch((err) => console.log(err));
  
  axiosInstance.get("/request", {
    params: {
      page: currentPage - 1,
      size: itemsPerPage,
      status: "pending",
    },
  })
  .then(res => {
    setAllRequest(res.data.requests);
    setTotalRequests(res.data.totalRequests);
  })
  .catch(err => console.log(err));
}, [axiosInstance, currentPage, itemsPerPage]);


  const numberOfPages = Math.ceil(totalRequests / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((e) => e + 1);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < pages.length) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-10 animate-bounce">
        All Requests
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10 px-6">
        {allRequest.map((req) => (
          req.donationStatus === 'pending' && (
          <div
            key={req._id}
            className="group bg-white rounded-xl border border-red-100 shadow-md 
            transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:border-red-400"
          >
            <div className="bg-red-600 text-white px-4 py-3 rounded-t-xl flex justify-between items-center">
              <h2 className="text-lg font-semibold">{req.bloodGroup} Blood Needed</h2>
              <span className="text-sm capitalize bg-white text-red-600 px-3 py-1 rounded-full">
                {req.donationStatus}
              </span>
            </div>

            <div className="p-4 space-y-2">
              <p><span className="font-semibold">Recipient:</span> {req.recipientName}</p>
              <p><span className="font-semibold">Hospital:</span> {req.hospitalName}</p>
              {/* <p><span className="font-semibold">Address:</span> {req.fullAddress}</p>
              <p><span className="font-semibold">District:</span> {req.recipientDistrict}, {req.recipientUpazila}</p> */}
              <p><span className="font-semibold">Date:</span> {req.donationDate}</p>
              <p><span className="font-semibold">Time:</span> {req.donationTime}</p>

              <div className="bg-red-100 p-3 rounded-lg text-md text-gray-900 transition group-hover:bg-red-100">
                {req.requestMessage}
              </div>
            </div>
            <div className="px-4 pb-4">
              <Link to={`/details/${req.requesterEmail}`}>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg transition-all duration-300 hover:bg-red-600 hover:scale-105">
                View
              </button>
              </Link>
            </div>
          </div>
          )
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12 gap-4">
        <button onClick={handlePrev} disabled={currentPage === 1} className="btn">
          Prev
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`btn ${page === currentPage ? "bg-[#ff0000] text-white" : ""}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNext} disabled={currentPage === pages.length} className="btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default AllRequest;
