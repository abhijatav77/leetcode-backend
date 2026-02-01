import express from "express";
import {
  getProblems,
  getProblem,
  createProblem
} from "../controllers/problem.controller.js";

const router = express.Router();

router.get("/", getProblems);
router.get("/:id", getProblem);
router.post("/", createProblem); // admin only later

export default router;
