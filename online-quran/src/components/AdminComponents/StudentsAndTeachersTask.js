import React from "react";
import StudentsAndTeachersList from "./StudentsAndTeachersList";

import { connect } from "react-redux";

class StudentsAndTeachersTask extends React.Component {
  state = {
    Students: [],
    Teachers: [],
    skipN: 0,
    limitN: 20,
    skipE: 0,
    limitE: 20,
    nameInput: "",
    emailInput: "",
    ageInput: "",
    contactInput: "",
    countryInput: "",
    genderInput: "",
    nameInputT: "",
    emailInputT: "",
    ageInputT: "",
    contactInputT: "",
    countryInputT: "",
    genderInputT: ""
  };
  whenChangeHandler = event => {
    this.setState({
      nameInput: event.target.value
    });
    setTimeout(() => this.searchStudents(), 500);
  };
  whenChangeHandler1 = event => {
    this.setState({
      emailInput: event.target.value
    });
    setTimeout(() => this.searchStudents(), 500);
  };
  whenChangeHandler2 = event => {
    this.setState({
      contactInput: event.target.value
    });
    setTimeout(() => this.searchStudents(), 500);
  };
  whenChangeHandler3 = event => {
    this.setState({
      countryInput: event.target.value
    });
    setTimeout(() => this.searchStudents(), 500);
  };
  whenChangeHandler4 = event => {
    this.setState({
      ageInput: event.target.value
    });
    setTimeout(() => this.searchStudents(), 500);
  };
  whenChangeHandler5 = event => {
    this.setState({
      nameInputT: event.target.value
    });
    setTimeout(() => this.searchTeachers(), 500);
  };
  whenChangeHandler6 = event => {
    this.setState({
      emailInputT: event.target.value
    });
    setTimeout(() => this.searchTeachers(), 500);
  };
  whenChangeHandler7 = event => {
    this.setState({
      contactInputT: event.target.value
    });
    setTimeout(() => this.searchTeachers(), 500);
  };
  whenChangeHandler8 = event => {
    this.setState({
      countryInputT: event.target.value
    });
    setTimeout(() => this.searchTeachers(), 500);
  };
  whenChangeHandler9 = event => {
    this.setState({
      ageInputT: event.target.value
    });
    setTimeout(() => this.searchTeachers(), 500);
  };
  whenChangeHandler10 = event => {
    this.setState({
      genderInput: event.target.value
    });
    setTimeout(() => this.searchStudents(), 500);
  };
  whenChangeHandler11 = event => {
    this.setState({
      genderInputT: event.target.value
    });
    setTimeout(() => this.searchTeachers(), 500);
  };
  searchStudents = () => {
    const {
      nameInput,
      emailInput,
      contactInput,
      countryInput,
      ageInput,
      genderInput
    } = this.state;
    fetch(
      "/searchprofiles?isTeacher=false&&name=" +
        nameInput +
        "&&email=" +
        emailInput +
        "&&contact=" +
        contactInput +
        "&&country=" +
        countryInput +
        "&&age=" +
        ageInput +
        "&&gender=" +
        genderInput
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            Students: json.profiles
          });
        }
      });
  };
  searchTeachers = () => {
    const {
      nameInputT,
      emailInputT,
      contactInputT,
      countryInputT,
      ageInputT,
      genderInputT
    } = this.state;
    fetch(
      "/searchprofiles?isTeacher=true&&name=" +
        nameInputT +
        "&&email=" +
        emailInputT +
        "&&contact=" +
        contactInputT +
        "&&country=" +
        countryInputT +
        "&&age=" +
        ageInputT +
        "&&gender=" +
        genderInputT
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            Teachers: json.profiles
          });
        }
      });
  };
  fetchDataE = skip => {
    fetch("/profiless?isTeacher=false&&limit=20&&skip=" + skip)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            Students: json.profiles
          });
        }
      });
  };
  fetchDataNE = skip => {
    fetch("/profiless?isTeacher=true&&limit=20&&skip=" + skip)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            Teachers: json.profiles
          });
        }
      });
  };
  nextNEn = () => {
    let skipN = this.state.skipN;

    document.getElementById("nextNEn").className = "btn btn-danger";
    document.getElementById("prevNEn").className = "btn btn-success";

    if (this.state.Teachers.length !== 0) {
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
    if (this.state.Students.length !== 0) {
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
  componentDidMount() {
    this.fetchDataE(0);
    this.fetchDataNE(0);
  }

  render() {
    let strEn = "",
      strNEn = "";

    if (this.state.Teachers.length === 0) {
      strEn = "Teachers Not Found";
    }
    if (this.state.Students.length === 0) {
      strNEn = "Students Not Found";
    }
    return (
      <div id="enroll container">
        <div style={{ marginTop: "40px" }}>
          <div className="Homepage-heading">Teachers</div>
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
                  <th>Convert</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      placeholder="name"
                      onChange={this.whenChangeHandler5}
                      value={this.state.nameInputT}
                      className="form form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="email"
                      onChange={this.whenChangeHandler6}
                      value={this.state.emailInputT}
                      className="form form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="contact"
                      onChange={this.whenChangeHandler7}
                      value={this.state.contactInputT}
                      className="form form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="country"
                      onChange={this.whenChangeHandler8}
                      value={this.state.countryInputT}
                      className="form form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="age"
                      onChange={this.whenChangeHandler9}
                      value={this.state.ageInputT}
                      className="form form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="gender"
                      onChange={this.whenChangeHandler11}
                      value={this.state.genderInputT}
                      className="form form-control"
                    />
                  </td>
                  <td />
                </tr>
                <StudentsAndTeachersList
                  confirm="Convert"
                  students={this.state.Teachers}
                  fetchDataT={this.fetchDataE}
                  fetchDataS={this.fetchDataNE}
                  check={true}
                />
              </tbody>
            </table>
            <h3 style={{ fontWeight: "bold", color: "red" }}>{strEn}</h3>
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
        <div className="Homepage-heading">Students</div>
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
                <th>Convert</th>
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
                    onChange={this.whenChangeHandler10}
                    value={this.state.genderInput}
                    className="form form-control"
                  />
                </td>
                <td />
              </tr>
              <StudentsAndTeachersList
                confirm="Convert"
                students={this.state.Students}
                fetchDataT={this.fetchDataE}
                fetchDataS={this.fetchDataNE}
                check={false}
              />
            </tbody>
          </table>
          <h3 style={{ fontWeight: "bold", color: "red" }}>{strNEn}</h3>
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
}))(StudentsAndTeachersTask);
