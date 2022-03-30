import { ContentCutOutlined } from '@mui/icons-material';
import {
  CLEAR_ERRORS,
  USER_LOADED_FAILED,
  USER_LOADED_REQUEST,
  USER_LOADED_SUCCESS,
  USER_PROFILE_UPDATE_FAILED,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_RESET,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

// Auth reducer
export const authReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };

    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case USER_REGISTER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case USER_LOADED_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case USER_LOADED_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case USER_LOADED_FAILED:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    case USER_PROFILE_UPDATE_REQUEST:
      return {
        loading: true,
      };

    case USER_PROFILE_UPDATE_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case USER_PROFILE_UPDATE_RESET:
      return {
        loading: false,
        isUpdated: false,
      };

    case USER_PROFILE_UPDATE_FAILED:
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
