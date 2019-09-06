import React from "react";
import profile from "../../images/header/profile.png";
import text from "../../images/header/text.png";
import lecture from "../../images/header/lecture.png";
import message from "../../images/header/message.png";
import book from "../../images/header/book.png";
import { NavLink } from "react-router-dom";

const Table = () => {
  return (
    <div className="Homepage-links-cont" style={{ textAlign: "center" }}>
      <table>
        <tbody>
          <tr>
            <td>
              <NavLink
                to="/AdminProfileInfo"
                style={{ textDecoration: "none" }}
              >
                <img src={profile} alt="pro" />
              </NavLink>
            </td>

            <th>
              <NavLink
                to="/AdminProfileInfo"
                style={{ textDecoration: "none", color: "rgb(1, 100, 95)" }}
              >
                Profile
              </NavLink>
            </th>
          </tr>

          <tr>
            <td>
              <NavLink to="/AdminCourses" style={{ textDecoration: "none" }}>
                <img src={text} alt="course" />
              </NavLink>
            </td>
            <th>
              <NavLink
                to="/AdminCourses"
                style={{ textDecoration: "none", color: "rgb(1, 100, 95)" }}
              >
                Courses
              </NavLink>
            </th>
          </tr>
          <tr>
            <td>
              <NavLink
                to="/StudentsAndTeachers"
                style={{ textDecoration: "none" }}
              >
                <img src={lecture} alt="lecture" />
              </NavLink>
            </td>
            <th>
              <NavLink
                to="/StudentsAndTeachers"
                style={{ textDecoration: "none", color: "rgb(1, 100, 95)" }}
              >
                Students And Teachers
              </NavLink>
            </th>
          </tr>
          <tr>
            <td>
              <NavLink to="/Enrollments" style={{ textDecoration: "none" }}>
                <img src={book} alt="books" />
              </NavLink>
            </td>

            <th>
              <NavLink
                to="/Enrollments"
                style={{ textDecoration: "none", color: "rgb(1, 100, 95)" }}
              >
                Enrollments
              </NavLink>
            </th>
          </tr>
          <tr>
            <td>
              <NavLink to="/Messages" style={{ textDecoration: "none" }}>
                <img src={message} alt="Messages" />
              </NavLink>
            </td>

            <th>
              <NavLink
                to="/Messages"
                style={{ textDecoration: "none", color: "rgb(1, 100, 95)" }}
              >
                Messages
              </NavLink>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
