import React, { useState } from 'react';
import './body.css';

export default function Body({ children }) {

  return (
    <div className='body'>
      <div className='container'>
        {children}
      </div>
    </div>
  );
}
