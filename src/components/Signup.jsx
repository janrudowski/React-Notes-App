import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigation = useNavigate();
  const [formData, setFormData] = React.useState({
    email: {
      value: '',
      //eslint-disable-next-line
      regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      active: false,
    },
    password: {
      value: '',
      active: false,
    },
  });
  const [errorMessage, setErrorMessage] = React.useState({
    email: {
      message: 'Invalid email',
      display: null,
    },
    password: {
      message:
        'Password cannot be empty and must be at least 8 characters long',
      display: null,
    },
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          value: value,
          active: true,
        },
      };
    });
  }

  function handleSubmit() {
    const dataCorrect = Object.values(errorMessage).every(
      (el) => el.display == false
    );
    if (
      dataCorrect &&
      formData.email.value !== '' &&
      formData.password.value !== ''
    ) {
      navigation('/', { replace: true });
    }
  }

  React.useEffect(() => {
    const formDataEntries = Object.entries(formData);
    formDataEntries.forEach(([key, { value, regex, active }]) => {
      if (!active) return;

      let valid;

      if (!regex) {
        valid = value.length > 0;
        if (key === 'password') valid = value.length >= 8;
      } else {
        valid = regex.test(value);
      }

      setErrorMessage((prev) => {
        return {
          ...prev,
          [key]: {
            ...prev[key],
            display: !valid,
          },
        };
      });
    });
  }, [formData]);

  return (
    <div className='flex-login'>
      <div className='login-section left'>
        <img
          className='login-section-image'
          src='/images/signup-img.png'
          alt='login'
        />
      </div>
      <div className='login-section'>
        <div className='login-form-container'>
          <h2 className='login-form-title'>Sign up</h2>
          <h3 className='login-form-desc'>
            If you are already a member you can login with your email address
            and password.
          </h3>
          <div className='login-form-social-buttons'>
            <button>
              <img src='images/google-icon.svg' alt='google' />
              Sign up with Google
            </button>
            <button>
              <img src='images/facebook-icon.svg' alt='google' />
              Sign up with Facebook
            </button>
          </div>
          <fieldset className='login-form-divide'>
            <legend>Or</legend>
          </fieldset>
          <div className='login-form-input-group'>
            <label htmlFor='email'>Email address</label>
            <input
              className={errorMessage.email.display ? 'invalid-input' : ''}
              type='email'
              name='email'
              value={formData.email.value}
              onChange={handleChange}
            />
            <h5 className='login-form-error-message'>
              {errorMessage.email.display && errorMessage.email.message}
            </h5>
          </div>
          <div className='login-form-input-group'>
            <label htmlFor='password'>Password</label>
            <input
              className={errorMessage.password.display ? 'invalid-input' : ''}
              type='password'
              name='password'
              value={formData.password.value}
              onChange={handleChange}
            />
            <h5 className='login-form-error-message'>
              {errorMessage.password.display && errorMessage.password.message}
            </h5>
          </div>
          <button onClick={handleSubmit} className='login-form-submit'>
            Sign up
          </button>
          <h4 className='login-form-footer'>
            Already have an account?
            <Link className='login-form-link' to='/login'>
              {' '}
              Login here
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}
