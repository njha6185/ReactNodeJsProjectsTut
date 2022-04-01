import React from "react";
import { NavLink } from "react-router-dom";

function HomeNavBar({user}) {
  const NavOptions = [
    { name: "Home", path: "home" },
    { name: "Movies", path: "movies" },
    { name: "Counter", path: "counter" },
    { name: "Customer", path: "customers" },
    { name: "Rental", path: "rentals" },
    { name: "Login", path: "login" },
    { name: "Register", path: "register" },
    { name: "BackendTest", path: "backend" },
  ];
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
      <div className="container-fluid">
        <span className="navbar-brand" href="#">
          Videly
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {NavOptions.map((item) => (
              <li key={item.name} className="nav-item m-2">
                <NavLink
                  style={({ isActive }) => {
                    return {
                      margin: "1rem 0",
                      color: isActive ? "white" : "silver",
                    };
                  }}
                  to={`/${item.path}`}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HomeNavBar;
