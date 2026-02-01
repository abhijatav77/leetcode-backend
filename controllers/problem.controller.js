import Problem from "../models/Problem.js";

export const getProblems = async (req, res) => {
  const problems = await Problem.find().select("title difficulty");
  res.json(problems);
};

export const getProblem = async (req, res) => {
  const problem = await Problem.findById(req.params.id);
  res.json(problem);
};

export const createProblem = async (req, res) => {
  const problem = await Problem.create(req.body);
  res.json(problem);
};
