import express from "express";
import { registerBeneficiary } from "../controllers/beneficiaryController.js";

const router = express.Router();

router.post("/register", registerBeneficiary);

export default router;
