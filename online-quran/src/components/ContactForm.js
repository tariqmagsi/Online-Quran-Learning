import React, { Component } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../css/HeaderStyle.css";

const initialState = {
  name: "",
  email: "",
  msg: "",
  errorMail: "",
  errorName: "",
  errorMsg: "",
  success: ""
};
class ContactForm extends Component {
  state = initialState;

  whenChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  errorName = e => {
    for (var i = 0; i < 10; i++) {
      if (this.state.name.includes(i)) {
        this.setState({
          errorName: this.state.name === "" ? "" : "Name can't be a number"
        });
        return false;
      } else this.setState({ errorName: "" });
    }
    return true;
  };

  errorMail = e => {
    var i = 0;
    var flag = false;
    if (this.state.email.includes("@")) {
      while (this.state.email[i] !== "@") {
        i++;
      }
      while (i !== this.state.email.length - 1) {
        if (this.state.email[i] === ".") flag = true;
        i++;
      }
      if (
        flag === false ||
        this.state.email[this.state.email.length - 1] === "."
      ) {
        this.setState({
          errorMail: this.state.email === "" ? "" : "Email is not valid"
        });
        return false;
      } else this.setState({ errorMail: "" });
    } else if (!this.state.email.includes("@")) {
      this.setState({
        errorMail: this.state.email === "" ? "" : "Email is not valid"
      });
      return false;
    } else this.setState({ errorMail: "" });
    return true;
  };
  errorMsg = e => {
    if (this.state.msg.length < 10) {
      this.setState({
        errorMsg:
          this.state.msg === ""
            ? ""
            : "Message must be greater than or equal to 10 characters"
      });
      return false;
    } else this.setState({ errorMsg: "" });
    return true;
  };
  sendMessage = () => {
    fetch("/profiles/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        message: this.state.msg,
        email: this.state.email
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            success:
              "Message Sent Successfully! We will contact you soon. Thank You :)"
          });
          setTimeout(() => {
            this.setState(initialState);
          }, 5000);
        }
      });
  };
  submitHandler = e => {
    e.preventDefault();
    if (this.errorName() && this.errorMsg() && this.errorMail()) {
      this.sendMessage();
    }
  };
  render() {
    return (
      <div>
        <form
          className="signupForm bg-none shadow-4 pa4"
          onSubmit={this.submitHandler}
        >
          <input
            type="text"
            className="form-control"
            value={this.state.name}
            onChange={this.whenChangeHandler}
            onBlur={this.errorName}
            name="name"
            placeholder="Name*"
            required
          />
          <h6 style={{ color: "red", fontFamily: "arial" }}>
            {this.state.errorName}
          </h6>
          <input
            type="email"
            value={this.state.email}
            className="form-control myE"
            onChange={this.whenChangeHandler}
            onBlur={this.errorMail}
            name="email"
            placeholder="E-mail*"
            required
          />
          <h6 style={{ color: "red", fontFamily: "arial" }}>
            {this.state.errorMail}
          </h6>
          <textarea
            type="text"
            className="form-control"
            value={this.state.msg}
            onChange={this.whenChangeHandler}
            onBlur={this.errorMsg}
            rows="5"
            name="msg"
            placeholder="Type Your Message*"
            required
          ></textarea>
          <h6 style={{ color: "red", fontFamily: "arial" }}>
            {this.state.errorMsg}
          </h6>
          <h6 style={{ color: "black", fontFamily: "arial" }}>
            {this.state.success}
          </h6>
          <button className="site-btn  shadow-4">Send</button>
        </form>
      </div>
    );
  }
}

export default ContactForm;
