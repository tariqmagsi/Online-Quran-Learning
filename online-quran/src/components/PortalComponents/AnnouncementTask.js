import React from "react";
import { withRouter } from "react-router-dom";

class Task extends React.Component {
  state = {
    name: "",
    courses: [],
    file: "",
    isView: false,
    message: "",
    title: ""
  };

  fetchData = () => {
    fetch(
      "/courses/thiscourse/announcements/" +
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
              <button
                id={course._id}
                className="btn btn-success"
                style={{
                  fontSize: "24px",
                  fontWeight: "bold"
                }}
                onClick={() => this.viewLecture(course.message)}
              >
                <i className="fa fa-eye" />
              </button>
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
