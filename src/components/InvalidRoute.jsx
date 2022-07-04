import React from 'react';

export default function InvalidRoute() {
  const style = {
    color: '#ec7160',
    top: '40%',
    left: '60%',
    position: 'absolute',
    transform: 'translate(-50%,-50%)',
  };
  return <h1 style={style}>Resource not found.</h1>;
}
