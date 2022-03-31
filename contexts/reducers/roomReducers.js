import {
  ALL_ROOMS_FAILED,
  ALL_ROOMS_SUCCESS,
  ROOM_DETAILS_FAILED,
  ROOM_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/roomConstants';

export const allRoomsReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ALL_ROOMS_SUCCESS:
      return {
        roomsCount: action.payload.roomsCount,
        resPerPage: action.payload.resPerPage,
        filteredRoomsCount: action.payload.filteredRoomsCount,
        rooms: action.payload.rooms,
      };

    case ALL_ROOMS_FAILED:
      return { error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

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
