import React from "react";
import StudentsList from "./StudentsList";

import { connect } from "react-redux";

const initialState = {
  enrolledStudents: [],
  notEnrolledStudents: [],
  skipE: 0,
  skipN: 0,
  limitE: 20,
  limitN: 20,
  nameInput: "",
  emailInput: "",
  ageInput: "",
  contactInput: "",
  countryInput: "",
  feesInput: "",
  genderInput: "",
  cnameInput: "",

  nameInputN: "",
  emailInputN: "",
  ageInputN: "",
  contactInputN: "",
  countryInputN: "",
  feesInputN: "",
  genderInputN: "",
  cnameInputN: ""
};
class TeachersTask extends React.Component {
  state = initialState;
  whenChangeHandler = event => {
    this.setState({
      nameInput: event.target.value
    });
    setTimeout(() => this.searchE(), 500);
  };
  whenChangeHandler1 = event => {
    this.setState({
      emailInput: event.target.value
    });
    setTimeout(() => this.searchE(), 500);
  };
  whenChangeHandler2 = event => {
    this.setState({
      contactInput: event.target.value
    });
    setTimeout(() => this.searchE(), 500);
  };
  whenChangeHandler3 = event => {
    this.setState({
      countryInput: event.target.value
    });
    setTimeout(() => this.searchE(), 500);
  };
  whenChangeHandler4 = event => {
    this.setState({
      ageInput: event.target.value
    });
    setTimeout(() => this.searchE(), 500);
  };
  whenChangeHandler5 = event => {
    this.setState({
      genderInput: event.target.value
    });
    setTimeout(() => this.searchE(), 500);
  };
  whenChangeHandler6 = event => {
    this.setState({
      cnameInput: event.target.value
    });
    setTimeout(() => this.searchE(), 500);
  };
  whenChangeHandler7 = event => {
    this.setState({
      feesInput: event.target.value
    });
    setTimeout(() => this.searchE(), 500);
  };
  whenChangeHandler8 = event => {
    this.setState({
      nameInputN: event.target.value
    });
    setTimeout(() => this.searchNE(), 500);
  };
  whenChangeHandler9 = event => {
    this.setState({
      emailInputN: event.target.value
    });
    setTimeout(() => this.searchNE(), 500);
  };
  whenChangeHandler10 = event => {
    this.setState({
      contactInputN: event.target.value
    });
    setTimeout(() => this.searchNE(), 500);
  };
  whenChangeHandler11 = event => {
    this.setState({
      countryInputN: event.target.value
    });
    setTimeout(() => this.searchNE(), 500);
  };
  whenChangeHandler12 = event => {
    this.setState({
      ageInputN: event.target.value
    });
    setTimeout(() => this.searchNE(), 500);
  };
  whenChangeHandler13 = event => {
    this.setState({
      genderInputN: event.target.value
    });
    setTimeout(() => this.searchNE(), 500);
  };
  whenChangeHandler14 = event => {
    this.setState({
      cnameInputN: event.target.value
    });
    setTimeout(() => this.searchNE(), 500);
  };
  whenChangeHandler15 = event => {
    this.setState({
      feesInputN: event.target.value
    });
    setTimeout(() => this.searchNE(), 500);
  };

