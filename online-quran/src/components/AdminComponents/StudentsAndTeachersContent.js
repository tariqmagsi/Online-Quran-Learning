import React, { Component } from "react";

import StudentsAndTeachersTodo from "./StudentsAndTeachersTodo";
import { createStore } from "redux";
import combineReducers from "../../reducers/reducer";
import { Provider } from "react-redux";

const store = createStore(combineReducers);

class StudentsAndTeachersContent extends Component {
  render() {
    return (
      <div className="navTop container-fluid" style={{ textAlign: "center" }}>
        <div className="Homepage-heading">Students And Teachers</div>
        <div className="Homepage-onlineInfo" style={{ paddingBottom: "40px" }}>
          <strong> NOTE:</strong> Admin can see teachers and students and can
          add or remove a teacher
        </div>

        <div className="container" style={{ paddingBottom: "30px" }}>
          <Provider store={store}>
            <StudentsAndTeachersTodo />
          </Provider>
        </div>
      </div>
    );
  }
}

export default StudentsAndTeachersContent;
