import React, { Component } from "react";
import ContactForm from "./ContactForm";

class ContactUs extends Component {
  render() {
    return (
      <div className="contact-section" id="contact">
        <div className="container">
          <div className="course-text text-white">
            <h1 className="heading-course" style={{ marginTop: "300px" }}>
              Contact
            </h1>
            <p className="para-course" style={{ marginBottom: "200px" }}>
              You can Contact Us by filling following form.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUs;
