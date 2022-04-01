import {
  ALL_ROOMS_FAILED,
  ALL_ROOMS_SUCCESS,
  ROOM_DETAILS_FAILED,
  ROOM_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  NEW_REVIEW_FAILED,
  REVIEW_AVAILABILITY_REQUEST,
  REVIEW_AVAILABILITY_SUCCESS,
  REVIEW_AVAILABILITY_FAILED,
  ADMIN_ROOMS_REQUEST,
  ADMIN_ROOMS_SUCCESS,
  ADMIN_ROOMS_FAILED,
  NEW_ROOM_REQUEST,
  NEW_ROOM_SUCCESS,
  NEW_ROOM_RESET,
  NEW_ROOM_FAILED,
} from '../constants/roomConstants';

// All rooms reducer
export const allRoomsReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ADMIN_ROOMS_REQUEST:
      return {
        loading: true,
      };

    case ALL_ROOMS_SUCCESS:
      return {
        roomsCount: action.payload.roomsCount,
        resPerPage: action.payload.resPerPage,
        filteredRoomsCount: action.payload.filteredRoomsCount,
        rooms: action.payload.rooms,
      };

    case ADMIN_ROOMS_SUCCESS:
      return {
        loading: false,
        rooms: action.payload,
      };

    case ALL_ROOMS_FAILED:
    case ADMIN_ROOMS_FAILED:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const roomsDetailsReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case ROOM_DETAILS_SUCCESS:
      return {
        ...action.payload,
      };

    case ROOM_DETAILS_FAILED:
      return { error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        loading: true,
      };

    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case NEW_REVIEW_RESET:
      return {
        success: false,
      };

    case NEW_REVIEW_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const checkReviewReducer = (
  state = { reviewAvailable: null },
  action
) => {
  switch (action.type) {
    case REVIEW_AVAILABILITY_REQUEST:
      return {
        loading: true,
      };

    case REVIEW_AVAILABILITY_SUCCESS:
      return {
        loading: false,
        reviewAvailable: action.payload,
      };

    case REVIEW_AVAILABILITY_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newRoomReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case NEW_ROOM_REQUEST:
      return {
        loading: true,
      };

    case NEW_ROOM_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        room: action.payload.room,
      };

    case NEW_ROOM_RESET:
      return {
        success: false,
      };

    case NEW_ROOM_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const roomReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ROOM_REQUEST:
    case DELETE_ROOM_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_ROOM_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_ROOM_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ROOM_RESET:
      return {
        isUpdated: false,
      };

    case DELETE_ROOM_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case UPDATE_ROOM_FAILED:
    case DELETE_ROOM_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
