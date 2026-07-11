const Constants = require('../constants/constants')
const EmailNotifierJob = require('../jobs/emailNotifierJob')
const Booking = require('../models/Booking');
const logger = require('../helper/logger').createLogger('bookingController')

class BookingController {
  constructor() {
    this.booking = this.booking.bind(this)
    this.getBookings = this.getBookings.bind(this)
  }

  async booking(req, res) {
    const { checkInDate, checkOutDate, guests, name, address, contact, email, paymentConfirmation, roomType, price } = req.body.data

    try {
      const bookingEntry = new Booking({
        checkInDate,
        checkOutDate,
        guests,
        name,
        address,
        contact,
        email,
        paymentConfirmation,
        roomType,
        price
      });

      const savedBooking = await bookingEntry.save();

      if (savedBooking) {
        const args = { checkInDate, checkOutDate, guests, address, paymentConfirmation, roomType, price };
        const notify = new EmailNotifierJob()
        await notify.notifyUser([], Constants.Template.SUPPORT_BOOKING_EMAIL, name, email, contact, null, args)

        if (email) {
          await notify.notifyUser(email, Constants.Template.CUSTOMER_BOOKING_ACKNOWLEDGMENT, name, email, contact, null, { ...args, bookingReference: savedBooking._id.toString() })
        }
      }

      res.status(200).json({
        status: true,
        message: 'Request email sent successfully',
        data: savedBooking,
        refNumber: savedBooking._id.toString()
      })
    } catch (error) {
      logger.error('booking - Error while sending support email:', error)
      res.status(500).json({
        status: false,
        message: 'Error while booking a room.'
      })
    }
  }

  async getBookings(req, res) {
    try {
      const bookings = await Booking.find();
      res.status(200).json({
        status: true,
        message: 'Booking details fetched successfully',
        data: bookings,
      });
    } catch (error) {
      logger.error('getBookings - Error fetching booking details:', error);
      res.status(500).json({
        status: false,
        message: 'Error fetching booking details.',
      });
    }
  }
}

module.exports = new BookingController()