import React, { Component } from "react";
import "../../css/DashboardStyle.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import LiveLecturesContent from "./LiveLecturesContent";

class BooksAllContents extends Component {
  render() {
    return (
      <div className="dash">
        <div className="course-text text-white ">
          <Navbar />
          <Sidebar />
          <LiveLecturesContent />
        </div>
      </div>
    );
  }
}
export default BooksAllContents;
