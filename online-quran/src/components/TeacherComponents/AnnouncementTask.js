import React from "react";
import { withRouter } from "react-router-dom";

class Task extends React.Component {
  state = {
    name: "",
    courses: [],
    file: "",
    isView: false,
    message: "",
    title: "",
    color: "red",
    fileError: ""
  };
  fileChangeHandler = event => {
    this.setState({ file: event.target.value });
  };
  whenChangeHandler = event => {
    this.setState({ name: event.target.value });
  };
  whenChangeHandler1 = event => {
    this.setState({ nameInput: event.target.value });
    setTimeout(() => this.searchCourses(), 500);
  };
  uploadBook = event => {
    event.preventDefault();

    fetch(
      "/courses/thiscourseannouncement/" +
        this.props.location.pathname.split("/")[
          this.props.location.pathname.split("/").length - 1
        ],
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.state.name,
          link: this.state.file
        })
      }
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setTimeout(
            () => this.setState({ file: "", name: "", fileError: "" }),
            1000
          );

          this.setState({ fileError: "Save Successfull", color: "green" });

          this.componentDidMount();
        } else {
          this.setState({
            fileError: "Save Unsuccessful"
          });
        }
      });
  };
  deleteData = id => {
    fetch(
      "/courses/announcedelete/" + this.props.location.pathname.split("/")[2],
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id
        })
      }
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({ courses: json.file.reverse() });
          this.componentDidMount();
        }
      });
  };
  fetchData = () => {
    fetch(
      "/courses/thiscourse/announcements/" +
        this.props.location.pathname.split("/")[2]
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({ courses: json.file.reverse() });
        }
      });
  };
  componentDidMount() {
    this.fetchData();
  }
  viewLecture = link => {
    this.setState({
      isView: true,
      message: link
    });
  };
  closeLecture = () => {
    this.setState({
      isView: false,
      message: "",
      title: ""
    });
  };
  render() {
    const { courses } = this.state;
    let str = "";

    if (courses.length === 0) {
      str = "Announcements Not Found";
    }
    let courseArray = courses.map((course, i) => {
      return (
        <tr key={course._id}>
          <td>{course.date}</td>
          <td>{course.subject}</td>
          <td>
            {!this.state.isView ? (
              <React.Fragment>
                <button
                  id={course._id}
                  className="btn btn-success"
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                  onClick={() => this.viewLecture(course.message)}
                >
                  <i className="fa fa-eye" style={{ fontSize: "24px" }} />
                </button>
                <br />
                <br />
                <button
                  id={course._id}
                  className="btn btn-danger"
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                  onClick={() => this.deleteData(course._id)}
                >
                  <i className="fa fa-trash" style={{ fontSize: "24px" }} />
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {course.message}
                <br />
                <button
                  id={course._id}
                  className="btn btn-danger"
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                  onClick={() => this.closeLecture()}
                >
                  X
                </button>
              </React.Fragment>
            )}
          </td>
        </tr>
      );
    });

    return (
      <div id="enroll">
        <div>
          <form
            className="signupForm"
            style={{ padding: "20px" }}
            onSubmit={this.uploadBook}
          >
            <div>
              <strong style={{ color: "black" }}>Subject:</strong>
              <input
                type="text"
                className="form form-control"
                placeholder="Subject"
                value={this.state.name}
                onChange={this.whenChangeHandler}
                required
              />
            </div>
            <div>
              <strong style={{ color: "black" }}>Message:</strong>
              <textarea
                placeholder="Message"
                className="form form-control"
                value={this.state.file}
                onChange={this.fileChangeHandler}
                rows="5"
                style={{ color: "black", fontFamily: "Arial" }}
                required
              ></textarea>
              <br />
              <br />
              <div style={{ color: this.state.color, fontWeight: "bold" }}>
                {this.state.fileError}
              </div>
              <button className="btn btn-warning">
                <strong>Save</strong>
              </button>
            </div>
          </form>
        </div>
        <br />
        <br />

        <div className="Homepage-heading">Announcements List</div>
        <div
          className="Homepage-onlineInfo"
          style={{ paddingBottom: "20px", color: "black" }}
        >
          <strong>NOTE: If Announcements not found then reload the page</strong>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="table table-dark table-hover bg-black text-white table-striped">
            <thead className="table table-dark">
              <tr>
                <th>Date</th>
                <th>Subject</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>{courseArray}</tbody>
          </table>
        </div>
        <h3 style={{ fontWeight: "bold", color: "red" }}>{str}</h3>
      </div>
    );
  }
}

export default withRouter(Task);
