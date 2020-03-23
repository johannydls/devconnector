import React from 'react';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <a href="index.html"><i className="fas fa-code"></i> DevConnector</a>
      </h1>
      <ul>
        <li><a href="#">Developers</a></li>
        <li><a href="#">Register</a></li>
        <li><a href="#">Login</a></li>
      </ul>
    </nav>
  )
}
