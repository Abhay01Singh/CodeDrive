import { v2 as cloudinary } from "cloudinary";
import Course from "../models/Course.js";

// Add Course : POST /api/course/add
export const addCourse = async (req, res) => {
  try {
    const courseData = JSON.parse(req.body.courseData);
    const { thumbnail } = req.files;

    let image = "";

    // Upload thumbnail to Cloudinary
    if (thumbnail && thumbnail[0]) {
      const result = await cloudinary.uploader.upload(thumbnail[0].path, {
        resource_type: "image",
        folder: "course_thumbnails",
      });
      image = result.secure_url;
    }

    const {
      title,
      description,
      category,
      level,
      price: originalPrice,
      discount,
      tags,
      duration,
    } = courseData;

    if (originalPrice < 0 || discount < 0 || discount > 200) {
      return res.status(400).json({
        success: false,
        message: "Invalid price or discount",
      });
    }

    const discountedAmount = (originalPrice * discount) / 100;
    const price = Math.round(originalPrice - discountedAmount);
    const gst = Math.round(price * 0.18);
    const finalPrice = price + gst;

    const course = await Course.create({
      title,
      description,
      category,
      level,
      price,
      originalPrice,
      discount,
      tags,
      duration,
      gst,
      finalPrice,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

// Get Course List : GET /api/course/list
export const courseList = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: error.message,
    });
  }
};

// Get Single Course by ID : GET /api/course/:id
export const getSingleCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching course",
      error: error.message,
    });
  }
};
