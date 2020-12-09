import React from 'react';
import { Link } from 'react-router-dom';

// Component for the navbar.
const Navbar = () => {

  // The HTML that is being rendered.
  return (
    <div>

      <div>
        <h1>allUnsigned</h1>
      </div>

      <div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/addband'>Bands</Link></li>
        </ul>
      </div>

    </div>
  );
}

// Exports.
export default Navbar;
