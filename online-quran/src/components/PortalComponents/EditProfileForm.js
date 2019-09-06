import React, { Component } from "react";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";
import countrylist from "../../country/countrylist.json";
import { withRouter } from "react-router-dom";
import { getFromStorage } from "../../utils/storage";

const initialState = {
  name: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
  CountryName: "",
  errorMail: "",
  errorName: "",
  errorContact: "",
  errorAge: "",
  signUpError: "",
  token: "",
  color: "red"
};
class EditProfileForm extends Component {
  state = initialState;
  componentDidMount() {
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
            this.setState({
              id: json.id,
              name: json.name,
              email: json.email,
              age: json.age,
              phone: json.contact,
              CountryName: json.country,
              gender: json.gender
            });
          }
        });
    }
  }
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
    if (this.errorName() && this.errorMail() && this.errorAge()) {
      const { name, email, phone, CountryName, age, gender } = this.state;
      const obj = getFromStorage(process.env.REACT_APP_KEY);

      if (obj && obj.token) {
        const { token } = obj;
        fetch("/profiles/myprofile", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name: name,
            email: email,
            contact: phone,
            country: CountryName,
            age: age,
            gender: gender
          })
        })
          .then(res => res.json())
          .then(json => {
            if (json.success) {
              this.setState({
                signUpError: "Updated Successfully",
                color: "green"
              });
              setTimeout(
                () =>
                  this.setState({
                    signUpError: "",
                    color: "red"
                  }),
                1000
              );
              this.componentDidMount();
            } else {
              this.setState({
                signUpError: "Updated Unsuccessfully",
                color: "red",
                token: json.token
              });
            }
          });
      }
    } else {
      this.setState({ color: "red", signUpError: "Updated Unsuccessfully" });
    }
  };

  render() {
    return (
      <form
        onSubmit={this.submitHandler}
        className="signupForm"
        style={{ padding: "20px" }}
      >
        <p style={{ color: "red", fontFamily: "arial" }}>
          {this.state.errorContact}
        </p>
        <p align="left" style={{ marginBottom: "5px", color: "black" }}>
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
        <p align="left" style={{ marginBottom: "5px", color: "black" }}>
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
        <p align="left" style={{ marginBottom: "5px", color: "black" }}>
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
        <p align="left" style={{ marginBottom: "5px", color: "black" }}>
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
        <p align="left" style={{ marginBottom: "5px", color: "black" }}>
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

        <p align="left" style={{ marginBottom: "5px", color: "black" }}>
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
        <p style={{ color: this.state.color, fontFamily: "arial" }}>
          <strong>{this.state.signUpError}</strong>
        </p>
        <br />
        <button
          className="btn btn-success"
          style={{
            marginTop: "20px",
            fontSize: "20px",
            width: "300px",
            height: "50px"
          }}
        >
          <strong>Update</strong>
        </button>
      </form>
    );
  }
}

export default withRouter(EditProfileForm);
