import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { clearError, resetPassword } from '../../contexts/actions/userActions';
import { USER_RESET_PASSWORD_SUCCESS } from '../../contexts/constants/userConstants';
import { useAppContext } from '../../contexts/state';
import ButtonLoader from '../layout/ButtonLoader';

const ResetPassword = () => {
  const {
    dispatch,
    state: {
      forgotPassword: { loading, error, success, ...rest },
    },
  } = useAppContext();

  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError);
    }

    if (success) {
      toast.success('Password was reset, please login');
      router.push('/login');
      dispatch({ type: USER_RESET_PASSWORD_SUCCESS });
    }
  }, [dispatch, error, success, router]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      password,
      confirmPassword,
    };

    resetPassword(router.query.token, userData, dispatch);
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mb-3">Reset Password</h1>
          <div className="form-group">
            <label htmlFor="email_field">Enter Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm_password_field">Confirm Password</label>
            <input
              type="password"
              id="confirm_password_field"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            id="new_password_button"
            type="submit"
            className="btn btn-block py-3"
            disabled={loading ? true : false}
          >
            {loading ? <ButtonLoader /> : 'Set Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
