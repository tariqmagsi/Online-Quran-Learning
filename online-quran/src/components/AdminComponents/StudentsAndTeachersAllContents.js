import React, { Component } from "react";
import "../../css/DashboardStyle.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import StudentsAndTeachersContent from "./StudentsAndTeachersContent";

class StudentsAndTeachersAllContents extends Component {
  render() {
    return (
      <div className="dash">
        <div className="course-text text-white ">
          <Navbar />
          <Sidebar />
          <StudentsAndTeachersContent />
        </div>
      </div>
    );
  }
}
export default StudentsAndTeachersAllContents;
