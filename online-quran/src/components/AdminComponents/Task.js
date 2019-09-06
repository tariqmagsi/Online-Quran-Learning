import React from "react";
import List from "./List";
import {
  deleteTaskAction,
  createTaskAction,
  generateId
} from "../../actions/actions";
import { connect } from "react-redux";

class Task extends React.Component {
  state = {
    courses: [],
    coursesOfUser: [],
    newCourses: [],
    isInEditMode: false,
    isInEditModeFee: false,
    isInEditModeDes: false,
    isLoading: false,
    flag: false,
    isIcons: true,
    skip: 0,
    limit: 20,
    nameInput: "",
    priceInput: "",
    descritionInput: ""
  };
  whenChangeHandler2 = event => {
    this.setState({ priceInput: event.target.value });
    setTimeout(() => this.searchCourses(), 500);
  };
  whenChangeHandler1 = event => {
    this.setState({ nameInput: event.target.value });
    setTimeout(() => this.searchCourses(), 500);
  };
  saveHandler = e => {
    this.props.tasks.map(rec =>
      fetch("/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: rec.name,
          price: rec.price,
          description: rec.description
        })
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.componentDidMount();
          } else {
            alert(rec.name + " already exists");
          }
        })
    );

    this.props.tasks.map(rec => this.deleteTask(rec.id));
  };
  fetchData = skip => {
    fetch("/courses?limit=20&&skip=" + skip)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({ courses: json.courses });
        }
      });
  };
  componentDidMount() {
    this.fetchData(0);
  }
  componentWillUnmount() {
    this.props.tasks.forEach(t => this.deleteTask(t.id));
  }

  addToDoTask = e => {
    e.preventDefault();
    const name = document.getElementById("txt_course");
    const value = name.value;
    name.value = "";
    const name1 = document.getElementById("txt_fees");
    const value1 = name1.value;
    name1.value = "";
    const Description = document.getElementById("txt_description");
    const value2 = Description.value;
    Description.value = "";
    this.props.dispatch(createTaskAction(generateId(), value, value1, value2));
  };
  deleteTask = task_id => {
    this.props.dispatch(deleteTaskAction(task_id));
  };
  whenChangeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  updateHandler = event => {
    this.setState({
      isInEditMode: !this.state.isInEditMode,
      isInEditModeFee: !this.state.isInEditModeFee,
      isInEditModeDes: !this.state.isInEditModeDes,
      isIcons: !this.state.isIcons
    });
  };

  updateValue = (name, price, id, description) => {
    let arr = this.state.courses.map(rec =>
      rec._id === id
        ? Object.assign({}, rec, { name, price, description })
        : rec
    );
    this.setState({
      isInEditMode: !this.state.isInEditMode,
      isInEditModeFee: !this.state.isInEditModeFee,
      isInEditModeDes: !this.state.isInEditModeDes,
      isIcons: !this.state.isIcons,
      courses: arr
    });
  };

  updateDatabase = (task_id, name, price, description) => {
    fetch("/courses/mycourse/" + task_id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        price: price,
        description: description
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.componentDidMount();
          alert("Course Updated Successfully");
        }
      });
  };
  deleteDatabase = id => {
    fetch("/courses/mycourse/" + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.componentDidMount();
          alert("Course Deleted Successfully");
        }
      });
  };
  next = () => {
    let skip = this.state.skip;
    document.getElementById("next").className = "btn btn-danger";
    document.getElementById("prev").className = "btn btn-success";
    if (this.state.courses.length !== 0) {
      this.setState({
        skip: this.state.skip + 20,
        limit: this.state.limit + 20
      });

      this.fetchData(skip + 20);
    }
  };
  prev = () => {
    let skip = this.state.skip;
    document.getElementById("next").className = "btn btn-success";
    document.getElementById("prev").className = "btn btn-danger";
    if (skip !== 0) {
      this.setState({
        skip: this.state.skip - 20,
        limit: this.state.limit - 20
      });

      this.fetchData(skip - 20);
    }
  };
  searchCourses = () => {
    const { nameInput, priceInput } = this.state;
    fetch("/searchcourse?name=" + nameInput + "&&price=" + priceInput)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({ courses: json.courses });
        }
      });
  };
  render() {
    const { courses } = this.state;
    let str = "",
      str1 = "";
    if (this.props.tasks.length === 0) {
      str1 = "Courses Not Added";
    }
    if (courses.length === 0) {
      str = "Courses Not Available";
    }
    return (
      <div id="enroll">
        <div className="Homepage-heading">Course List</div>
        <div
          className="Homepage-onlineInfo"
          style={{ paddingBottom: "20px", color: "black" }}
        >
          <strong> NOTE: If Courses not found then reload the page</strong>
        </div>
        <div>
          <form
            className="signupForm"
            style={{ padding: "20px" }}
            onSubmit={this.addToDoTask}
          >
            <div>
              <strong
                align="left"
                style={{ color: "black", textAlign: "left" }}
              >
                Course Name:
              </strong>
              <input
                type="text"
                className="form form-control"
                placeholder="Enter Course Name"
                onChange={this.whenChangeHandler}
                id="txt_course"
                required
              />
            </div>
            <br />
            <div>
              <strong
                align="left"
                style={{ color: "black", textAlign: "left" }}
              >
                Course Fees:
              </strong>
              <input
                type="text"
                className="form form-control"
                placeholder="Enter Fees"
                onChange={this.whenChangeHandler}
                id="txt_fees"
                required
              />
              <br />
              <div>
                <strong
                  align="left"
                  style={{ color: "black", textAlign: "left" }}
                >
                  Course Description:
                </strong>
                <textarea
                  type="text"
                  className="form form-control"
                  rows="5"
                  placeholder="Enter Course Description"
                  onChange={this.whenChangeHandler}
                  id="txt_description"
                  required
                />
              </div>
              <button
                id="addTodo"
                className="btn btn-success"
                style={{
                  marginTop: "20px",
                  fontSize: "20px",
                  width: "300px",
                  height: "50px"
                }}
                onClick={this.addToDoTask}
              >
                <strong>Add</strong>
              </button>
            </div>
          </form>
        </div>
        <br />

        <div style={{ marginTop: "40px", overflowX: "auto" }}>
          <div className="Homepage-heading">Course List</div>
          <List items={this.props.tasks} delete={this.deleteTask} />
          <h3 style={{ fontWeight: "bold", color: "red" }}>{str1}</h3>
        </div>
        <button
          className="btn btn-success"
          style={{
            marginTop: "20px",
            fontSize: "20px",
            width: "300px",
            height: "50px"
          }}
          onClick={this.saveHandler}
        >
          <strong>Save</strong>
        </button>
        <br />
        <div className="Homepage-heading">All Course List</div>
        <div style={{ overflowX: "auto" }}>
          <table className="table table-dark table-hover bg-black text-white table-striped">
            <thead className="table table-dark">
              <tr>
                <th>Course</th>
                <th>Fees</th>
                <th>Description</th>
                <th />
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <input
                    id="name"
                    type="text"
                    value={this.state.nameInput}
                    className="form form-control"
                    placeholder="Search By Course"
                    style={{ color: "black" }}
                    onChange={this.whenChangeHandler1}
                  />
                </td>
                <td>
                  <input
                    id="price"
                    type="text"
                    value={this.state.priceInput}
                    style={{ color: "black" }}
                    className="form form-control"
                    placeholder="Search By Fees"
                    onChange={this.whenChangeHandler2}
                  />
                </td>
                <td />
                <td />
              </tr>
              {courses.map(course => {
                return (
                  <tr key={course._id}>
                    <td>
                      {this.state.isInEditMode ? (
                        <React.Fragment>
                          <input
                            type="text"
                            className="form form-control"
                            placeholder="Enter Name"
                            onChange={this.whenChangeHandler}
                            defaultValue={course.name}
                            name="fees"
                            id={course._id}
                            required
                          />
                          <button
                            className="btn btn-success"
                            style={{ marginTop: "10px" }}
                            onClick={() =>
                              this.updateValue(
                                document.getElementById(course._id).value,
                                document.getElementById(course._id + "1").value,
                                course._id,
                                document.getElementById(course._id + "2").value
                              )
                            }
                          >
                            &#10004;
                          </button>
                          <button
                            onClick={this.updateHandler}
                            className="btn btn-danger"
                            style={{ marginLeft: "10px", marginTop: "10px" }}
                          >
                            <strong>X</strong>
                          </button>
                        </React.Fragment>
                      ) : (
                        course.name
                      )}
                    </td>
                    <td>
                      {this.state.isInEditModeFee ? (
                        <React.Fragment>
                          <input
                            type="text"
                            className="form form-control"
                            placeholder="Enter Name"
                            onChange={this.whenChangeHandler}
                            defaultValue={course.price}
                            name="fe"
                            id={course._id + "1"}
                            required
                          />

                          <button
                            className="btn btn-success"
                            style={{ marginTop: "10px" }}
                            onClick={() =>
                              this.updateValue(
                                document.getElementById(course._id).value,
                                document.getElementById(course._id + "1").value,
                                course._id,
                                document.getElementById(course._id + "2").value
                              )
                            }
                          >
                            &#10004;
                          </button>
                          <button
                            onClick={this.updateHandler}
                            className="btn btn-danger"
                            style={{ marginLeft: "10px", marginTop: "10px" }}
                          >
                            <strong>X</strong>
                          </button>
                        </React.Fragment>
                      ) : (
                        course.price
                      )}
                    </td>
                    <td>
                      {this.state.isInEditModeDes ? (
                        <React.Fragment>
                          <input
                            type="text"
                            className="form form-control"
                            placeholder="Enter Description"
                            onChange={this.whenChangeHandler}
                            defaultValue={course.description}
                            name="des"
                            id={course._id + "2"}
                            required
                          />

                          <button
                            className="btn btn-success"
                            style={{ marginTop: "10px" }}
                            onClick={() =>
                              this.updateValue(
                                document.getElementById(course._id).value,
                                document.getElementById(course._id + "1").value,
                                course._id,
                                document.getElementById(course._id + "2").value
                              )
                            }
                          >
                            &#10004;
                          </button>
                          <button
                            onClick={this.updateHandler}
                            className="btn btn-danger"
                            style={{ marginLeft: "10px", marginTop: "10px" }}
                          >
                            <strong>X</strong>
                          </button>
                        </React.Fragment>
                      ) : (
                        course.description
                      )}
                    </td>
                    <td>
                      {this.state.isIcons ? (
                        <React.Fragment>
                          <button
                            id={course._id}
                            className="btn btn-dark"
                            onClick={this.updateHandler}
                          >
                            <i
                              className="fa fa-edit"
                              style={{ fontSize: "24px " }}
                            />
                          </button>
                          <br />
                          <br />
                          <button
                            id={course._id}
                            className="btn btn-success"
                            onClick={() =>
                              this.updateDatabase(
                                course._id,
                                course.name,
                                course.price,
                                course.description
                              )
                            }
                          >
                            <i
                              className="fa fa-refresh"
                              style={{ fontSize: "24px " }}
                            />
                          </button>
                          <br />
                          <br />
                          <button
                            id={course._id}
                            className="btn btn-danger"
                            onClick={() => this.deleteDatabase(course._id)}
                          >
                            <i
                              className="fa fa-trash"
                              style={{ fontSize: "24px " }}
                            />
                          </button>
                        </React.Fragment>
                      ) : (
                        <React.Fragment />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h3 style={{ fontWeight: "bold", color: "red" }}>{str}</h3>
        </div>
        <div>
          <button
            id="prev"
            className="btn btn-success"
            style={{ marginRight: "50px" }}
            onClick={this.prev}
          >
            <i className="fa fa-arrow-left" style={{ fontSize: "24px" }} />
          </button>
          <button className="btn btn-primary">
            <strong>
              {this.state.skip} - {this.state.limit}
            </strong>
          </button>
          <button
            id="next"
            className="btn btn-success"
            style={{ marginLeft: "50px" }}
            onClick={this.next}
          >
            <i className="fa fa-arrow-right" style={{ fontSize: "24px" }} />
          </button>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  tasks: state.tasks
}))(Task);
