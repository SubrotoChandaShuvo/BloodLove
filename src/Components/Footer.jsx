import { Link } from "react-router";
import logo from "../assets/Logo.png";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand Column */}
        <div className="lg:col-span-1">
          <Link to="/" className="inline-block mb-4">
            <img src={logo} alt="BloodLove Logo" className="h-12 rounded-xl" />
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">
            <span className="font-bold text-white">BloodLove</span> connects blood donors with those in need — saving lives across Bangladesh, one drop at a time. ❤️
          </p>
          {/* Social Links
          <div className="flex gap-3">
            {[
              { icon: "📘", label: "Facebook", href: "#" },
              { icon: "🐦", label: "Twitter", href: "#" },
              { icon: "📸", label: "Instagram", href: "#" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                title={s.label}
                className="h-9 w-9 rounded-xl bg-slate-800 hover:bg-red-600 flex items-center justify-center text-sm transition-all duration-200 hover:scale-110 border border-slate-700"
              >
                {s.icon}
              </a>
            ))}
          </div> */}
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-extrabold text-white text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
            <span className="h-4 w-1 bg-red-500 rounded-full inline-block"></span>
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              { label: "Home", to: "/" },
              { label: "Search Donors", to: "/search" },
              { label: "All Requests", to: "/all-request" },
              { label: "Donate Money", to: "/donate" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-slate-400 hover:text-red-400 text-sm font-medium transition-colors flex items-center gap-2 group"
                >
                  <span className="h-1 w-3 bg-red-500/0 group-hover:bg-red-500 rounded transition-all"></span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="font-extrabold text-white text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
            <span className="h-4 w-1 bg-red-500 rounded-full inline-block"></span>
            Account
          </h3>
          <ul className="space-y-3">
            {[
              { label: "Login", to: "/login" },
              { label: "Register", to: "/register" },
              { label: "Dashboard", to: "/dashboard/main" },
              { label: "My Requests", to: "/dashboard/my-request" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-slate-400 hover:text-red-400 text-sm font-medium transition-colors flex items-center gap-2 group"
                >
                  <span className="h-1 w-3 bg-red-500/0 group-hover:bg-red-500 rounded transition-all"></span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-extrabold text-white text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
            <span className="h-4 w-1 bg-red-500 rounded-full inline-block"></span>
            Contact
          </h3>
          <ul className="space-y-4">
            {[
              { icon: "📍", value: "Dhaka, Bangladesh" },
              { icon: "📞", value: "+880 1234-567890" },
              { icon: "✉️", value: "support@bloodlove.com" },
            ].map((info, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                <span className="h-8 w-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                  {info.icon}
                </span>
                {info.value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Blood Group Strip */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center gap-2">
          <span className="text-slate-500 text-xs uppercase font-bold tracking-wider mr-2">We accept:</span>
          {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((bg) => (
            <span key={bg} className="text-xs font-extrabold bg-red-900/50 border border-red-800 text-red-300 px-2.5 py-0.5 rounded-full">
              {bg}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {year} <span className="text-red-400 font-bold">BloodLove</span>. All rights reserved.</p>
          <p>Made with  Red Love to save lives across Bangladesh</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
