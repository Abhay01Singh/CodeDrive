import React from "react";
import { useAppContext } from "../../context/AppContext";
const EarningsDashboard = () => {
  const { earning } = useAppContext();
  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Earnings Dashboard
      </h2>
      <p>Income stats, filters, and Stripe payouts (to be implemented)</p>
      <p>{earning}</p>
    </div>
  );
};
export default EarningsDashboard;
