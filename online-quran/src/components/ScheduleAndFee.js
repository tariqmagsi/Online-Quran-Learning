import React from "react";
import "../css/HeaderStyle.css";
import FeesTable from "./FeesTable";

const ScheduleAndFee = () => {
  return (
    <div className="fees-section" id="fees">
      <div className="container">
        <div className="course-text text-white">
          <h1 className="heading-course" style={{ marginTop: "300px" }}>
            Fees
          </h1>
          <p className="para-course" style={{ marginBottom: "200px" }}>
            Our Fee Structure is very low and affordable as following.
          </p>
          <FeesTable />
        </div>
      </div>
    </div>
  );
};
export default ScheduleAndFee;
