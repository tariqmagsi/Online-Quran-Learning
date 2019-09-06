import React from "react";
import { withRouter } from "react-router-dom";

class Task extends React.Component {
  state = {
    name: "",
    courses: [],
    file: "",
    book: ""
  };

  uploadBook = event => {
    event.preventDefault();

    fetch("/courses/thiscourse/" + this.props.location.pathname.split("/")[2], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: this.state.name, link: this.state.file })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({ file: "", name: "" });
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
                className="btn btn-danger"
                onClick={() => this.downloadBook(course._id)}
                style={{
                  fontSize: "24px",
                  fontWeight: "bold"
                }}
              >
                <i className="fa fa-download" />
              </button>
            </a>
          </td>
        </tr>
      );
    });

    return (
      <div id="enroll">
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
