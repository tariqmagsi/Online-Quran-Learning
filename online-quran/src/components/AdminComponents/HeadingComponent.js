import React from "react";

const HeadingComponent = props => {
  return (
    <React.Fragment>
      <hr />
      <div className="current-status-heading">{props.name}</div>
    </React.Fragment>
  );
};
export default HeadingComponent;
