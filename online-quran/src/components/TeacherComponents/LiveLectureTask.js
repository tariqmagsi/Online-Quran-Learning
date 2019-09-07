import React from "react";
import { withRouter } from "react-router-dom";

class Task extends React.Component {
  state = {
    name: "",
    courses: [],
    file: "",
    isView: false,
    link: "",
    title: "",
    color: "red"
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
      "/courses/thiscourselive/" +
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
            fileError: "Save Unsuccessful",
            color: "red"
          });
        }
      });
  };

  fetchData = () => {
    fetch(
      "/courses/thiscourse/lives/" +
        this.props.location.pathname.split("/")[
          this.props.location.pathname.split("/").length - 1
        ]
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
  viewLecture = (name, link) => {
    this.setState({
      isView: true,
      link: link,
      title: name
    });
  };
  closeLecture = () => {
    this.setState({
      isView: false,
      link: "",
      title: ""
    });
  };
  deleteData = id => {
    fetch(
      "/courses/livedelete/" +
        this.props.location.pathname.split("/")[
          this.props.location.pathname.split("/").length - 1
        ],
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
  render() {
    const { courses } = this.state;
    let str = "";

    if (courses.length === 0) {
      str = "Live Lectures Not Found";
    }
    let courseArray = courses.map((course, i) => {
      return (
        <tr key={course._id}>
          <td>{course.name}</td>
          <td>
            <button
              id={course._id}
              className="btn btn-success"
              style={{
                fontSize: "24px",
                fontWeight: "bold"
              }}
              onClick={() => this.viewLecture(course.name, course.lecture)}
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
              <strong style={{ color: "black" }}>Lectures Name:</strong>
              <input
                type="text"
                className="form form-control"
                placeholder="Lecture Name"
                value={this.state.name}
                onChange={this.whenChangeHandler}
                required
              />
            </div>
            <div>
              <strong style={{ color: "black" }}>Paste Link of Lecture:</strong>
              <input
                type="text"
                placeholder="Link Of Lecture"
                className="form form-control"
                value={this.state.file}
                onChange={this.fileChangeHandler}
                required
              />
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
        <div>
          {this.state.isView ? (
            <div style={{ overflowX: "auto" }}>
              <iframe
                title={`${this.state.title}`}
                width="600"
                height="315"
                src={`https://www.youtube.com/embed/${this.state.link}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <br />

              <button
                className="btn btn-danger"
                style={{ fontSize: "16px" }}
                onClick={this.closeLecture}
              >
                <strong>Close X</strong>
              </button>
              <br />
            </div>
          ) : (
            <React.Fragment />
          )}
        </div>
        <div className="Homepage-heading">Lectures List</div>
        <div
          className="Homepage-onlineInfo"
          style={{ paddingBottom: "20px", color: "black" }}
        >
          <strong> NOTE: If Lectures not found then reload the page</strong>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="table table-dark table-hover bg-black text-white table-striped">
            <thead className="table table-dark">
              <tr>
                <th>Lecture</th>

                <th>View</th>
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
