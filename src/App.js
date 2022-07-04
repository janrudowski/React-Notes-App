import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import Notes from './components/Notes';
import Nav from './components/Nav';
import InvalidRoute from './components/InvalidRoute';
export default function App() {
  return (
    <div className='flex'>
      <Nav />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/notes' element={<Notes />}>
          <Route path=':note' element={<Notes />} />
        </Route>
        <Route path='*' element={<InvalidRoute />} />
      </Routes>
    </div>
  );
}
