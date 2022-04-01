import {
  bookedDatesReducer,
  bookingDetailsReducer,
  bookingsReducer,
  checkBookingReducer,
} from './bookingReducers';
import {
  allRoomsReducer,
  checkReviewReducer,
  newReviewReducer,
  newRoomReducer,
  roomReducer,
  roomsDetailsReducer,
} from './roomReducers';
import { authReducer, forgotPasswordReducer } from './userReducers';

function combineReducers(slices) {
  return (state, action) =>
    Object.keys(slices).reduce(
      (acc, prop) => ({
        ...acc,
        [prop]: slices[prop](acc[prop], action),
      }),
      state
    );
}

const reducers = {
  allRooms: allRoomsReducer,
  roomDetails: roomsDetailsReducer,
  auth: authReducer,
  room: roomReducer,
  forgotPassword: forgotPasswordReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  bookingDetails: bookingDetailsReducer,
  newReview: newReviewReducer,
  reviewAvailable: checkReviewReducer,
  newRoom: newRoomReducer,
};

export default combineReducers(reducers);
