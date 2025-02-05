import express from "express"
import { emailhandler } from "../controllers/emailController.js";


const router = express.Router()

router.post('/submit',emailhandler);

export default router