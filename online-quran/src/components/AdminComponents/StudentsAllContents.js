import React, { Component } from "react";
import "../../css/DashboardStyle.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import StudentsContent from "./StudentsContent";

class StudentsAllContents extends Component {
  render() {
    return (
      <div className="dash">
        <div className="course-text text-white ">
          <Navbar />
          <Sidebar />
          <StudentsContent />
        </div>
      </div>
    );
  }
}
export default StudentsAllContents;
