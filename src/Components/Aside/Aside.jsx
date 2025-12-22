import { Link, NavLink } from "react-router";
import {
  Home,
  Users,
  Settings,
  ArrowBigLeft,
  LogOut,
  CirclePlus,
  ChartNoAxesGantt,
  UserPen,
} from "lucide-react";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Aside = () => {
  const { role } = useContext(AuthContext);

  const logout = () => {
  Swal.fire({
    title: "Do you want to Logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      signOut(auth);
    }
  });
};

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white flex flex-col">
      {/* Logo */}
      {role == "admin" && (
        <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-slate-700">
          Admin Panel
        </div>
      )}
      {role == "donor" && (
        <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-slate-700">
          Info Panel
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <NavLink
          to="/dashboard/main"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition
            ${isActive ? "bg-red-600" : "hover:bg-slate-800"}`
          }
        >
          <Home size={20} />
          Dashboard
        </NavLink>
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition
            ${isActive ? "bg-red-600" : "hover:bg-slate-800"}`
          }
        >
          <UserPen size={20} />
          My Profile
        </NavLink>

        <NavLink
          to="add-request"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition
            ${isActive ? "bg-red-600" : "hover:bg-slate-800"}`
          }
        >
          <CirclePlus size={20} />
          Add Request
        </NavLink>

        {role === "admin" || role === "volunteer" ? (
          <NavLink
            to="/dashboard/my-request"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition
      ${isActive ? "bg-red-600" : "hover:bg-slate-800"}`
            }
          >
            <ChartNoAxesGantt size={20} />
            All Donation Requests
          </NavLink>
        ) : (
          <NavLink
            to="/dashboard/my-request"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition
      ${isActive ? "bg-red-600" : "hover:bg-slate-800"}`
            }
          >
            <ChartNoAxesGantt size={20} />
            My Requests
          </NavLink>
        )}

        {role == "admin" && (
          <NavLink
            to="/dashboard/all-users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition
            ${isActive ? "bg-red-600" : "hover:bg-slate-800"}`
            }
          >
            <Users size={20} />
            All Users
          </NavLink>
        )}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition
            ${isActive ? "bg-red-600" : "hover:bg-slate-800"}`
          }
        >
          <ArrowBigLeft size={20} />
          Go Home
        </NavLink>
      </nav>

      {/* Logout */}
      <Link
        onClick={logout}
        className="m-4 flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        <LogOut size={20} />
        Logout
      </Link>
    </aside>
  );
};

export default Aside;
