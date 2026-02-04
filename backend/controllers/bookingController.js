const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const { name, date, guests, notes } = req.body;

    if (!name || !date || !guests) {
      return res.status(400).json({ message: "name, date and guests are required." });
    }

    const booking = await Booking.create({ name, date, guests, notes });

    return res.status(201).json(booking);
  } catch (error) {
    console.error("Create booking error", error);
    return res.status(500).json({ message: "Unable to create booking." });
  }
};

const getBookings = async (_req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1 });
    return res.json(bookings);
  } catch (error) {
    console.error("Fetch bookings error", error);
    return res.status(500).json({ message: "Unable to fetch bookings." });
  }
};

module.exports = {
  createBooking,
  getBookings,
};
