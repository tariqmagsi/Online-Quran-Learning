import React from "react";
import CourseTable from "./CurrentCourseTable";
import Table from "./Table";

const DashboardContent = () => {
  return (
    <div className="navTop" style={{ textAlign: "center" }}>
      <div className="Homepage-heading">
        Welcome To TA'ALAM ALQURAN Teacher Portal
      </div>
      <div className="Homepage-onlineInfo">
        You will be able to view lectures anytime online once they are available
        on portal
      </div>
      <Table />
      <CourseTable />
    </div>
  );
};

export default DashboardContent;
