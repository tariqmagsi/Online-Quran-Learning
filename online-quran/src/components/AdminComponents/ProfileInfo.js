import React from "react";
import Table from "./Table";
import HeadingComponent from "./HeadingComponent";
import InfoList from "./InfoList";

const ProfileInfo = () => {
  return (
    <div className="navTop infoPadding" style={{ textAlign: "center" }}>
      <div className="Homepage-heading">Profile</div>
      <Table />
      <div className="jss31" style={{ textAlign: "center" }}>
        <HeadingComponent name="Profile Info" />

        <div className="jss43 jss45 jss39 jss41 jss32">
          <div className="jss70 jss72">
            <span className="jss75 jss77">
              <span className="jss85">
                <InfoList />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileInfo;
