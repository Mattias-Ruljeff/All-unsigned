import React from 'react';
import { Link } from 'react-router-dom';

// Component for the navbar.
const Navbar = () => {

    // The HTML that is being rendered.
    return (
        <div>
            <section id="header">
                <div className="navbar container">

                    <div className="brand">
                        <h1>allUnsigned</h1>
                    </div>

                    <div className="navlist">
                        <ul>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/bands'>Bands</Link></li>
                        </ul>
                    </div>

                </div>
            </section>
        </div>
    );
}

// Exports
export default Navbar;