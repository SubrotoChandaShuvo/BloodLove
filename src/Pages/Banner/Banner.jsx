import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="bg-red-600 text-white mb-10">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Donate Blood, Save Lives
        </h1>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link to="/register">
            <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-red-600 transition">
              Join as a Donor
            </button>
          </Link>

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
