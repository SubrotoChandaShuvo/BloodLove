import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const SearchRequest = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [lists, setLists] = useState([]);

  const axiosInstance = useAxios();

  useEffect(() => {
    axios.get("/upazila.json").then((res) => setUpazilas(res.data.upazilas));
    axios.get("/district.json").then((res) => setDistricts(res.data.districts));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const bloodGroup = e.target.blood.value;
    if (upazila || district || bloodGroup) {
      axiosInstance
        .get(
          `/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`
        )
        .then((res) => setLists(res.data))
        .catch((err) => console.log(err));
    } else {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please search by selecting any category",
      });
    }
  };

  const handleReset = () => {
    setLists([]);
    setDistrict("");
    setUpazila("");
    const form = document.querySelector("form");
    if (form) form.reset();
  };

  return (
    <div>
      <form
        className="fieldset lg:flex justify-center mx-4 lg:mx-18 mt-8"
        onSubmit={handleSearch}
      >
        <select name="blood" defaultValue="" className="select w-full">
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

        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="select w-full"
        >
          <option value="" disabled>
            Select Your District
          </option>
          {districts.map((d, index) => (
            <option key={index} value={d?.name}>
              {d?.name}
            </option>
          ))}
        </select>

        <select
          value={upazila}
          onChange={(e) => setUpazila(e.target.value)}
          className="select w-full"
        >
          <option value="" disabled>
            Select Your Upazila
          </option>
          {upazilas.map((u) => (
            <option key={u?.id} value={u?.name}>
              {u?.name}
            </option>
          ))}
        </select>

        <button className="btn btn-primary" type="submit">
          Search
        </button>
        <button className="btn btn-error" type="button" onClick={handleReset}>
          Reset
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-6">
        {lists
          .filter((item) => item.status !== "blocked")
          .map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="card-body">
                <div className="flex justify-center mb-2">
                  <img
                    src={item.mainPhotoUrl}
                    alt={item.name}
                    className="h-24 w-24 rounded-full object-cover shadow-md"
                  />
                </div>
                <h2 className="card-title text-red-500 text-center">
                  {item.name}
                </h2>
                <p className="text-xl font-bold">Blood Group: {item.blood}</p>
                <p>
                  <span className="font-semibold">Role:</span> {item.role}
                </p>
                <p>
                  <span className="font-semibold">District:</span>{" "}
                  {item.district}
                </p>
                <p>
                  <span className="font-semibold">Upazila:</span> {item.upazila}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {item.email}
                </p>
                <div className="card-actions justify-end mt-2">
                  <button className="btn btn-sm btn-primary text-white">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchRequest;
