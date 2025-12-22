import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router";
import auth from "../firebase/firebase.config";
import { AuthContext } from "../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {
  const { user, setUser, setLoading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [showPass, setShowPass] = useState(false);

  // if (user) {
  //   return <Navigate to="/" replace />;
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const pass = e.target.password.value;

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        Swal.fire({
          title: "Login Successful! 🎉",
          icon: "success",
          draggable: true,
        });
        setUser(user);
        setLoading(false);
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleForget = () => {
    navigate(`/forget/${email}`);
  };

  return (
    <div>
      <title>Login</title>
      <div className="hero min-h-lvw lg:min-h-screen p-4 md:p-0">
        <div className="card bg-base-100 w-full max-w-sm md:max-w-md lg:max-w-lg shrink-0 shadow-2xl transform transition-transform duration-300 hover:scale-105 shadow-gray-600">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="fieldset">
              <h1 className="text-3xl text-center">Login</h1>
              <label className="text-[15px]">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                className="input w-full"
                placeholder="Email"
              />
              <label className="text-[15px]">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  className="input w-full pr-10"
                  placeholder="Password"
                  aria-label="password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-500"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div>
                <button onClick={handleForget} className="link link-hover">
                  Forgot password?
                </button>
              </div>
              <div>
                <span className="pr-4">Don't have an account? </span>
                <Link className="link link-hover text-blue-500" to={"/register"}>
                  Register
                </Link>
              </div>
              <button className="btn btn-primary transform transition-transform duration-300 hover:scale-102">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
