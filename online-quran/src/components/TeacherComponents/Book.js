import React, { Component } from "react";
import "../../css/DashboardStyle.css";
import BooksAllContents from "./BookAllContents";
import { getFromStorage } from "../../utils/storage";
import { withRouter } from "react-router-dom";

class Books extends Component {
  state = { issAdmin: false };
  componentDidMount() {
    const obj = getFromStorage(process.env.REACT_APP_KEY);
    if (obj && obj.token) {
      const { token } = obj;
      fetch("/profiles/myprofile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            if (json.isTeacher && json.isAdmin) {
              this.setState({ issAdmin: true });
            } else if (json.isTeacher) {
              this.setState({ issAdmin: true });
            } else {
              this.props.history.push("/Dashboard");
            }
          }
        });
    } else {
      this.props.history.push("/Login");
      alert("Please Login First");
    }
  }
  render() {
    return this.state.issAdmin ? <BooksAllContents /> : <div />;
  }
}

export default withRouter(Books);
