import { v2 as cloudinary } from "cloudinary";
import Course from "../models/Course.js";
import User from "../models/User.js";
import Enroll from "../models/Enroll.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Enroll course (create Stripe session)
export const enrollCourse = async (req, res) => {
  try {
    const { courses } = req.body;
    const courseId = courses[0];
    const { origin } = req.headers;
    const userId = req.user.id;

    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);

    if (!userData || !courseData) {
      return res.json({ success: false, message: "User or Course not found" });
    }

    const { price: originalPrice, discount = 0 } = courseData;

    if (originalPrice < 0 || discount < 0 || discount > 100) {
      return res.status(400).json({
        success: false,
        message: "Invalid price or discount",
      });
    }

    const discountedAmount = (originalPrice * discount) / 100;
    const finalPrice = Math.round(originalPrice - discountedAmount);
    const tax = Math.round(finalPrice * 0.02); // 2% tax
    const totalAmount = finalPrice + tax;

    const newEnroll = await Enroll.create({
      courseId: courseData._id,
      userId,
      amount: totalAmount,
      status: "pending",
      isPaid: false,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: courseData.title,
            },
            unit_amount: totalAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/my-courses`,
      cancel_url: `${origin}/`,
      metadata: {
        enrollId: newEnroll._id.toString(),
        userId: userId.toString(),
      },
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Stripe webhook handler
export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const enrollId = session.metadata.enrollId;
        const userId = session.metadata.userId;

        await Enroll.findByIdAndUpdate(enrollId, {
          isPaid: true,
          status: "completed",
        });

        // Clear user's cart if needed (optional)
        await User.findByIdAndUpdate(userId, { cartItems: {} });

        break;
      }

      case "checkout.session.expired":
      case "payment_intent.payment_failed": {
        const session = event.data.object;
        const enrollId = session.metadata?.enrollId;

        if (enrollId) {
          await Enroll.findByIdAndUpdate(enrollId, {
            status: "failed",
            isPaid: false,
          });
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all paid courses (admin or user)
export const getPaidCourses = async (req, res) => {
  try {
    const enrollments = await Enroll.find({ isPaid: true })
      .populate("courseId")
      .populate("userId", "name email");

    res.json({ success: true, data: enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
