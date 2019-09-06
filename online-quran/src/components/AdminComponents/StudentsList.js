import React from "react";

import { deleteTaskAction, generateId } from "../../actions/actions";

class List extends React.Component {
  state = {
    courses: [],
    enrolledStudents: [],
    notEnrolledStudents: [],
    isEnrolled: false,
    isInEditModeFee: false,
    isLoading: false,
    flag: false,
    isIcons: true
  };
  componentDidMount() {
    this.props.fetchDataE(0);
    this.props.fetchDataNE(0);
  }

  updateDatabase = (id, isEnrolled) => {
    const id1 = deleteTaskAction(id).id;

    fetch("/wishlists/" + id1, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isEnrolled: isEnrolled
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.componentDidMount();
        }
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.students.map(course => {
          return course.student && course.course !== null ? (
            <tr key={course._id}>
              <td>{course.student.name}</td>
              <td>{course.student.email}</td>
              <td>{course.student.contact}</td>
              <td>{course.student.country}</td>
              <td>{course.student.age}</td>
              <td>{course.student.gender}</td>
              <td>{course.course.name}</td>
              <td>{course.course.price}</td>
              <td>
                {this.props.check ? (
                  <React.Fragment>
                    <button
                      id={course._id}
                      className="btn btn-success"
                      style={{ marginRight: "10px" }}
                      onClick={() => this.updateDatabase(course._id, true)}
                    >
                      <i className="fa fa-check" style={{ fontSize: "24px" }} />
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button
                      id={course._id}
                      className="btn btn-danger"
                      style={{ marginRight: "10px" }}
                      onClick={() => this.updateDatabase(course._id, false)}
                    >
                      <strong>X</strong>
                    </button>
                  </React.Fragment>
                )}
              </td>
            </tr>
          ) : (
            <React.Fragment key={generateId()} />
          );
        })}
      </React.Fragment>
    );
  }
}

export default List;
