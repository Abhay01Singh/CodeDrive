import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Enroll = () => {
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const currency = "$";

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

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error fetching address");
    }
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) return toast.error("Please select an address");

      const { data } = await axios.post("/api/enroll/stripe", {
        userId: user?._id,
        courseId: course?._id,
        amount: grandTotal,
        isPaid: false,
      });

      console.log("Stripe session response:", data);

      if (data.success) {
        window.location.replace(data.url); // Or use `data.session_url` based on your backend
      } else {
        toast.error(data.message || "Failed to initiate payment");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getUserAddress();
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 pt-12">
      <div className="w-full max-w-xl bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Order Summary
        </h2>

        <div className="mb-6">
          <p className="text-sm font-medium text-gray-600">Selected Course:</p>
          <p className="text-xl font-semibold text-gray-800">{course?.title}</p>
        </div>

        <div className="mb-8">
          <p className="text-base font-semibold uppercase text-gray-600 mb-2">
            Delivery Address
          </p>
          <div className="relative mt-1">
            <div className="flex justify-between items-start text-gray-800">
              <p className="text-base w-[80%]">
                {selectedAddress
                  ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                  : "No Address Selected"}
              </p>
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="cursor-pointer text-indigo-600 font-medium hover:underline ml-2 text-sm">
                Change
              </button>
            </div>

            {showAddress && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto text-base">
                {addresses.length > 0 ? (
                  addresses.map((address, index) => (
                    <p
                      key={index}
                      onClick={() => {
                        setSelectedAddress(address);
                        setShowAddress(false);
                      }}
                      className="p-3 text-gray-700 hover:bg-gray-100 cursor-pointer">
                      {address.street}, {address.city}, {address.state},{" "}
                      {address.country}
                    </p>
                  ))
                ) : (
                  <p className="p-3 text-center text-gray-500">
                    No addresses available
                  </p>
                )}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-indigo-600 text-center cursor-pointer p-3 hover:bg-indigo-50 border-t border-gray-200">
                  + Add New Address
                </p>
              </div>
            )}
          </div>
        </div>

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
