import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../css/Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const menuOnClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [button, setButton] = useState(true);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  //the event we listen to and the function we run on that event
  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            Chatty <i className="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={menuOnClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                Notifications
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Settings
              </Link>
            </li>
          </ul>
          {button && (
            <button
              onClick={() => {
                Cookies.remove("token");
                window.location.reload();
              }}
            >
              SIGN OUT
            </button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
