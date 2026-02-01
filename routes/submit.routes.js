import express from "express";
import { submitCode } from "../controllers/submit.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, submitCode);

export default router;
