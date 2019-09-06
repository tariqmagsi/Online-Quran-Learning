import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/header/logo.png";
import settings from "../../images/header/setttings.png";
import { getFromStorage, removeFromStorage } from "../../utils/storage";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  state = { token: "" };

  onLogout = event => {
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
      <nav className="navbar p-0 fixed-top navbarBg">
        <div className="nav-content">
          <NavLink to="/TeacherDashboard" className="navbar-brand px-1">
            <img
              src={logo}
              alt="logo"
              width="60"
              height="60"
              style={{ marginTop: "14px" }}
            />
          </NavLink>
          <div
            className="headingMain"
            style={{
              fontSize: "3.5vw",
              color: "#01645f",
              fontWeight: "1000"
            }}
          >
            TA'ALAM ALQURAN
          </div>
          <div className="right-links d-flex align-items-center float-right mr-4">
            <span className="sidebarInfoCont">
              <span style={{ cursor: "pointer" }}>
                <div className="d-line dropdown">
                  <button
                    className="signoutNav"
                    style={{ border: "none", background: "none" }}
                    onClick={this.onLogout}
                  >
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <img src={settings} alt="logout" />
                          </td>
                          <th>Logout</th>
                        </tr>
                      </tbody>
                    </table>
                  </button>
                </div>
              </span>
            </span>
          </div>
        </div>
      </nav>
    );
  }
}
export default withRouter(Navbar);
