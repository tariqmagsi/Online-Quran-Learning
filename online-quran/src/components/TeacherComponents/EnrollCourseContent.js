import React, { Component } from "react";

import EnrollCourseTodo from "./EnrollCourseTodo";
import { createStore } from "redux";
import combineReducers from "../../reducers/reducer";
import { Provider } from "react-redux";

const store = createStore(combineReducers);

class EnrollCourseContent extends Component {
  render() {
    return (
      <div className="navTop container-fluid" style={{ textAlign: "center" }}>
        <div className="Homepage-heading">Enroll Courses</div>
        <div className="Homepage-onlineInfo" style={{ paddingBottom: "40px" }}>
          <strong> NOTE:</strong> Enroll in your choice courses
        </div>

        <div className="container" style={{ paddingBottom: "30px" }}>
          <Provider store={store}>
            <EnrollCourseTodo />
          </Provider>
        </div>
      </div>
    );
  }
}

export default EnrollCourseContent;
