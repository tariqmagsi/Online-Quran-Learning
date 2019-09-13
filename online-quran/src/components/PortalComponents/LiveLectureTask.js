import React from "react";
import { withRouter } from "react-router-dom";

class Task extends React.Component {
  state = {
    name: "",
    courses: [],
    file: "",
    isView: false,
    link: "",
    title: ""
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
              <i className="fa fa-eye" />
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div id="enroll">
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
