import React, { Component } from "react";

import BooksTodo from "./BooksTodo";
import { createStore } from "redux";
import combineReducers from "../../reducers/reducer";
import { Provider } from "react-redux";

const store = createStore(combineReducers);

class EnrollCourseContent extends Component {
  render() {
    return (
      <div className="navTop container-fluid" style={{ textAlign: "center" }}>
        <div className="Homepage-heading">Enrolled Courses Books</div>
        <div className="Homepage-onlineInfo" style={{ paddingBottom: "40px" }}>
          <strong> NOTE:</strong> View Books of Enrolled Courses
        </div>

        <div className="container" style={{ paddingBottom: "30px" }}>
          <Provider store={store}>
            <BooksTodo />
          </Provider>
        </div>
      </div>
    );
  }
}

export default EnrollCourseContent;
