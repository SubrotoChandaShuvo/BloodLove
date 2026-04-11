import React, { useContext, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../Provider/AuthProvider";

const QUICK_AMOUNTS = [5, 10, 25, 50, 100, 250];

const Donate = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const amount = customAmount || selectedAmount;

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;
    setLoading(true);

    const formData = {
      donateAmount: amount,
      donorEmail: user?.email,
      donorName: user?.displayName,
    };

    axiosInstance
      .post("/create-payment-checkout", formData)
      .then((res) => {
        window.location.href = res.data.url;
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-red-600 to-rose-500 text-4xl shadow-xl shadow-red-200 mb-5">
            💝
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800">Make a Donation</h1>
          <p className="text-gray-400 mt-3 text-base max-w-sm mx-auto">
            Your generosity helps us maintain and grow the BloodLove platform — saving more lives every day.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Red accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-400"></div>

          <form onSubmit={handleCheckout} className="p-8 space-y-7">

            {/* Quick Amount Selector */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                ⚡ Quick Select Amount
              </label>
              <div className="grid grid-cols-3 gap-3">
                {QUICK_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                    className={`py-3 px-4 rounded-2xl font-extrabold text-sm border-2 transition-all duration-200 hover:scale-105
                      ${selectedAmount === amt && !customAmount
                        ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-200"
                        : "bg-white text-gray-600 border-gray-200 hover:border-red-400 hover:text-red-600"
                      }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100"></div>
              <span className="text-gray-400 text-xs font-bold">OR ENTER CUSTOM AMOUNT</span>
              <div className="flex-1 h-px bg-gray-100"></div>
            </div>

            {/* Custom Amount Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                💵 Custom Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-extrabold text-gray-400">$</span>
                <input
                  name="donateAmount"
                  type="number"
                  min="1"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(""); }}
                  placeholder="Enter amount..."
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-red-400 focus:outline-none transition-colors text-gray-800 text-lg font-bold"
                />
              </div>
            </div>

            {/* Selected Amount Preview */}
            {amount > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-red-400 uppercase tracking-wider">You're donating</p>
                  <p className="text-3xl font-extrabold text-red-600">${amount} <span className="text-base font-semibold text-red-300">USD</span></p>
                </div>
                <div className="text-4xl">❤️</div>
              </div>
            )}

            {/* Donor Info (if logged in) */}
            {user && (
              <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Donating as</p>
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=dc2626&color=fff&size=40`}
                    className="h-9 w-9 rounded-xl object-cover"
                    alt=""
                  />
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{user.displayName}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !amount || amount <= 0}
              className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-300 text-white font-extrabold py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-red-200 flex items-center justify-center gap-2 text-base"
            >
              {loading
                ? <><span className="loading loading-spinner loading-sm"></span> Redirecting to Payment...</>
                : `💝 Donate ${amount ? `$${amount}` : "Now"}`
              }
            </button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span>🔒</span> Secure Checkout
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span>💳</span> Powered by Stripe
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span>✅</span> SSL Encrypted
              </div>
            </div>
          </form>
        </div>

        {/* Impact Note */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
          <div className="text-2xl">💡</div>
          <div>
            <p className="font-bold text-gray-800 text-sm">Your impact</p>
            <p className="text-gray-400 text-xs mt-1 leading-relaxed">
              Every dollar donated helps us run our platform, verify donor profiles, and respond faster to emergency blood requests across Bangladesh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
