import React, { Component } from "react";
import { getFromStorage } from "../../utils/storage";
import { withRouter } from "react-router-dom";
import Modal from "./Dialog";

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
  errorOldPass = () => {
    const obj = getFromStorage(process.env.REACT_APP_KEY);
    if (obj && obj.token) {
      const { token } = obj;
      fetch("/profiles/myprofile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({ email: json.email });
            const { oldPass, email } = this.state;
            fetch("/profiles/myprofile/checkOldPass", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                email: email,
                password: oldPass
              })
            })
              .then(res => res.json())
              .then(json => {
                if (json.success) {
                  this.setState({
                    errorOldPass: "",
                    flag: true
                  });
                } else {
                  this.setState({
                    errorOldPass:
                      this.state.oldPass === ""
                        ? ""
                        : "Old Password is incorrect",
                    flag: false
                  });
                }
              });
          }
        });
    }
  };

  submitHandler = e => {
    e.preventDefault();
    const { flag } = this.state;
    if (this.errorPass() && flag) {
      const obj = getFromStorage(process.env.REACT_APP_KEY);
      if (obj && obj.token) {
        const { token } = obj;
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
                this.props.history.push("/Dashboard");
              }, 1000);
            }
          });
      }
    }
  };

  render() {
    return (
      <form className="changePassForm" onSubmit={this.submitHandler}>
        <div>
          <p
            align="left"
            style={{ marginBottom: "5px", color: "rgb(1, 100, 95)" }}
          >
            <strong>Old Password:</strong>
          </p>
          <input
            type="password"
            value={this.state.oldPass}
            onChange={this.whenChangeHandler}
            onBlur={this.errorOldPass}
            name="oldPass"
            placeholder="Old Password"
            className="form-control"
            required
          />
          <p style={{ color: "red", fontFamily: "arial" }}>
            {this.state.errorOldPass}
          </p>
        </div>
        <div>
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
          <p style={{ color: "red", fontFamily: "arial" }}>
            {this.state.errorPassEq}
          </p>
        </div>

        <div>
          <Modal flag={this.state.passMatch} color={this.state.color} />
        </div>
      </form>
    );
  }
}
export default withRouter(ChangePasswordForm);
