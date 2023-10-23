import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

function Navbar({ logged }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    if (logged) {
      localStorage.clear();
      navigate("/login");
      window.location.reload(true);
    }
  };

  return (
    <>
      <nav className="navbar-custom navbar navbar-dark navbar-expand-lg">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/" className="nav-link">
                Home
              </Link>
              {logged ? (
                <Link to="/posting" className="nav-link">
                  Posting
                </Link>
              ) : null}
              <Link to="/about" className="nav-link">
                About
              </Link>
              {/* <Link to="/contact" className="nav-link">
                Contact Us
              </Link> */}
              <Link to="/login" className="nav-link" onClick={() => handleLogout()}>
                {logged ? <>Logout</> : <>Login</>}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
