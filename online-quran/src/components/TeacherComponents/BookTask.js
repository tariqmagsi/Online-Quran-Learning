import React from "react";
import { withRouter } from "react-router-dom";

class Task extends React.Component {
  state = {
    name: "",
    courses: [],
    file: "",
    book: "",
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
      "/courses/thiscourse/" +
        this.props.location.pathname.split("/")[
          this.props.location.pathname.split("/").length - 1
        ],
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.state.name, link: this.state.file })
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

  fetchData = () => {
    fetch(
      "/courses/thiscourse/files/" +
        this.props.location.pathname.split("/")[
          this.props.location.pathname.split("/").length - 1
        ]
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({ courses: json.file });
        }
      });
  };
  componentDidMount() {
    this.fetchData();
  }
  downloadBook = id => {
    fetch("/courses/thiscourse/file/" + id)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({ book: json.file });
        }
      });
  };
  deleteData = id => {
    fetch(
      "/courses/filedelete/" +
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
          this.setState({ courses: json.file });
          this.componentDidMount();
        }
      });
  };
  render() {
    const { courses } = this.state;
    let str = "";

    if (courses.length === 0) {
      str = "Books Not Found";
    }
    let courseArray = courses.map((course, i) => {
      return (
        <tr key={course._id}>
          <td>{course.name}</td>
          <td>
            <a
              href={`${course.files}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                id={course._id}
                className="btn btn-success"
                onClick={() => this.downloadBook(course._id)}
                style={{
                  fontSize: "24px",
                  fontWeight: "bold"
                }}
              >
                <i className="fa fa-download" style={{ fontSize: "24px" }} />
              </button>
            </a>
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
              <strong style={{ color: "black" }}>Book Name:</strong>
              <input
                type="text"
                className="form form-control"
                placeholder="Book Name"
                value={this.state.name}
                onChange={this.whenChangeHandler}
                required
              />
            </div>
            <div>
              <strong style={{ color: "black" }}>Paste Link of Book:</strong>
              <input
                type="text"
                placeholder="Link Of Book"
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

        <div className="Homepage-heading">Books List</div>
        <div
          className="Homepage-onlineInfo"
          style={{ paddingBottom: "20px", color: "black" }}
        >
          <strong> NOTE: If Books not found then reload the page</strong>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="table table-dark table-hover bg-black text-white table-striped">
            <thead className="table table-dark">
              <tr>
                <th>Book</th>

                <th>Download</th>
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
