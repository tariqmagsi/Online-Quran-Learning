import React from "react";
import profile from "../../images/header/profile.png";
import text from "../../images/header/text.png";
import lecture from "../../images/header/lecture.png";
import book from "../../images/header/book.png";
import { NavLink } from "react-router-dom";

const Table = () => {
  return (
    <div className="Homepage-links-cont" style={{ textAlign: "center" }}>
      <table>
        <tbody>
          <tr>
            <td>
              <NavLink to="/ProfileInfo" style={{ textDecoration: "none" }}>
                <img src={profile} alt="pro" />
              </NavLink>
            </td>

            <th>
              <NavLink
                to="/ProfileInfo"
                style={{ textDecoration: "none", color: "rgb(1, 100, 95)" }}
              >
                Profile
              </NavLink>
            </th>
          </tr>

          <tr>
            <td>
              <NavLink to="/EnrollCourses" style={{ textDecoration: "none" }}>
                <img src={text} alt="course" />
              </NavLink>
            </td>
            <th>
              <NavLink
                to="/EnrollCourses"
                style={{ textDecoration: "none", color: "rgb(1, 100, 95)" }}
              >
                Courses
              </NavLink>
            </th>
          </tr>
          <tr>
            <td>
              <NavLink to="/LiveLectures">
                <img src={lecture} alt="lecture" />
              </NavLink>
            </td>
            <th>
              <NavLink
                to="/LiveLectures"
                style={{ textDecoration: "none", color: "rgb(1, 100, 95)" }}
              >
                Live Lectures
              </NavLink>
            </th>
          </tr>
          <tr>
            <td>
              <NavLink to="/Books" style={{ textDecoration: "none" }}>
                <img src={book} alt="books" />
              </NavLink>
            </td>

            <th>
              <NavLink
                to="/Books"
                style={{ textDecoration: "none", color: "rgb(1, 100, 95)" }}
              >
                Books
              </NavLink>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
