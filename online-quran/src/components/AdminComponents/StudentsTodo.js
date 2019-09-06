import React, { Component } from "react";

import StudentsTask from "./StudentsTask";
import TeachersTask from "./TeachersTask";

class StudentsTodo extends Component {
  state = { hideShow1: false, hideShow2: false };
  showTable1 = () => {
    this.setState({ hideShow1: !this.state.hideShow1 });
  };
  showTable2 = () => {
    this.setState({ hideShow2: !this.state.hideShow2 });
  };
  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          style={{
            marginTop: "20px",
            fontSize: "20px",
            height: "50px"
          }}
          onClick={this.showTable1}
        >
          <strong>Click to Show/Hide Students Enrollment</strong>
        </button>
        {this.state.hideShow1 ? <StudentsTask /> : <React.Fragment />}
        <br />
        <button
          className="btn btn-success"
          style={{
            marginTop: "20px",
            fontSize: "20px",
            height: "50px"
          }}
          onClick={this.showTable2}
        >
          <strong>Click to Show/Hide Teachers Enrollment</strong>
        </button>
        {this.state.hideShow2 ? <TeachersTask /> : <React.Fragment />}
      </div>
    );
  }
}

export default StudentsTodo;
