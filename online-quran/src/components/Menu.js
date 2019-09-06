import React, { Component } from "react";
import { Link } from "react-scroll";
import "../css/HeaderStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Quran from "../images/header/logo.png";
import { NavLink } from "react-router-dom";
import Home from "./Home";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const collapsed = this.state.collapsed;

    const classOne =
      this.props.size < 768
        ? "collapse navbar-collapse"
        : "collapse navbar-collapse show";
    const classTwo = collapsed
      ? "collapse navbar-collapse"
      : "collapse navbar-collapse show";
    return (
      <div>
        <section className="hero-section set-bg">
          <header className="header-section" id="menu">
            <div className="container">
              <br />
              <br />
              <div className="row">
                <div className="col-lg-3 col-md-3">
                  <div className="site-logo">
                    <img src={Quran} width="80" height="80" alt="logo" />

                    <button
                      className="nav-switch"
                      onClick={this.toggleNavbar}
                      data-target="#a"
                      aria-controls="a"
                      aria-expanded="false"
                      aria-label="Toggle Navigation"
                    >
                      <i className="fa fa-bars" />
                    </button>
                  </div>
                </div>

                <div className="col-lg-9 col-md-9">
                  <div className="log">
                    <NavLink to="/Login" className="site-btn header-btn">
                      Login
                    </NavLink>
                  </div>

                  <nav className="main-menu" style={{ display: "block" }}>
                    <div
                      className={`${
                        this.props.size < 768 ? classTwo : classOne
                      }`}
                      id="a"
                    >
                      <ul>
                        <li>
                          <Link
                            activeClass="active"
                            to="home"
                            spy={true}
                            smooth={true}
                            effect={0}
                            duration={500}
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            activeClass="active"
                            to="courses"
                            spy={true}
                            smooth={true}
                            effect={0}
                            duration={500}
                          >
                            Courses
                          </Link>
                        </li>
                        <li>
                          <Link
                            activeClass="active"
                            to="teachers"
                            spy={true}
                            smooth={true}
                            effect={0}
                            duration={500}
                          >
                            Teachers
                          </Link>
                        </li>
                        <li>
                          <Link
                            activeClass="active"
                            to="fees"
                            spy={true}
                            smooth={true}
                            effect={0}
                            duration={500}
                          >
                            Fees
                          </Link>
                        </li>
                        <li>
                          <Link
                            activeClass="active"
                            to="contact"
                            spy={true}
                            smooth={true}
                            effect={0}
                            duration={500}
                          >
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <Home />
          </header>
        </section>
      </div>
    );
  }
}

export default Menu;
