import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Enroll = () => {
  const { axios, user, navigate } = useAppContext();
  const location = useLocation();
  const course = location.state?.course;

  const currency = "₹";
  const taxRate = 2;

  useEffect(() => {
    if (!course) {
      toast.error("No course selected");
      navigate("/courses");
    }
  }, [course, navigate]);

  const totalPrice = course?.finalPrice || 0;
  const tax = (totalPrice * taxRate) / 100;
  const grandTotal = totalPrice + tax;

  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const placeOrder = async () => {
    try {
      if (!user?._id) {
        toast.error("Please login first");
        return navigate("/login");
      }

      // 1️⃣ Create order
      const { data } = await axios.post("/api/enroll/razorpay", {
        userId: user._id,
        courseId: course._id,
        amount: grandTotal,
      });

      if (!data.success) {
        return toast.error(data.message || "Failed to create order");
      }

      // 2️⃣ Load Razorpay SDK
      const sdkLoaded = await loadRazorpay();
      if (!sdkLoaded) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      // 3️⃣ Open checkout
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Course Enrollment",
        description: course.title,
        order_id: data.orderId,
        prefill: { name: user.name, email: user.email },
        theme: { color: "#4F46E5" },
        handler: async (response) => {
          try {
            // 4️⃣ Verify payment
            const verifyRes = await axios.post(
              "/api/enroll/razorpay/verify",
              response
            );
            if (verifyRes.data.success) {
              toast.success("Payment verified!");
              navigate("/user/my-courses");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            toast.error(err.response?.data?.message || "Verification error");
          }
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Order Summary
        </h2>

        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-800">{course?.title}</p>
          <p className="text-sm text-gray-500">{course?.description}</p>
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
            <span>Tax ({taxRate}%)</span>
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
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-500 transition duration-200">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Enroll;
