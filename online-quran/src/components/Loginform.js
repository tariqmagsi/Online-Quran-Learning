import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getFromStorage, setInStorage } from "../utils/storage";
import Email from "./Email";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../css/HeaderStyle.css";
import "../css/LoginStyle.css";

const initialState = {
  email: "",
  pass: "",
  errorMsg: "",
  token: "",
  signInError: "",
  isModelShow: false
};
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  whenChangeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value, errorMsg: "" });
  };

  submitHandler = event => {
    event.preventDefault();
    const obj = getFromStorage(process.env.REACT_APP_KEY);

    if (!(obj && obj.token)) {
      const { email, pass } = this.state;

      fetch("/profiles/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: pass
        })
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            setInStorage(process.env.REACT_APP_KEY, { token: json.token });
            this.setState({
              token: json.token
            });
            if (json.profile.isAdmin) {
              this.props.history.push("/AdminDashboard");
            } else if (json.profile.isTeacher) {
              this.props.history.push("/TeacherDashboard");
            } else {
              this.props.history.push("/Dashboard");
            }
          } else {
            this.setState({ errorMsg: json.error });
          }
        });
    } else {
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
            this.setState({
              token: json.token
            });
            if (json.isAdmin) {
              this.props.history.push("/AdminDashboard");
              alert("User is already logged in.In this browser");
            } else if (json.isTeacher) {
              this.props.history.push("/TeacherDashboard");
              alert("User is already logged in.In this browser");
            } else {
              this.props.history.push("/Dashboard");
              alert("User is already logged in.In this browser");
            }
          } else {
            this.setState({ errorMsg: json.error });
          }
        });
    }
  };
  modalClose = () => {
    this.setState({ isModelShow: false });
  };
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
            this.setState({
              token
            });
            if (json.profile.isAdmin) {
              this.props.history.push("/AdminDashboard");
            } else if (json.profile.isTeacher) {
              this.props.history.push("/TeacherDashboard");
            } else {
              this.props.history.push("/Dashboard");
            }
          }
        });
    }
  }

  render() {
    return (
      <div className="loginForm" style={{ paddingTop: "100px" }}>
        <div className="course-text text-white">
          <NavLink exact to="/" style={{ textDecoration: "none" }}>
            <h1
              className="heading-course"
              style={{
                marginTop: "0px",
                paddingTop: "0px",
                fontSize: "60px"
              }}
              id="heading"
            >
              Ta'alam AlQuran
            </h1>
          </NavLink>
        </div>
        <form
          className="signupForm bg-none shadow-4 pa4"
          onSubmit={this.submitHandler}
        >
          <div className="course-text text-white">
            <h1 className="heading-course" style={{ marginTop: "0px" }}>
              Login
            </h1>
            <p
              className="para-course"
              style={{
                marginBottom: "200px",
                borderBottom: "1px solid silver",
                paddingBottom: "50px"
              }}
            >
              Login using mail and password
            </p>
          </div>
          <div style={{ marginBottom: "120px" }}>
            <p align="left" style={{ marginBottom: "5px" }}>
              Email:
            </p>
            <input
              type="email"
              value={this.state.email}
              className="form-control myE"
              onChange={this.whenChangeHandler}
              name="email"
              placeholder="E-mail*"
              required
            />
          </div>

          <div>
            <p align="left" style={{ marginBottom: "5px" }}>
              Password:
            </p>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={this.state.pass}
              onChange={this.whenChangeHandler}
              name="pass"
              required
            />
          </div>
          <h6 style={{ color: "red", fontFamily: "arial" }}>
            {this.state.errorMsg}
          </h6>
          <button className="site-btn  shadow-4">Login</button>

          <br />
          <br />
          <br />
          <p
            style={{ cursor: "pointer" }}
            className="forgot"
            onClick={() => this.setState({ isModelShow: true })}
          >
            Forgot Password?
          </p>
        </form>
        <Email show={this.state.isModelShow} onHide={this.modalClose} />
      </div>
    );
  }
}

export default withRouter(LoginForm);
