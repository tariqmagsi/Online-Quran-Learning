import React from "react";
import "../css/HeaderStyle.css";
import CoursesDiv from "./CoursesDiv";
const Courses = () => {
  return (
    <div className="course-section" id="courses">
      <div className="container">
        <div className="course-text text-white">
          <h1 className="heading-course" style={{ marginTop: "300px" }}>
            Courses
          </h1>
          <p className="para-course" style={{ marginBottom: "200px" }}>
            We are offering various Quran courses as following.
          </p>

          <CoursesDiv />
        </div>
      </div>
    </div>
  );
};
export default Courses;
