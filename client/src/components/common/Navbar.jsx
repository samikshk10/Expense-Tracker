import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light navbar__all fixed-top ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Expense Tracker
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#"></a>
              </li>
            </ul>
            <div className="d-flex name-navbar">
              <p>
                Welcome{" "}
                <span>
                  {window.localStorage.getItem("username") || "User"} !!!
                </span>
              </p>
              <a href="/logout">
                <button className="btn btn-outline-success">Logout</button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
