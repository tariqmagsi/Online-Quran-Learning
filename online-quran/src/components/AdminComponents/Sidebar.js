import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getFromStorage, removeFromStorage } from "../../utils/storage";
import { withRouter } from "react-router-dom";
class Sidebar extends Component {
  onLogoutHandler = event => {
    const obj = getFromStorage(process.env.REACT_APP_KEY);

    if (obj && obj.token) {
      const { token } = obj;

      fetch("/profiles/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            removeFromStorage(process.env.REACT_APP_KEY);
            this.props.history.push("/Login");
          }
        });
    } else {
      this.props.history.push("/Login");
    }
  };
  render() {
    return (
      <div className="row shadow-4">
        <div className="sidebar bg-dark">
          <ul className="firstMenu">
            <NavLink to="/AdminDashboard" style={{ textDecoration: "none" }}>
              <li>
                <i className="fa fa-home" />
                <span className="ml-2 align-middle" style={{ color: "white" }}>
                  Dashboard
                </span>
              </li>
            </NavLink>
            <li className="profile">
              <i className="fa fa-user" />
              <span className="ml-2 align-middle">Profile</span>
              <ul className="sub-menu">
                <NavLink
                  to="/AdminProfileInfo"
                  style={{ textDecoration: "none" }}
                >
                  <li>Info</li>
                </NavLink>
                <NavLink
                  to="/AdminChangePassword"
                  style={{ textDecoration: "none" }}
                >
                  <li>Change Password</li>
                </NavLink>
                <NavLink
                  to="/AdminEditProfile"
                  style={{ textDecoration: "none" }}
                >
                  <li>Edit Profile</li>
                </NavLink>
                <li onClick={this.onLogoutHandler}>Logout</li>
              </ul>
            </li>
            <NavLink to="/AdminCourses" style={{ textDecoration: "none" }}>
              <li className="cour">
                <i className="fa fa-book" />
                <span className="ml-2 align-middle">Courses</span>
              </li>
            </NavLink>
            <NavLink to="/Enrollments" style={{ textDecoration: "none" }}>
              <li>
                <i className="fa fa-user-plus" />
                <span className="ml-2 align-middle">Enrollments</span>
              </li>
            </NavLink>
            <NavLink
              to="/StudentsAndTeachers"
              style={{ textDecoration: "none" }}
            >
              <li>
                <i className="fa fa-users" />
                <span className="ml-2 align-middle">Students</span>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    );
  }
}
export default withRouter(Sidebar);
