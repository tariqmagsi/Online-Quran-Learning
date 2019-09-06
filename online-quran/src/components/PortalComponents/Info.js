import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ProfileInfo from "./ProfileInfo";
import { getFromStorage } from "../../utils/storage";
import { withRouter } from "react-router-dom";

class Info extends Component {
  state = { issAdmin: false };
  componentDidMount() {
    const obj = getFromStorage(process.env.REACT_APP_KEY);
    if (obj && obj.token) {
      const { token } = obj;
      fetch("/profiles/myprofile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            if (!json.isTeacher && json.isAdmin) {
              this.setState({ issAdmin: true });
            } else if (!json.isTeacher) {
              this.setState({ issAdmin: true });
            } else {
              this.props.history.push("/TeacherDashboard");
            }
          }
        });
    } else {
      this.props.history.push("/Login");
      alert("Please Login First");
    }
  }
  render() {
    return this.state.issAdmin ? (
      <div className="dash">
        <div className="course-text text-white ">
          <Sidebar />
          <Navbar />
          <ProfileInfo />
        </div>
      </div>
    ) : (
      <div />
    );
  }
}
export default withRouter(Info);
