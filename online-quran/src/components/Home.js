import React, { Component } from "react";
import "../css/HeaderStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeBody from "./HomeBody";
import HomeContent from "./HomeContent";
import ButtonHome from "./ButtonHome";

class Home extends Component {
  render() {
    return (
      <div id="home">
        <HomeBody />
        <HomeContent />
        <ButtonHome />
      </div>
    );
  }
}
export default Home;
