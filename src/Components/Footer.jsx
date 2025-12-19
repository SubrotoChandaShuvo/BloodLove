import { Link } from "react-router";
import logo from "../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-2">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo & Description */}
        <div>
        <Link to={'/'}>
          <img
            src={logo}
            alt="Blood Love Logo"
            className="h-12 mb-4 rounded-lg"
          />
          </Link>
          <p className="text-sm leading-relaxed">
            <span className="font-semibold">Blood Love</span> is a platform
            dedicated to saving lives by connecting blood donors with people in
            need. Donate blood, spread love, save lives ❤️
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="footer-title">Useful Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="link link-hover">
                Home
              </Link>
            </li>
            <li>
              <Link to="/search" className="link link-hover">
                Search Donors
              </Link>
            </li>
            <li>
              <Link to="/donate" className="link link-hover">
                Donate Blood
              </Link>
            </li>
            <li>
              <Link className="link link-hover">
                All Requests
              </Link>
            </li>
          </ul>
        </div>

        {/* Account & Support */}
        <div>
          <h3 className="footer-title">Account & Support</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/login" className="link link-hover">
                Login
              </Link>
            </li>
            <li>
              <Link to="/dashboard/main" className="link link-hover">
                Dashboard
              </Link>
            </li>
            <li>
              <Link className="link link-hover">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="link link-hover">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm">
          © {new Date().getFullYear()} Blood Love. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
