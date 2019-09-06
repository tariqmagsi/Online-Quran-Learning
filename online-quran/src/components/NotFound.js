import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import notFound from "../images/header/notFound.png";

class NotFound extends Component {
  render() {
    return (
      <div>
        <img src={notFound} alt="404 Not Found" />
        <NavLink to="/Login">
          <button className="btn btn-success">
            <strong>Go To Login Page</strong>
          </button>
        </NavLink>
      </div>
    );
  }
}
export default NotFound;
