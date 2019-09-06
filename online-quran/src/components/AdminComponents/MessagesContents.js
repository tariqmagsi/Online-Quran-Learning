import React, { Component } from "react";

import AnnouncementTodo from "./MessagesTodo";
import { createStore } from "redux";
import combineReducers from "../../reducers/reducer";
import { Provider } from "react-redux";

const store = createStore(combineReducers);

class EnrollCourseContent extends Component {
  render() {
    return (
      <div className="navTop container-fluid" style={{ textAlign: "center" }}>
        <div className="Homepage-heading">Messages</div>
        <div className="Homepage-onlineInfo" style={{ paddingBottom: "40px" }}>
          <strong> NOTE:</strong> View Messages Here
        </div>

        <div className="container" style={{ paddingBottom: "30px" }}>
          <Provider store={store}>
            <AnnouncementTodo />
          </Provider>
        </div>
      </div>
    );
  }
}

export default EnrollCourseContent;
