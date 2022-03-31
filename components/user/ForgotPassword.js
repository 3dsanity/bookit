import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { clearError, forgotPassword } from '../../contexts/actions/userActions';
import { USER_FORGOT_PASSWORD_SUCCESS } from '../../contexts/constants/userConstants';
import { useAppContext } from '../../contexts/state';
import ButtonLoader from '../layout/ButtonLoader';

const ForgotPassword = () => {
  const {
    dispatch,
    state: {
      forgotPassword: { loading, error, message, ...rest },
    },
  } = useAppContext();

  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError);
    }

    if (message) {
      toast.success(message);
      // router.push('/');
      dispatch({ type: USER_FORGOT_PASSWORD_SUCCESS });
    }
  }, [dispatch, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();

    forgotPassword(email, dispatch);
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mb-3">Forgot Password</h1>
          <div className="form-group">
            <label htmlFor="email_field">Enter Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            id="forgot_password_button"
            type="submit"
            className="btn btn-block py-3"
            disabled={loading ? true : false}
          >
            {loading ? <ButtonLoader /> : 'Send Email'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
