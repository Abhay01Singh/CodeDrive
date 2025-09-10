// controllers/enrollController.js
import Razorpay from "razorpay";
import crypto from "crypto";
import Enroll from "../models/Enroll.js";
import Course from "../models/Course.js";

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// CREATE ORDER
export const enrollRazorpay = async (req, res) => {
  try {
    const { userId, courseId, amount } = req.body;

    if (!userId || !courseId || !amount) {
      return res.json({ success: false, message: "Invalid data" });
    }

    // Check course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.json({ success: false, message: "Course not found" });
    }

    // Create enroll doc (pending)
    const enroll = await Enroll.create({
      userId,
      courseId,
      amount,
      isPaid: false,
    });

    // Razorpay order
    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${enroll._id}`,
      notes: {
        enrollId: enroll._id.toString(),
        userId,
      },
    };

    const order = await razorpay.orders.create(options);

    return res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// VERIFY PAYMENT (from frontend)
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.json({ success: false, message: "Invalid signature" });
    }

    // Fetch order from Razorpay to get enrollId
    const order = await razorpay.orders.fetch(razorpay_order_id);
    const { enrollId } = order.notes;

    await Enroll.findByIdAndUpdate(enrollId, { isPaid: true });

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Verify Razorpay Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Optional: Webhook (backup verification)
export const razorpayWebHook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest !== req.headers["x-razorpay-signature"]) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    const event = req.body.event;
    if (event === "payment.captured") {
      const payment = req.body.payload.payment.entity;
      const { enrollId } = payment.notes;
      await Enroll.findByIdAndUpdate(enrollId, { isPaid: true });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Webhook Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
