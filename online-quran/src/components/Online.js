import React from "react";
import Courses from "./Courses";
import ScheduleAndFee from "./ScheduleAndFee";
import Teachers from "./Teachers";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import WidthGet from "./WidthGet";

const Online = () => {
  return (
    <div>
      <WidthGet />
      <Courses />
      <Teachers />
      <ScheduleAndFee />
      <ContactUs />
      <Footer />
    </div>
  );
};
export default Online;
