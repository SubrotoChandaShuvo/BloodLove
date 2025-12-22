import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  // console.log(user);

  const fetchUsers = () => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update user status (active/blocked)
  const handleStatusChange = (email, status) => {
    axiosSecure
      .patch(`/update/user/status?email=${email}&status=${status}`)
      .then((res) => {
        console.log(res.data);
        fetchUsers();
      });
  };

  // Update user role (volunteer/admin)
  const handleRoleChange = (email, role) => {
    axiosSecure
      .patch(`/update/user/role?email=${email}&role=${role}`)
      .then((res) => {
        console.log(res.data);
        fetchUsers();
      });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>User Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map(
              (USER) =>
                USER.email !== user.email && (
                  <tr key={USER.email}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={USER?.mainPhotoUrl} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{USER?.name}</div>
                          <div className="text-sm opacity-50">
                            {USER?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{USER?.role}</td>
                    <td>{USER?.status}</td>
                    <td className="flex gap-2">
                      {/* Status Toggle */}
                      {USER?.status === "active" ? (
                        <button
                          onClick={() =>
                            handleStatusChange(USER?.email, "blocked")
                          }
                          className="btn btn-error btn-xs"
                        >
                          Block
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleStatusChange(USER?.email, "active")
                          }
                          className="btn btn-primary btn-xs"
                        >
                          Active
                        </button>
                      )}

                      {/* Make Volunteer button */}
                      {USER?.role !== "volunteer" && (
                        <button
                          onClick={() =>
                            handleRoleChange(USER?.email, "volunteer")
                          }
                          className="btn btn-success btn-xs min-w-26"
                        >
                          Make Volunteer
                        </button>
                      )}

                      {/* Make Admin button */}
                      {USER?.role !== "admin" && (
                        <button
                          onClick={() => handleRoleChange(USER?.email, "admin")}
                          className="btn btn-warning btn-xs min-w-26"
                        >
                          Make Admin
                        </button>
                      )}
                      {USER?.role !== "donor" && (
                        <button
                          onClick={() => handleRoleChange(USER?.email, "admin")}
                          className="btn btn-secondary btn-xs min-w-26"
                        >
                          Make Donor
                        </button>
                      )}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
