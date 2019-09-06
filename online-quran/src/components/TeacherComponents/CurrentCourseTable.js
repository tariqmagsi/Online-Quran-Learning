import React from "react";
import CurrentCourse from "./CurrentCourse";
import HeadingComponent from "./HeadingComponent";
import { withRouter } from "react-router";
import { getFromStorage } from "../../utils/storage";

class CourseTable extends React.Component {
  state = { courses: [], courseName: [] };
  fetchDataNotErolled = () => {
    const obj = getFromStorage(process.env.REACT_APP_KEY);
    if (obj && obj.token) {
      const { token } = obj;
      fetch("/wishlist?isEnrolledByStudent=true&&isEnrolled=false", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({ courses: json.wishes.wishlist });
            fetch("/courses")
              .then(res => res.json())
              .then(json => {
                if (json.success) {
                  this.setState({
                    courses: json.courses.filter(rec =>
                      this.state.courses
                        .map(rec1 => rec1.course)
                        .includes(rec._id)
                    )
                  });
                }
              });
          }
        });
    }
  };
  fetchDataEnrolled = () => {
    const obj = getFromStorage(process.env.REACT_APP_KEY);
    if (obj && obj.token) {
      const { token } = obj;
      fetch("/wishlist?isEnrolledByStudent=true&&isEnrolled=true", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({ courseName: json.wishes.wishlist });
            fetch("/courses")
              .then(res => res.json())
              .then(json => {
                if (json.success) {
                  this.setState({
                    courseName: json.courses.filter(rec =>
                      this.state.courseName
                        .map(rec1 => rec1.course)
                        .includes(rec._id)
                    )
                  });
                }
              });
          }
        });
    }
  };
  componentDidMount() {
    this.fetchDataNotErolled();
    this.fetchDataEnrolled();
  }
  render() {
    const { courses, courseName } = this.state;
    let notAvailable = "";
    if (courseName.length === 0) {
      notAvailable = "You are not enrolled in any course";
    }

    let notPending = "";
    if (courses.length === 0) {
      notPending = "You have no pending course to be enrolled";
    }
    const EnrolledCourseArrayNew = courseName.map((course, i) => {
      return <CurrentCourse key={course._id} id={i + 1} name={course.name} />;
    });
    const PendingCourseArrayNew = courses.map((course, i) => {
      return <CurrentCourse key={course._id} id={i + 1} name={course.name} />;
    });
    return (
      <div className="jss31" style={{ textAlign: "center" }}>
        <HeadingComponent name="Current Status" />
        <div className="Homepage-onlineInfo" style={{ color: "black" }}>
          <strong>
            NOTE: Wait For Confirmation Of Pending Courses To Be Enrolled From
            Management Or Reload The Page If You Can't Find Your Pending or
            Enrolled Courses
          </strong>
        </div>
        <HeadingComponent name="Enrolled Courses" />
        {EnrolledCourseArrayNew}
        <strong style={{ color: "black" }}>{notAvailable}</strong>
        <HeadingComponent name="Pending Courses" />
        {PendingCourseArrayNew}
        <strong style={{ color: "black" }}>{notPending}</strong>
      </div>
    );
  }
}

export default withRouter(CourseTable);
