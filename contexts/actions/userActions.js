import {
  CLEAR_ERRORS,
  USER_LOADED_FAILED,
  USER_LOADED_REQUEST,
  USER_LOADED_SUCCESS,
  USER_PROFILE_UPDATE_FAILED,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';
import absoluteUrl from 'next-absolute-url';
import { CropLandscapeOutlined } from '@mui/icons-material';

// Register user
export const registerUser = async (userData, dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userData),
    };

    await fetch('/api/auth/register', config)
      .then((data) => {
        dispatch({
          type: USER_REGISTER_SUCCESS,
        });
      })
      .catch((e) => {
        dispatch({
          type: USER_REGISTER_FAILED,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const loadUser = async (dispatch) => {
  try {
    dispatch({
      type: USER_LOADED_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('/api/me', config);
    const data = await response.json();

    if (!data.success) {
      dispatch({
        type: USER_LOADED_FAILED,
        payload: {},
      });
      return;
    }

    dispatch({
      type: USER_LOADED_SUCCESS,
      payload: data.user,
    });
  } catch (e) {
    console.log({ e });

    dispatch({
      type: USER_LOADED_FAILED,
      payload: e.response.data.message,
    });
  }
};

export const updateUserProfile = async (userData, dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(userData),
    };

    const response = await fetch('/api/me/update', config);
    const data = await response.json();

    if (!data.success) {
      dispatch({
        type: USER_PROFILE_UPDATE_FAILED,
        payload: {},
      });
      return;
    }

    dispatch({
      type: USER_PROFILE_UPDATE_SUCCESS,
      payload: data.user,
    });
  } catch (e) {
    console.log({ e });

    dispatch({
      type: USER_LOADED_FAILED,
      payload: e.response.data.message,
    });
  }
};

export const clearError = () => async () => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
