import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import auth from "../firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const {
    registerWithEmailPassword,
    setUser,
    loading,
    setLoading,
    // handleGoogleSignin,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl;
    const file = photoUrl.files[0];
    const blood = e.target.blood.value;

    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    if (pass.length < 6) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Less then 6 characters!",
      });
    }
    if (!uppercase.test(pass)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Need a Uppercase Latter!",
      });
    }
    if (!lowercase.test(pass)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Need a lowercase Latter!",
      });
    }

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=f597642f9c8f007109a3f030821c0edb`,
      { image: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log(res.data);

    const mainPhotoUrl = res.data.data.display_url;

    const formData = {
      email,
      pass,
      name,
      mainPhotoUrl,
      blood,
    };

    if (res.data.success == true) {
      registerWithEmailPassword(email, pass)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: mainPhotoUrl,
          })
            .then(() => {
              setUser(userCredential.user);
              Swal.fire({
                title: "Registration Successful! 🎉",
                icon: "success",
                draggable: true,
              });
              // store users info in our DB
              axios
                .post("http://localhost:5001/users", formData)
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });

              // toast.success("Registration Successful! 🎉");
              // console.log(userCredential.user);
              setLoading(false);
              navigate("/");
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  // const googleSignup = () => {
  //   handleGoogleSignin()
  //     .then((result) => {
  //       const user = result.user;
  //       setUser(user);
  //       Swal.fire({
  //         title: "Registration Successful! 🎉",
  //         icon: "success",
  //         draggable: true,
  //       });
  //       // toast.success("Signup Successful! 🎉");
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //        Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Signup Process failed❗ Please try again.",
  //     });
  //     });
  // };

  return (
    <div>
      <title>Register</title>
      <div className="hero min-h-lvw lg:min-h-screen p-4 md:p-0">
        <div className="card bg-base-100 w-full max-w-sm md:max-w-md lg:max-w-lg shrink-0 shadow-2xl transform transition-transform duration-300 hover:scale-105 shadow-gray-600">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="fieldset">
              <h1 className="text-3xl text-center">Register</h1>
              <label className="text-[15px]">Email</label>
              <input
                required
                name="email"
                type="email"
                className="input w-full"
                placeholder="Email"
              />
              <label className="text-[15px]">Name</label>
              <input
                required
                name="name"
                type="text"
                className="input w-full"
                placeholder="Your Full Name"
              />
              <label className="text-[15px]">Photo</label>
              <input
                required
                name="photoUrl"
                type="file"
                className="input w-full"
                placeholder="Enter Your Photo"
              />

              <label className="text-[15px]">Blood Group</label>
              <select
                name="blood"
                defaultValue=""
                required
                className="select w-full"
              >
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

              <label className="text-[15px]">Password</label>
              <div className="relative">
                <input
                  required
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
              <div className="">
                <span className="pr-4">Already have an account? </span>
                <Link className="link link-hover text-blue-500" to={"/login"}>
                  Login
                </Link>
              </div>
              <button
                className="btn btn-primary transform transition-transform duration-300 hover:scale-102"
                disabled={loading}
              >
                Register
              </button>
              {/* <p className="text-center">Or Register with Google</p>
              <button
                onClick={googleSignup}
                className="btn bg-gray-300 transform transition-transform duration-300 hover:scale-102"
              >
                <FcGoogle className="text-2xl" /> Google
              </button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
