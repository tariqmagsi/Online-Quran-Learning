import React from "react";
import Table from "./Table";
import HeadingComponent from "./HeadingComponent";
import ChangePasswordForm from "./EditProfileForm";

const ChangePasswordContent = () => {
  return (
    <div className="navTop passPadding" style={{ textAlign: "center" }}>
      <div className="Homepage-heading">Password</div>
      <Table />
      <div className="jss31" style={{ textAlign: "center" }}>
        <HeadingComponent name="Change Password" />

        <div className="jss43 jss45 jss39 jss41 jss32">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};
export default ChangePasswordContent;
