import express from "express";
import { registerBeneficiary, getAllBeneficiaries } from "../controllers/beneficiaryController.js";

const router = express.Router();

router.post("/register", registerBeneficiary);
router.get("/all",getAllBeneficiaries);

export default router;
