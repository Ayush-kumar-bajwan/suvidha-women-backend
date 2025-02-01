import express from "express";
import { registerVolunteer, approveVolunteer } from "../controllers/volunteerController.js";

const router = express.Router();

router.post("/register", registerVolunteer);
router.put("/approve/:id", approveVolunteer); // Admin approves volunteer

export default router;
