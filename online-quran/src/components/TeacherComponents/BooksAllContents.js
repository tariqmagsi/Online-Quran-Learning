import React, { Component } from "react";
import "../../css/DashboardStyle.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import BookContent from "./BookContent";

class BooksAllContents extends Component {
  render() {
    return (
      <div className="dash">
        <div className="course-text text-white ">
          <Navbar />
          <Sidebar />
          <BookContent />
        </div>
      </div>
    );
  }
}
export default BooksAllContents;
