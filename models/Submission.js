import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem"
    },
    language: String,
    code: String,
    status: String // Accepted / Wrong Answer
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);
