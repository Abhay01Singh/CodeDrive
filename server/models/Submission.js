import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    code: { type: String, required: true, trim: true },
    language: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Wrong Answer",
        "Runtime Error",
        "Time Limit Exceeded",
      ],
      required: true,
      default: "Pending",
    },
    score: { type: Number, required: true, default: 0 },
    executionTime: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);
