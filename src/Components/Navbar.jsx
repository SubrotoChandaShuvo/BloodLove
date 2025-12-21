import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";
import logo from "../assets/Logo.png";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user } = useContext(AuthContext);

const logout = () => {
  signOut(auth)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Logged out!',
        text: 'You have been successfully logged out.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Something went wrong: ${error.message}`,
      });
    });
};

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">

        {/* LEFT */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              ☰
            </div>

            {/* MOBILE MENU */}
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? "text-red-500" : ""}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/all-request" className={({ isActive }) => isActive ? "text-red-500" : ""}>
                  All Request
                </NavLink>
              </li>
              <li>
                <NavLink to="/search" className={({ isActive }) => isActive ? "text-red-500" : ""}>
                  Search
                </NavLink>
              </li>
              <li>
                <NavLink to="/donate" className={({ isActive }) => isActive ? "text-red-500" : ""}>
                  Donate
                </NavLink>
              </li>
            </ul>
          </div>

          <Link to="/" className="inline-block ml-7">
            <img src={logo} className="h-12 rounded-lg" alt="logo" />
          </Link>
        </div>

        {/* CENTER (DESKTOP) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "text-red-500" : ""}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-request" className={({ isActive }) => isActive ? "text-red-500" : ""}>
                All Request
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" className={({ isActive }) => isActive ? "text-red-500" : ""}>
                Search
              </NavLink>
            </li>
            <li>
              <NavLink to="/donate" className={({ isActive }) => isActive ? "text-red-500" : ""}>
                Donate
              </NavLink>
            </li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end">
          {user ? (
            <Link to="/dashboard/main" className="btn btn-neutral mr-2">
              Dashboard
            </Link>
          ) : (
            <Link to="/register" className="btn btn-neutral mr-2">
              SignUp
            </Link>
          )}

          {user ? (
            <button onClick={logout} className="btn btn-neutral">
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-neutral">
              Login
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
