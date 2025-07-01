import Address from "../models/Address.js";

// add address :/api/address/add
export const addAddress = async (req, res) => {
  try {
    // userId come from token
    const userId = req.user.id;
    const { address } = req.body;
    await Address.create({ ...address, userId });
    res.json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get Address :/api/address/get

export const getAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addresses = await Address.find({ userId });
    res.json({ success: true, addresses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
