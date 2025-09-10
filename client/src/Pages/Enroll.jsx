import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Enroll = () => {
  const currency = "₹"; // Razorpay supports INR

  const { axios, user, navigate } = useAppContext();
  const location = useLocation();
  const course = location.state?.course;

  useEffect(() => {
    if (!course) {
      toast.error("No course selected");
      navigate("/courses");
    }
  }, []);

  const totalPrice = course?.finalPrice || 0;
  const tax = (totalPrice * 2) / 100;
  const grandTotal = totalPrice + tax;

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const placeOrder = async () => {
    try {
      // Call backend to create Razorpay order
      console.log("User from context:", user);
      console.log("Sending:", {
        userId: user?._id,
        courseId: course?._id,
        amount: grandTotal,
      });

      const { data } = await axios.post("/api/enroll/razorpay", {
        userId: user?._id,
        courseId: course?._id,
        amount: grandTotal,
        isPaid: false,
      });

      if (!data.success) {
        return toast.error(data.message || "Failed to initiate payment");
      }

      const res = await loadRazorpay();
      if (!res) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const options = {
        key: data.key, // from backend
        amount: data.amount,
        currency: data.currency,
        name: "Course Enrollment",
        description: course?.title,
        order_id: data.orderId,
        handler: function (response) {
          toast.success("Payment successful!");
          navigate("/user/my-courses");
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#4F46E5",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 pt-12">
      <div className="w-full max-w-xl bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Order Summary
        </h2>

        <div className="mb-8">
          <p className="text-base font-semibold uppercase text-gray-600 mb-2">
            Payment Method
          </p>
          <select
            disabled
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-base text-gray-600 cursor-not-allowed">
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <div className="text-gray-800 text-base space-y-3 mb-8">
          <div className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {tax.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200 mt-4">
            <span>Total Amount</span>
            <span>
              {currency}
              {grandTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          onClick={placeOrder}
          className="cursor-pointer w-full py-4 bg-indigo-600 text-white text-lg rounded-xl font-semibold hover:bg-indigo-500 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Enroll;
