import React from "react";

const Dot = ({ color, title = "", sx = {} }) => {
  return (
    <div
      title={title}
      className="session-dot"
      style={{
        backgroundColor: color,
        margin: 1,
        borderRadius: "50%",
        ...sx,
      }}
    ></div>
  );
};

export default Dot;
