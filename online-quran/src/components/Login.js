import React, { Component } from "react";
import "../css/Formstyle.css";
import LoginForm from "./Loginform";

class Signin extends Component {
  render() {
    return (
      <div className="backSection">
        <div className="signin-section">
          <div className="container">
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}
export default Signin;
