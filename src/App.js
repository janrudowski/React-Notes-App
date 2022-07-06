import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import Notes from './components/Notes';
import Login from './components/Login';
import Signup from './components/Signup';
import InvalidRoute from './components/InvalidRoute';

import { NavContext } from './components/Context';
export default function App() {
  const [notesVisible, setNotesVisible] = React.useState(true);

  return (
    <div className='flex'>
      <NavContext.Provider value={{ notesVisible, setNotesVisible }}>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/notes' element={<Notes />}>
            <Route path=':note' element={<Notes />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<InvalidRoute />} />
        </Routes>
      </NavContext.Provider>
    </div>
  );
}
