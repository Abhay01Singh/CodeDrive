import Razorpay from "razorpay";
import crypto from "crypto";
import Enroll from "../models/Enroll.js";
import Course from "../models/Course.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Step 1: Create Razorpay order and pending enrollment
export const enrollRazorpay = async (req, res) => {
  try {
    const { userId, courseId, amount } = req.body;

    if (!userId || !courseId || !amount) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const enroll = await Enroll.create({
      userId,
      courseId,
      amount,
      isPaid: false,
    });

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${enroll._id}`,
      notes: { enrollId: enroll._id.toString() },
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      orderId: order.id,
    });
  } catch (err) {
    console.error("Razorpay Order Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Step 2: Verify payment and mark as paid
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
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    const order = await razorpay.orders.fetch(razorpay_order_id);
    const enrollId = order.notes.enrollId;

    await Enroll.findByIdAndUpdate(enrollId, { isPaid: true });

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (err) {
    console.error("Verify Payment Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// get enroll courses
export const getEnrollCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const enrollments = await Enroll.find({ userId, isPaid: true }).populate(
      "courseId"
    );
    res.json({ success: true, courses: enrollments });
  } catch (error) {
    console.error("Get Courses Error:", error.message);
    res.json({ success: false, message: "Unable to fetch enrolled courses" });
  }
};

// all paid course

export const getAllEnrollCourseAmount = async (req, res) => {
  try {
    const enrollments = await Enroll.find({ isPaid: true }).populate(
      "courseId"
    );
    const total = enrollments.reduce((sum, enroll) => {
      return sum + (enroll.amount || enroll.courseId?.finalPrice || 0);
    }, 0);
    res.json({ success: true, total });
  } catch (error) {
    console.error("Earnings Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
