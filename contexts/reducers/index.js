import {
  bookedDatesReducer,
  bookingDetailsReducer,
  bookingReducer,
  bookingsReducer,
  checkBookingReducer,
} from './bookingReducers';
import {
  allRoomsReducer,
  checkReviewReducer,
  newReviewReducer,
  newRoomReducer,
  reviewReducer,
  roomReducer,
  roomReviewsReducer,
  roomsDetailsReducer,
} from './roomReducers';
import {
  allUsersReducer,
  authReducer,
  forgotPasswordReducer,
  userDetailsReducer,
  userReducer,
} from './userReducers';

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
  booking: bookingReducer,
  bookingDetails: bookingDetailsReducer,
  newReview: newReviewReducer,
  reviewAvailable: checkReviewReducer,
  newRoom: newRoomReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  user: userReducer,
  roomReviews: roomReviewsReducer,
  review: reviewReducer,
};

export default combineReducers(reducers);
