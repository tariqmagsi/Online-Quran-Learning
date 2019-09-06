import React from "react";

const BadgeTable = props => {
  return (
    <span className="jss100 jss109 jss78 jss79">
      <div>
        <div
          className="jss36 alert1 alert-info text-green fade show"
          id="PopoverFocus"
          role="alert"
        >
          <div id="course" style={{ fontSize: "3vm", fontWeight: "900" }}>
            {props.name}
          </div>
        </div>
      </div>
    </span>
  );
};
export default BadgeTable;
