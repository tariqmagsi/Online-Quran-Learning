import React from "react";
import CourseTable from "./CurrentCourseTable";
import Table from "./Table";

const DashboardContent = () => {
  return (
    <div className="navTop" style={{ textAlign: "center" }}>
      <div className="Homepage-heading">
        Welcome To TA'ALAM ALQURAN Admin Portal
      </div>
      <div className="Homepage-onlineInfo">
        You can manage portal from admin portal
      </div>
      <Table />
      <CourseTable />
    </div>
  );
};

export default DashboardContent;
