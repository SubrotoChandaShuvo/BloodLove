import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";
import logo from "../assets/Logo.png"

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const logout = () => {
    signOut(auth);
  };
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link>All Request</Link>
              </li>
              <li>
                <Link to={'/search'}>Search</Link>
              </li>
              <li>
                <Link to={'/donate'}>Donate</Link>
              </li>
            </ul>
          </div>
          <Link to={'/'} className="inline-block">
     <div className="ml-7 rounded-lg">
            <img  src={logo} className="h-12 shadow-2xl rounded-lg hover:scale-105 transition-transform" alt="" />
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link>All Request</Link>
            </li>
            <li>
              <Link to={'/search'}>Search</Link>
            </li>
            <li>
              <Link to={'/donate'}>Donate</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {user && (
            <Link to="/dashboard/main" className="btn mr-2">
              Dashboard
            </Link>
          )}
          {user ? (
            <Link onClick={logout} className="btn">
              Logout
            </Link>
          ) : (
            <Link to={"/login"} className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
