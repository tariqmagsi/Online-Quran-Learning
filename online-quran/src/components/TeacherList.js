import React from "react";
import "../css/HeaderStyle.css";

const TeacherList = props => {
  return (
    <div className="TeacherStyle ma2 white dib pa3 bg-white grow shadow-4">
      <p>
        <strong>Name: {props.name}</strong>
      </p>
    </div>
  );
};

export default TeacherList;
