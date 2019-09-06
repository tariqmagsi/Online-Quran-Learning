import React, { Component } from "react";
import "../../css/DashboardStyle.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import LiveLectureContents from "./LiveLectureContents";

class BooksAllContents extends Component {
  render() {
    return (
      <div className="dash">
        <div className="course-text text-white ">
          <Navbar />
          <Sidebar />
          <LiveLectureContents />
        </div>
      </div>
    );
  }
}
export default BooksAllContents;
