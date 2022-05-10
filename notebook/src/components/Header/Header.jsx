import React from 'react'
import './header.css'

export default function Header({ children }) {
  return (
    <div className="header">
      <div className="container header-p">
        <p className="header-txt">{children}</p>
      </div>
    </div>
  )
}
