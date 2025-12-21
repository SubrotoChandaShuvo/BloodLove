import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5001/users/role/${user.email}`)
        .then((res) => res.json())
        .then((data) => setProfileData(data));
    }
  }, [user]);

  //   console.log(profileData.blood);

  if (!profileData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const blood = form.blood.value;
    const file = form.photoUrl.files[0];

    let mainPhotoUrl = profileData.mainPhotoUrl;

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=f597642f9c8f007109a3f030821c0edb",
        formData
      );

      mainPhotoUrl = res.data.data.display_url;
    }

    const updatedProfile = {
      name,
      district,
      upazila,
      blood,
      mainPhotoUrl,
    };

    // console.log(updatedProfile);
    // return

    axiosSecure
      .patch(`/users/update/profile?email=${profileData.email}`, updatedProfile)
      .then((res) => {
        console.log(res.data);

        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile information has been saved",
        });

        setProfileData({ ...profileData, ...updatedProfile });
        setIsEditing(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Something went wrong while updating your profile",
        });
      });
  };

  return (
    <div className="min-h-screen bg-red flex justify-center items-center">
      <div className="w-full max-w-xl">
        {!isEditing && (
          //   <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div
            className="relative rounded-2xl p-6 mb-6
            bg-linear-to-br from-red-400/50 via-pink-400/50 to-purple-500/70
            backdrop-blur-xl border border-white/30 shadow-xl
            hover:shadow-2xl hover:-translate-y-1
            transition-all duration-300"
          >
            <div className="flex items-center gap-6">
              <img
                src={
                  profileData.mainPhotoUrl ||
                  profileData.avatar ||
                  user.photoURL
                }
                className="w-30 h-38 rounded-xl"
              />
              <div>
                <h2 className="text-xl font-semibold">{profileData.name}</h2>
                <p className="text-gray-600">{profileData.email}</p>
                {/* <p className="text-sm text-gray-500 capitalize">
                  Role: {profileData.role}
                </p> */}
                <p className="text-sm">
                  {profileData.district}, {profileData.upazila}
                </p>
                <p className="text-sm font-bold">
                  Blood Group: {profileData.blood}
                </p>
              </div>
            </div>
          </div>
        )}

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary w-full"
          >
            Edit Profile
          </button>
        )}

        {isEditing && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="text-[15px]">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={profileData?.name}
                className="input input-bordered w-full"
              />

              <label className="text-[15px]">Email</label>
              <input
                type="email"
                value={profileData?.email}
                disabled
                className="input input-bordered w-full bg-gray-100"
              />

              <label className="text-[15px]">Photo</label>
              <input
                name="photoUrl"
                type="file"
                className="input w-full"
                placeholder="Enter Your Photo"
              />

              <label className="text-[15px]">District</label>
              <input
                type="text"
                name="district"
                defaultValue={profileData?.district}
                className="input input-bordered w-full"
              />

              <label className="text-[15px]">Upazila</label>
              <input
                type="text"
                name="upazila"
                defaultValue={profileData?.upazila}
                className="input input-bordered w-full"
              />

              <label className="text-[15px]">Blood Group</label>
              <select
                name="blood"
                defaultValue={profileData?.blood}
                className="select select-bordered w-full"
              >
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>

              <div className="flex gap-3">
                <button type="submit" className="btn btn-success flex-1">
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
