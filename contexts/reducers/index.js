import {
  bookedDatesReducer,
  bookingDetailsReducer,
  bookingsReducer,
  checkBookingReducer,
} from './bookingReducers';
import { allRoomsReducer, roomsDetailsReducer } from './roomReducers';
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
  forgotPassword: forgotPasswordReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  bookingDetails: bookingDetailsReducer,
};

export default combineReducers(reducers);
