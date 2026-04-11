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
        <section className="relative w-auto mx-4 sm:mx-8 md:mx-16 lg:mx-20 my-6 lg:my-8 min-h-[50vh] flex flex-col items-center justify-center rounded-3xl overflow-hidden shadow-2xl">
            {/* Background Image & Gradient Overlays */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=2000"
                    alt="Hero background"
                    className="w-full h-full object-cover opacity-90 scale-105 animate-pulse"
                    style={{ animationDuration: "20s", animationDirection: "alternate" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-950/95 via-red-900/80 to-black/60 mix-blend-multiply"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-4 py-12 text-white">
                {/* Floating Badge */}
                <div className="inline-block px-4 py-1.5 rounded-full border border-red-400/50 bg-red-600/20 backdrop-blur-md mb-6 animate-bounce" style={{ animationDuration: "3s" }}>
                    <span className="text-xs font-bold tracking-widest uppercase text-red-100">
                        Become a Lifesaver
                    </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight drop-shadow-2xl">
                    Donate Blood, <br className="hidden md:block" />
                    <span className="text-red-400 bg-clip-text">Save Lives</span>
                </h1>

                {/* Subtitle */}
                <p className="text-base md:text-lg text-gray-200 mb-8 max-w-2xl font-medium drop-shadow-md">
                    Join our growing community of heroes. A single donation can save up to three lives. Start your journey today and be the reason someone smiles.
                </p>

                {/* Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
                    <button
                        onClick={handleJoinDonor}
                        className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-base shadow-lg shadow-red-600/40 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                    >
                        Join as a Donor
                    </button>

                    <Link to="/search">
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-xl font-bold text-base shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                            Search Donors
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Banner;
