import React from 'react';
import './header.css';

export default function Header({ children }) {
  return (
    <div className='header'>
      <div className='container header-p header-i flex jc-sb ai-c'>
        <h1 className='header-h1'>{children}</h1>
      </div>
    </div>
  );
}
