import React from "react";
import Badge from "./Badge";
import BadgeTable from "./BadgeTable";

const CurrentCourse = props => {
  return (
    <div className="jss43 jss45 jss39 jss41 jss32">
      <div className="jss70 jss72">
        <span className="jss75 jss77">
          <Badge id={props.id} />
          <span className="jss85 bg-success">
            <BadgeTable name={props.name} />
          </span>
        </span>
      </div>
    </div>
  );
};
export default CurrentCourse;
