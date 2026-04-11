import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";
import logo from "../assets/Logo.png";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Stay Logged In",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Logged out!",
              text: "You have been successfully logged out.",
              confirmButtonColor: "#dc2626",
              timer: 1500,
              showConfirmButton: false,
            });
            navigate("/login");
          })
          .catch((error) => {
            Swal.fire({ icon: "error", title: "Oops...", text: `Something went wrong: ${error.message}` });
          });
      }
    });
  };

  const navItemClass = ({ isActive }) =>
    `font-semibold text-base transition-all duration-300 rounded-xl px-4 py-2 shadow-sm border border-transparent ${
      isActive
        ? "bg-red-500/10 text-red-600 border-red-500/20"
        : "text-gray-700 hover:bg-white/50 hover:text-red-500 hover:shadow-md hover:border-gray-200/50"
    }`;

  const navLinks = (
    <>
      <li className="mx-1">
        <NavLink to="/" className={navItemClass}>
          Home
        </NavLink>
      </li>
      <li className="mx-1">
        <NavLink to="/all-request" className={navItemClass}>
          All Request
        </NavLink>
      </li>
      {user && (
        <li className="mx-1">
          <NavLink to="/add-request" className={navItemClass}>
            Add Request
          </NavLink>
        </li>
      )}
      <li className="mx-1">
        <NavLink to="/search" className={navItemClass}>
          Search
        </NavLink>
      </li>
      <li className="mx-1">
        <NavLink to={user ? "/donate" : "/login"} className={navItemClass}>
          Donate
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 w-full transition-all duration-300">
      <div className="navbar bg-white/40 backdrop-blur-xl border-b border-white/40 shadow-sm md:px-8">
        {/* LEFT */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-white/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>

            {/* MOBILE MENU */}
            <ul className="menu menu-sm dropdown-content bg-white/80 backdrop-blur-xl rounded-2xl z-50 mt-4 w-60 p-4 shadow-2xl border border-white/50 gap-2">
              {navLinks}
            </ul>
          </div>

          <Link to="/" className="inline-block flex items-center gap-3 ml-2 lg:ml-7 transition-transform hover:scale-105">
            <img src={logo} className="h-12 w-auto drop-shadow-md" alt="logo" />
            <span className="hidden sm:block text-2xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              BloodLove
            </span>
          </Link>
        </div>

        {/* CENTER (DESKTOP) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navLinks}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-3">
          {user ? (
            <Link to="/dashboard/main" className="btn bg-gray-900 hover:bg-gray-800 text-white border-none shadow-lg rounded-xl px-6 transition-all hover:scale-105">
              Dashboard
            </Link>
          ) : (
            <Link to="/register" className="btn bg-gray-900 hover:bg-gray-800 text-white border-none shadow-lg rounded-xl px-6 transition-all hover:scale-105">
              Sign Up
            </Link>
          )}

          {user ? (
            <button
              onClick={logout}
              className="btn bg-red-600 hover:bg-red-700 text-white border-none shadow-lg rounded-xl px-6 transition-all hover:scale-105"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn bg-red-600 hover:bg-red-700 text-white border-none shadow-lg rounded-xl px-6 transition-all hover:scale-105">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
