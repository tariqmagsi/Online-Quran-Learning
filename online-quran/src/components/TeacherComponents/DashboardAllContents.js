import React, { Component } from "react";
import "../../css/DashboardStyle.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";

class DashboardAllContents extends Component {
  render() {
    return (
      <div className="dash">
        <div className="course-text text-white ">
          <Navbar />
          <Sidebar />
          <DashboardContent />
        </div>
      </div>
    );
  }
}
export default DashboardAllContents;
