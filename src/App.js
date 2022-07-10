import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import Notes from './components/Notes';
import Login from './components/Login';
import Signup from './components/Signup';
import InvalidRoute from './components/InvalidRoute';
import PrivateRoute from './components/PrivateRoute';
import { ContextProvider } from './components/NavContext';
import { AuthContextProvider } from './components/AuthContext';
export default function App() {
  return (
    <div className='flex'>
      <AuthContextProvider>
        <ContextProvider>
          {/* ^^for navbar^^ */}
          <Routes>
            <Route
              index
              path='/'
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path='/contact'
              element={
                <PrivateRoute>
                  <Contact />
                </PrivateRoute>
              }
            />
            <Route
              path='/notes'
              element={
                <PrivateRoute>
                  <Notes />
                </PrivateRoute>
              }
            >
              <Route path=':note' element={<Notes />} />
            </Route>
            <Route
              path='/login'
              element={
                <PrivateRoute loginPage={true}>
                  <Login />
                </PrivateRoute>
              }
            />
            <Route
              path='/signup'
              element={
                <PrivateRoute loginPage={true}>
                  <Signup />
                </PrivateRoute>
              }
            />
            <Route path='*' element={<InvalidRoute />} />
          </Routes>
        </ContextProvider>
      </AuthContextProvider>
    </div>
  );
}
