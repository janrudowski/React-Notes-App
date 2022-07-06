import React from 'react';
import { Link } from 'react-router-dom';
export default function Login() {
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
            <input type='email' name='email' />
          </div>
          <div className='login-form-input-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' />
          </div>
          <button className='login-form-submit'>Login</button>
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
