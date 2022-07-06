import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Nav />
      <main>
        <div className='flex-main flex-home'>
          <h1 className='home-title'>Welcome To the Best Note-App</h1>
          <p className='home-text'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu
            dui. Lorem ipsum dolor sit amet, consectetur adipisce placerat
            mauris nisl. Proin vitae urna
            <span className='orange'> eu sem pellentesque</span> laoreet.
          </p>
          <img className='home-image' src='/images/orange.png' alt='orange' />
          <button className='home-button' onClick={() => navigate('/notes')}>
            Go to Notes
          </button>
        </div>
      </main>
    </>
  );
}
