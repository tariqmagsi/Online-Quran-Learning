import React from "react";

import HeadingComponent from "./HeadingComponent";

class CourseTable extends React.Component {
  render() {
    return (
      <div className="jss31" style={{ textAlign: "center" }}>
        <HeadingComponent name="Current Status" />
        <div
          className="Homepage-onlineInfo"
          style={{ color: "black", paddingBottom: "40px" }}
        >
          <strong>You are Admin of this portal</strong>
        </div>
      </div>
    );
  }
}

export default CourseTable;
