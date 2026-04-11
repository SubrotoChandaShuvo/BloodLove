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
  const [searched, setSearched] = useState(false);

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
        .get(`/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
        .then((res) => {
          setLists(res.data);
          setSearched(true);
        })
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
    setSearched(false);
    const form = document.querySelector("form");
    if (form) form.reset();
  };

  const filtered = lists.filter((item) => item.status !== "blocked");

  return (
    <div className="min-h-screen">
      {/* ── Hero Header ── */}
      <div className="relative bg-gradient-to-br from-red-700 via-red-600 to-rose-500 text-white py-16 px-6 text-center overflow-hidden">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex justify-center mb-5">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-5 border border-white/30 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C12 2 4 9.5 4 14a8 8 0 0 0 16 0C20 9.5 12 2 12 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">Find a Blood Donor</h1>
          <p className="text-lg md:text-xl text-red-100 font-medium max-w-xl mx-auto">
            Every second counts. Search for a compatible donor nearby and save a life today.
          </p>
        </div>
      </div>

      {/* ── Search Form Card ── */}
      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
        <form
          onSubmit={handleSearch}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-100 p-8"
        >
          <h2 className="text-xl font-bold text-gray-700 mb-6 text-center">Filter Donors</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Blood Group */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600 ml-1">🩸 Blood Group</label>
              <select
                name="blood"
                defaultValue=""
                className="select w-full border-2 border-red-200 focus:border-red-500 rounded-xl bg-white text-gray-700 font-medium shadow-sm"
              >
                <option value="" disabled>Select Blood Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600 ml-1">📍 District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="select w-full border-2 border-red-200 focus:border-red-500 rounded-xl bg-white text-gray-700 font-medium shadow-sm"
              >
                <option value="" disabled>Select District</option>
                {districts.map((d, i) => (
                  <option key={i} value={d?.name}>{d?.name}</option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600 ml-1">🏘️ Upazila</label>
              <select
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                className="select w-full border-2 border-red-200 focus:border-red-500 rounded-xl bg-white text-gray-700 font-medium shadow-sm"
              >
                <option value="" disabled>Select Upazila</option>
                {upazilas.map((u) => (
                  <option key={u?.id} value={u?.name}>{u?.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 text-white font-bold px-10 py-3 rounded-xl shadow-lg shadow-red-200 transition-all hover:scale-105 hover:-translate-y-0.5"
            >
              🔍 Search Donors
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold px-8 py-3 rounded-xl transition-all hover:scale-105"
            >
              ✕ Reset
            </button>
          </div>
        </form>
      </div>

      {/* ── Results Section ── */}
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Before search — prompt */}
        {!searched && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-red-50 rounded-full p-8 mb-6 border-2 border-dashed border-red-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-500 mb-2">Search for Donors</h3>
            <p className="text-gray-400 max-w-sm">Use the filters above to find available blood donors in your area.</p>
          </div>
        )}

        {/* Searched but no results */}
        {searched && filtered.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold text-gray-500">No Donors Found</h3>
            <p className="text-gray-400 mt-2 max-w-sm">Try broadening your search — change the district, upazila, or blood group.</p>
          </div>
        )}

        {/* Results Grid */}
        {filtered.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-10 rounded-full bg-red-500"></div>
              <h2 className="text-2xl font-extrabold text-gray-700">
                {filtered.length} Donor{filtered.length > 1 ? "s" : ""} Found
              </h2>
              <div className="h-1 flex-1 rounded-full bg-red-100"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <div
                  key={item._id}
                  className="group bg-white rounded-2xl border border-red-100 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-red-300 overflow-hidden"
                >
                  {/* Red top banner */}
                  <div className="h-16 bg-gradient-to-r from-red-600 to-rose-500 relative">
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                      <div className="relative">
                        <img
                          src={item.mainPhotoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=dc2626&color=fff&bold=true&size=80`}
                          alt={item.name}
                          className="h-16 w-16 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <span className="absolute -bottom-1 -right-1 bg-red-600 text-white text-xs font-extrabold px-1.5 py-0.5 rounded-full border-2 border-white shadow">
                          {item.blood}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="pt-12 pb-5 px-5 text-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
                    <span className="inline-block bg-red-50 text-red-600 text-xs font-semibold px-3 py-1 rounded-full mb-4 capitalize border border-red-200">
                      {item.role}
                    </span>

                    <div className="space-y-2 text-sm text-gray-600 text-left">
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                        <span>📍</span>
                        <span><span className="font-semibold">District:</span> {item.district}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                        <span>🏘️</span>
                        <span><span className="font-semibold">Upazila:</span> {item.upazila}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg overflow-hidden">
                        <span>✉️</span>
                        <span className="truncate">{item.email}</span>
                      </div>
                    </div>

                    <a
                      href={`mailto:${item.email}`}
                      className="mt-5 w-full block text-center bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-md shadow-red-200"
                    >
                      Contact Donor
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchRequest;
