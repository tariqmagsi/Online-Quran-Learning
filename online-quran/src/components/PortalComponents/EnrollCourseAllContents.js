import React, { Component } from "react";
import "../../css/DashboardStyle.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import EnrollCourseContent from "./EnrollCourseContent";

class EnrollCourseAllContents extends Component {
  render() {
    return (
      <div className="dash">
        <div className="course-text text-white ">
          <Navbar />
          <Sidebar />
          <EnrollCourseContent />
        </div>
      </div>
    );
  }
}
export default EnrollCourseAllContents;
