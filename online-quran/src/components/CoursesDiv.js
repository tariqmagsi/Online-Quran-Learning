import React, { Component } from "react";
import CourseList from "./CourseList";
import tafseer from "../images/home/2.jpg";

class CoursesDiv extends Component {
  constructor(props) {
    super(props);
    this.state = { courses: [] };
  }
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
    const { courses } = this.state;

    const coursesNew = courses.map(course => {
      return (
        <CourseList
          key={course._id}
          name={course.name}
          description={course.description}
          src={tafseer}
        />
      );
    });

    return <div className="mainpage">{coursesNew}</div>;
  }
}

export default CoursesDiv;
