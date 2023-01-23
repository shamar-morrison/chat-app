import { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import SignInImage from '../assets/signup.jpg';

const initialState = {
  fullName: '',
  username: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  avatarURL: '',
};

const cookies = new Cookies();

export default function Auth() {
  const [form, setForm] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(true);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  function switchMode() {
    setIsSignUp(prevIsSignUp => !prevIsSignUp);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const URL = 'http://localhost:5000/auth';
    const { username, password, fullName, phoneNumber, avatarURL } = form;

    const {
      data: { token, userID, hashedPassword },
    } = await axios.post(`${URL}/${isSignUp ? 'signup' : 'signin'}`, {
      username,
      password,
      fullName,
      phoneNumber,
      avatarURL,
    });

    cookies.set('token', token);
    cookies.set('username', username);
    cookies.set('fullName', fullName);
    cookies.set('userID', userID);

    if (isSignUp) {
      cookies.set('phone', phoneNumber);
      cookies.set('avatarURL', avatarURL);
      cookies.set('hashedPassword', hashedPassword);
    }

    window.location.reload();
  }

  return (
    <div className='auth__form-container'>
      <div className='auth__form-container_fields'>
        <div className='auth__form-container_fields-content'>
          <p>{isSignUp ? 'Sign Up' : 'Sign In'}</p>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='fullName'>Full Name</label>
                <input
                  type='text'
                  name='fullName'
                  placeholder='First & Last Name'
                  id='fullName'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className='auth__form-container_fields-content_input'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                name='username'
                placeholder='Username'
                id='username'
                onChange={handleChange}
                required
              />
            </div>
            <div className='auth__form-container_fields-content_input'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
                required
              />
            </div>
            {isSignUp && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                  type='password'
                  name='confirmPassword'
                  placeholder='Confirm Password'
                  id='confirmPassword'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignUp && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='phoneNumber'>Phone Number</label>
                <input
                  type='text'
                  name='phoneNumber'
                  placeholder='Phone Number'
                  id='phoneNumber'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignUp && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='avatarURL'>Avatar URL</label>
                <input
                  type='text'
                  name='avatarURL'
                  placeholder='Link to Profile Picture'
                  id='avatarURL'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className='auth__form-container_fields-content_button'>
              <button type='submit'>{isSignUp ? 'Sign Up' : 'Sign In'}</button>
            </div>
          </form>
          <div className='auth__form-container_fields-account'>
            <p>
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <span onClick={switchMode}>{isSignUp ? 'Sign In' : 'Sign Up'}</span>
            </p>
          </div>
        </div>
      </div>
      <div className='auth__form-container_image'>
        <img src={SignInImage} alt='sign in' />
      </div>
    </div>
  );
}