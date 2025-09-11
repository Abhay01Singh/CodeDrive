import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    statement: { type: String, required: true, trim: true },
    inputFormat: { type: String, required: true, trim: true },
    outputFormat: { type: String, required: true, trim: true },
    examples: {
      input: { type: String, required: true, trim: true },
      output: { type: String, required: true, trim: true },
      explanation: { type: String, trim: true },
    },
    testCases: {
      input: { type: String, required: true, trim: true },
      expectedOutput: { type: String, required: true, trim: true },
      isHidden: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Problem", problemSchema);