  searchE = () => {
    const {
      nameInput,
      emailInput,
      ageInput,
      contactInput,
      countryInput,
      feesInput,
      cnameInput,
      genderInput
    } = this.state;
    fetch(
      "/searchwishlist?isEnrolledByStudent=true&&isEnrolled=true&&isTeacher=true&&name=" +
        nameInput +
        "&&email=" +
        emailInput +
        "&&contact=" +
        contactInput +
        "&&country=" +
        countryInput +
        "&&age=" +
        ageInput +
        "&&Cname=" +
        cnameInput +
        "&&fees=" +
        feesInput +
        "&&gender=" +
        genderInput
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            enrolledStudents: json.wishes
          });
        }
      });
  };
  searchNE = () => {
    const {
      nameInputN,
      emailInputN,
      ageInputN,
      contactInputN,
      countryInputN,
      feesInputN,
      cnameInputN,
      genderInputN
    } = this.state;
    fetch(
      "/searchwishlist?isEnrolledByStudent=true&&isEnrolled=false&&isTeacher=true&&name=" +
        nameInputN +
        "&&email=" +
        emailInputN +
        "&&contact=" +
        contactInputN +
        "&&country=" +
        countryInputN +
        "&&age=" +
        ageInputN +
        "&&Cname=" +
        cnameInputN +
        "&&fees=" +
        feesInputN +
        "&&gender=" +
        genderInputN
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            notEnrolledStudents: json.wishes
          });
        }
      });
  };

  fetchDataE = skip => {
    fetch(
      "/wishlists?isEnrolledByStudent=true&&isEnrolled=true&&isTeacher=true&&limit=20&&skip=" +
        skip
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            enrolledStudents: json.wishes
          });
        }
      });
  };
  fetchDataNE = skip => {
    fetch(
      "/wishlists?isEnrolledByStudent=true&&isEnrolled=false&&isTeacher=true&&limit=20&&skip=" +
        skip
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            notEnrolledStudents: json.wishes
          });
        }
      });
  };
  nextNEn = () => {
    let skipN = this.state.skipN;

    document.getElementById("nextNEn").className = "btn btn-danger";
    document.getElementById("prevNEn").className = "btn btn-success";

    if (this.state.notEnrolledStudents.length !== 0) {
      this.setState({
        skipN: this.state.skipN + 20,
        limitN: this.state.limitN + 20
      });
      this.fetchDataNE(skipN + 20);
    }
  };
  prevNEn = () => {
    let skipN = this.state.skipN;
    document.getElementById("nextNEn").className = "btn btn-success";
    document.getElementById("prevNEn").className = "btn btn-danger";
    if (skipN !== 0) {
      this.setState({
        skipN: this.state.skipN - 20,
        limitN: this.state.limitN - 20
      });
      this.fetchDataNE(skipN - 20);
    }
  };
  nextEn = () => {
    let skipE = this.state.skipE;
    document.getElementById("nextEn").className = "btn btn-danger";
    document.getElementById("prevEn").className = "btn btn-success";
    if (this.state.enrolledStudents.length !== 0) {
      this.setState({
        skipE: this.state.skipE + 20,
        limitE: this.state.limitE + 20
      });
      this.fetchDataE(skipE + 20);
    }
  };
  prevEn = () => {
    let skipE = this.state.skipE;
    document.getElementById("nextEn").className = "btn btn-success";
    document.getElementById("prevEn").className = "btn btn-danger";
    if (skipE !== 0) {
      this.setState({
        skipE: this.state.skipE - 20,
        limitE: this.state.limitE - 20
      });
      this.fetchDataE(skipE - 20);
    }
  };
  render() {
    let strEn = "",
      strNEn = "";
    let enrolled = [],
      notEnrolled = [];
    enrolled = this.state.enrolledStudents.map(rec => {
      return rec.course && rec.student;
    });
    notEnrolled = this.state.notEnrolledStudents.map(rec => {
      return rec.course && rec.student;
    });
    notEnrolled = notEnrolled.every(rec => !rec);
    enrolled = enrolled.every(rec => !rec);

    if (this.state.enrolledStudents.length === 0 || enrolled) {
      strEn = "Enrolled Students Not Found";
    }
    if (this.state.notEnrolledStudents.length === 0 || notEnrolled) {
      strNEn = "Not Enrolled Students Not Found";
    }
    return (
      <div id="enroll container">
        <div style={{ marginTop: "40px" }}>
          <div className="Homepage-heading">
            Pending Enrollment Teachers With Courses List
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="table table-dark table-hover bg-black text-white table-striped">
              <thead className="table table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Country</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Courses</th>
                  <th>Fees</th>
                  <th>Not Confirmed</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      placeholder="name"
                      onChange={this.whenChangeHandler8}
                      value={this.state.nameInputN}
                      className="form form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="email"
                      onChange={this.whenChangeHandler9}
                      value={this.state.emailInputN}
                      className="form form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="contact"
                      onChange={this.whenChangeHandler10}
                      value={this.state.contactInputN}
                      className="form form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="country"
                      onChange={this.whenChangeHandler11}
                      value={this.state.countryInputN}
                      className="form form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="age"
                      onChange={this.whenChangeHandler12}
                      value={this.state.ageInputN}
                      className="form form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="gender"
                      onChange={this.whenChangeHandler13}
                      value={this.state.genderInputN}
                      className="form form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="course"
                      onChange={this.whenChangeHandler14}
                      value={this.state.cnameInputN}
                      className="form form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="fees"
                      onChange={this.whenChangeHandler15}
                      value={this.state.feesInputN}
                      className="form form-control"
                    />
                  </td>

                  <td />
                </tr>
                <StudentsList
                  students={this.state.notEnrolledStudents}
                  fetchDataE={this.fetchDataE}
                  fetchDataNE={this.fetchDataNE}
                  check={true}
                />
              </tbody>
            </table>
            <h3 style={{ fontWeight: "bold", color: "red" }}>{strNEn}</h3>
          </div>
        </div>
        <br />
        <div>
          <button
            id="prevNEn"
            className="btn btn-success"
            style={{ marginRight: "50px" }}
            onClick={this.prevNEn}
          >
            <i className="fa fa-arrow-left" style={{ fontSize: "24px" }} />
          </button>
          <button className="btn btn-primary">
            <strong>
              {this.state.skipN} - {this.state.limitN}
            </strong>
          </button>
          <button
            id="nextNEn"
            className="btn btn-success"
            style={{ marginLeft: "50px" }}
            onClick={this.nextNEn}
          >
            <i className="fa fa-arrow-right" style={{ fontSize: "24px" }} />
          </button>
        </div>
        <div className="Homepage-heading">
          Enrollment Confirmed Teachers With Courses List
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="table table-dark table-hover bg-black text-white table-striped">
            <thead className="table table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Country</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Courses</th>
                <th>Fees</th>
                <th>Confirmed</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="name"
                    onChange={this.whenChangeHandler}
                    value={this.state.nameInput}
                    className="form form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="email"
                    onChange={this.whenChangeHandler1}
                    value={this.state.emailInput}
                    className="form form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="contact"
                    onChange={this.whenChangeHandler2}
                    value={this.state.contactInput}
                    className="form form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="country"
                    onChange={this.whenChangeHandler3}
                    value={this.state.countryInput}
                    className="form form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="age"
                    onChange={this.whenChangeHandler4}
                    value={this.state.ageInput}
                    className="form form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="gender"
                    onChange={this.whenChangeHandler5}
                    value={this.state.genderInput}
                    className="form form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="course"
                    onChange={this.whenChangeHandler6}
                    value={this.state.cnameInput}
                    className="form form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="fees"
                    onChange={this.whenChangeHandler7}
                    value={this.state.feesInput}
                    className="form form-control"
                  />
                </td>

                <td />
              </tr>
              <StudentsList
                students={this.state.enrolledStudents}
                fetchDataE={this.fetchDataE}
                fetchDataNE={this.fetchDataNE}
                check={false}
              />
            </tbody>
          </table>
          <h3 style={{ fontWeight: "bold", color: "red" }}>{strEn}</h3>
        </div>
        <br />
        <div>
          <button
            id="prevEn"
            className="btn btn-success"
            style={{ marginRight: "50px" }}
            onClick={this.prevEn}
          >
            <i className="fa fa-arrow-left" style={{ fontSize: "24px" }} />
          </button>
          <button className="btn btn-primary">
            <strong>
              {this.state.skipE} - {this.state.limitE}
            </strong>
          </button>
          <button
            id="nextEn"
            className="btn btn-success"
            style={{ marginLeft: "50px" }}
            onClick={this.nextEn}
          >
            <i className="fa fa-arrow-right" style={{ fontSize: "24px" }} />
          </button>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  tasks: state.tasks
}))(TeachersTask);
