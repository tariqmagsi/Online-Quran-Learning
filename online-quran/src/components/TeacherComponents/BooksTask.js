import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { getFromStorage } from "../../utils/storage";

class Task extends React.Component {
  state = {
    courses: [],
    coursesOfUser: [],
    skip: 0,
    nameInput: "",
    limit: 20
  };
  whenChangeHandler1 = event => {
    this.setState({ nameInput: event.target.value });
    setTimeout(() => this.searchCourses(), 500);
  };

  searchCourses = () => {
    const obj = getFromStorage(process.env.REACT_APP_KEY);
    if (obj && obj.token) {
      const { token } = obj;
      const { nameInput } = this.state;
      fetch(
        "/searchenrolledwishlists?name=" +
          nameInput +
          "&&isEnrolled=true&&isEnrolledByStudent=true&&isTeacher=true",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({ courses: json.wishes });
          }
        });
    }
  };
  fetchData = skip => {
    const obj = getFromStorage(process.env.REACT_APP_KEY);
    if (obj && obj.token) {
      const { token } = obj;
      fetch(
        "/enrolledwishlists?skip=" +
          skip +
          "&&limit=20&&isEnrolled=true&&isEnrolledByStudent=true&&isTeacher=true",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({ courses: json.wishes });
          }
        });
    }
  };
  componentDidMount() {
    this.fetchData(0);
  }

  next = () => {
    let skip = this.state.skip;
    document.getElementById("next").className = "btn btn-danger";
    document.getElementById("prev").className = "btn btn-success";
    if (this.state.courses.length !== 0) {
      this.setState({
        skip: this.state.skip + 20,
        limit: this.state.limit + 20
      });

      this.fetchData(skip + 20);
    }
  };
  prev = () => {
    let skip = this.state.skip;
    document.getElementById("next").className = "btn btn-success";
    document.getElementById("prev").className = "btn btn-danger";
    if (skip !== 0) {
      this.setState({
        skip: this.state.skip - 20,
        limit: this.state.limit - 20
      });

      this.fetchData(skip - 20);
    }
  };
  render() {
    const { courses } = this.state;
    let str = "";
    let course = [];
    course = courses.map(rec => {
      return rec.course;
    });
    course = course.every(rec => !rec);

    if (courses.length === 0 || course) {
      str = "Courses Not Found";
    }
    let courseArray = courses.map((course, i) => {
      return course.course !== null ? (
        <tr key={course._id}>
          <td>{course.course.name}</td>
          <td>
            <NavLink to={`/TeacherBook/${course.course._id}`}>
              <button
                id={course._id}
                className="btn btn-danger"
                style={{
                  fontSize: "20px",
                  width: "100px",
                  fontWeight: "bold"
                }}
              >
                <strong> View</strong>
              </button>
            </NavLink>
            <NavLink to={`/TeacherAnnouncement/${course.course._id}`}>
              <button
                id={course._id}
                className="btn btn-success"
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginLeft: "10px"
                }}
              >
                <strong>
                  <i className="fa fa-bullhorn" />
                </strong>
              </button>
            </NavLink>
            <NavLink to={`/StudentsList/${course.course._id}`}>
              <button
                id={course._id}
                className="btn btn-warning"
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginLeft: "10px"
                }}
              >
                <strong>
                  <i className="fa fa-users" />
                </strong>
              </button>
            </NavLink>
          </td>
        </tr>
      ) : (
        <React.Fragment key={course._id} />
      );
    });

    return (
      <div id="enroll">
        <div className="Homepage-heading">Course List</div>
        <div
          className="Homepage-onlineInfo"
          style={{ paddingBottom: "20px", color: "black" }}
        >
          <strong> NOTE: If Courses not found then reload the page</strong>
        </div>
        <table className="table table-dark table-hover bg-black text-white table-striped">
          <thead className="table table-dark">
            <tr>
              <th>Course</th>

              <th>View Course And Announcement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  id="name"
                  type="text"
                  value={this.state.nameInput}
                  className="form form-control"
                  placeholder="Search By Course"
                  style={{ color: "black" }}
                  onChange={this.whenChangeHandler1}
                />
              </td>
              <td />
            </tr>
            {courseArray}
          </tbody>
        </table>
        <h3 style={{ fontWeight: "bold", color: "red" }}>{str}</h3>
        <div>
          <button
            id="prev"
            className="btn btn-success"
            style={{ marginRight: "50px" }}
            onClick={this.prev}
          >
            <i className="fa fa-arrow-left" style={{ fontSize: "24px" }} />
          </button>
          <button className="btn btn-primary">
            <strong>
              {this.state.skip} - {this.state.limit}
            </strong>
          </button>
          <button
            id="next"
            className="btn btn-success"
            style={{ marginLeft: "50px" }}
            onClick={this.next}
          >
            <i className="fa fa-arrow-right" style={{ fontSize: "24px" }} />
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Task);
