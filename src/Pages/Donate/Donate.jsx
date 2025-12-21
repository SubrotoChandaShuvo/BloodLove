import React, { useContext } from "react";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../Provider/AuthProvider";

const Donate = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const handleCheckout = (e) => {
    e.preventDefault();
    const donateAmount = e.target.donateAmount.value;
    const donorEmail = user?.email;
    const donorName = user?.displayName;

    const formData = {
      donateAmount,
      donorEmail,
      donorName,
    };

    axiosInstance.post("/create-payment-checkout", formData).then((res) => {
      console.log(res.data);
      window.location.href = res.data.url;
    });
  };
  return (
    // <div>
    //     <form onSubmit={handleCheckout} className='flex justify-center items-center min-h-screen gap-4'>
    //         <input name='donateAmount' required type="text" placeholder="Type here" className="input" />
    //         <button className="btn btn-error" type='submit'>Donate</button>
    //     </form>
    // </div>

    <div className="min-h-screen bg-gradient-to-br from-red-100 via-red-200 to-red-400 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Donate Now
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Your contribution makes a difference! Enter the amount you want to
          donate below.
        </p>

        <form onSubmit={handleCheckout} className="flex flex-col gap-4">
          <input
            name="donateAmount"
            required
            type="number"
            min="1"
            placeholder="Enter amount in USD"
            className="input input-bordered w-full text-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <button
            type="submit"
            className="bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md"
          >
            Donate
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Thank you for supporting our cause! ❤️
        </p>
      </div>
    </div>
  );
};

export default Donate;
