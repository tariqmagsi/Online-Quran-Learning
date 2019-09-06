import React from "react";

function List(props) {
  return (
    <table className="table table-dark table-hover bg-black text-white table-striped">
      <thead className="table table-dark">
        <tr>
          <th>Course</th>
          <th>Fees</th>
          <th>Description</th>
          <th>Enroll</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map(rec => (
          <tr key={rec.id}>
            <td>{rec.name}</td>
            <td>{rec.price}</td>
            <td>{rec.description}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => props.delete(rec.id)}
              >
                <i className="fa fa-trash" style={{ fontSize: "24px " }} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default List;
