import React from "react";

const Featured = () => {
  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why Donate Blood?
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Your single donation can save multiple lives
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow transform transition duration-300 hover:scale-105 hover:shadow-lg hover:border-red-500 hover:border-2">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              🩸 Save Lives
            </h3>
            <p className="text-gray-600">
              One blood donation can help up to three patients in need.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow transform transition duration-300 hover:scale-105 hover:shadow-lg hover:border-red-500 hover:border-2">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              🚑 Emergency Support
            </h3>
            <p className="text-gray-600">
              Quickly connect donors with patients during emergencies.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow transform transition duration-300 hover:scale-105 hover:shadow-lg hover:border-red-500 hover:border-2">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              🤝 Trusted Community
            </h3>
            <p className="text-gray-600">
              Join a verified network of donors helping people across the country.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow transform transition duration-300 hover:scale-105 hover:shadow-lg hover:border-red-500 hover:border-2">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              💖 Help & Support
            </h3>
            <p className="text-gray-600">
              If you help anyone, you will get help when you need.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
