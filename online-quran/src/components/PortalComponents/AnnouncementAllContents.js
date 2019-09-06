import React, { Component } from "react";
import "../../css/DashboardStyle.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AnnouncementContents from "./AnnouncementContents";

class BooksAllContents extends Component {
  render() {
    return (
      <div className="dash">
        <div className="course-text text-white ">
          <Navbar />
          <Sidebar />
          <AnnouncementContents />
        </div>
      </div>
    );
  }
}
export default BooksAllContents;
