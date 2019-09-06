import React, { Component } from "react";
import "../css/HeaderStyle.css";
import TeacherList from "./TeacherList";
class Teachers extends Component {
  constructor(props) {
    super(props);
    this.state = { teachers: [] };
  }
  fetchData = () => {
    fetch("/profiless?isTeacher=true")
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({ teachers: json.profiles });
        }
      });
  };
  componentDidMount() {
    this.fetchData();
  }
  render() {
    const teachersNew = this.state.teachers.map((teacher, i) => {
      return <TeacherList key={teacher._id} name={teacher.name} />;
    });
    return (
      <div className="teacher-section" id="teachers">
        <div className="container">
          <div className="course-text text-white">
            <h1 className="heading-course" style={{ marginTop: "300px" }}>
              Teachers
            </h1>
            <p className="para-course" style={{ marginBottom: "200px" }}>
              We have best and qualified teachers as following.
            </p>
            {teachersNew}
          </div>
        </div>
      </div>
    );
  }
}

export default Teachers;
