import {
  ALL_ROOMS_FAILED,
  ALL_ROOMS_SUCCESS,
  CLEAR_ERRORS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
} from '../constants/roomConstants';
import absoluteUrl from 'next-absolute-url';
import { useEffect } from 'react';

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

export const fetchRooms = async (
  req,
  currentPage = 1,
  location = '',
  guests,
  category
) => {
  const response = {
    success: true,
    message: 'Pre-Data fetch',
    error: null,
  };

  try {
    const { origin } = absoluteUrl(req);
    let link = `${origin}/api/rooms?page=${currentPage}&location=${location}`;

    if (guests) link = link.concat(`&guestCapacity=${guests}`);
    if (category) link = link.concat(`&category=${category}`);

    const res = await fetch(link);

    response.data = res.json() || [];
  } catch (e) {
    response.error = e.response?.data || 'Unable to fetch data';
  }
  return response.data;
};

export const fetchRoom = async (req, id) => {
  const response = {
    success: true,
    message: 'Pre-Data fetch',
    error: null,
  };

  try {
    const { origin } = absoluteUrl(req);
    const res = await fetch(`${origin}/api/rooms/${id}`);

    response.data = res.json() || [];
  } catch (e) {
    response.error = e.response?.data || 'Unable to fetch data';
  }
  return response.data;
};

export const newReview = async (review, dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(review),
    };

    const data = fetch('/api/reviews', config).then((r) => r.json());

    if (data.success) {
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } else {
      dispatch({
        type: NEW_REVIEW_FAILED,
        payload: data.message,
      });
    }
  } catch (e) {
    dispatch({
      type: NEW_REVIEW_FAILED,
      payload: e.response?.data || 'Unable to create review',
    });
  }
};

export const clearError = () => async () => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
