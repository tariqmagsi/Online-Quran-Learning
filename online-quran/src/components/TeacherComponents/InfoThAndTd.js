import React from "react";
import "../../css/ProfileStyle.css";

class InfoThAndTd extends React.Component {
  render() {
    return (
      <tr>
        <th>{this.props.th}</th>
        <td>{this.props.td}</td>
      </tr>
    );
  }
}
export default InfoThAndTd;
