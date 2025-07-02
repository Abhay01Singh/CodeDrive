// stripe payment: /api/enroll/stripe
import stripe from "stripe";
import Enroll from "../models/Enroll.js";
import Course from "../models/Course.js";

export const enrollStripe = async (req, res) => {
  try {
    const { userId, courseId, amount } = req.body;
    const { origin } = req.headers;

    // Validate input
    if (!courseId || !amount || !userId) {
      return res.json({ success: false, message: "Invalid data" });
    }

    // Fetch course from DB
    const course = await Course.findById(courseId);
    if (!course) {
      return res.json({ success: false, message: "Course not found" });
    }

    // Save enroll data
    const enroll = await Enroll.create({
      userId,
      courseId,
      amount,
      isPaid: false,
    });

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: course.title, // assuming title exists
          },
          unit_amount: Math.round(amount * 100), // amount from frontend, e.g. grandTotal
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/user/my-courses`,
      cancel_url: `${origin}/`,
      metadata: {
        enrollId: enroll._id.toString(),
        userId,
      },
    });

    return res.json({ success: true, url: session.url });
  } catch (error) {
    console.error("Stripe Enroll Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// stripe webhooks to Verify payments Action : /stripe

export const stripeWebHooks = async (req, res) => {
  // stripe gateway initialize
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    res.status(400).send(`Webhook Error:${error.message}`);
  }
  // handle event
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // getting session metadata
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { enrollId, userId } = session.data[0].metadata;

      // Mark payment as paid
      await Enroll.findByIdAndUpdate(enrollId, { isPaid: true });
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // getting session metadata
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { enrollId } = session.data[0].metadata;
      await Enroll.findByIdAndDelete(enrollId);
      break;
    }
    default:
      console.log(`Unhandledd event type ${event.type}`);
      break;
  }
  res.json({ received: true });
};
