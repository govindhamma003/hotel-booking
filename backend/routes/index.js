const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/bookingController')
const jsonHandlingController = require('../controllers/jsonHandlingController')
const aiController = require('../controllers/aiController')
// Room routes
router.get('/availableRooms', jsonHandlingController.availableRooms)

// Booking routes
router.post('/customer/booking', bookingController.booking)
router.get('/bookings', bookingController.getBookings)
router.post('/ai/search', aiController.search)

module.exports = { router }