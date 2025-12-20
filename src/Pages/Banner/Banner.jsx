import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const Banner = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleJoinDonor = () => {
  if (user) {
    Swal.fire({
      icon: "info",
      title: "Already Registered",
      text: "You already registered as a donor.",
      confirmButtonColor: "#dc2626",
    });
  } else {
    navigate("/register");
  }
};

  return (
    <section className="bg-red-600 text-white mb-10">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Donate Blood, Save Lives
        </h1>

        <div className="flex gap-4">
          <button
            onClick={handleJoinDonor}
            className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-red-600 transition"
          >
            Join as a Donor
          </button>

          <Link to="/search">
            <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-red-600 transition">
              Search Donors
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
