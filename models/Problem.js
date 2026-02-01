import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: String,
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"]
    },
    description: String,
    examples: [
      {
        input: String,
        output: String,
        explanation: String
      }
    ],
    starterCode: {
      javascript: String,
      python: String
    },
    testCases: [
      {
        input: String,
        output: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Problem", problemSchema);
