import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavContext } from './Context';

export default function Nav() {
  const { notesVisible, setNotesVisible } = React.useContext(NavContext);
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
          </ul>
        </nav>
      </div>
      <button
        className={`hide-notes-button ${notesVisible ? '' : 'show-notes'}`}
        onClick={() => setNotesVisible(!notesVisible)}
      >
        <img src='/images/chevron.svg' />
      </button>
    </header>
  );
}
