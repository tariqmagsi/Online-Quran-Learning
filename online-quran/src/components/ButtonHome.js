import React from "react";
import { Link } from "react-scroll";
import "../css/LoginStyle.css";

const ButtonHome = props => {
  return (
    <div className="buttons">
      <Link
        to="footer"
        activeClass="active"
        spy={true}
        smooth={true}
        effect={0}
        duration={500}
        className="scrollBtnBottom"
        id="scrollBtnBottom"
      >
        <i className="fa fa-chevron-down" />
      </Link>
      <Link
        to="menu"
        activeClass="active"
        spy={true}
        smooth={true}
        effect={0}
        duration={500}
        className="scrollBtnTop"
      >
        <i className="fa fa-chevron-up" />
      </Link>
    </div>
  );
};
export default ButtonHome;
