import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useNavContext } from './NavContext';
import { useAuth } from './AuthContext';
export default function Nav() {
  const { notesVisible, setNotesVisible } = useNavContext();
  const { logout } = useAuth();
  const navigation = useNavigate();
  async function handleLogout() {
    try {
      await logout();
      navigation('/login');
    } catch (err) {
      alert(err);
    }
  }
  return (
    <header>
      <div className='flex-header'>
        <div className='logo'>
          <img className='logo-img' src='/images/logo.png' alt='logo' />
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/notes'>Notes</NavLink>
            </li>
            <li>
              <NavLink to='/contact'>Contact</NavLink>
            </li>
            <li>
              <a style={{ cursor: 'pointer' }} onClick={handleLogout}>
                Log out
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <button
        className={`hide-notes-button ${notesVisible ? '' : 'show-notes'}`}
        onClick={() => setNotesVisible(!notesVisible)}
      >
        <img src='/images/chevron.svg' alt='chevron' />
      </button>
    </header>
  );
}
