import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';
import ButtonLoader from '../layout/ButtonLoader';

import { registerUser, clearError } from '../../contexts/actions/userActions';
import { useAppContext } from '../../contexts/state';

const Register = () => {
  const {
    dispatch,
    state: { auth },
  } = useAppContext();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const router = useRouter();

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(
    '/images/default_avatar.jpg'
  );

  const { success, error, loading } = auth;

  useEffect(() => {
    if (success) {
      router.push('/login');
      dispatch(clearError());
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, success, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = { name, email, password, avatar };

    registerUser(userData, dispatch);
  };

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);

      return;
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Join Us</h1>

            <div className="form-group">
              <label htmlFor="name_field">Full Name</label>
              <input
                type="text"
                id="name_field"
                name="name"
                className="form-control"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                name="email"
                className="form-control"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                name="password"
                className="form-control"
                value={password}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="image"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              {loading ? <ButtonLoader /> : 'LOGIN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;