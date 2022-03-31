import Booking from '../models/booking';

import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';

import Moment from 'moment';
import { extendMoment } from 'moment-range';
import Room from '../models/room';
import User from '../models/user';

const moment = extendMoment(Moment);

const newBooking = catchAsyncErrors(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  });

  res.status(200).json({
    success: true,
    booking,
  });
});

// Create new booking   =>   /api/bookings/check
const checkRoomBookingAvailability = catchAsyncErrors(async (req, res) => {
  let { roomId, checkInDate, checkOutDate } = req.query;

  checkInDate = new Date(checkInDate);
  checkOutDate = new Date(checkOutDate);

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      {
        checkInDate: {
          $lte: checkOutDate,
        },
      },
      {
        checkOutDate: {
          $gte: checkInDate,
        },
      },
    ],
  });

  // Check if there is any booking available
  let isAvailable;

  if (bookings && bookings.length === 0) {
    isAvailable = true;
  } else {
    isAvailable = false;
  }

  res.status(200).json({
    success: true,
    isAvailable,
  });
});

// check booked dates for a room   =>   /api/bookings/check_booked_dates
const checkBookedDatesForRoom = catchAsyncErrors(async (req, res) => {
  const { roomId } = req.query;

  const bookings = await Booking.find({ room: roomId });

  let bookedDates = [];

  bookings.forEach((booking) => {
    const range = moment.range(
      moment(booking.checkInDate),
      moment(booking.checkOutDate)
    );

    const dates = Array.from(range.by('day'));

    bookedDates = bookedDates.concat(dates);
  });

  res.status(200).json({
    success: true,
    bookedDates,
  });
});

// get all bookings for current user  -> /api/bookings/me
const myBookings = catchAsyncErrors(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate({
      path: 'room',
      select: 'name pricePerNight images',
    })
    .populate({
      path: 'user',
      select: 'name email',
    });

  res.status(200).json({
    success: true,
    bookings,
  });
});

// get booking details -> /api/bookings/:id
const getBookingDetails = catchAsyncErrors(async (req, res) => {
  const booking = await Booking.findById(req.query.id)
    .populate({
      path: 'room',
      select: 'name pricePerNight images',
      model: Room,
    })
    .populate({
      path: 'user',
      select: 'name email',
      model: User,
    });

  res.status(200).json({
    success: true,
    booking,
  });
});

export {
  newBooking,
  checkRoomBookingAvailability,
  checkBookedDatesForRoom,
  myBookings,
  getBookingDetails,
};
