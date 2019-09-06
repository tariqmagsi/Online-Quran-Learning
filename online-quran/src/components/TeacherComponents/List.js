import React from "react";
import { generateId } from "../../actions/actions";
function List(props) {
  let str = "";
  let courseArray = props.items.map(rec => (
    <tr key={generateId()}>
      <td>{rec.name}</td>
      <td>{rec.price}</td>
      <td>
        <button
          id={rec.id}
          className="btn btn-danger"
          onClick={() => props.delete(rec.id)}
        >
          <i className="fa fa-trash" style={{ fontSize: "24px" }} />
        </button>
      </td>
    </tr>
  ));
  if (courseArray.length === 0) {
    str = "Courses Not Selected";
  }
  return (
    <React.Fragment>
      <table className="table table-dark table-hover bg-black text-white table-striped">
        <thead className="table table-dark">
          <tr>
            <th>Course</th>
            <th>Fees</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>{courseArray}</tbody>
      </table>
      <h3 style={{ fontWeight: "bold", color: "red" }}>{str}</h3>
    </React.Fragment>
  );
}

export default List;
