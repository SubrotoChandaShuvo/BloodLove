import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Contact = () => {
  const { user } = useContext(AuthContext);
  const name = user?.displayName || "";
  const email = user?.email || "";
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if(!user)
       return navigate('/login');
    Swal.fire({
      icon: "success",
      title: `Thank You ${name}! Your message has been sent.`,
      text: "We will get back to you soon.",
      confirmButtonText: "OK",
    });
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-gray-600 mt-2">We are here to help you</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="bg-gray-50 p-6 rounded-xl shadow-2xl"
          >
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                defaultVaalue={name}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea
                rows="4"
                required
                placeholder="Your Message"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>
            <button className="btn btn-sm btn-primary text-white" type="submit">
              Send Message
            </button>
          </form>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Get in Touch
            </h3>
            <p className="text-gray-600 mb-3">📍 Dhaka, Bangladesh</p>
            <p className="text-gray-600 mb-3">
              📞 Phone: <span className="font-semibold">+880 1234567890</span>
            </p>
            <p className="text-gray-600">✉️ Email: support@bloodlove.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
