import React, { Component } from "react";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";
import countrylist from "../country/countrylist.json";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { setInStorage } from "../utils/storage";

const initialState = {
  name: "",
  email: "",
  pass: "",
  phone: "",
  age: "",
  gender: "",
  CountryName: "",
  reEnterPass: "",
  errorMail: "",
  errorName: "",
  errorPass: "",
  errorPassEq: "",
  errorContact: "",
  errorAge: "",
  signUpError: "",
  token: "",
  passMatch: "",
  isLoading: true
};
class HomeBody extends Component {
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
  errorAge = e => {
    if (this.state.age < 2) {
      this.setState({
        errorAge:
          this.state.age === "" ? "" : "Age less than 2 are not eligible"
      });
      return false;
    } else if (isNaN(this.state.age)) {
      this.setState({
        errorAge: this.state.age === "" ? "" : "Age must be a number"
      });
      return false;
    } else {
      this.setState({
        errorAge: ""
      });
    }
    return true;
  };

  errorPass = e => {
    if (this.state.pass.length < 8) {
      this.setState({
        errorPass:
          this.state.pass === ""
            ? ""
            : "Password must be greater than or equal to 8 characters"
      });
      return false;
    } else this.setState({ errorPass: "" });
    if (this.state.reEnterPass !== "") {
      if (this.state.pass !== this.state.reEnterPass) {
        this.setState({
          errorPassEq: this.state.pass === "" ? "" : "Passwords are not equal"
        });
        return false;
      } else
        this.setState({
          errorPassEq: "",
          passMatch: this.state.pass === "" ? "" : "Passwords are matched"
        });
    } else this.setState({ errorPassEq: "" });
    return true;
  };

  errorContact = () => {
    if (this.state.contact.includes("+")) {
      this.setState({
        errorContact:
          this.state.contact === "" ? "" : "'-' must not be included"
      });
    } else this.setState({ errorContact: "" });
    if (this.state.contact.length < 8) {
      this.setState({
        errorContact:
          this.state.contact === ""
            ? ""
            : "Mobile number must be greater than 8"
      });
      return false;
    } else this.setState({ errorContact: "" });
    return true;
  };

  submitHandler = e => {
    e.preventDefault();
    if (
      this.errorName() &&
      this.errorPass() &&
      this.errorMail() &&
      this.errorAge()
    ) {
      const { name, email, pass, phone, CountryName, age, gender } = this.state;
      fetch("/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: pass,
          contact: phone,
          country: CountryName,
          age: age,
          gender: gender
        })
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            setInStorage(process.env.REACT_APP_KEY, { token: json.token });
            this.setState({
              signUpError: json.message
            });
            this.setState(initialState);
            this.props.history.push("/Dashboard");
          } else {
            this.setState({
              signUpError: json.message,
              token: json.token
            });
          }
        });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="hero-text text-white">
          <h1>Ta'alam AlQuran</h1>
          <h2 id="register">Learn Online Quran From Best Teachers</h2>
        </div>

        <form onSubmit={this.submitHandler} className="signupForm">
          <p style={{ color: "red", fontFamily: "arial", fontWeight: "bold" }}>
            {this.state.signUpError}
          </p>
          <p style={{ color: "red", fontFamily: "arial" }}>
            {this.state.errorContact}
          </p>
          <p align="left" style={{ marginBottom: "5px" }}>
            <strong>Name:</strong>
          </p>
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
          <p style={{ color: "red", fontFamily: "arial" }}>
            {this.state.errorName}
          </p>
          <p align="left" style={{ marginBottom: "5px" }}>
            <strong>Email:</strong>
          </p>
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

          <p style={{ color: "red", fontFamily: "arial" }}>
            {this.state.errorMail}
          </p>
          <p align="left" style={{ marginBottom: "5px" }}>
            <strong>Select Country:</strong>
          </p>
          <select
            className="form-control"
            value={this.state.CountryName}
            onChange={this.whenChangeHandler}
            name="CountryName"
            required
          >
            <option value="" default hidden>
              Select Your Country*
            </option>
            {countrylist.map((country, i) => (
              <option
                key={countrylist[i].countryCode}
                value={countrylist[i].countryName}
              >
                {countrylist[i].countryName}
              </option>
            ))}
          </select>
          <p align="left" style={{ marginBottom: "5px" }}>
            <strong>Age:</strong>
          </p>
          <input
            type="text"
            value={this.state.age}
            className="form-control myE"
            onChange={this.whenChangeHandler}
            onBlur={this.errorAge}
            name="age"
            placeholder="Age*"
            required
          />

          <p style={{ color: "red", fontFamily: "arial" }}>
            {this.state.errorAge}
          </p>
          <p align="left" style={{ marginBottom: "5px" }}>
            <strong>Mobile Number:</strong>
          </p>
          <ReactPhoneInput
            inputExtraProps={{
              name: "phone",
              required: true
            }}
            className="ph"
            value={this.state.phone}
            onChange={phone => this.setState({ phone })}
            placeholder="Mobile Number*"
          />

          <p align="left" style={{ marginBottom: "5px" }}>
            <strong>Gender:</strong>
          </p>
          <select
            className="form-control"
            value={this.state.gender}
            onChange={this.whenChangeHandler}
            name="gender"
            required
          >
            <option style={{ color: "grey" }} value="">
              Select Gender*
            </option>
            <option style={{ color: "grey" }} value="male">
              Male
            </option>
            <option style={{ color: "grey" }} value="female">
              Female
            </option>
            <option style={{ color: "grey" }} value="other">
              Other
            </option>
          </select>
          <p align="left" style={{ marginBottom: "5px" }}>
            <strong>Password:</strong>
          </p>
          <input
            type="password"
            className="form-control"
            value={this.state.pass}
            placeholder="Password*"
            onChange={this.whenChangeHandler}
            onSubmit={this.errorPass}
            name="pass"
            required
          />
          <p style={{ color: "red", fontFamily: "arial" }}>
            {this.state.errorPass}
          </p>
          <p align="left" style={{ marginBottom: "5px" }}>
            <strong>Re-Enter Password:</strong>
          </p>
          <input
            type="password"
            value={this.state.reEnterPass}
            className="form-control"
            name="reEnterPass"
            onChange={this.whenChangeHandler}
            onSubmit={this.errorPass}
            placeholder="Re-Enter Password*"
            required
          />
          <p style={{ color: "green", fontFamily: "arial" }}>
            {this.state.passMatch}
          </p>
          <p style={{ color: "red", fontFamily: "arial" }}>
            {this.state.errorPassEq}
          </p>
          <p style={{ color: "red", fontFamily: "arial", fontWeight: "bold" }}>
            {this.state.signUpError}
          </p>
          <button className="site-btn">Sign Up Now</button>
          <NavLink to="/Login">
            <button className="site-btn next">Login</button>
          </NavLink>
        </form>
      </div>
    );
  }
}

export default withRouter(HomeBody);
