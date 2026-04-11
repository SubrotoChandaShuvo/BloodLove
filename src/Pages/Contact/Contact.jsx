import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Contact = () => {
  const { user } = useContext(AuthContext);
  const name = user?.displayName || "";
  const email = user?.email || "";
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");

    setSending(true);
    setTimeout(() => {
      setSending(false);
      Swal.fire({
        icon: "success",
        title: `Thank You, ${name}! 🎉`,
        text: "Your message has been sent. We'll get back to you soon.",
        confirmButtonColor: "#dc2626",
        confirmButtonText: "Awesome!",
      });
      e.target.reset();
    }, 1000);
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Contact <span className="text-red-600">Us</span>
          </h2>
          <p className="text-gray-400 mt-4 text-lg">We're here to help — reach out anytime</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-rose-500 px-7 py-5">
              <h3 className="text-white font-bold text-lg">Send a Message</h3>
              <p className="text-red-100 text-sm">We typically reply within 24 hours</p>
            </div>
            <form onSubmit={handleSendMessage} className="p-7 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">👤 Full Name</label>
                <input
                  type="text"
                  defaultValue={name}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-400 focus:outline-none transition-colors text-gray-800"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">✉️ Email Address</label>
                <input
                  type="email"
                  value={email}
                  readOnly={!!user}
                  required
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors text-gray-800 ${user ? "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed" : "border-gray-200 focus:border-red-400 focus:outline-none"}`}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">💬 Message</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-400 focus:outline-none transition-colors text-gray-800 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-300 text-white font-bold py-3.5 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-red-200 flex items-center justify-center gap-2"
              >
                {sending ? (
                  <><span className="loading loading-spinner loading-sm"></span> Sending...</>
                ) : (
                  "📨 Send Message"
                )}
              </button>
            </form>
          </div>

          {/* Info Card */}
          <div className="space-y-5">
            {/* Map placeholder */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 h-52 bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center">
              <div className="text-center px-6">
                <p className="text-5xl mb-2">📍</p>
                <p className="text-red-700 font-bold text-lg">Dhaka, Bangladesh</p>
                <p className="text-red-400 text-sm">Find us on Google Maps</p>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: "📞", label: "Phone", value: "+880 1234-567890", sub: "Mon–Fri, 9am–6pm" },
                { icon: "✉️", label: "Email", value: "support@bloodlove.com", sub: "We reply within 24 hours" },
                { icon: "📍", label: "Address", value: "Dhaka, Bangladesh", sub: "Head Office" },
              ].map((info, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center text-2xl flex-shrink-0 border border-red-100">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{info.label}</p>
                    <p className="font-bold text-gray-800">{info.value}</p>
                    <p className="text-xs text-gray-400">{info.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
