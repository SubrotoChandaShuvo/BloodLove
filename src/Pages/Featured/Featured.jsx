import React from "react";

const features = [
  {
    icon: "🩸",
    title: "Save Lives",
    desc: "One blood donation can help up to three patients in need. Be someone's hero today.",
    gradient: "from-red-500 to-rose-600",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  {
    icon: "🚑",
    title: "Emergency Support",
    desc: "Quickly connect donors with patients during critical emergencies across Bangladesh.",
    gradient: "from-orange-500 to-amber-500",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    icon: "🤝",
    title: "Trusted Community",
    desc: "Join a verified network of compassionate donors helping people across the country.",
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: "💖",
    title: "Help & Get Help",
    desc: "Build a community where every act of giving comes back when you need it most.",
    gradient: "from-pink-500 to-purple-600",
    bg: "bg-pink-50",
    border: "border-pink-100",
  },
];

const stats = [
  { value: "50K+", label: "Donors Registered" },
  { value: "3", label: "Lives Per Donation" },
  { value: "64", label: "Districts Covered" },
  { value: "24/7", label: "Always Available" },
];

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const bgColors = [
  "bg-red-500", "bg-rose-500", "bg-orange-500",
  "bg-amber-500", "bg-purple-500", "bg-violet-600",
  "bg-green-500", "bg-teal-500",
];

const Featured = () => {
  return (
    <>
      {/* ── Stats Strip ── */}
      <section className="bg-red-600 py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-extrabold drop-shadow">{s.value}</span>
              <span className="text-red-100 text-sm font-medium mt-1 uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Donate Blood ── */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Why It Matters
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              Why Donate <span className="text-red-600">Blood?</span>
            </h2>
            <p className="text-gray-500 mt-4 text-lg max-w-xl mx-auto">
              Your single donation can save multiple lives and change the world for those in need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className={`group relative ${f.bg} ${f.border} border-2 rounded-3xl p-6 flex flex-col gap-4
                  hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-default`}
              >
                {/* Icon circle */}
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-gray-800 mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
                {/* decorative blur circle */}
                <div className={`absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-gradient-to-br ${f.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blood Groups Banner ── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">We Accept All Blood Groups</h2>
          <p className="text-gray-400 mb-10">Find or become a donor for any blood type</p>
          <div className="flex flex-wrap justify-center gap-4">
            {bloodGroups.map((bg, i) => (
              <div
                key={i}
                className={`${bgColors[i]} text-white h-20 w-20 rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-lg hover:scale-110 transition-transform cursor-default`}
              >
                {bg}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote / CTA Section ── */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-800 via-red-600 to-rose-500"></div>
        <div className="absolute -top-16 -left-16 h-56 w-56 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -right-16 h-72 w-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <p className="text-5xl mb-6">❤️</p>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-snug mb-4 drop-shadow">
            "The gift of blood is the gift of life. There is no greater gift."
          </h2>
          <p className="text-red-100 mb-8">— World Health Organization</p>
          <a
            href="/register"
            className="inline-block bg-white text-red-600 font-extrabold px-8 py-3.5 rounded-2xl shadow-xl hover:scale-105 transition-all"
          >
            🩸 Join as a Donor Today
          </a>
        </div>
      </section>
    </>
  );
};

export default Featured;
