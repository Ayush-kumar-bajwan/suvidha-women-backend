// controllers/eventController.js
import Event from '../models/eventModel.js';

// Create new event
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      host,
      capacity,
      healthCategory,
      image
    } = req.body;

    // Validate required fields
    if (!title || !description || !date || !time || !location || !host || !capacity || !healthCategory) {
      return res.status(400).json({
        message: 'Please provide all required fields'
      });
    }

    // Validate health category
    const validCategories = ['Pregnancy', 'Cancer Awareness', 'Eye Health', 'Obesity', 'General Wellness', 'Other'];
    if (!validCategories.includes(healthCategory)) {
      return res.status(400).json({
        message: 'Invalid health category'
      });
    }

    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      host,
      capacity,
      healthCategory,
      image: image || '/default-event-image.jpg',
      registeredBeneficiaries: [],
      status: 'upcoming'
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('host', 'name expertise')
      .populate('registeredBeneficiaries', 'name')
      .sort({ date: 1 });
    
    // Update event status based on current date
    const currentDate = new Date();
    
    await Promise.all(events.map(async (event) => {
      const eventDate = new Date(event.date);
      let newStatus = event.status;
      
      if (eventDate < currentDate) {
        newStatus = 'expired';
      } else if (eventDate.toDateString() === currentDate.toDateString()) {
        newStatus = 'ongoing';
      }
      
      if (newStatus !== event.status) {
        event.status = newStatus;
        await event.save();
      }
    }));

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single event
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('host', 'name expertise')
      .populate('registeredBeneficiaries', 'name');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.deleteOne();
    res.json({ message: 'Event removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register beneficiary for event
const registerBeneficiary = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const { beneficiaryId } = req.body;

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if event is full
    if (event.registeredBeneficiaries.length >= event.capacity) {
      return res.status(400).json({ message: 'Event is full' });
    }

    // Check if beneficiary is already registered
    if (event.registeredBeneficiaries.includes(beneficiaryId)) {
      return res.status(400).json({ message: 'Beneficiary already registered' });
    }

    event.registeredBeneficiaries.push(beneficiaryId);
    await event.save();

    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerBeneficiary
};