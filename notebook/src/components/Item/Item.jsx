import React from 'react';
import './item.css';

export default function Item({ children }) {
  return (
    <div className='item'>
      {children}
    </div>
  );
}
