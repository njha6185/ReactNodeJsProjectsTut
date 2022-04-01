import React, { } from 'react';

//const Navbar = (props) => {
const Navbar = ({totalNoOfCounter}) => {
    return (
        <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    Navbar
                    <span className="position-absolute m-2 translate-middle badge rounded-pill bg-warning">
                        {totalNoOfCounter}
                    </span>
                </a>                
        </nav>
    );
}

export default Navbar ;