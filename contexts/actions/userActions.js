import {
  ADMIN_USERS_FAILED,
  ADMIN_USERS_REQUEST,
  ADMIN_USERS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_USER_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_DETAILS_FAILED,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_FORGOT_PASSWORD_FAILED,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_LOADED_FAILED,
  USER_LOADED_REQUEST,
  USER_LOADED_SUCCESS,
  USER_PROFILE_UPDATE_FAILED,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESET_PASSWORD_FAILED,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
} from '../constants/userConstants';
import absoluteUrl from 'next-absolute-url';

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

//forgot user password
export const forgotPassword = async (email, dispatch) => {
  try {
    dispatch({ type: USER_FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email }),
    };

    const response = await fetch('/api/password/forgot', config);
    const data = await response.json();

    if (data.success) {
      dispatch({
        type: USER_FORGOT_PASSWORD_SUCCESS,
        payload: data.message,
      });
    } else {
      dispatch({
        type: USER_FORGOT_PASSWORD_FAILED,
        payload: data.message,
      });
    }
  } catch (e) {
    console.log({ e });

    dispatch({
      type: USER_FORGOT_PASSWORD_FAILED,
      payload: e.response.data.message,
    });
  }
};

//reset user password
export const resetPassword = async (token, passwords, dispatch) => {
  try {
    dispatch({ type: USER_RESET_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(passwords),
    };

    const response = await fetch(`/api/password/reset/${token}`, config);
    const data = await response.json();

    if (data.success) {
      dispatch({
        type: USER_RESET_PASSWORD_SUCCESS,
        payload: data.success,
      });
    } else {
      dispatch({
        type: USER_RESET_PASSWORD_FAILED,
        payload: data.message,
      });
    }
  } catch (e) {
    console.log({ e });

    dispatch({
      type: USER_RESET_PASSWORD_FAILED,
      payload: e.response.data.message,
    });
  }
};

//get all users as admin
export const adminGetAllUsers = async (dispatch) => {
  try {
    dispatch({ type: ADMIN_USERS_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = await fetch(`/api/admin/users`).then((r) => r.json());

    dispatch({
      type: ADMIN_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (e) {
    console.log({ e });
    dispatch({
      type: ADMIN_USERS_FAILED,
      payload: e.response.data.message,
    });
  }
};

//get all users as admin
export const getUserDetails = async (id, dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = await fetch(`/api/admin/users/${id}`).then((r) => r.json());

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (e) {
    dispatch({
      type: USER_DETAILS_FAILED,
      payload: e.response.data.message,
    });
  }
};

//update user
export const updateUser = async (id, userData, dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(userData),
    };

    const data = await fetch(`/api/admin/users/${id}`, config).then((r) =>
      r.json()
    );

    console.log({ data });

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data,
    });
  } catch (e) {
    console.log({ e });

    dispatch({
      type: UPDATE_USER_FAILED,
      payload: e.response.data.message,
    });
  }
};

//get all users as admin
export const deleteUser = async (id, dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    };

    const data = await fetch(`/api/admin/users/${id}`, config).then((r) =>
      r.json()
    );

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (e) {
    console.log({ e });

    dispatch({
      type: DELETE_USER_FAILED,
      payload: e.response.data.message,
    });
  }
};

export const clearError = () => async () => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
