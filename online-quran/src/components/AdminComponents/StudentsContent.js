import React, { Component } from "react";

import StudentsTodo from "./StudentsTodo";
import { createStore } from "redux";
import combineReducers from "../../reducers/reducer";
import { Provider } from "react-redux";

const store = createStore(combineReducers);

class StudentsContent extends Component {
  render() {
    return (
      <div className="navTop container-fluid" style={{ textAlign: "center" }}>
        <div className="Homepage-heading">Enrollments</div>
        <div className="Homepage-onlineInfo" style={{ paddingBottom: "40px" }}>
          <strong> NOTE:</strong> Admin can confirm enrollment of a student when
          student want to enroll in a course
        </div>

        <div className="container" style={{ paddingBottom: "30px" }}>
          <Provider store={store}>
            <StudentsTodo />
          </Provider>
        </div>
      </div>
    );
  }
}

export default StudentsContent;
