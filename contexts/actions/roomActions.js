import {
  ALL_ROOMS_FAILED,
  ALL_ROOMS_SUCCESS,
  CLEAR_ERRORS,
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

export const clearError = () => async () => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
