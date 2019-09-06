import React from "react";
import "../../css/DashboardStyle.css";

const EnrollCourseTableTodo = () => {
  return (
    <div className="FeesTableStyle" id="enroll">
      <table className="table table-dark table-hover bg-black text-white table-striped">
        <thead className="table table-dark">
          <tr>
            <th>Course</th>
            <th>Price</th>
            <th>Enroll Now</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tajweed</td>
            <td>20$</td>
            <td>
              <button className="site-btn change-pass">Enroll</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default EnrollCourseTableTodo;
