import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const InputField = ({ name, type, placeholder, value, handleChange }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={handleChange}
    className="w-full px-4 py-2 border rounded-md"
    required
  />
);

const AddAddress = () => {
  const { axios, navigate, user } = useAppContext();
  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/address/add", { address });
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        navigate(`/courses/enroll`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="max-w-xl mx-auto pt-20 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          name="fullName"
          type="text"
          placeholder="Full Name"
          value={address.fullName}
          handleChange={handleChange}
        />
        <InputField
          name="phoneNumber"
          type="text"
          placeholder="Phone Number"
          value={address.phoneNumber}
          handleChange={handleChange}
        />
        <InputField
          name="street"
          type="text"
          placeholder="Street Address"
          value={address.street}
          handleChange={handleChange}
        />
        <InputField
          name="city"
          type="text"
          placeholder="City"
          value={address.city}
          handleChange={handleChange}
        />
        <InputField
          name="state"
          type="text"
          placeholder="State/Province"
          value={address.state}
          handleChange={handleChange}
        />
        <InputField
          name="postalCode"
          type="text"
          placeholder="Postal Code"
          value={address.postalCode}
          handleChange={handleChange}
        />
        <InputField
          name="country"
          type="text"
          placeholder="Country"
          value={address.country}
          handleChange={handleChange}
        />
        <button
          type="submit"
          className="cursor-pointer w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
          Add Address
        </button>
      </form>
    </div>
  );
};

export default AddAddress;
