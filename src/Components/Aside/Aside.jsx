import { Link, NavLink } from "react-router";
import {
  Home,
  Users,
  Settings,
  ArrowBigLeft,
  LogOut,
  CirclePlus,
  ChartNoAxesGantt
} from "lucide-react";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const Aside= () => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
    { name: "Add Request", path: "add-request", icon: <CirclePlus size={20} /> },
    { name: "Manage Products", path: "/dashboard/manage-product", icon: <ChartNoAxesGantt size={20} /> },
    { name: "All Users", path: "/dashboard/all-users", icon: <Users size={20} /> },
    { name: "Settings", path: "/dashboard/settings", icon: <Settings size={20} /> },
    { name: "Main", path: "/", icon: <ArrowBigLeft size={20} /> }
  ];

    const logout = () => {
    signOut(auth);
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      
      {/* Logo */}
      <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-slate-700">
        Admin Panel
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition
              ${isActive ? "bg-blue-600" : "hover:bg-slate-800"}`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <Link onClick={logout} className="m-4 flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600 transition">
        <LogOut size={20} />
        Logout
      </Link>
    </aside>
  );
};

export default Aside;
