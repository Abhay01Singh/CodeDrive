import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";

const EarningsDashboard = () => {
  const { earning } = useAppContext();
  const [filter, setFilter] = useState("month");

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-100 via-indigo-50 to-pink-100 flex flex-col items-center justify-start py-10 px-4">
      <div className="max-w-2xl w-full rounded-3xl shadow-2xl bg-white/80 backdrop-blur-lg border border-indigo-100 p-8">
        <h2 className="text-3xl font-extrabold text-indigo-700 tracking-tight mb-6 drop-shadow-lg">
          Earnings Dashboard
        </h2>

        {/* Filter & Quick Stats */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <label className="text-sm text-gray-700 font-medium mr-2">
              Filter:
            </label>
            <select
              className="rounded-lg border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 transition px-3 py-1 text-base font-semibold"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold text-lg shadow animated-pulse">
            <span className="text-2xl">₹</span>
            <span className="text-3xl animate-count">{earning}</span>
          </span>
        </div>

        {/* Animated Earnings Card */}
        <div className="mb-8 bg-gradient-to-r from-indigo-200 via-violet-200 to-pink-200 rounded-xl p-6 shadow flex flex-col items-center">
          <p className="text-xl font-semibold text-gray-700 mb-2">
            Total Earnings
          </p>
          <span className="text-4xl font-extrabold text-indigo-700 tracking-wide animated-count">
            ₹{earning}
          </span>
        </div>

        {/* Placeholder for future features */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-indigo-100 bg-white/70 p-5 flex flex-col items-center shadow">
            <span className="text-indigo-600 font-bold mb-1">Income Stats</span>
            <span className="text-gray-400 italic">Coming Soon</span>
          </div>
          <div className="rounded-xl border border-green-100 bg-white/70 p-5 flex flex-col items-center shadow">
            <span className="text-green-600 font-bold mb-1">
              Razorpay Payouts
            </span>
            <span className="text-gray-400 italic">Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Subtle floating coin animation for attention */}
      <div className="mt-12 animate-bounce-slow">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="#FFC600"
            stroke="#F59E42"
            strokeWidth="2"
          />
          <text
            x="24"
            y="30"
            textAnchor="middle"
            fontWeight="bold"
            fontSize="20"
            fill="#fff">
            ₹
          </text>
        </svg>
      </div>
    </div>
  );
};

export default EarningsDashboard;
