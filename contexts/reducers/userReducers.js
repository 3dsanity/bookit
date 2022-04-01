import {
  CLEAR_ERRORS,
  USER_FORGOT_PASSWORD_FAILED,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
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
  USER_RESET_PASSWORD_FAILED,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  ADMIN_USERS_FAILED,
  ADMIN_USERS_REQUEST,
  ADMIN_USERS_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_RESET,
  USER_DETAILS_FAILED,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from '../constants/userConstants';

// Auth reducer
export const authReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case USER_REGISTER_FAILED:
      return {
        ...state,
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
        ...state,
        loading: true,
        isAuthenticated: false,
      };

    case USER_LOADED_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case USER_LOADED_FAILED:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    case USER_PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
      };

    case USER_PROFILE_UPDATE_RESET:
      return {
        ...state,
        loading: false,
        isUpdated: false,
      };

    case USER_PROFILE_UPDATE_FAILED:
    case UPDATE_USER_FAILED:
      return {
        ...state,
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

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOT_PASSWORD_REQUEST:
    case USER_RESET_PASSWORD_REQUEST:
      return {
        loading: true,
      };

    case USER_FORGOT_PASSWORD_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };

    case USER_RESET_PASSWORD_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case USER_FORGOT_PASSWORD_FAILED:
    case USER_RESET_PASSWORD_FAILED:
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

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_USERS_REQUEST:
      return {
        loading: true,
      };

    case ADMIN_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };

    case ADMIN_USERS_FAILED:
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

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isUpdated: action.payload.success,
        isUpdating: false,
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isUpdating: true,
      };
    case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdating: false,
        isUpdated: false,
      };
    default:
      return state;
  }
};
