import absoluteUrl from 'next-absolute-url';
import {
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESS,
  CHECK_BOOKING_FAILED,
  CHECK_BOOKING_RESET,
  CLEAR_ERRORS,
  BOOKED_DATES_SUCCESS,
  BOOKED_DATES_FAIL,
  MY_BOOKINGS_SUCCESS,
  ADMIN_BOOKINGS_SUCCESS,
  ADMIN_BOOKINGS_FAILED,
  ADMIN_BOOKINGS_REQUEST,
  DELETE_BOOKING_REQUEST,
  DELETE_BOOKING_SUCCESS,
  DELETE_BOOKING_FAILED,
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

export const fetchMyBookings = async (req) => {
  const response = {
    success: true,
    message: 'Pre-Data fetch',
    error: null,
    bookings: [],
  };
  try {
    const {
      headers: { cookie },
    } = req;
    const config = {
      'Content-Type': 'application/json',
      headers: { cookie },
    };
    const { origin } = absoluteUrl(req);
    const data = await fetch(`${origin}/api/bookings/me`, config).then((r) =>
      r.json()
    );

    response.bookings = data?.bookings || [];
  } catch (e) {
    response.error = e.response?.data || 'Unable to fetch data';
  }

  return response;
};

export const fetchMyBooking = async (id, req) => {
  const response = {
    success: true,
    message: 'Pre-Data fetch',
    error: null,
    bookings: [],
  };
  try {
    const { headers } = req;
    const config = {
      'Content-Type': 'application/json',
      headers,
    };
    const { origin } = absoluteUrl(req);
    const data = await fetch(`${origin}/api/bookings/${id}`, config).then((r) =>
      r.json()
    );

    response.booking = data?.booking || {};
  } catch (e) {
    response.error = e.response?.data || 'Unable to fetch data';
  }

  return response;
};

export const getAdminBookings = async (dispatch) => {
  try {
    dispatch({ type: ADMIN_BOOKINGS_REQUEST });

    const data = await fetch(`/api/admin/bookings`).then((r) => r.json());

    dispatch({
      type: ADMIN_BOOKINGS_SUCCESS,
      payload: data.bookings,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_BOOKINGS_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const deleteBooking = async (id, dispatch) => {
  try {
    dispatch({ type: DELETE_BOOKING_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
    };

    const data = await fetch(`/api/bookings/${id}`).then((r) => r.json());

    dispatch({
      type: DELETE_BOOKING_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BOOKING_FAILED,
      payload: error.response.data.message,
    });
  }
};
