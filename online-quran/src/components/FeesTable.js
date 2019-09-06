import React from "react";
import { Link } from "react-scroll";

class FeesTable extends React.Component {
  state = { courses: [] };
  fetchData = () => {
    fetch("/courses")
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({ courses: json.courses });
        }
      });
  };
  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="FeesTableStyle">
        <table className="table table-dark table-hover bg-black text-white table-striped">
          <thead className="table table-dark">
            <tr>
              <th>Course</th>
              <th>Fees</th>
              <th>Enroll</th>
            </tr>
          </thead>
          <tbody>
            {this.state.courses.map(course => (
              <tr key={course._id}>
                <td>{course.name}</td>
                <td>{course.price}</td>
                <td>
                  <Link
                    activeClass="active"
                    to="register"
                    spy={true}
                    smooth={true}
                    effect={0}
                    duration={500}
                  >
                    <button
                      className="btn btn-success"
                      style={{
                        fontSize: "16px",
                        width: "200px",
                        height: "50px"
                      }}
                    >
                      <strong>Enroll</strong>
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default FeesTable;
