import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchUsers = () => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = (email, status) => {
    axiosSecure
      .patch(`/update/user/status?email=${email}&status=${status}`)
      .then(() => fetchUsers());
  };

  const handleRoleChange = (email, role) => {
    axiosSecure
      .patch(`/update/user/role?email=${email}&role=${role}`)
      .then(() => fetchUsers());
  };

  return (
    <div className="p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-1">All Users</h1>
        <p className="text-gray-400 text-sm">Manage user roles and account status</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Table Head */}
            <thead>
              <tr className="bg-slate-800 text-white text-left">
                <th className="px-5 py-4 font-semibold">User</th>
                <th className="px-5 py-4 font-semibold">Role</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users?.map(
                (USER) =>
                  USER.email !== user.email && (
                    <tr key={USER.email} className="hover:bg-gray-50 transition-colors">
                      {/* User Info */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              USER?.mainPhotoUrl ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(USER?.name)}&background=dc2626&color=fff&bold=true&size=48`
                            }
                            alt={USER?.name}
                            className="h-11 w-11 rounded-full object-cover border-2 border-red-100 shadow-sm flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-gray-800 truncate">{USER?.name}</div>
                            <div className="text-xs text-gray-400 truncate">{USER?.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize border
                          ${USER?.role === "admin" ? "bg-purple-100 text-purple-700 border-purple-200" :
                            USER?.role === "volunteer" ? "bg-blue-100 text-blue-700 border-blue-200" :
                            "bg-green-100 text-green-700 border-green-200"}`}>
                          {USER?.role}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold capitalize border
                          ${USER?.status === "active" ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                            "bg-red-100 text-red-700 border-red-200"}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${USER?.status === "active" ? "bg-emerald-500" : "bg-red-500"}`}></span>
                          {USER?.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap items-center justify-center gap-2">

                          {/* Block / Unblock */}
                          {USER?.status === "active" ? (
                            <button
                              onClick={() => handleStatusChange(USER?.email, "blocked")}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-all hover:scale-105 shadow-sm"
                            >
                              🚫 Block
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusChange(USER?.email, "active")}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all hover:scale-105 shadow-sm"
                            >
                              ✅ Unblock
                            </button>
                          )}

                          {/* Make Volunteer */}
                          {USER?.role !== "volunteer" && (
                            <button
                              onClick={() => handleRoleChange(USER?.email, "volunteer")}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-105 shadow-sm"
                            >
                              🙋 Volunteer
                            </button>
                          )}

                          {/* Make Admin */}
                          {USER?.role !== "admin" && (
                            <button
                              onClick={() => handleRoleChange(USER?.email, "admin")}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white transition-all hover:scale-105 shadow-sm"
                            >
                              👑 Admin
                            </button>
                          )}

                          {/* Make Donor */}
                          {USER?.role !== "donor" && (
                            <button
                              onClick={() => handleRoleChange(USER?.email, "donor")}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-green-600 hover:bg-green-700 text-white transition-all hover:scale-105 shadow-sm"
                            >
                              🩸 Donor
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {users.filter((u) => u.email !== user.email).length === 0 && (
          <div className="py-16 text-center text-gray-400">
            <div className="text-4xl mb-3">👥</div>
            <p className="font-semibold">No other users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
