import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    tags: [{ type: String, trim: true }],
    duration: { type: String, required: true },

    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, required: true, min: 0 },
    discount: { type: Number, required: true, min: 0, max: 200 },
    finalPrice: { type: Number, required: true, min: 0 },
    gst: { type: Number, required: true, min: 0 },
    videoUrl: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
export default Course;
