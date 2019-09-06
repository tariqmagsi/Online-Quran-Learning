import React, { Component } from "react";
import InfoThAndTd from "./InfoThAndTd";
import { getFromStorage } from "../../utils/storage";

class InfoList extends Component {
  state = {
    infoArray: [
      {
        id: "",
        name: "",
        email: "",
        country: "",
        contact: "",
        age: "",
        gender: ""
      }
    ]
  };
  componentDidMount() {
    const obj = getFromStorage(process.env.REACT_APP_KEY);
    if (obj && obj.token) {
      const { token } = obj;
      fetch("/profiles/myprofile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              id: json.id,
              name: json.name,
              email: json.email,
              age: json.age,
              contact: json.contact,
              country: json.country,
              gender: json.gender
            });
          }
        });
    }
  }
  render() {
    const { name, email, country, contact, age, gender } = this.state;

    const infooArray = [
      {
        id: 1,
        th: "Name",
        td: name
      },
      {
        id: 2,
        th: "Email",
        td: email
      },
      {
        id: 3,
        th: "Age",
        td: age
      },
      {
        id: 4,
        th: "Gender",
        td: gender
      },
      {
        id: 5,
        th: "Country",
        td: country
      },
      {
        id: 6,
        th: "Contact",
        td: contact
      }
    ];
    const infoArrayNew = infooArray.map((info, i) => {
      return (
        <InfoThAndTd
          key={infooArray[i].id}
          th={infooArray[i].th}
          td={infooArray[i].td}
        />
      );
    });
    return (
      <div>
        <span className="jss100 jss109 jss78 jss79">
          <div
            className="jss36 alert1 alert-info text-green fade show"
            id="PopoverFocus"
            role="alert"
          >
            <table className="statusAlertTable">
              <colgroup>
                <col width="100px" />
              </colgroup>
              <tbody>{infoArrayNew}</tbody>
            </table>
          </div>
        </span>
      </div>
    );
  }
}
export default InfoList;
