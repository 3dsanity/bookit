import {
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESS,
  CHECK_BOOKING_FAILED,
  CHECK_BOOKING_RESET,
  CLEAR_ERRORS,
  BOOKED_DATES_SUCCESS,
  BOOKED_DATES_FAIL,
} from '../constants/bookingConstants';

// export const getRooms = (req) => async (dispatch) => {
//   try {
//     const { origin } = absoluteUrl(req);

//     const { data } = await fetch(`${origin}/api/rooms`);

//     dispatch({
//       type: ALL_ROOMS_SUCCESS,
//       payload: data,
//     });
//   } catch (e) {
//     dispatch({
//       type: ALL_ROOMS_FAILED,
//       payload: e.response.data,
//     });
//   }
// };

export const checkBooking = async (
  roomId,
  checkInDate,
  checkOutDate,
  dispatch
) => {
  try {
    dispatch({ type: CHECK_BOOKING_REQUEST });

    let link = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;

    const response = await fetch(link);
    const data = await response.json();

    dispatch({
      type: CHECK_BOOKING_SUCCESS,
      payload: data.isAvailable,
    });
  } catch (e) {
    dispatch({
      type: CHECK_BOOKING_FAIL,
      payload: e.response.data.message,
    });
  }
};

export const getBookedDates = async (id, dispatch) => {
  try {
    const data = await fetch(
      `/api/bookings/check_booked_dates?roomId=${id}`
    ).then((r) => r.json());

    dispatch({
      type: BOOKED_DATES_SUCCESS,
      payload: data.bookedDates,
    });
  } catch (e) {
    dispatch({
      type: BOOKED_DATES_FAIL,
      payload: e.response.data.message,
    });
  }
};
