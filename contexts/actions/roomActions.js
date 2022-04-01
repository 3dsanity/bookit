import {
  ADMIN_ROOMS_FAILED,
  ADMIN_ROOMS_REQUEST,
  ADMIN_ROOMS_SUCCESS,
  ALL_ROOMS_FAILED,
  ALL_ROOMS_SUCCESS,
  CLEAR_ERRORS,
  NEW_REVIEW_FAILED,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_ROOM_FAILED,
  NEW_ROOM_REQUEST,
  NEW_ROOM_SUCCESS,
  REVIEW_AVAILABILITY_FAILED,
  REVIEW_AVAILABILITY_REQUEST,
  REVIEW_AVAILABILITY_SUCCESS,
  UPDATE_ROOM_FAILED,
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_SUCCESS,
  DELETE_ROOM_FAILED,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
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

    const res = await fetch(`${req ? origin : ''}/api/rooms/${id}`);

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
      method: 'PUT',
      body: JSON.stringify(review),
    };

    const data = await fetch('/api/reviews', config).then((r) => r.json());

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

export const checkReviewAvailability = async (roomId, dispatch) => {
  try {
    dispatch({ type: REVIEW_AVAILABILITY_REQUEST });

    const data = await fetch(
      `/api/reviews/check_review_availability?roomId=${roomId}`
    ).then((r) => r.json());

    dispatch({
      type: REVIEW_AVAILABILITY_SUCCESS,
      payload: data.isReviewAvailable,
    });
  } catch (e) {
    dispatch({
      type: REVIEW_AVAILABILITY_FAILED,
      payload: e.response?.data || 'Unable to post review',
    });
  }
};

// Get all rooms - ADMIN
export const getAdminRooms = async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ROOMS_REQUEST });

    const data = await fetch(`/api/admin/rooms`).then((r) => r.json());

    dispatch({
      type: ADMIN_ROOMS_SUCCESS,
      payload: data.rooms,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ROOMS_FAILED,
      payload: error.response.data.message,
    });
  }
};

// create new room action
export const newRoom = async (newRoom, dispatch) => {
  try {
    dispatch({ type: NEW_ROOM_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(newRoom),
    };

    const data = await fetch('/api/rooms', config).then((r) => r.json());

    if (data.success) {
      dispatch({
        type: NEW_ROOM_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: NEW_ROOM_FAILED,
        payload: data.message,
      });
    }
  } catch (e) {
    console.log({ e });

    dispatch({
      type: NEW_ROOM_FAILED,
      payload: e.response?.data || 'Unable to create room',
    });
  }
};

// update room
export const updateRoom = async (id, roomData, dispatch) => {
  try {
    dispatch({ type: UPDATE_ROOM_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(roomData),
    };

    const data = await fetch(`/api/rooms/${id}`, config).then((r) => r.json());

    if (data.success) {
      dispatch({
        type: UPDATE_ROOM_SUCCESS,
        payload: data.success,
      });
    } else {
      dispatch({
        type: UPDATE_ROOM_FAILED,
        payload: data.message,
      });
    }
  } catch (e) {
    console.log({ e });

    dispatch({
      type: UPDATE_ROOM_FAILED,
      payload: e.response?.data || 'Unable to update room',
    });
  }
};

export const deleteRoom = async (id, dispatch) => {
  try {
    dispatch({ type: DELETE_ROOM_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
    };

    const data = await fetch(`/api/rooms/${id}`, config).then((r) => r.json());

    dispatch({
      type: DELETE_ROOM_SUCCESS,
      payload: data.success,
    });
  } catch (e) {
    console.log({ e });

    dispatch({
      type: DELETE_ROOM_FAILED,
      payload: e.response?.data || 'Unable to delete room',
    });
  }
};

export const clearError = () => async () => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
