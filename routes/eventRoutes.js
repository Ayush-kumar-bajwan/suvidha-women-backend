import express from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerBeneficiary
} from '../controllers/eventController.js';
import { protectAdmin, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/:id/register', registerBeneficiary);

// Admin only routes
router.post('/', protectAdmin, isAdmin, createEvent);
router.put('/:id', protectAdmin, isAdmin, updateEvent);
router.delete('/:id', protectAdmin, isAdmin, deleteEvent);

export default router;