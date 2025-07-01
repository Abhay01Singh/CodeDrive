import jwt from "jsonwebtoken";

// login instructor : api/instructor/login

export const loginInstructor = async (req, res) => {
  const { email, password } = req.body;
  if (
    email === process.env.INSTRUCTOR_EMAIL &&
    password === process.env.INSTRUCTOR_PASSWORD
  ) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("instructorToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF PROTECTION
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({
      success: true,
      message: "Instructor logged in successfully",
    });
  }
};

// check auth instructor : api/instructor/is-auth

export const isAuthInstructor = async (req, res) => {
  try {
    const token = req.cookies.instructorToken;
    if (!token) {
      return res.json({ success: false, message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.email) {
      return res.json({ success: false, message: "Invalid token" });
    }

    return res.json({ success: true, email: decoded.email });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// logout instructor : api/instructor/logout
export const logoutInstructor = async (req, res) => {
  try {
    res.clearCookie("instructorToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
