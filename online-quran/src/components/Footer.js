import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import "../css/HeaderStyle.css";

const Footer = () => {
  return (
    <div className="footer text-white bg-black" align="center" id="footer">
      <br />
      <p style={{ textDecoration: "none" }} id="home">
        <li>
          <Link
            to="home"
            activeClass="active"
            spy={true}
            smooth={true}
            effect={0}
            duration={500}
            style={{ marginRight: 10, cursor: "pointer" }}
          >
            Home
          </Link>
        </li>
        |
        <li>
          <Link
            to="courses"
            activeClass="active"
            spy={true}
            smooth={true}
            effect={0}
            duration={500}
            style={{
              marginLeft: 10,
              marginRight: 10,
              cursor: "pointer"
            }}
          >
            Courses
          </Link>
        </li>
        |
        <li>
          <Link
            to="teachers"
            activeClass="active"
            spy={true}
            smooth={true}
            effect={0}
            duration={500}
            style={{
              marginLeft: 10,
              marginRight: 10,
              cursor: "pointer"
            }}
          >
            Teachers
          </Link>
        </li>
        |
        <li>
          <Link
            to="fees"
            activeClass="active"
            spy={true}
            smooth={true}
            effect={0}
            duration={500}
            style={{
              marginLeft: 10,
              marginRight: 10,
              cursor: "pointer"
            }}
          >
            Fees
          </Link>
        </li>
        |
        <li>
          <Link
            to="register"
            activeClass="active"
            spy={true}
            smooth={true}
            effect={0}
            duration={500}
            style={{
              marginLeft: 10,
              marginRight: 10,
              cursor: "pointer"
            }}
          >
            Register
          </Link>
        </li>
        |
        <li>
          <NavLink
            to="/Login"
            style={{
              marginLeft: 10,
              marginRight: 10,
              textDecoration: "none"
            }}
          >
            Sign In
          </NavLink>
        </li>
        |
        <li>
          <Link
            to="contact"
            activeClass="active"
            spy={true}
            smooth={true}
            effect={0}
            duration={500}
            style={{
              marginLeft: 10,
              marginRight: 10,
              cursor: "pointer"
            }}
          >
            Contact Us
          </Link>
        </li>
      </p>
      <p>Email: taealamalquran@gmail.com</p>
      <p>Copyrights &copy; All Rights Reserved Taalam AlQuran 2019 - 2030</p>
      <br />
    </div>
  );
};
export default Footer;
