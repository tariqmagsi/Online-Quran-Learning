import React from "react";
import { withRouter } from "react-router-dom";

class Task extends React.Component {
  state = {
    name: "",
    courses: [],
    file: "",
    book: "",
    nameInput: "",
    emailInput: "",
    ageInput: "",
    contactInput: "",
    countryInput: "",
    genderInput: "",
    count: 0
  };

  whenChangeHandler0 = event => {
    this.setState({
      nameInput: event.target.value
    });
    setTimeout(() => this.searchStudents(), 500);
  };
  whenChangeHandler11 = event => {
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
      genderInput: event.target.value
    });
    setTimeout(() => this.searchStudents(), 500);
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
      "/searchenrolledcourselists/" +
        this.props.location.pathname.split("/")[
          this.props.location.pathname.split("/").length - 1
        ] +
        "?isEnrolled=true&&isTeacher=true&&name=" +
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
            courses: json.wishes
          });
        }
      });
  };
  fetchData = () => {
    fetch(
      "/enrolledcourselists/" +
        this.props.location.pathname.split("/")[
          this.props.location.pathname.split("/").length - 1
        ] +
        "?isEnrolled=true&&isTeacher=true"
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({ courses: json.wishes });
          this.state.courses.map((course, i) =>
            course.student !== null
              ? this.setState({ count: this.state.count + 1 })
              : this.state.count
          );
        }
      });
  };
  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { courses } = this.state;
    let str = "";
    let count = 0;
    courses.map((course, i) =>
      course.student !== null ? (count = count + 1) : count
    );
    if (courses.length === 0 || count === 0) {
      str = "Teachers Not Found";
    }

    let courseArray = courses.map((course, i) => {
      return course.student !== null ? (
        <tr key={course._id}>
          <td>{course.student.name}</td>
          <td>{course.student.email}</td>
          <td>{course.student.age}</td>
          <td>{course.student.country}</td>
          <td>{course.student.contact}</td>
          <td>{course.student.gender}</td>
        </tr>
      ) : (
        <React.Fragment key={course._id} />
      );
    });

    return (
      <div id="enroll">
        <div className="Homepage-heading">Teachers List</div>
        <div
          className="Homepage-onlineInfo"
          style={{ paddingBottom: "20px", color: "black" }}
        >
          <strong> NOTE: If Teachers not found then reload the page</strong>
        </div>
        <div
          className="Homepage-onlineInfo"
          style={{ paddingBottom: "20px", color: "green" }}
        >
          <strong> Total Number Of Teachers = {this.state.count}</strong>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="table table-dark table-hover bg-black text-white table-striped">
            <thead className="table table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Country</th>
                <th>Contact</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="name"
                    onChange={this.whenChangeHandler0}
                    value={this.state.nameInput}
                    className="form form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="email"
                    onChange={this.whenChangeHandler11}
                    value={this.state.emailInput}
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
                    placeholder="country"
                    onChange={this.whenChangeHandler3}
                    value={this.state.countryInput}
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
                    placeholder="gender"
                    onChange={this.whenChangeHandler5}
                    value={this.state.genderInput}
                    className="form form-control"
                  />
                </td>
              </tr>
              {courseArray}
            </tbody>
          </table>
        </div>
        <h3 style={{ fontWeight: "bold", color: "red" }}>{str}</h3>
      </div>
    );
  }
}

export default withRouter(Task);
