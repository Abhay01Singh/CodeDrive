import jwt from "jsonwebtoken";

const authInstructor = (req, res, next) => {
  const { instructorToken } = req.cookies;

  // Check if token is present
  if (!instructorToken) {
    return res.json({ success: false, message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(instructorToken, process.env.JWT_SECRET);

    // Ensure the decoded token has an email and it matches the allowed instructor email
    if (decoded.email === process.env.INSTRUCTOR_EMAIL) {
      return next();
    } else {
      return res.json({ success: false, message: "Not authorized" });
    }
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.json({ success: false, message: "Invalid token" });
  }
};

export default authInstructor;
