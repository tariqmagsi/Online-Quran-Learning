import React from "react";
import "../css/CourseStyle.css";

class CourseList extends React.Component {
  state = { des: "", description: "" };
  whenMouse = () => {
    this.setState({ des: this.props.description, description: "Description" });
  };
  whenMouseLeave = () => {
    this.setState({ des: "", description: "" });
  };
  render() {
    return (
      <div
        className="CourseStyle ma2 white dib pa0 grow shadow-4"
        onMouseEnter={this.whenMouse}
        onClick={this.whenMouseLeave}
      >
        <img
          src={this.props.src}
          alt={this.props.name}
          height="200"
          width="300"
          onMouseEnter={this.whenMouse}
          onClick={this.whenMouseLeave}
        />
        <p className="para-course" align="center">
          {this.props.name}
        </p>
        <p style={{ color: "black" }}>
          <strong>{this.state.description}</strong>
        </p>
        <p style={{ color: "black" }}>{this.state.des}</p>
      </div>
    );
  }
}

export default CourseList;
