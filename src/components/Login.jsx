import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Login() {
  const navigation = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = React.useState({
    email: '',
    password: '',
    submit: '',
  });

  async function handleSubmit() {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
      formData.email
    );
    const isValidPassword = formData.password.length >= 8;
    setErrorMessage((prev) => {
      return {
        ...prev,
        email: !isValidEmail ? 'Email not valid' : '',
        password: !isValidPassword
          ? 'Password must be longer than 8 characters'
          : '',
      };
    });
    if (!isValidEmail || !isValidPassword) return;
    try {
      setLoading(true); //so when user clicks during loging nothing will happen
      await login(formData.email, formData.password);
      navigation('/');
    } catch (err) {
      setErrorMessage((prev) => {
        return {
          ...prev,
          submit: `Failed to log in. ${err.message}`,
        };
      });
    }
    setLoading(false);
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  return (
    <div className='flex-login'>
      <div className='login-section left'>
        <img
          className='login-section-image'
          src='/images/login-img.png'
          alt='login'
        />
      </div>
      <div className='login-section'>
        <div className='login-form-container'>
          <h2 className='login-form-title'>Account Login</h2>
          <div className='login-form-social-buttons'>
            <button>
              <img src='images/google-icon.svg' alt='google' />
              Login with Google
            </button>
            <button>
              <img src='images/facebook-icon.svg' alt='google' />
              Login with Facebook
            </button>
          </div>
          <fieldset className='login-form-divide'>
            <legend>Or</legend>
          </fieldset>
          <div className='login-form-input-group'>
            <label htmlFor='email'>Email address</label>
            <input
              className={errorMessage.email ? 'invalid-input' : ''}
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
            <h5 className='login-form-error-message'>{errorMessage.email}</h5>
          </div>
          <div className='login-form-input-group'>
            <label htmlFor='password'>Password</label>
            <input
              className={errorMessage.password ? 'invalid-input' : ''}
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
            <h5 className='login-form-error-message'>
              {errorMessage.password}
            </h5>
          </div>
          <h4 className='login-form-error-submit'>{errorMessage.submit}</h4>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className='login-form-submit'
          >
            Login
          </button>
          <h4 className='login-form-footer'>
            Don't have an account?
            <Link className='login-form-link' to='/signup'>
              {' '}
              Sign up here
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}
