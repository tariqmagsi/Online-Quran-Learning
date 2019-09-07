import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getFromStorage } from "../utils/storage";
import "../css/Formstyle.css";
import LoginForm from "./Loginform";

class Signin extends Component {
  state = { issAdmin: false };
  componentDidMount() {
    const obj = getFromStorage(process.env.REACT_APP_KEY);
    if (obj && obj.token) {
      const { token } = obj;
      fetch("/profiles/login", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            if (json.profile.isAdmin) {
              this.props.history.push("/AdminDashboard");
            } else if (json.profile.isTeacher) {
              this.props.history.push("/TeacherDashboard");
            } else {
              this.props.history.push("/Dashboard");
            }
          }
        });
    } else {
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
