import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Modal from "./TeacherComponents/Dialog";

import NotFound from "./NotFound";

const initialState = {
  oldPass: "",
  pass: "",
  reEnterPass: "",
  errorOldPass: "",
  errorPass: "",
  errorPassEq: "",
  passMatch: "Password Not Matched",
  email: "",
  flag: false,
  flag1: false,
  color: "red"
};
class ChangePasswordForm extends Component {
  state = initialState;

  whenChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      errorPass: "",
      errorPassEq: ""
    });
  };
  errorPass = e => {
    if (this.state.pass !== undefined && this.state.reEnterPass !== undefined) {
      if (this.state.pass.length < 8) {
        this.setState({
          errorPass:
            this.state.pass === ""
              ? ""
              : "Password must be greater than or equal to 8 characters"
        });
        return false;
      } else this.setState({ errorPass: "" });

      if (this.state.pass !== this.state.reEnterPass) {
        this.setState({
          errorPassEq: this.state.pass === "" ? "" : "Passwords are not equal"
        });
        return false;
      } else
        this.setState({
          errorPassEq: this.state.pass === "" ? "" : "Passwords are matched"
        });
    } else this.setState({ errorPassEq: "" });

    return true;
  };

  submitHandler = e => {
    e.preventDefault();
    const arr = this.props.location.pathname.split("/");
    const length = this.props.location.pathname.split("/").length;
    const token = arr[length - 1];

    if (this.errorPass()) {
      const { pass } = this.state;
      fetch("/profiles/myprofile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ password: pass })
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              passMatch: "Password Changed Successfully",
              color: "green",
              errorPassEq: "",
              flag1: true
            });

            setTimeout(() => {
              this.setState(initialState);
              this.props.history.push("/Login");
            }, 1000);
          }
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.props.location.pathname !== "/ResetPassword" ? (
          <div
            className="loginForm"
            style={{
              paddingTop: "100px",
              background: "silver",
              height: "655px"
            }}
          >
            <form
              className="signupForm bg-none shadow-4 pa4"
              onSubmit={this.submitHandler}
            >
              <div>
                <h1
                  align="center"
                  style={{ marginBottom: "20px", color: "rgb(1, 100, 95)" }}
                >
                  <strong>Change Password</strong>
                </h1>
                <p
                  align="left"
                  style={{ marginBottom: "5px", color: "rgb(1, 100, 95)" }}
                >
                  <strong>New Password:</strong>
                </p>
                <input
                  type="password"
                  value={this.state.pass}
                  onChange={this.whenChangeHandler}
                  onSubmit={this.errorPass}
                  name="pass"
                  placeholder="New Password"
                  className="form-control"
                  required
                />
                <p style={{ color: "red", fontFamily: "arial" }}>
                  {this.state.errorPass}
                </p>
              </div>
              <div>
                <p
                  align="left"
                  style={{ marginBottom: "5px", color: "rgb(1, 100, 95)" }}
                >
                  <strong>Re-Enter New Password:</strong>
                </p>

                <input
                  type="password"
                  id="reEnterPass"
                  value={this.state.reEnterPass}
                  onChange={this.whenChangeHandler}
                  onSubmit={this.errorPass}
                  name="reEnterPass"
                  placeholder="Re-Enter New Password"
                  className="form-control"
                  required
                />
                <br />
                <p style={{ color: this.state.color, fontFamily: "arial" }}>
                  {this.state.errorPassEq}
                </p>
              </div>
              <div>
                <Modal flag={this.state.passMatch} color={this.state.color} />
              </div>
            </form>
          </div>
        ) : (
          <NotFound />
        )}
      </React.Fragment>
    );
  }
}
export default withRouter(ChangePasswordForm);
