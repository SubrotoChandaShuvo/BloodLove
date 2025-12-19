import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyRequest = () => {
  const [myRequests, setMyRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
      .then((res) => {
        setMyRequests(res.data.request);
        setTotalRequests(res.data.totalRequest);
      });
  }, [axiosSecure, currentPage, itemsPerPage]);

  const numberOfPages = Math.ceil(totalRequests / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((e) => e + 1);

  // console.log(myRequests);
  // console.log('total',totalRequests);
  // console.log('total',numberOfPages);
//   console.log(pages);

const handlePrev = ()=>{
    if(currentPage>1){
        setCurrentPage(currentPage-1)
    }
}
const handleNext = ()=>{
    if(currentPage<pages.length){
        setCurrentPage(currentPage+1)
    }
}

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Hospital Name</th>
              <th>Blood Group</th>
            </tr>
          </thead>
          <tbody>
            {myRequests.map((request, index) => (
              <tr>
                <th>{(currentPage*10)+(index-9)}</th>
                <td>{request?.recipientName}</td>
                <td>{request?.hospitalName}</td>
                <td>{request?.bloodGroup}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-12 gap-4">
        <button onClick={handlePrev} className="btn">Prev</button>
        {pages.map((page) => (
          <button
            className={`btn ${
              page == currentPage ? "bg-[#ff0000] text-white" : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNext} className="btn">Next</button>
      </div>
    </div>
  );
};

export default MyRequest;
