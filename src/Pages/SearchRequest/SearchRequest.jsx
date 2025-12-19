import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const SearchRequest = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const axiosInstance = useAxios();

  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handleSearch = (e)=>{
    e.preventDefault();
    const bloodGroup = e.target.blood.value;
    axiosInstance.get(`/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
    .then(res=>{
        console.log(res.data);
        
    })


  }

  return (
    <div>
      <form className="fieldset flex justify-center mt-8" onSubmit={handleSearch}>
        <select name="blood" defaultValue="" className="select ">
          <option value="" disabled>
            Select Blood Group
          </option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        {/* <label className="text-[15px]">District</label> */}
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="select"
        >
          <option value="" disabled>
            Select Your District
          </option>
          {districts.map((d, index) => {
            return (
              <option key={index} value={d?.name}>
                {d?.name}
              </option>
            );
          })}
        </select>

        {/* <label className="text-[15px]">Upazila</label> */}
        <select
          value={upazila}
          onChange={(e) => setUpazila(e.target.value)}
          className="select"
        >
          <option value="" disabled>
            Select Your Upazila
          </option>
          {upazilas.map((u) => {
            return (
              <option key={u?.id} value={u?.name}>
                {u?.name}
              </option>
            );
          })}
        </select>
        <button className="btn" type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchRequest;
