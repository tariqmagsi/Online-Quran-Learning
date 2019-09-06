import React from "react";
import "../../css/ProfileStyle.css";

const InfoThAndTd = props => {
  return (
    <tr>
      <th>{props.th}</th>
      <td>{props.td}</td>
    </tr>
  );
};
export default InfoThAndTd;
