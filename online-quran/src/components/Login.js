import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getFromStorage } from "../utils/storage";
import "../css/Formstyle.css";
import LoginForm from "./Loginform";
import { fromJSON } from "tough-cookie";

class Signin extends Component {
  state = { issAdmin: false };
  componentDidMount() {
    const obj = getFromStorage(process.env.REACT_APP_KEY);

    if (!(obj && obj.token)) {
      this.setState({
        issAdmin: true
      });
    }
  }
  render() {
    return this.state.issAdmin ? (
      <div className="backSection">
        <div className="signin-section">
          <div className="container">
            <LoginForm />
          </div>
        </div>
      </div>
    ) : (
      <div />
    );
  }
}
export default withRouter(Signin);
