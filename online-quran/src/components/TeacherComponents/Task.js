import React from "react";
import List from "./List";
import { withRouter } from "react-router-dom";
import { getFromStorage } from "../../utils/storage";
import { deleteTaskAction, createTaskAction } from "../../actions/actions";
import { connect } from "react-redux";

class Task extends React.Component {
  state = {
    courses: [],
    coursesOfUser: [],
    skip: 0,
    nameInput: "",
    priceInput: "",
    limit: 20
  };
  whenChangeHandler = event => {
    this.setState({ priceInput: event.target.value });
    setTimeout(() => this.searchCourses(), 500);
  };
  whenChangeHandler1 = event => {
    this.setState({ nameInput: event.target.value });
    setTimeout(() => this.searchCourses(), 500);
  };
  saveHandler = e => {
    const obj = getFromStorage(process.env.REACT_APP_KEY);
    if (obj && obj.token) {
      const { token } = obj;

      this.props.tasks.map(rec =>
        fetch("/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name: rec.name
          })
        })
          .then(res => res.json())
          .then(json => {
            if (json.success) {
              fetch("/wishlist", {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
              })
                .then(res => res.json())
                .then(json => {
                  if (json.success) {
                    json.wishes.wishlist.map(rec =>
                      this.toEnrolled(rec.course)
                    );
                  }
                });
            }
          })
      );

      this.props.tasks.map(rec => this.deleteTask(rec.id));
    }
  };
  searchCourses = () => {
    const obj = getFromStorage(process.env.REACT_APP_KEY);
    if (obj && obj.token) {
      const { token } = obj;
      const { nameInput, priceInput } = this.state;
      fetch("/searchcourse?name=" + nameInput + "&&price=" + priceInput)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({ courses: json.courses });
            fetch("/wishlist", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              }
            })
              .then(res => res.json())
              .then(json => {
                if (json.success) {
                  json.wishes.wishlist.map(rec => this.toEnrolled(rec.course));
                }
              });
          }
        });
    }
  };
  fetchData = skip => {
    const obj = getFromStorage(process.env.REACT_APP_KEY);
    if (obj && obj.token) {
      const { token } = obj;
      fetch("/courses?skip=" + skip + "&&limit=20")
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({ courses: json.courses });
            fetch("/wishlist", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              }
            })
              .then(res => res.json())
              .then(json => {
                if (json.success) {
                  json.wishes.wishlist.map(rec => this.toEnrolled(rec.course));
                }
              });
          }
        });
    }
  };
  componentDidMount() {
    this.fetchData(0);
  }
  componentWillUnmount() {
    this.props.tasks.forEach(t => this.deleteTask(t.id));
  }
  toEnrolled = id => {
    const btn = document.getElementById(id);
    if (btn !== null) {
      btn.innerHTML = "Enrolled";

      btn.className = "btn btn-success";
    }
  };

  addToDoTask = (id, value, value1) => {
    const btn = document.getElementById(id);

    if (btn.innerHTML !== "Enrolled") {
      btn.innerHTML = "Enrolled";

      btn.className = "btn btn-success";
      this.props.dispatch(createTaskAction(id, value, value1));
    } else {
      alert("You are already enrolled in this course");
    }
  };
  deleteTask = task_id => {
    const btn = document.getElementById(task_id);
    btn.innerHTML = "Enroll";

    btn.className = "btn btn-danger";

    this.props.dispatch(deleteTaskAction(task_id));
  };
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
    let courseArray = courses.map((course, i) => {
      return (
        <tr key={course._id}>
          <td>{course.name}</td>
          <td>{course.price}</td>
          <td>
            <button
              id={course._id}
              className="btn btn-danger"
              style={{
                fontSize: "20px",
                width: "100px",
                fontWeight: "bold"
              }}
              onClick={() => {
                this.addToDoTask(course._id, course.name, course.price);
              }}
            >
              <strong> Enroll</strong>
            </button>
          </td>
        </tr>
      );
    });
    if (courseArray.length === 0) {
      str = "Courses Not Available";
    }
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
              <th>Fees</th>
              <th>Enroll</th>
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
              <td>
                <input
                  id="price"
                  type="text"
                  value={this.state.priceInput}
                  style={{ color: "black" }}
                  className="form form-control"
                  placeholder="Search By Fees"
                  onChange={this.whenChangeHandler}
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
        <div style={{ marginTop: "40px" }}>
          <div className="Homepage-heading">Selected Course List</div>
          <List items={this.props.tasks} delete={this.deleteTask} />
        </div>
        <button
          className="btn btn-success"
          style={{
            marginTop: "20px",
            fontSize: "20px",
            width: "300px",
            height: "50px"
          }}
          onClick={this.saveHandler}
        >
          <strong>Save</strong>
        </button>
      </div>
    );
  }
}

export default connect(state => ({
  tasks: state.tasks
}))(withRouter(Task));
