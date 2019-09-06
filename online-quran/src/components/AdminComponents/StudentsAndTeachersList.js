import React from "react";

class StudentsAndTeachersList extends React.Component {
  componentDidMount() {
    this.props.fetchDataT(0);
    this.props.fetchDataS(0);
  }

  updateDatabase = (id, isTeacher) => {
    fetch("/profiles/myprofiles/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isTeacher: !isTeacher
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
          return (
            <tr key={course._id}>
              <td>{course.name}</td>
              <td>{course.email}</td>
              <td>{course.contact}</td>
              <td>{course.country}</td>
              <td>{course.age}</td>
              <td>{course.gender}</td>
              <td>
                <button
                  id={course._id}
                  className="btn btn-success"
                  style={{ marginRight: "10px" }}
                  onClick={() =>
                    this.updateDatabase(course._id, this.props.check)
                  }
                >
                  <i className="fa fa-refresh" style={{ fontSize: "24px" }} />
                </button>
                <br />
              </td>
            </tr>
          );
        })}
      </React.Fragment>
    );
  }
}

export default StudentsAndTeachersList;
