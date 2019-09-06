import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class Email extends Component {
  state = { email: "", flag: false, error: "" };
  whenChangeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value, error: "" });
  };
  sendEmail = e => {
    e.preventDefault();
    fetch("/profiles/resetpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({ flag: true, error: "" });
        } else {
          this.setState({ error: json.error });
        }
      });
  };
  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {!this.state.flag ? (
          <React.Fragment>
            <Modal.Header closeButton>
              <strong>Enter Your Email</strong>
              <br />
              <br />
            </Modal.Header>
            <form onSubmit={this.sendEmail}>
              <Modal.Body>
                <input
                  type="email"
                  name="email"
                  onChange={this.whenChangeHandler}
                  placeholder="Enter Email"
                  className="form form-control"
                  required
                />
                <p
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  {this.state.error}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <button className="btn btn-success" style={{ width: "500px" }}>
                  <strong>Send Email</strong>
                </button>
              </Modal.Footer>
            </form>
          </React.Fragment>
        ) : (
          <Modal.Header
            style={{ color: "green", fontSize: "18px" }}
            closeButton
          >
            <strong>Check Out Your Email To Change Password</strong>
          </Modal.Header>
        )}
      </Modal>
    );
  }
}
export default Email;
