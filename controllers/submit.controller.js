import Submission from "../models/Submission.js";
import Problem from "../models/Problem.js";
import User from "../models/User.js";

export const submitCode = async (req, res) => {
  const { code, problemId, language } = req.body;
  const userId = req.userId;

  try {
    const problem = await Problem.findById(problemId);
    let accepted = true;

    for (let test of problem.testCases) {
      const func = eval(`
        ${code}
        twoSum
      `);

      const [nums, target] = test.input.split(",");
      const result = func(JSON.parse(nums), Number(target));

      if (JSON.stringify(result) !== test.output) {
        accepted = false;
        break;
      }
    }

    const status = accepted ? "Accepted" : "Wrong Answer";

    await Submission.create({
      userId,
      problemId,
      language,
      code,
      status
    });

    if (accepted) {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { solvedProblems: problemId }
      });
    }

    res.json({ status });
  } catch (err) {
    res.status(500).json("Submission error");
  }
};
