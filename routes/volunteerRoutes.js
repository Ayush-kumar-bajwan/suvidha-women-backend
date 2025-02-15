import express from "express";
import { registerVolunteer, approveVolunteer,getAllVolunteers,
    getPendingVolunteers,
    getApprovedVolunteers  } from "../controllers/volunteerController.js";

const router = express.Router();

router.post("/register", registerVolunteer);
router.put("/approve/:id", approveVolunteer); // Admin approves volunteer
router.get("/all", getAllVolunteers);
router.get("/pending", getPendingVolunteers);
router.get("/approved", getApprovedVolunteers);

export default router;
