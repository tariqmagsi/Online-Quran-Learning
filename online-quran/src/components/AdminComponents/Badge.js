import React from "react";

const Badge = props => {
  return (
    <span className="jss83">
      <svg
        className="jss91 jss86 jss88"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        role="presentation"
      >
        <circle cx="12" cy="12" r="12" />
        <text className="jss87" x="12" y="16" textAnchor="middle">
          {props.id}
        </text>
      </svg>
    </span>
  );
};
export default Badge;
